"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  saveDocumentAction,
  type DocumentField,
  type DocumentFormState,
  type DocumentFormValues,
} from "@/app/admin/documents/actions";
import { documentCategories } from "@/data/documents";
import type { DocumentRow } from "@/lib/supabase/database.types";

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-sm border-2 border-line bg-white px-3 py-2.5 text-base text-ink aria-[invalid=true]:border-emergency";

function initialValues(document?: DocumentRow): DocumentFormValues {
  return {
    title: document?.title ?? "",
    description: document?.description ?? "",
    category: document?.category ?? "",
    keywords: document?.keywords.join(", ") ?? "",
  };
}

function statusLabel(status: DocumentRow["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatFileSize(bytes: number | null) {
  if (bytes === null) return "Size not recorded";
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ErrorMessage({
  field,
  error,
}: {
  field: DocumentField;
  error?: string;
}) {
  if (!error) return null;

  return (
    <p id={`${field}-error`} className="mt-2 leading-6 text-emergency">
      <span className="font-bold">Error:</span> {error}
    </p>
  );
}

function Requirement({ optional = false }: { optional?: boolean }) {
  return (
    <span className="text-sm text-muted">
      ({optional ? "Optional" : "Required"})
    </span>
  );
}

export function AdminDocumentForm({
  document,
}: {
  document?: DocumentRow;
}) {
  const initialState: DocumentFormState = {
    values: initialValues(document),
    errors: {},
    attempt: 0,
  };
  const [state, formAction, isPending] = useActionState(
    saveDocumentAction,
    initialState,
  );
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.attempt > 0 && state.formError) {
      errorSummaryRef.current?.focus();
    }
  }, [state.attempt, state.formError]);

  function describedBy(field: DocumentField, helpId: string) {
    return state.errors[field]
      ? `${helpId} ${field}-error`
      : helpId;
  }

  return (
    <form
      action={formAction}
      noValidate
      aria-busy={isPending}
      className="space-y-10"
    >
      {document ? <input type="hidden" name="id" value={document.id} /> : null}

      {state.formError ? (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="form-error-summary border-s-4 border-emergency bg-surface px-5 py-5"
        >
          <h2 className="text-xl font-bold text-ink">There is a problem</h2>
          <p className="mt-2 leading-7 text-ink">{state.formError}</p>
          {Object.keys(state.errors).length > 0 ? (
            <ul className="mt-3 list-disc space-y-2 ps-5">
              {(Object.entries(state.errors) as [DocumentField, string][]).map(
                ([field, error]) => (
                  <li key={field}>
                    <a
                      href={`#${field}`}
                      className="font-bold text-civic underline decoration-civic/35 underline-offset-4"
                    >
                      {error}
                    </a>
                  </li>
                ),
              )}
            </ul>
          ) : null}
        </div>
      ) : null}

      {document ? (
        <section
          aria-labelledby="current-document-heading"
          className="border-s-4 border-civic bg-sage px-5 py-4"
        >
          <h2 id="current-document-heading" className="font-bold text-ink">
            Current status: {statusLabel(document.status)}
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            Saving as a draft removes this document from public content queries.
            Publishing makes the current metadata and PDF available to residents.
          </p>
        </section>
      ) : null}

      <fieldset>
        <legend className="text-2xl font-bold tracking-[-0.02em] text-ink">
          Document details
        </legend>
        <p className="mt-2 max-w-2xl leading-7 text-muted">
          Fields marked “Required” must be completed before this document can be
          saved or published.
        </p>

        <div className="mt-7 space-y-7">
          <div>
            <label htmlFor="title" className="block font-bold text-ink">
              Title <Requirement />
            </label>
            <p
              id="title-help"
              className="mt-1 max-w-2xl text-sm leading-6 text-muted"
            >
              Use the resident-facing document title, between 3 and 180
              characters.
            </p>
            <input
              key={`${state.attempt}-title`}
              id="title"
              name="title"
              type="text"
              required
              minLength={3}
              maxLength={180}
              defaultValue={state.values.title}
              aria-invalid={state.errors.title ? "true" : undefined}
              aria-describedby={describedBy("title", "title-help")}
              className={fieldClassName}
            />
            <ErrorMessage field="title" error={state.errors.title} />
          </div>

          <div>
            <label htmlFor="description" className="block font-bold text-ink">
              Description <Requirement />
            </label>
            <p
              id="description-help"
              className="mt-1 max-w-2xl text-sm leading-6 text-muted"
            >
              Summarize what the document contains using 3 to 600 characters.
            </p>
            <textarea
              key={`${state.attempt}-description`}
              id="description"
              name="description"
              required
              rows={5}
              minLength={3}
              maxLength={600}
              defaultValue={state.values.description}
              aria-invalid={state.errors.description ? "true" : undefined}
              aria-describedby={describedBy(
                "description",
                "description-help",
              )}
              className={fieldClassName}
            />
            <ErrorMessage
              field="description"
              error={state.errors.description}
            />
          </div>

          <div>
            <label htmlFor="category" className="block font-bold text-ink">
              Category <Requirement />
            </label>
            <p
              id="category-help"
              className="mt-1 max-w-2xl text-sm leading-6 text-muted"
            >
              Select the existing public category used to organize this
              document.
            </p>
            <select
              key={`${state.attempt}-category`}
              id="category"
              name="category"
              required
              defaultValue={state.values.category}
              aria-invalid={state.errors.category ? "true" : undefined}
              aria-describedby={describedBy("category", "category-help")}
              className={fieldClassName}
            >
              <option value="">Select a category</option>
              {documentCategories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.label}
                </option>
              ))}
            </select>
            <ErrorMessage field="category" error={state.errors.category} />
          </div>

          <div>
            <label htmlFor="keywords" className="block font-bold text-ink">
              Keywords <Requirement optional />
            </label>
            <p
              id="keywords-help"
              className="mt-1 max-w-2xl text-sm leading-6 text-muted"
            >
              Separate search terms with commas, for example: water, connection,
              application.
            </p>
            <input
              key={`${state.attempt}-keywords`}
              id="keywords"
              name="keywords"
              type="text"
              defaultValue={state.values.keywords}
              aria-invalid={state.errors.keywords ? "true" : undefined}
              aria-describedby={describedBy("keywords", "keywords-help")}
              className={fieldClassName}
            />
            <ErrorMessage field="keywords" error={state.errors.keywords} />
          </div>
        </div>
      </fieldset>

      <fieldset className="border-t border-line pt-8">
        <legend className="text-2xl font-bold tracking-[-0.02em] text-ink">
          PDF file
        </legend>

        {document ? (
          <div className="mt-5 border border-line bg-surface px-5 py-4">
            <p className="text-xs font-bold tracking-[0.08em] text-civic uppercase">
              Current PDF
            </p>
            <p className="mt-2 break-all font-bold text-ink">
              {document.file_name}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span>{formatFileSize(document.file_size_bytes)}</span>
              <a
                href={document.file_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4"
              >
                Open current PDF
                <span className="sr-only"> in a new tab</span>
              </a>
            </div>
          </div>
        ) : null}

        <div className="mt-7">
          <label htmlFor="pdf" className="block font-bold text-ink">
            {document ? "Replacement PDF" : "PDF file"}{" "}
            <Requirement optional={Boolean(document)} />
          </label>
          <p id="pdf-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
            {document
              ? "Choose a new PDF only when intentionally replacing the current file."
              : "Choose the PDF residents will open or download."}{" "}
            Files must use the application/pdf type, have a .pdf filename and be
            no larger than 10 MB. File selections are cleared after a validation
            error.
          </p>
          <input
            key={`${state.attempt}-pdf`}
            id="pdf"
            name="pdf"
            type="file"
            accept="application/pdf,.pdf"
            required={!document}
            aria-invalid={state.errors.pdf ? "true" : undefined}
            aria-describedby={describedBy("pdf", "pdf-help")}
            className="mt-2 min-h-12 w-full rounded-sm border-2 border-line bg-white px-3 py-2 text-base text-ink file:me-4 file:rounded-sm file:border-0 file:bg-sage file:px-3 file:py-2 file:font-bold file:text-civic aria-[invalid=true]:border-emergency"
          />
          <ErrorMessage field="pdf" error={state.errors.pdf} />
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="submit"
          name="intent"
          value="draft"
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center rounded-sm border-2 border-civic bg-surface px-5 py-3 font-bold text-civic hover:bg-sage disabled:cursor-wait disabled:opacity-60"
        >
          {isPending ? "Working…" : "Save draft"}
        </button>
        <button
          type="submit"
          name="intent"
          value="publish"
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-civic px-5 py-3 font-bold text-white hover:bg-civic-deep disabled:cursor-wait disabled:opacity-60"
        >
          {isPending ? "Working…" : "Publish document"}
        </button>
      </div>
    </form>
  );
}
