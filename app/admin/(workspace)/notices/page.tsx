import type { Metadata } from "next";
import Link from "next/link";

import {
  inactivateNoticeAction,
  publishNoticeAction,
} from "@/app/admin/notices/actions";
import { CmsDataError, readAdminNotices, type CmsStatus } from "@/lib/cms";
import type { NoticeRow } from "@/lib/supabase/database.types";

export const metadata: Metadata = {
  title: "Public notices administration",
  description: "Create, review and publish Rawal One public notices.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type NoticesPageProps = {
  searchParams: Promise<{ notice?: string | string[] }>;
};

const notifications = {
  "draft-saved": {
    heading: "Draft saved",
    message: "The notice is saved in the workspace and is not public.",
    tone: "success",
  },
  published: {
    heading: "Notice published",
    message: "The notice is now available to public content queries.",
    tone: "success",
  },
  inactivated: {
    heading: "Notice set to inactive",
    message: "The record remains in this workspace and is no longer public.",
    tone: "success",
  },
  "connection-required": {
    heading: "Connect Supabase to change notices",
    message: "Local fallback content is read-only in this workspace.",
    tone: "error",
  },
  "operation-failed": {
    heading: "The action could not be completed",
    message: "Review the notice and try again.",
    tone: "error",
  },
} as const;

const statusStyles: Record<CmsStatus, string> = {
  draft: "border-civic/30 bg-sage text-civic",
  published: "border-success/35 bg-white text-success",
  inactive: "border-muted/35 bg-white text-muted",
};

function statusLabel(status: CmsStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatDate(value: string | null) {
  if (!value) return "Not set";

  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}

export default async function NoticesAdminPage({
  searchParams,
}: NoticesPageProps) {
  const params = await searchParams;
  const noticeKey = Array.isArray(params.notice)
    ? params.notice[0]
    : params.notice;
  const notification =
    noticeKey && noticeKey in notifications
      ? notifications[noticeKey as keyof typeof notifications]
      : null;
  let records: NoticeRow[] = [];
  let mode: "supabase" | "local" | "unavailable" = "unavailable";
  let loadError = false;

  try {
    const result = await readAdminNotices();
    records = result.records;
    mode = result.mode;
  } catch (error) {
    loadError = error instanceof CmsDataError;
  }

  return (
    <div className="px-5 py-7 sm:px-8 sm:py-9 xl:px-10">
      <div className="mx-auto max-w-[78rem]">
        <header className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-civic uppercase">
              Content
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
              Public Notices
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              Draft, preview and publish resident-facing consultations and
              public information.
            </p>
          </div>
          <Link
            href="/admin/notices/new"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-sm bg-civic px-4 py-2.5 font-bold text-white no-underline hover:bg-civic-deep"
          >
            Create notice
          </Link>
        </header>

        {mode === "local" ? (
          <section
            aria-labelledby="local-content-heading"
            className="mt-6 border-s-4 border-information bg-surface px-5 py-4"
          >
            <h2 id="local-content-heading" className="font-bold text-ink">
              Local fallback content
            </h2>
            <p className="mt-1 max-w-4xl text-sm leading-6 text-muted">
              These published examples are available for local review. Connect
              Supabase before saving, publishing or inactivating notices.
            </p>
          </section>
        ) : null}

        {mode === "unavailable" || loadError ? (
          <section
            aria-labelledby="notice-storage-heading"
            className="mt-6 border-s-4 border-emergency bg-surface px-5 py-4"
          >
            <h2 id="notice-storage-heading" className="font-bold text-ink">
              Notice storage is unavailable
            </h2>
            <p className="mt-1 max-w-4xl text-sm leading-6 text-muted">
              Connect Supabase and confirm the CMS schema before managing public
              notices.
            </p>
          </section>
        ) : null}

        {notification ? (
          <section
            aria-labelledby="admin-notification-heading"
            className={`mt-6 border-s-4 bg-surface px-5 py-4 ${
              notification.tone === "error"
                ? "border-emergency"
                : "border-success"
            }`}
          >
            <h2 id="admin-notification-heading" className="font-bold text-ink">
              {notification.heading}
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              {notification.message}
            </p>
          </section>
        ) : null}

        <section aria-labelledby="notice-records-heading" className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-4">
            <h2
              id="notice-records-heading"
              className="text-2xl font-bold tracking-[-0.02em] text-ink"
            >
              Notice records
            </h2>
            <p className="text-sm font-semibold text-muted">
              {records.length} {records.length === 1 ? "record" : "records"}
            </p>
          </div>

          {records.length === 0 ? (
            <div className="border-b border-line py-10">
              <h3 className="text-xl font-bold text-ink">
                No notices available
              </h3>
              <p className="mt-2 max-w-2xl leading-7 text-muted">
                Create a notice to begin the draft, preview and publication
                workflow once Supabase is connected.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-line border-b border-line">
              {records.map((record) => {
                const publishAction = publishNoticeAction.bind(null, record.id);
                const inactivateAction = inactivateNoticeAction.bind(
                  null,
                  record.id,
                );

                return (
                  <li key={record.id} className="py-6">
                    <article className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start lg:gap-8">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex min-h-7 items-center border px-2.5 py-1 text-xs font-bold tracking-[0.05em] uppercase ${statusStyles[record.status]}`}
                          >
                            <span className="sr-only">Status: </span>
                            {statusLabel(record.status)}
                          </span>
                          <span className="text-sm font-semibold text-civic">
                            {record.category}
                          </span>
                        </div>
                        <h3 className="mt-3 [overflow-wrap:anywhere] text-xl font-bold leading-snug tracking-[-0.02em] text-ink sm:text-2xl">
                          {record.title}
                        </h3>
                        <p className="mt-2 max-w-3xl leading-7 text-muted">
                          {record.summary}
                        </p>
                        <dl className="mt-4 flex flex-wrap gap-x-7 gap-y-2 text-sm">
                          <div>
                            <dt className="inline text-muted">Published: </dt>
                            <dd className="inline font-semibold text-ink">
                              {formatDate(record.published_at)}
                            </dd>
                          </div>
                          {record.closing_at ? (
                            <div>
                              <dt className="inline text-muted">Closes: </dt>
                              <dd className="inline font-semibold text-ink">
                                {formatDate(record.closing_at)}
                              </dd>
                            </div>
                          ) : null}
                          <div>
                            <dt className="inline text-muted">Updated: </dt>
                            <dd className="inline font-semibold text-ink">
                              {formatDate(record.updated_at)}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
                        <Link
                          href={`/admin/notices/${record.id}/edit`}
                          className="inline-flex min-h-11 items-center justify-center rounded-sm border border-line bg-white px-4 py-2 font-bold text-civic no-underline hover:bg-sage"
                        >
                          Edit
                          <span className="sr-only"> {record.title}</span>
                        </Link>
                        <Link
                          href={`/admin/notices/${record.id}/preview`}
                          className="inline-flex min-h-11 items-center justify-center rounded-sm border border-line bg-white px-4 py-2 font-bold text-civic no-underline hover:bg-sage"
                        >
                          Preview
                          <span className="sr-only"> {record.title}</span>
                        </Link>
                        {record.status !== "published" ? (
                          <form action={publishAction}>
                            <button
                              type="submit"
                              className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-civic px-4 py-2 font-bold text-white hover:bg-civic-deep sm:w-auto"
                            >
                              Publish
                              <span className="sr-only"> {record.title}</span>
                            </button>
                          </form>
                        ) : (
                          <form action={inactivateAction}>
                            <button
                              type="submit"
                              className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border-2 border-emergency bg-white px-4 py-2 font-bold text-emergency hover:bg-page sm:w-auto"
                            >
                              Set inactive
                              <span className="sr-only"> {record.title}</span>
                            </button>
                          </form>
                        )}
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
