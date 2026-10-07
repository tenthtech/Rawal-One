import type { Metadata } from "next";
import Link from "next/link";

import { deactivateAlertAction } from "@/app/admin/alerts/actions";
import {
  formatAlertDateTime,
  getAlertSeverityLabel,
  getAlertStatusLabel,
  isAlertExpired,
  type AlertSeverity,
} from "@/lib/alert-model";
import { readAlerts } from "@/lib/alerts";

export const metadata: Metadata = {
  title: "Communications administration",
  description:
    "Emergency alert publishing workspace for the Rawal One R&D demonstration.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<{ notice?: string | string[] }>;
};

const notices = {
  "draft-saved": {
    heading: "Draft saved",
    message: "The alert is saved in the workspace and is not public.",
    tone: "success",
  },
  published: {
    heading: "Alert published",
    message: "The alert is now eligible to appear on the public homepage.",
    tone: "success",
  },
  deactivated: {
    heading: "Alert deactivated",
    message: "The alert remains in this list and is no longer public.",
    tone: "success",
  },
  "operation-failed": {
    heading: "The action could not be completed",
    message: "Review the alert and try again.",
    tone: "error",
  },
} as const;

const severityStyles: Record<AlertSeverity, string> = {
  advisory: "border-information/35 text-information",
  warning: "border-warning/35 text-warning",
  emergency: "border-emergency/35 text-emergency",
};

const statusStyles = {
  Draft: "border-civic/30 text-civic",
  Published: "border-success/35 text-success",
  Inactive: "border-muted/35 text-muted",
  Expired: "border-advisory/35 text-advisory",
} as const;

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const alerts = await readAlerts();
  const params = await searchParams;
  const noticeKey = Array.isArray(params.notice) ? params.notice[0] : params.notice;
  const notice =
    noticeKey && noticeKey in notices
      ? notices[noticeKey as keyof typeof notices]
      : null;
  const now = new Date();

  return (
    <div className="bg-page">
      <header className="border-b border-line bg-sage">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="max-w-4xl border-s-4 border-accent ps-5 sm:ps-7">
            <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
              Rawal One administration
            </p>
            <h1 className="mt-3 [overflow-wrap:anywhere] text-[2rem] font-bold tracking-[-0.03em] text-ink sm:text-5xl">
              Communications
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              Create, review and publish urgent information for the Rawal One
              resident homepage.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <section
          aria-labelledby="demonstration-workspace-heading"
          className="border-s-4 border-information bg-surface px-5 py-5 sm:px-6"
        >
          <h2
            id="demonstration-workspace-heading"
            className="text-lg font-bold text-ink"
          >
            Demonstration workspace
          </h2>
          <p className="mt-2 max-w-4xl leading-7 text-muted">
            This R&amp;D workspace has no authentication and must contain only
            fictional municipal alert content. Website publishing is provided
            solely for demonstrating the communications workflow.
          </p>
        </section>

        {notice ? (
          <section
            aria-labelledby="admin-notice-heading"
            className={`mt-8 border-s-4 bg-surface px-5 py-5 ${
              notice.tone === "error" ? "border-emergency" : "border-success"
            }`}
          >
            <h2 id="admin-notice-heading" className="text-lg font-bold text-ink">
              {notice.heading}
            </h2>
            <p className="mt-1 leading-7 text-muted">{notice.message}</p>
          </section>
        ) : null}

        <section aria-labelledby="emergency-alerts-heading" className="mt-12">
          <div className="flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
                Public communications
              </p>
              <h2
                id="emergency-alerts-heading"
                className="mt-2 text-3xl font-bold tracking-[-0.025em] text-ink"
              >
                Emergency alerts
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-muted">
                Draft, preview, publish and deactivate urgent resident notices.
              </p>
            </div>
            <Link
              href="/admin/alerts/new"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-sm bg-civic px-5 py-3 font-bold text-white no-underline hover:bg-civic-deep"
            >
              Create alert
            </Link>
          </div>

          {alerts.length === 0 ? (
            <div className="border-b border-line py-10">
              <h3 className="text-xl font-bold text-ink">No alerts yet</h3>
              <p className="mt-2 max-w-2xl leading-7 text-muted">
                Create an alert to begin the draft, preview and publishing
                workflow. Drafts remain private to this demonstration workspace.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-line border-b border-line">
              {alerts.map((alert) => {
                const expired =
                  alert.status === "published" && isAlertExpired(alert, now);
                const statusLabel = expired
                  ? "Expired"
                  : getAlertStatusLabel(alert.status);
                const previewLabel =
                  alert.status === "draft"
                    ? "Preview alert"
                    : "View alert preview";
                const deactivateAction = deactivateAlertAction.bind(
                  null,
                  alert.id,
                );

                return (
                  <li key={alert.id} className="py-7">
                    <article>
                      <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                        <div className="min-w-0">
                          <div className="flex flex-wrap gap-2 text-sm font-bold">
                            <span
                              className={`rounded-sm border px-2.5 py-1 ${
                                severityStyles[alert.severity]
                              }`}
                            >
                              {getAlertSeverityLabel(alert.severity)}
                            </span>
                            <span
                              className={`rounded-sm border px-2.5 py-1 ${
                                statusStyles[statusLabel]
                              }`}
                            >
                              {statusLabel}
                            </span>
                          </div>
                          <h3 className="mt-4 [overflow-wrap:anywhere] text-2xl font-bold tracking-[-0.02em] text-ink">
                            {alert.title}
                          </h3>
                          <p className="mt-2 leading-7 text-muted">
                            <span className="font-bold text-ink">
                              Affected area:
                            </span>{" "}
                            {alert.affectedArea}
                          </p>

                          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                            <div>
                              <dt className="font-bold text-ink">Updated</dt>
                              <dd className="mt-1 text-muted">
                                <time dateTime={alert.updatedAt}>
                                  {formatAlertDateTime(alert.updatedAt)} PKT
                                </time>
                              </dd>
                            </div>
                            {alert.publishedAt ? (
                              <div>
                                <dt className="font-bold text-ink">Published</dt>
                                <dd className="mt-1 text-muted">
                                  <time dateTime={alert.publishedAt}>
                                    {formatAlertDateTime(alert.publishedAt)} PKT
                                  </time>
                                </dd>
                              </div>
                            ) : null}
                            {alert.expiresAt ? (
                              <div>
                                <dt className="font-bold text-ink">Expires</dt>
                                <dd className="mt-1 text-muted">
                                  <time dateTime={alert.expiresAt}>
                                    {formatAlertDateTime(alert.expiresAt)} PKT
                                  </time>
                                </dd>
                              </div>
                            ) : null}
                          </dl>
                        </div>

                        <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row lg:flex-col">
                          <Link
                            href={`/admin/alerts/${alert.id}/preview`}
                            className="inline-flex min-h-11 items-center justify-center rounded-sm border-2 border-civic bg-surface px-4 py-2 font-bold text-civic no-underline hover:bg-sage"
                          >
                            {previewLabel}
                          </Link>
                          {alert.status === "published" ? (
                            <form action={deactivateAction}>
                              <button
                                type="submit"
                                aria-label={`Deactivate alert: ${alert.title}`}
                                className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border-2 border-emergency bg-surface px-4 py-2 font-bold text-emergency hover:bg-page"
                              >
                                Deactivate alert
                              </button>
                            </form>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
