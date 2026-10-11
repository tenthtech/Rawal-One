"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  CmsDataError,
  saveCityUpdate,
  setCmsRecordStatus,
  updateCategories,
  type CmsStatus,
} from "@/lib/cms";
import { requireAdminSession } from "@/lib/supabase/auth";

export type CityUpdateField = "category" | "title" | "summary" | "keywords";

export type CityUpdateFormValues = Record<CityUpdateField, string>;

export type CityUpdateFormState = {
  values: CityUpdateFormValues;
  errors: Partial<Record<CityUpdateField, string>>;
  formError?: string;
  attempt: number;
};

function formValue(formData: FormData, field: CityUpdateField) {
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

function validateCityUpdate(values: CityUpdateFormValues) {
  const errors: CityUpdateFormState["errors"] = {};

  if (!updateCategories.includes(values.category as (typeof updateCategories)[number])) {
    errors.category = "Select one of the available City Update categories.";
  }

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

  return errors;
}

function revalidateCityUpdatePaths(id?: string) {
  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath("/admin");
  revalidatePath("/admin/updates");

  if (id) {
    revalidatePath(`/admin/updates/${id}/edit`);
    revalidatePath(`/admin/updates/${id}/preview`);
  }
}

function operationalError(error: unknown) {
  if (error instanceof CmsDataError) return error.message;
  return "The City Update could not be saved. Try again.";
}

function failureNotice(error: unknown) {
  return error instanceof CmsDataError && error.message.startsWith("Connect Supabase")
    ? "connect-supabase"
    : "operation-failed";
}

export async function saveCityUpdateAction(
  previousState: CityUpdateFormState,
  formData: FormData,
): Promise<CityUpdateFormState> {
  await requireAdminSession();

  const values: CityUpdateFormValues = {
    category: formValue(formData, "category"),
    title: formValue(formData, "title"),
    summary: formValue(formData, "summary"),
    keywords: formValue(formData, "keywords"),
  };
  const errors = validateCityUpdate(values);
  const id = recordId(formData);
  const intent = formData.get("intent");

  if (id && !isUuid(id)) {
    return {
      values,
      errors: {},
      formError: "The City Update record identifier is invalid.",
      attempt: previousState.attempt + 1,
    };
  }

  if (Object.keys(errors).length > 0) {
    return {
      values,
      errors,
      formError: "Review the highlighted fields and submit the City Update again.",
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
    const record = await saveCityUpdate(id, {
      category: values.category,
      title: values.title,
      summary: values.summary,
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

  revalidateCityUpdatePaths(savedId);
  redirect(
    `/admin/updates/${savedId}/edit?notice=${
      intent === "publish" ? "published" : "draft-saved"
    }`,
  );
}

async function changeCityUpdateStatus(id: string, status: CmsStatus) {
  await requireAdminSession();

  if (!isUuid(id)) {
    redirect("/admin/updates?notice=operation-failed");
  }

  try {
    await setCmsRecordStatus("city_updates", id, status);
  } catch (error) {
    redirect(`/admin/updates?notice=${failureNotice(error)}`);
  }

  revalidateCityUpdatePaths(id);
  redirect(
    `/admin/updates?notice=${status === "published" ? "published" : "inactive"}`,
  );
}

export async function publishCityUpdateAction(id: string) {
  await changeCityUpdateStatus(id, "published");
}

export async function inactivateCityUpdateAction(id: string) {
  await changeCityUpdateStatus(id, "inactive");
}
