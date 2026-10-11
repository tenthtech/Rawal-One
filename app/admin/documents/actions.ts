"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { documentCategories } from "@/data/documents";
import {
  CmsDataError,
  readAdminDocument,
  removeStoredDocument,
  saveDocumentRecord,
  setCmsRecordStatus,
  uploadDocumentPdf,
  type UploadedDocument,
} from "@/lib/cms";
import { requireAdminSession } from "@/lib/supabase/auth";

export type DocumentField =
  | "title"
  | "description"
  | "category"
  | "keywords"
  | "pdf";

export type DocumentFormValues = Record<
  Exclude<DocumentField, "pdf">,
  string
>;

export type DocumentFormState = {
  values: DocumentFormValues;
  errors: Partial<Record<DocumentField, string>>;
  formError?: string;
  attempt: number;
};

type DocumentIntent = "draft" | "publish";

const maximumPdfSize = 10 * 1024 * 1024;
const pdfSignature = [0x25, 0x50, 0x44, 0x46, 0x2d] as const;

function getFormValue(formData: FormData, field: keyof DocumentFormValues) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function characterLength(value: string) {
  return Array.from(value).length;
}

function getPdf(formData: FormData) {
  const value = formData.get("pdf");
  return value instanceof File && value.name ? value : null;
}

function validateMetadata(values: DocumentFormValues) {
  const errors: DocumentFormState["errors"] = {};
  const titleLength = characterLength(values.title);
  const descriptionLength = characterLength(values.description);
  const categoryIsValid = documentCategories.some(
    (category) => category.slug === values.category,
  );

  if (!values.title) {
    errors.title = "Enter a document title.";
  } else if (titleLength < 3 || titleLength > 180) {
    errors.title = "Use between 3 and 180 characters for the title.";
  }

  if (!values.description) {
    errors.description = "Enter a document description.";
  } else if (descriptionLength < 3 || descriptionLength > 600) {
    errors.description =
      "Use between 3 and 600 characters for the description.";
  }

  if (!values.category) {
    errors.category = "Select a document category.";
  } else if (!categoryIsValid) {
    errors.category = "Select one of the available document categories.";
  }

  return errors;
}

async function validatePdf(file: File | null, required: boolean) {
  if (!file) {
    return required ? "Choose a PDF file to upload." : undefined;
  }

  if (!file.name.toLowerCase().endsWith(".pdf")) {
    return "Choose a file with a .pdf filename.";
  }

  if (file.type !== "application/pdf") {
    return "Choose a PDF with the application/pdf file type.";
  }

  if (file.size === 0) {
    return "Choose a PDF that is not empty.";
  }

  if (file.size > maximumPdfSize) {
    return "Choose a PDF no larger than 10 MB.";
  }

  const signature = new Uint8Array(
    await file.slice(0, pdfSignature.length).arrayBuffer(),
  );
  const hasPdfSignature = pdfSignature.every(
    (byte, index) => signature[index] === byte,
  );

  return hasPdfSignature
    ? undefined
    : "Choose a valid PDF file beginning with a PDF signature.";
}

function parseKeywords(value: string) {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    ),
  );
}

function revalidateDocumentPaths(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/documents");
  revalidatePath("/documents");
  revalidatePath("/search");

  if (id) revalidatePath(`/admin/documents/${id}/edit`);
}

function operationalMessage(error: unknown) {
  if (error instanceof CmsDataError) return error.message;
  return "The document could not be saved. Try again.";
}

async function removeNewUploadAfterFailure(upload: UploadedDocument) {
  try {
    await removeStoredDocument(upload.storagePath);
    return true;
  } catch {
    return false;
  }
}

export async function saveDocumentAction(
  previousState: DocumentFormState,
  formData: FormData,
): Promise<DocumentFormState> {
  await requireAdminSession();

  const values: DocumentFormValues = {
    title: getFormValue(formData, "title"),
    description: getFormValue(formData, "description"),
    category: getFormValue(formData, "category"),
    keywords: getFormValue(formData, "keywords"),
  };
  const rawId = formData.get("id");
  const id = typeof rawId === "string" && rawId ? rawId : null;
  const rawIntent = formData.get("intent");
  const intent =
    rawIntent === "draft" || rawIntent === "publish"
      ? (rawIntent as DocumentIntent)
      : null;
  const file = getPdf(formData);
  const errors = validateMetadata(values);
  const pdfError = await validatePdf(file, !id);

  if (pdfError) errors.pdf = pdfError;

  if (Object.keys(errors).length > 0) {
    return {
      values,
      errors,
      formError: "Review the highlighted fields and submit the document again.",
      attempt: previousState.attempt + 1,
    };
  }

  if (!intent) {
    return {
      values,
      errors: {},
      formError: "Choose Save draft or Publish document.",
      attempt: previousState.attempt + 1,
    };
  }

  let existing: Awaited<ReturnType<typeof readAdminDocument>> = null;

  if (id) {
    try {
      existing = await readAdminDocument(id);
    } catch (error) {
      return {
        values,
        errors: {},
        formError: operationalMessage(error),
        attempt: previousState.attempt + 1,
      };
    }

    if (!existing) {
      return {
        values,
        errors: {},
        formError: "The document record could not be found. Return to Documents and try again.",
        attempt: previousState.attempt + 1,
      };
    }
  }

  let upload: UploadedDocument | null = null;
  let savedId: string;

  try {
    if (file) upload = await uploadDocumentPdf(file);

    if (!upload && !existing) {
      return {
        values,
        errors: { pdf: "Choose a PDF file to upload." },
        formError: "Review the highlighted fields and submit the document again.",
        attempt: previousState.attempt + 1,
      };
    }

    const document = await saveDocumentRecord(id, {
      title: values.title,
      description: values.description,
      category: values.category,
      document_type: "PDF",
      file_name: upload ? upload.fileName : existing!.file_name,
      file_url: upload ? upload.fileUrl : existing!.file_url,
      storage_path: upload ? upload.storagePath : existing!.storage_path,
      file_size_bytes: upload
        ? upload.fileSizeBytes
        : existing!.file_size_bytes,
      status: intent === "publish" ? "published" : "draft",
      keywords: parseKeywords(values.keywords),
    });
    savedId = document.id;
  } catch (error) {
    const cleanedUp = upload
      ? await removeNewUploadAfterFailure(upload)
      : true;

    return {
      values,
      errors: {},
      formError: cleanedUp
        ? operationalMessage(error)
        : "The document could not be saved, and the new PDF could not be removed from Storage. Ask an administrator to review the rawal-documents bucket.",
      attempt: previousState.attempt + 1,
    };
  }

  let previousFileCleanupFailed = false;
  if (
    upload &&
    existing?.storage_path &&
    existing.storage_path !== upload.storagePath
  ) {
    try {
      await removeStoredDocument(existing.storage_path);
    } catch {
      previousFileCleanupFailed = true;
    }
  }

  revalidateDocumentPaths(savedId);

  if (previousFileCleanupFailed) {
    redirect("/admin/documents?document=replacement-cleanup-failed");
  }

  redirect(
    `/admin/documents?document=${intent === "publish" ? "published" : "draft-saved"}`,
  );
}

async function changeDocumentStatus(
  id: string,
  status: "published" | "inactive",
) {
  await requireAdminSession();

  try {
    await setCmsRecordStatus("documents", id, status);
  } catch (error) {
    const notice =
      error instanceof CmsDataError &&
      error.message.startsWith("Connect Supabase")
        ? "connection-required"
        : "operation-failed";
    redirect(`/admin/documents?document=${notice}`);
  }

  revalidateDocumentPaths(id);
  redirect(
    `/admin/documents?document=${status === "published" ? "published" : "inactivated"}`,
  );
}

export async function publishDocumentAction(id: string) {
  await changeDocumentStatus(id, "published");
}

export async function inactivateDocumentAction(id: string) {
  await changeDocumentStatus(id, "inactive");
}
