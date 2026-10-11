"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  CmsDataError,
  noticeCategories,
  saveNotice,
  setCmsRecordStatus,
} from "@/lib/cms";
import { requireAdminSession } from "@/lib/supabase/auth";

export type NoticeField =
  | "title"
  | "category"
  | "summary"
  | "body"
  | "publishedAt"
  | "closingAt"
  | "keywords";

export type NoticeFormValues = Record<NoticeField, string>;

export type NoticeFormState = {
  values: NoticeFormValues;
  errors: Partial<Record<NoticeField, string>>;
  formError?: string;
  attempt: number;
};

type NoticeIntent = "draft" | "preview" | "publish";

function getFormValue(formData: FormData, field: NoticeField) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function characterLength(value: string) {
  return Array.from(value).length;
}

function parseDate(value: string, endOfDay = false) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    year < 1000 ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return endOfDay
    ? new Date(`${value}T23:59:59.999+05:00`).toISOString()
    : date.toISOString();
}

function validateNotice(values: NoticeFormValues) {
  const errors: NoticeFormState["errors"] = {};
  const titleLength = characterLength(values.title);
  const categoryLength = characterLength(values.category);
  const summaryLength = characterLength(values.summary);
  const bodyLength = characterLength(values.body);

  if (!values.title) {
    errors.title = "Enter a notice title.";
  } else if (titleLength < 3 || titleLength > 180) {
    errors.title = "Use between 3 and 180 characters for the title.";
  }

  if (!values.category) {
    errors.category = "Select a notice category.";
  } else if (
    categoryLength < 2 ||
    categoryLength > 80 ||
    !noticeCategories.includes(
      values.category as (typeof noticeCategories)[number],
    )
  ) {
    errors.category = "Select one of the available notice categories.";
  }

  if (!values.summary) {
    errors.summary = "Enter a public summary.";
  } else if (summaryLength < 3 || summaryLength > 500) {
    errors.summary = "Use between 3 and 500 characters for the summary.";
  }

  if (!values.body) {
    errors.body = "Enter the notice body.";
  } else if (bodyLength < 3) {
    errors.body = "Use at least 3 characters for the notice body.";
  }

  let publishedAt: string | null = null;
  if (values.publishedAt) {
    publishedAt = parseDate(values.publishedAt);
    if (!publishedAt) {
      errors.publishedAt = "Enter a valid published date.";
    }
  }

  let closingAt: string | null = null;
  if (values.closingAt) {
    closingAt = parseDate(values.closingAt, true);
    if (!closingAt) {
      errors.closingAt = "Enter a valid closing date.";
    }
  }

  return {
    errors,
    input:
      Object.keys(errors).length === 0
        ? {
            title: values.title,
            category: values.category,
            summary: values.summary,
            body: values.body,
            published_at: publishedAt,
            closing_at: closingAt,
            keywords: values.keywords
              .split(",")
              .map((keyword) => keyword.trim())
              .filter(Boolean),
          }
        : null,
  };
}

function revalidateNoticePaths(id: string) {
  revalidatePath("/");
  revalidatePath("/notices");
  revalidatePath("/search");
  revalidatePath("/admin");
  revalidatePath("/admin/notices");
  revalidatePath(`/admin/notices/${id}/edit`);
  revalidatePath(`/admin/notices/${id}/preview`);
}

function operationalMessage(error: unknown) {
  if (error instanceof CmsDataError) {
    return error.message;
  }

  return "The notice could not be saved. Try again.";
}

export async function saveNoticeAction(
  previousState: NoticeFormState,
  formData: FormData,
): Promise<NoticeFormState> {
  await requireAdminSession();

  const values: NoticeFormValues = {
    title: getFormValue(formData, "title"),
    category: getFormValue(formData, "category"),
    summary: getFormValue(formData, "summary"),
    body: getFormValue(formData, "body"),
    publishedAt: getFormValue(formData, "publishedAt"),
    closingAt: getFormValue(formData, "closingAt"),
    keywords: getFormValue(formData, "keywords"),
  };
  const rawId = formData.get("id");
  const id = typeof rawId === "string" && rawId ? rawId : null;
  const rawIntent = formData.get("intent");
  const intent =
    rawIntent === "draft" || rawIntent === "preview" || rawIntent === "publish"
      ? (rawIntent as NoticeIntent)
      : null;
  const validation = validateNotice(values);

  if (!validation.input) {
    return {
      values,
      errors: validation.errors,
      formError: "Review the highlighted fields and submit the notice again.",
      attempt: previousState.attempt + 1,
    };
  }

  if (!intent) {
    return {
      values,
      errors: {},
      formError: "Choose Save draft, Preview or Publish.",
      attempt: previousState.attempt + 1,
    };
  }

  let noticeId: string;

  try {
    const notice = await saveNotice(id, {
      ...validation.input,
      status: intent === "publish" ? "published" : "draft",
    });
    noticeId = notice.id;
  } catch (error) {
    return {
      values,
      errors: {},
      formError: operationalMessage(error),
      attempt: previousState.attempt + 1,
    };
  }

  revalidateNoticePaths(noticeId);

  if (intent === "preview") {
    redirect(`/admin/notices/${noticeId}/preview?notice=draft-saved`);
  }

  if (intent === "publish") {
    redirect(`/admin/notices/${noticeId}/preview?notice=published`);
  }

  redirect("/admin/notices?notice=draft-saved");
}

async function changeNoticeStatus(
  id: string,
  status: "published" | "inactive",
) {
  await requireAdminSession();
  let failureNotice: "connection-required" | "operation-failed" | null = null;

  try {
    await setCmsRecordStatus("notices", id, status);
  } catch (error) {
    failureNotice =
      error instanceof CmsDataError &&
      error.message.startsWith("Connect Supabase")
        ? "connection-required"
        : "operation-failed";
  }

  if (failureNotice) {
    redirect(`/admin/notices?notice=${failureNotice}`);
  }

  revalidateNoticePaths(id);
  redirect(
    `/admin/notices?notice=${status === "published" ? "published" : "inactivated"}`,
  );
}

export async function publishNoticeAction(id: string) {
  await changeNoticeStatus(id, "published");
}

export async function inactivateNoticeAction(id: string) {
  await changeNoticeStatus(id, "inactive");
}
