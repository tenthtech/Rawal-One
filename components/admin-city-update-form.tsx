"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";

import {
  saveCityUpdateAction,
  type CityUpdateField,
  type CityUpdateFormState,
} from "@/app/admin/updates/actions";
import type { CmsStatus } from "@/lib/supabase/database.types";

type EditableCityUpdate = {
  id: string;
  category: string;
  title: string;
  summary: string;
  keywords: string[];
  status: CmsStatus;
};

type AdminCityUpdateFormProps = {
  categories: readonly string[];
  record?: EditableCityUpdate;
};

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-sm border border-line bg-white px-3 py-2.5 text-ink outline-none aria-[invalid=true]:border-emergency focus:border-civic focus:ring-2 focus:ring-civic/25";

function ErrorMessage({
  field,
  error,
}: {
  field: CityUpdateField;
  error?: string;
}) {
  if (!error) return null;

  return (
    <p id={`${field}-error`} className="mt-2 text-sm font-semibold text-emergency">
      {error}
    </p>
  );
}

function initialState(record?: EditableCityUpdate): CityUpdateFormState {
  return {
    values: {
      category: record?.category ?? "",
      title: record?.title ?? "",
      summary: record?.summary ?? "",
      keywords: record?.keywords.join(", ") ?? "",
    },
    errors: {},
    attempt: 0,
  };
}

export function AdminCityUpdateForm({
  categories,
  record,
}: AdminCityUpdateFormProps) {
  const [state, formAction, isPending] = useActionState(
    saveCityUpdateAction,
    initialState(record),
  );
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.attempt > 0 && state.formError) {
      errorSummaryRef.current?.focus();
    }
  }, [state.attempt, state.formError]);

  function describedBy(field: CityUpdateField, helpId: string) {
    return state.errors[field] ? `${helpId} ${field}-error` : helpId;
  }

  return (
    <form action={formAction} aria-busy={isPending} className="mt-8 space-y-8">
      {record ? <input type="hidden" name="id" value={record.id} /> : null}

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
              {(Object.entries(state.errors) as [CityUpdateField, string][]).map(
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

      <fieldset>
        <legend className="text-2xl font-bold tracking-[-0.02em] text-ink">
          City Update details
        </legend>
        <p className="mt-2 max-w-2xl leading-7 text-muted">
          Fields marked “Required” must be completed before this update can be
          saved or published.
        </p>

        <div className="mt-7 space-y-7">
          <div>
            <label htmlFor="category" className="block font-bold text-ink">
              Category <span className="text-sm text-muted">(Required)</span>
            </label>
            <p id="category-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Choose the existing public category that best describes this update.
            </p>
            <select
              key={`${state.attempt}:${state.values.category}`}
              id="category"
              name="category"
              required
              defaultValue={state.values.category}
              aria-invalid={state.errors.category ? "true" : undefined}
              aria-describedby={describedBy("category", "category-help")}
              className={fieldClassName}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ErrorMessage field="category" error={state.errors.category} />
          </div>

          <div>
            <label htmlFor="title" className="block font-bold text-ink">
              Title <span className="text-sm text-muted">(Required)</span>
            </label>
            <p id="title-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Use a clear public heading between 3 and 180 characters.
            </p>
            <input
              key={`${state.attempt}:${state.values.title}`}
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
            <label htmlFor="summary" className="block font-bold text-ink">
              Summary <span className="text-sm text-muted">(Required)</span>
            </label>
            <p id="summary-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Explain the update in plain language using 3 to 500 characters.
            </p>
            <textarea
              key={`${state.attempt}:${state.values.summary}`}
              id="summary"
              name="summary"
              required
              minLength={3}
              maxLength={500}
              rows={6}
              defaultValue={state.values.summary}
              aria-invalid={state.errors.summary ? "true" : undefined}
              aria-describedby={describedBy("summary", "summary-help")}
              className={fieldClassName}
            />
            <ErrorMessage field="summary" error={state.errors.summary} />
          </div>

          <div>
            <label htmlFor="keywords" className="block font-bold text-ink">
              Keywords <span className="text-sm text-muted">(Optional)</span>
            </label>
            <p id="keywords-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Separate terms with commas. Keywords help residents find published
              content in search.
            </p>
            <input
              key={`${state.attempt}:${state.values.keywords}`}
              id="keywords"
              name="keywords"
              type="text"
              defaultValue={state.values.keywords}
              aria-describedby="keywords-help"
              className={fieldClassName}
              placeholder="For example, roads, construction, traffic"
            />
          </div>
        </div>
      </fieldset>

      <div className="border-t border-line pt-6">
        {record?.status === "published" ? (
          <p className="mb-4 max-w-3xl text-sm leading-6 text-muted">
            Saving as a draft removes this record from public pages. Use Publish
            changes to keep the updated record public.
          </p>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="submit"
            name="intent"
            value="draft"
            disabled={isPending}
            className="inline-flex min-h-12 items-center justify-center rounded-sm border-2 border-civic bg-white px-5 py-3 font-bold text-civic hover:bg-sage disabled:cursor-wait disabled:opacity-60"
          >
            Save draft
          </button>
          <button
            type="submit"
            name="intent"
            value="publish"
            disabled={isPending}
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-civic px-5 py-3 font-bold text-white hover:bg-civic-deep disabled:cursor-wait disabled:opacity-60"
          >
            {record?.status === "published" ? "Publish changes" : "Publish"}
          </button>
          {record ? (
            <Link
              href={`/admin/updates/${record.id}/preview`}
              className="inline-flex min-h-12 items-center justify-center px-3 py-3 font-bold text-civic underline decoration-civic/35 underline-offset-4"
            >
              Preview saved version
            </Link>
          ) : null}
        </div>
      </div>
    </form>
  );
}
