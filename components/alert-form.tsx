"use client";

import { useActionState, useEffect, useRef } from "react";

import { createAlertAction } from "@/app/admin/alerts/actions";
import { alertFieldLimits } from "@/lib/alert-model";

type AlertField =
  | "severity"
  | "title"
  | "message"
  | "affectedArea"
  | "expiresAt"
  | "moreInfoUrl";

type AlertFormState = {
  values: Record<AlertField, string>;
  errors: Partial<Record<AlertField, string>>;
  formError?: string;
  attempt: number;
};

const initialState: AlertFormState = {
  values: {
    severity: "advisory",
    title: "",
    message: "",
    affectedArea: "",
    expiresAt: "",
    moreInfoUrl: "",
  },
  errors: {},
  attempt: 0,
};

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-sm border-2 border-line bg-white px-3 py-2.5 text-base text-ink aria-[invalid=true]:border-emergency";

function ErrorMessage({
  field,
  error,
}: {
  field: AlertField;
  error?: string;
}) {
  if (!error) return null;

  return (
    <p id={`${field}-error`} className="mt-2 leading-6 text-emergency">
      <span className="font-bold">Error:</span> {error}
    </p>
  );
}

export function AlertForm() {
  const [state, formAction, isPending] = useActionState(
    createAlertAction,
    initialState,
  );
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.attempt > 0 && state.formError) {
      errorSummaryRef.current?.focus();
    }
  }, [state.attempt, state.formError]);

  function describedBy(field: AlertField, helpId: string) {
    return state.errors[field]
      ? `${helpId} ${field}-error`
      : helpId;
  }

  return (
    <form action={formAction} aria-busy={isPending} className="mt-10 space-y-10">
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
              {(Object.entries(state.errors) as [AlertField, string][]).map(
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
          Alert details
        </legend>
        <p className="mt-2 max-w-2xl leading-7 text-muted">
          Fields marked “Required” must be completed before the alert can be
          saved or previewed.
        </p>

        <div className="mt-7 space-y-7">
          <div>
            <label htmlFor="severity" className="block font-bold text-ink">
              Severity <span className="text-sm text-muted">(Required)</span>
            </label>
            <p id="severity-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Choose the level that best reflects the urgency of the public
              information.
            </p>
            <select
              key={state.values.severity}
              id="severity"
              name="severity"
              required
              defaultValue={state.values.severity}
              aria-invalid={state.errors.severity ? "true" : undefined}
              aria-describedby={describedBy("severity", "severity-help")}
              className={fieldClassName}
            >
              <option value="advisory">Advisory</option>
              <option value="warning">Warning</option>
              <option value="emergency">Emergency</option>
            </select>
            <ErrorMessage field="severity" error={state.errors.severity} />
          </div>

          <div>
            <label htmlFor="title" className="block font-bold text-ink">
              Title <span className="text-sm text-muted">(Required)</span>
            </label>
            <p id="title-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Use a short, specific public heading. Maximum {alertFieldLimits.title}{" "}
              characters.
            </p>
            <input
              id="title"
              name="title"
              type="text"
              required
              maxLength={alertFieldLimits.title}
              defaultValue={state.values.title}
              aria-invalid={state.errors.title ? "true" : undefined}
              aria-describedby={describedBy("title", "title-help")}
              className={fieldClassName}
            />
            <ErrorMessage field="title" error={state.errors.title} />
          </div>

          <div>
            <label htmlFor="message" className="block font-bold text-ink">
              Message <span className="text-sm text-muted">(Required)</span>
            </label>
            <p id="message-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Explain what residents need to know in plain language. Maximum{" "}
              {alertFieldLimits.message} characters.
            </p>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              maxLength={alertFieldLimits.message}
              defaultValue={state.values.message}
              aria-invalid={state.errors.message ? "true" : undefined}
              aria-describedby={describedBy("message", "message-help")}
              className={fieldClassName}
            />
            <ErrorMessage field="message" error={state.errors.message} />
          </div>

          <div>
            <label htmlFor="affectedArea" className="block font-bold text-ink">
              Affected area <span className="text-sm text-muted">(Required)</span>
            </label>
            <p
              id="affectedArea-help"
              className="mt-1 max-w-2xl text-sm leading-6 text-muted"
            >
              Name the neighbourhood, facility or service area residents will
              recognize.
            </p>
            <input
              id="affectedArea"
              name="affectedArea"
              type="text"
              required
              maxLength={alertFieldLimits.affectedArea}
              placeholder="For example, Satellite Town"
              defaultValue={state.values.affectedArea}
              aria-invalid={state.errors.affectedArea ? "true" : undefined}
              aria-describedby={describedBy(
                "affectedArea",
                "affectedArea-help",
              )}
              className={fieldClassName}
            />
            <ErrorMessage
              field="affectedArea"
              error={state.errors.affectedArea}
            />
          </div>

          <div>
            <label htmlFor="expiresAt" className="block font-bold text-ink">
              Expiry <span className="text-sm text-muted">(Optional)</span>
            </label>
            <p id="expiresAt-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Pakistan Standard Time (PKT). The alert will stop appearing on the
              public homepage after this time.
            </p>
            <input
              id="expiresAt"
              name="expiresAt"
              type="datetime-local"
              defaultValue={state.values.expiresAt}
              aria-invalid={state.errors.expiresAt ? "true" : undefined}
              aria-describedby={describedBy("expiresAt", "expiresAt-help")}
              className={fieldClassName}
            />
            <ErrorMessage field="expiresAt" error={state.errors.expiresAt} />
          </div>

          <div>
            <label htmlFor="moreInfoUrl" className="block font-bold text-ink">
              More information <span className="text-sm text-muted">(Optional)</span>
            </label>
            <p id="moreInfoUrl-help" className="mt-1 max-w-2xl text-sm leading-6 text-muted">
              Enter an internal Rawal One path beginning with one forward slash,
              such as /services/water-service-interruptions.
            </p>
            <input
              id="moreInfoUrl"
              name="moreInfoUrl"
              type="text"
              maxLength={alertFieldLimits.moreInfoUrl}
              inputMode="url"
              defaultValue={state.values.moreInfoUrl}
              aria-invalid={state.errors.moreInfoUrl ? "true" : undefined}
              aria-describedby={describedBy(
                "moreInfoUrl",
                "moreInfoUrl-help",
              )}
              className={fieldClassName}
            />
            <ErrorMessage
              field="moreInfoUrl"
              error={state.errors.moreInfoUrl}
            />
          </div>
        </div>
      </fieldset>

      <section aria-labelledby="delivery-heading" className="border-t border-line pt-8">
        <h2
          id="delivery-heading"
          className="text-2xl font-bold tracking-[-0.02em] text-ink"
        >
          Delivery
        </h2>
        <p className="mt-2 max-w-2xl leading-7 text-muted">
          This demonstration publishes to the Rawal One website only.
        </p>
        <ul className="mt-5 border-y border-line divide-y divide-line">
          <li className="flex min-h-14 flex-wrap items-center justify-between gap-3 py-3">
            <span className="font-bold text-ink">Website</span>
            <span className="font-bold text-success">
              <span aria-hidden="true">✓</span> Enabled
            </span>
          </li>
          <li className="flex min-h-14 flex-wrap items-center justify-between gap-3 py-3">
            <span className="font-bold text-ink">Email</span>
            <span className="text-muted">Future integration</span>
          </li>
          <li className="flex min-h-14 flex-wrap items-center justify-between gap-3 py-3">
            <span className="font-bold text-ink">SMS</span>
            <span className="text-muted">Future integration</span>
          </li>
        </ul>
      </section>

      <div className="flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center">
        <button
          type="submit"
          name="intent"
          value="draft"
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center rounded-sm border-2 border-civic bg-surface px-5 py-3 font-bold text-civic hover:bg-sage disabled:cursor-wait disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Save draft"}
        </button>
        <button
          type="submit"
          name="intent"
          value="preview"
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-civic px-5 py-3 font-bold text-white hover:bg-civic-deep disabled:cursor-wait disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Preview alert"}
        </button>
      </div>
    </form>
  );
}
