"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  alertFieldLimits,
  alertSeverities,
  type AlertSeverity,
  type CreateAlertInput,
} from "@/lib/alert-model";
import { createAlert, deactivateAlert, publishAlert } from "@/lib/alerts";
import { requireAdminSession } from "@/lib/supabase/auth";

type AlertField =
  | "severity"
  | "title"
  | "message"
  | "affectedArea"
  | "expiresAt"
  | "moreInfoUrl";

type AlertFormValues = Record<AlertField, string>;

type AlertFormState = {
  values: AlertFormValues;
  errors: Partial<Record<AlertField, string>>;
  formError?: string;
  attempt: number;
};

function getFormValue(formData: FormData, field: AlertField) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function parsePakistanDateTime(value: string) {
  const match = value.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/,
  );

  if (!match) return null;

  const [, yearText, monthText, dayText, hourText, minuteText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

  if (
    year < 1000 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > daysInMonth ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }

  const date = new Date(`${value}:00+05:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isValidInternalPath(value: string) {
  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return false;
  }

  try {
    const baseUrl = "https://rawal-one.invalid";
    const parsed = new URL(value, baseUrl);

    return (
      parsed.origin === baseUrl &&
      parsed.pathname !== "/admin" &&
      !parsed.pathname.startsWith("/admin/")
    );
  } catch {
    return false;
  }
}

function validateAlert(values: AlertFormValues) {
  const errors: AlertFormState["errors"] = {};

  if (!alertSeverities.includes(values.severity as AlertSeverity)) {
    errors.severity = "Select Advisory, Warning or Emergency.";
  }

  if (!values.title) {
    errors.title = "Enter an alert title.";
  } else if (values.title.length > alertFieldLimits.title) {
    errors.title = `Use ${alertFieldLimits.title} characters or fewer.`;
  }

  if (!values.message) {
    errors.message = "Enter the public alert message.";
  } else if (values.message.length > alertFieldLimits.message) {
    errors.message = `Use ${alertFieldLimits.message} characters or fewer.`;
  }

  if (!values.affectedArea) {
    errors.affectedArea = "Enter the affected area.";
  } else if (values.affectedArea.length > alertFieldLimits.affectedArea) {
    errors.affectedArea = `Use ${alertFieldLimits.affectedArea} characters or fewer.`;
  }

  let expiresAt: string | null = null;

  if (values.expiresAt) {
    const parsedExpiry = parsePakistanDateTime(values.expiresAt);

    if (!parsedExpiry) {
      errors.expiresAt = "Enter a valid expiry date and time.";
    } else if (parsedExpiry.getTime() <= Date.now()) {
      errors.expiresAt = "Choose an expiry time in the future.";
    } else {
      expiresAt = parsedExpiry.toISOString();
    }
  }

  if (values.moreInfoUrl) {
    if (values.moreInfoUrl.length > alertFieldLimits.moreInfoUrl) {
      errors.moreInfoUrl = `Use ${alertFieldLimits.moreInfoUrl} characters or fewer.`;
    } else if (!isValidInternalPath(values.moreInfoUrl)) {
      errors.moreInfoUrl =
        "Enter an internal Rawal One path beginning with one forward slash.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, input: null };
  }

  const input: CreateAlertInput = {
    severity: values.severity as AlertSeverity,
    title: values.title,
    message: values.message,
    affectedArea: values.affectedArea,
    expiresAt,
    moreInfoUrl: values.moreInfoUrl || null,
  };

  return { errors, input };
}

export async function createAlertAction(
  previousState: AlertFormState,
  formData: FormData,
): Promise<AlertFormState> {
  await requireAdminSession();

  const values: AlertFormValues = {
    severity: getFormValue(formData, "severity"),
    title: getFormValue(formData, "title"),
    message: getFormValue(formData, "message"),
    affectedArea: getFormValue(formData, "affectedArea"),
    expiresAt: getFormValue(formData, "expiresAt"),
    moreInfoUrl: getFormValue(formData, "moreInfoUrl"),
  };
  const intent = formData.get("intent");
  const validation = validateAlert(values);

  if (!validation.input) {
    return {
      values,
      errors: validation.errors,
      formError: "Review the highlighted fields and submit the alert again.",
      attempt: previousState.attempt + 1,
    };
  }

  if (intent !== "draft" && intent !== "preview") {
    return {
      values,
      errors: {},
      formError: "Choose Save draft or Preview alert.",
      attempt: previousState.attempt + 1,
    };
  }

  let alertId: string;

  try {
    const alert = await createAlert(validation.input);
    alertId = alert.id;
  } catch {
    return {
      values,
      errors: {},
      formError: "The alert could not be saved. Try again.",
      attempt: previousState.attempt + 1,
    };
  }

  revalidatePath("/admin");

  if (intent === "preview") {
    redirect(`/admin/alerts/${alertId}/preview?notice=draft-created`);
  }

  redirect("/admin?notice=draft-saved");
}

export async function publishAlertAction(id: string) {
  await requireAdminSession();

  let succeeded = false;

  try {
    await publishAlert(id);
    succeeded = true;
  } catch {
    succeeded = false;
  }

  if (!succeeded) {
    redirect("/admin?notice=operation-failed");
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/admin/alerts/${id}/preview`);
  redirect("/admin?notice=published");
}

export async function deactivateAlertAction(id: string) {
  await requireAdminSession();

  let succeeded = false;

  try {
    await deactivateAlert(id);
    succeeded = true;
  } catch {
    succeeded = false;
  }

  if (!succeeded) {
    redirect("/admin?notice=operation-failed");
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/admin/alerts/${id}/preview`);
  redirect("/admin?notice=deactivated");
}
