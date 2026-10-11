"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";

import {
  saveCommunityEventAction,
  type CommunityEventField,
  type CommunityEventFormState,
} from "@/app/admin/events/actions";
import type { CmsStatus } from "@/lib/supabase/database.types";

type EditableCommunityEvent = {
  id: string;
  title: string;
  summary: string;
  location: string | null;
  starts_at: string;
  ends_at: string | null;
  keywords: string[];
  status: CmsStatus;
};

type AdminCommunityEventFormProps = {
  record?: EditableCommunityEvent;
};

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-sm border border-line bg-white px-3 py-2.5 text-ink outline-none aria-[invalid=true]:border-emergency focus:border-civic focus:ring-2 focus:ring-civic/25";

function pakistanDateTimeInput(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const valueFor = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${valueFor("year")}-${valueFor("month")}-${valueFor("day")}T${valueFor("hour")}:${valueFor("minute")}`;
}

function ErrorMessage({
  field,
  error,
}: {
  field: CommunityEventField;
  error?: string;
}) {
  if (!error) return null;

  return (
    <p id={`${field}-error`} className="mt-2 text-sm font-semibold text-emergency">
      {error}
    </p>
  );
}

function initialState(record?: EditableCommunityEvent): CommunityEventFormState {
  return {
    values: {
      title: record?.title ?? "",
      summary: record?.summary ?? "",
      location: record?.location ?? "",
      startsAt: pakistanDateTimeInput(record?.starts_at),
      endsAt: pakistanDateTimeInput(record?.ends_at),
      keywords: record?.keywords.join(", ") ?? "",
    },
    errors: {},
    attempt: 0,
  };
}

export function AdminCommunityEventForm({
  record,
}: AdminCommunityEventFormProps) {
  const [state, formAction, isPending] = useActionState(
    saveCommunityEventAction,
    initialState(record),
  );
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.attempt > 0 && state.formError) {
      errorSummaryRef.current?.focus();
    }
  }, [state.attempt, state.formError]);

  function describedBy(field: CommunityEventField, helpId: string) {
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
              {(
                Object.entries(state.errors) as [CommunityEventField, string][]
              ).map(([field, error]) => (
                <li key={field}>
                  <a
                    href={`#${field}`}
                    className="font-bold text-civic underline decoration-civic/35 underline-offset-4"
                  >
                    {error}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <fieldset>
        <legend className="text-2xl font-bold tracking-[-0.02em] text-ink">
          Community event details
        </legend>
        <p className="mt-2 max-w-2xl leading-7 text-muted">
          Fields marked “Required” must be completed before this event can be saved
          or published.
        </p>

        <div className="mt-7 space-y-7">
          <div>
            <label htmlFor="title" className="block font-bold text-ink">
              Title <span className="text-sm text-muted">(Required)</span>
            </label>
            <p id="title-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Use a clear public event name between 3 and 180 characters.
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
              Describe what residents can expect using 3 to 500 characters.
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
            <label htmlFor="location" className="block font-bold text-ink">
              Location <span className="text-sm text-muted">(Optional)</span>
            </label>
            <p id="location-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Name the venue or public place residents will recognize.
            </p>
            <input
              key={`${state.attempt}:${state.values.location}`}
              id="location"
              name="location"
              type="text"
              defaultValue={state.values.location}
              aria-describedby="location-help"
              className={fieldClassName}
            />
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            <div>
              <label htmlFor="startsAt" className="block font-bold text-ink">
                Start date and time{" "}
                <span className="text-sm text-muted">(Required)</span>
              </label>
              <p id="startsAt-help" className="mt-1 text-sm leading-6 text-muted">
                Enter the event start in Pakistan Standard Time (PKT).
              </p>
              <input
                key={`${state.attempt}:${state.values.startsAt}`}
                id="startsAt"
                name="startsAt"
                type="datetime-local"
                required
                step={60}
                defaultValue={state.values.startsAt}
                aria-invalid={state.errors.startsAt ? "true" : undefined}
                aria-describedby={describedBy("startsAt", "startsAt-help")}
                className={fieldClassName}
              />
              <ErrorMessage field="startsAt" error={state.errors.startsAt} />
            </div>

            <div>
              <label htmlFor="endsAt" className="block font-bold text-ink">
                End date and time{" "}
                <span className="text-sm text-muted">(Optional)</span>
              </label>
              <p id="endsAt-help" className="mt-1 text-sm leading-6 text-muted">
                Enter an end in PKT only when the event has a defined finish time.
              </p>
              <input
                key={`${state.attempt}:${state.values.endsAt}`}
                id="endsAt"
                name="endsAt"
                type="datetime-local"
                step={60}
                defaultValue={state.values.endsAt}
                aria-invalid={state.errors.endsAt ? "true" : undefined}
                aria-describedby={describedBy("endsAt", "endsAt-help")}
                className={fieldClassName}
              />
              <ErrorMessage field="endsAt" error={state.errors.endsAt} />
            </div>
          </div>

          <div>
            <label htmlFor="keywords" className="block font-bold text-ink">
              Keywords <span className="text-sm text-muted">(Optional)</span>
            </label>
            <p id="keywords-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Separate terms with commas. Keywords help residents find published
              events in search.
            </p>
            <input
              key={`${state.attempt}:${state.values.keywords}`}
              id="keywords"
              name="keywords"
              type="text"
              defaultValue={state.values.keywords}
              aria-describedby="keywords-help"
              className={fieldClassName}
              placeholder="For example, family, park, workshop"
            />
          </div>
        </div>
      </fieldset>

      <div className="border-t border-line pt-6">
        {record?.status === "published" ? (
          <p className="mb-4 max-w-3xl text-sm leading-6 text-muted">
            Saving as a draft removes this event from public pages. Use Publish
            changes to keep the updated event public.
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
              href={`/admin/events/${record.id}/preview`}
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
