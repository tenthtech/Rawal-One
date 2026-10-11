"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  CmsDataError,
  saveCommunityEvent,
  setCmsRecordStatus,
  type CmsStatus,
} from "@/lib/cms";
import { requireAdminSession } from "@/lib/supabase/auth";

export type CommunityEventField =
  | "title"
  | "summary"
  | "location"
  | "startsAt"
  | "endsAt"
  | "keywords";

export type CommunityEventFormValues = Record<CommunityEventField, string>;

export type CommunityEventFormState = {
  values: CommunityEventFormValues;
  errors: Partial<Record<CommunityEventField, string>>;
  formError?: string;
  attempt: number;
};

function formValue(formData: FormData, field: CommunityEventField) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function recordId(formData: FormData) {
  const value = formData.get("id");
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function parseKeywords(value: string) {
  const seen = new Set<string>();

  return value
    .split(",")
    .map((keyword) => keyword.trim())
    .filter((keyword) => {
      if (!keyword) return false;
      const key = keyword.toLocaleLowerCase("en");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function parsePakistanDateTime(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
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

function validateCommunityEvent(values: CommunityEventFormValues) {
  const errors: CommunityEventFormState["errors"] = {};

  if (values.title.length < 3) {
    errors.title = "Enter a title using at least 3 characters.";
  } else if (values.title.length > 180) {
    errors.title = "Use 180 characters or fewer for the title.";
  }

  if (values.summary.length < 3) {
    errors.summary = "Enter a summary using at least 3 characters.";
  } else if (values.summary.length > 500) {
    errors.summary = "Use 500 characters or fewer for the summary.";
  }

  const startsAt = values.startsAt
    ? parsePakistanDateTime(values.startsAt)
    : null;
  const endsAt = values.endsAt ? parsePakistanDateTime(values.endsAt) : null;

  if (!values.startsAt) {
    errors.startsAt = "Enter the event start date and time.";
  } else if (!startsAt) {
    errors.startsAt = "Enter a valid start date and time.";
  }

  if (values.endsAt && !endsAt) {
    errors.endsAt = "Enter a valid end date and time.";
  } else if (startsAt && endsAt && endsAt.getTime() < startsAt.getTime()) {
    errors.endsAt = "The end date and time must be after the event starts.";
  }

  return { errors, startsAt, endsAt };
}

function revalidateCommunityEventPaths(id?: string) {
  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath("/admin");
  revalidatePath("/admin/events");

  if (id) {
    revalidatePath(`/admin/events/${id}/edit`);
    revalidatePath(`/admin/events/${id}/preview`);
  }
}

function operationalError(error: unknown) {
  if (error instanceof CmsDataError) return error.message;
  return "The community event could not be saved. Try again.";
}

function failureNotice(error: unknown) {
  return error instanceof CmsDataError && error.message.startsWith("Connect Supabase")
    ? "connect-supabase"
    : "operation-failed";
}

export async function saveCommunityEventAction(
  previousState: CommunityEventFormState,
  formData: FormData,
): Promise<CommunityEventFormState> {
  await requireAdminSession();

  const values: CommunityEventFormValues = {
    title: formValue(formData, "title"),
    summary: formValue(formData, "summary"),
    location: formValue(formData, "location"),
    startsAt: formValue(formData, "startsAt"),
    endsAt: formValue(formData, "endsAt"),
    keywords: formValue(formData, "keywords"),
  };
  const validation = validateCommunityEvent(values);
  const id = recordId(formData);
  const intent = formData.get("intent");

  if (id && !isUuid(id)) {
    return {
      values,
      errors: {},
      formError: "The community event record identifier is invalid.",
      attempt: previousState.attempt + 1,
    };
  }

  if (Object.keys(validation.errors).length > 0 || !validation.startsAt) {
    return {
      values,
      errors: validation.errors,
      formError: "Review the highlighted fields and submit the event again.",
      attempt: previousState.attempt + 1,
    };
  }

  if (intent !== "draft" && intent !== "publish") {
    return {
      values,
      errors: {},
      formError: "Choose Save draft or Publish.",
      attempt: previousState.attempt + 1,
    };
  }

  let savedId: string;

  try {
    const record = await saveCommunityEvent(id, {
      title: values.title,
      summary: values.summary,
      location: values.location || null,
      starts_at: validation.startsAt.toISOString(),
      ends_at: validation.endsAt?.toISOString() ?? null,
      keywords: parseKeywords(values.keywords),
      status: intent === "publish" ? "published" : "draft",
    });
    savedId = record.id;
  } catch (error) {
    return {
      values,
      errors: {},
      formError: operationalError(error),
      attempt: previousState.attempt + 1,
    };
  }

  revalidateCommunityEventPaths(savedId);
  redirect(
    `/admin/events/${savedId}/edit?notice=${
      intent === "publish" ? "published" : "draft-saved"
    }`,
  );
}

async function changeCommunityEventStatus(id: string, status: CmsStatus) {
  await requireAdminSession();

  if (!isUuid(id)) {
    redirect("/admin/events?notice=operation-failed");
  }

  try {
    await setCmsRecordStatus("community_events", id, status);
  } catch (error) {
    redirect(`/admin/events?notice=${failureNotice(error)}`);
  }

  revalidateCommunityEventPaths(id);
  redirect(
    `/admin/events?notice=${status === "published" ? "published" : "inactive"}`,
  );
}

export async function publishCommunityEventAction(id: string) {
  await changeCommunityEventStatus(id, "published");
}

export async function inactivateCommunityEventAction(id: string) {
  await changeCommunityEventStatus(id, "inactive");
}
