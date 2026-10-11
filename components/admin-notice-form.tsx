"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  saveNoticeAction,
  type NoticeField,
  type NoticeFormState,
  type NoticeFormValues,
} from "@/app/admin/notices/actions";
import type { NoticeRow } from "@/lib/supabase/database.types";

const noticeCategories = [
  "Planning & development",
  "Roads & transport",
  "Community services",
  "Waste & recycling",
] as const;

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-sm border-2 border-line bg-white px-3 py-2.5 text-base text-ink aria-[invalid=true]:border-emergency";

const pakistanDateInputFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Karachi",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function dateInputValue(value: string | null) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const parts = Object.fromEntries(
    pakistanDateInputFormatter
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );

  return `${parts.year}-${parts.month}-${parts.day}`;
}

function initialValues(notice?: NoticeRow): NoticeFormValues {
  return {
    title: notice?.title ?? "",
    category: notice?.category ?? "",
    summary: notice?.summary ?? "",
    body: notice?.body ?? "",
    publishedAt: dateInputValue(notice?.published_at ?? null),
    closingAt: dateInputValue(notice?.closing_at ?? null),
    keywords: notice?.keywords.join(", ") ?? "",
  };
}

function statusLabel(status: NoticeRow["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function ErrorMessage({
  field,
  error,
}: {
  field: NoticeField;
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

export function AdminNoticeForm({ notice }: { notice?: NoticeRow }) {
  const initialState: NoticeFormState = {
    values: initialValues(notice),
    errors: {},
    attempt: 0,
  };
  const [state, formAction, isPending] = useActionState(
    saveNoticeAction,
    initialState,
  );
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.attempt > 0 && state.formError) {
      errorSummaryRef.current?.focus();
    }
  }, [state.attempt, state.formError]);

  function describedBy(field: NoticeField, helpId: string) {
    return state.errors[field] ? `${helpId} ${field}-error` : helpId;
  }

  return (
    <form
      action={formAction}
      noValidate
      aria-busy={isPending}
      className="space-y-10"
    >
      {notice ? <input type="hidden" name="id" value={notice.id} /> : null}

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
              {(Object.entries(state.errors) as [NoticeField, string][]).map(
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

      {notice ? (
        <section
          aria-labelledby="current-status-heading"
          className="border-s-4 border-civic bg-sage px-5 py-4"
        >
          <h2 id="current-status-heading" className="font-bold text-ink">
            Current status: {statusLabel(notice.status)}
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            Saving as a draft or previewing changes sets this notice to Draft.
            Publish when the content is ready for residents.
          </p>
        </section>
      ) : null}

      <fieldset>
        <legend className="text-2xl font-bold tracking-[-0.02em] text-ink">
          Notice content
        </legend>
        <p className="mt-2 max-w-2xl leading-7 text-muted">
          Fields marked “Required” must be completed before this notice can be
          saved, previewed or published.
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
              Use a specific public heading between 3 and 180 characters.
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
            <label htmlFor="category" className="block font-bold text-ink">
              Category <Requirement />
            </label>
            <p
              id="category-help"
              className="mt-1 max-w-2xl text-sm leading-6 text-muted"
            >
              Select the existing public category that best describes the
              notice.
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
              {noticeCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ErrorMessage field="category" error={state.errors.category} />
          </div>

          <div>
            <label htmlFor="summary" className="block font-bold text-ink">
              Summary <Requirement />
            </label>
            <p
              id="summary-help"
              className="mt-1 max-w-2xl text-sm leading-6 text-muted"
            >
              Summarize the notice in plain language using 3 to 500 characters.
            </p>
            <textarea
              key={`${state.attempt}-summary`}
              id="summary"
              name="summary"
              required
              rows={4}
              minLength={3}
              maxLength={500}
              defaultValue={state.values.summary}
              aria-invalid={state.errors.summary ? "true" : undefined}
              aria-describedby={describedBy("summary", "summary-help")}
              className={fieldClassName}
            />
            <ErrorMessage field="summary" error={state.errors.summary} />
          </div>

          <div>
            <label htmlFor="body" className="block font-bold text-ink">
              Body <Requirement />
            </label>
            <p
              id="body-help"
              className="mt-1 max-w-2xl text-sm leading-6 text-muted"
            >
              Enter the complete notice in plain text. Separate paragraphs with
              a blank line.
            </p>
            <textarea
              key={`${state.attempt}-body`}
              id="body"
              name="body"
              required
              rows={12}
              minLength={3}
              defaultValue={state.values.body}
              aria-invalid={state.errors.body ? "true" : undefined}
              aria-describedby={describedBy("body", "body-help")}
              className={fieldClassName}
            />
            <ErrorMessage field="body" error={state.errors.body} />
          </div>
        </div>
      </fieldset>

      <fieldset className="border-t border-line pt-8">
        <legend className="text-2xl font-bold tracking-[-0.02em] text-ink">
          Publication details
        </legend>
        <div className="mt-7 grid gap-7 sm:grid-cols-2">
          <div>
            <label htmlFor="publishedAt" className="block font-bold text-ink">
              Published date <Requirement optional />
            </label>
            <p
              id="publishedAt-help"
              className="mt-1 max-w-2xl text-sm leading-6 text-muted"
            >
              Leave blank to use the first publication date when publishing.
            </p>
            <input
              key={`${state.attempt}-publishedAt`}
              id="publishedAt"
              name="publishedAt"
              type="date"
              defaultValue={state.values.publishedAt}
              aria-invalid={state.errors.publishedAt ? "true" : undefined}
              aria-describedby={describedBy("publishedAt", "publishedAt-help")}
              className={fieldClassName}
            />
            <ErrorMessage
              field="publishedAt"
              error={state.errors.publishedAt}
            />
          </div>

          <div>
            <label htmlFor="closingAt" className="block font-bold text-ink">
              Closing date <Requirement optional />
            </label>
            <p
              id="closingAt-help"
              className="mt-1 max-w-2xl text-sm leading-6 text-muted"
            >
              Add a closing date only when the notice has a defined deadline.
            </p>
            <input
              key={`${state.attempt}-closingAt`}
              id="closingAt"
              name="closingAt"
              type="date"
              defaultValue={state.values.closingAt}
              aria-invalid={state.errors.closingAt ? "true" : undefined}
              aria-describedby={describedBy("closingAt", "closingAt-help")}
              className={fieldClassName}
            />
            <ErrorMessage field="closingAt" error={state.errors.closingAt} />
          </div>
        </div>

        <div className="mt-7">
          <label htmlFor="keywords" className="block font-bold text-ink">
            Keywords <Requirement optional />
          </label>
          <p
            id="keywords-help"
            className="mt-1 max-w-2xl text-sm leading-6 text-muted"
          >
            Separate search terms with commas, for example: planning,
            consultation, development.
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
          value="preview"
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center rounded-sm border-2 border-civic bg-surface px-5 py-3 font-bold text-civic hover:bg-sage disabled:cursor-wait disabled:opacity-60"
        >
          {isPending ? "Working…" : "Preview notice"}
        </button>
        <button
          type="submit"
          name="intent"
          value="publish"
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-civic px-5 py-3 font-bold text-white hover:bg-civic-deep disabled:cursor-wait disabled:opacity-60"
        >
          {isPending ? "Working…" : "Publish notice"}
        </button>
      </div>
    </form>
  );
}
