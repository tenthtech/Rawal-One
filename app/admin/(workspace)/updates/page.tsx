import type { Metadata } from "next";
import Link from "next/link";

import {
  inactivateCityUpdateAction,
  publishCityUpdateAction,
} from "@/app/admin/updates/actions";
import { readAdminCityUpdates, type CmsSourceMode } from "@/lib/cms";
import type { CmsStatus } from "@/lib/supabase/database.types";

export const metadata: Metadata = {
  title: "City Updates administration",
  description: "Manage City Updates for Rawal One residents.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type UpdatesPageProps = {
  searchParams: Promise<{ notice?: string | string[] }>;
};

const notices = {
  published: {
    heading: "City Update published",
    message: "The update is now eligible to appear on public pages and in search.",
    tone: "success",
  },
  inactive: {
    heading: "City Update set to inactive",
    message: "The record remains available here and is no longer public.",
    tone: "success",
  },
  "connect-supabase": {
    heading: "Connect Supabase to manage City Updates",
    message: "Local development content is read-only in this workspace.",
    tone: "error",
  },
  "operation-failed": {
    heading: "The action could not be completed",
    message: "Try again or check the Supabase configuration.",
    tone: "error",
  },
} as const;

const statusLabels: Record<CmsStatus, string> = {
  draft: "Draft",
  published: "Published",
  inactive: "Inactive",
};

const statusStyles: Record<CmsStatus, string> = {
  draft: "border-civic/30 text-civic",
  published: "border-success/35 text-success",
  inactive: "border-muted/35 text-muted",
};

function formatDateTime(value: string | null) {
  if (!value) return "Not published";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}

function SourceNotice({ mode }: { mode: CmsSourceMode }) {
  if (mode === "supabase") return null;

  return (
    <section
      aria-labelledby="updates-source-heading"
      className="mt-6 border-s-4 border-information bg-surface px-5 py-4"
    >
      <h2 id="updates-source-heading" className="font-bold text-ink">
        {mode === "local" ? "Local development content" : "Supabase is not configured"}
      </h2>
      <p className="mt-1 max-w-3xl text-sm leading-6 text-muted">
        {mode === "local"
          ? "These repository records are available for review only. Connect Supabase before creating or changing City Updates."
          : "Connect Supabase before loading or managing City Updates."}
      </p>
    </section>
  );
}

export default async function CityUpdatesPage({ searchParams }: UpdatesPageProps) {
  const params = await searchParams;
  const noticeKey = Array.isArray(params.notice) ? params.notice[0] : params.notice;
  const notice =
    noticeKey && noticeKey in notices
      ? notices[noticeKey as keyof typeof notices]
      : null;

  let result: Awaited<ReturnType<typeof readAdminCityUpdates>> | null = null;
  try {
    result = await readAdminCityUpdates();
  } catch {
    result = null;
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
              City Updates
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              Manage short service and community updates shown to residents.
            </p>
          </div>
          <Link
            href="/admin/updates/new"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-sm bg-civic px-4 py-2.5 font-bold text-white no-underline hover:bg-civic-deep"
          >
            Create City Update
          </Link>
        </header>

        {notice ? (
          <section
            aria-labelledby="updates-notice-heading"
            className={`mt-6 border-s-4 bg-surface px-5 py-4 ${
              notice.tone === "error" ? "border-emergency" : "border-success"
            }`}
          >
            <h2 id="updates-notice-heading" className="font-bold text-ink">
              {notice.heading}
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted">{notice.message}</p>
          </section>
        ) : null}

        {result ? <SourceNotice mode={result.mode} /> : null}

        <section aria-labelledby="city-update-records-heading" className="mt-8">
          <h2 id="city-update-records-heading" className="sr-only">
            City Update records
          </h2>

          {!result ? (
            <div className="border-s-4 border-emergency bg-surface px-5 py-5">
              <h3 className="font-bold text-ink">City Updates unavailable</h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                The workspace could not load City Updates. Try again or check the
                Supabase configuration.
              </p>
            </div>
          ) : result.records.length === 0 ? (
            <div className="border-b border-line py-10">
              <h3 className="text-xl font-bold text-ink">No City Updates yet</h3>
              <p className="mt-2 max-w-2xl leading-7 text-muted">
                Create a draft to begin the publishing workflow.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {result.records.map((record) => {
                const publishAction = publishCityUpdateAction.bind(null, record.id);
                const inactivateAction = inactivateCityUpdateAction.bind(
                  null,
                  record.id,
                );

                return (
                  <li key={record.id} className="py-6">
                    <article className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-8">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                          <span className="border border-line px-2.5 py-1 text-muted">
                            {record.category}
                          </span>
                          <span
                            className={`border px-2.5 py-1 ${statusStyles[record.status]}`}
                          >
                            {statusLabels[record.status]}
                          </span>
                        </div>
                        <h3 className="mt-3 [overflow-wrap:anywhere] text-xl font-bold text-ink">
                          {record.title}
                        </h3>
                        <p className="mt-2 max-w-3xl leading-7 text-muted">
                          {record.summary}
                        </p>
                        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                          <div>
                            <dt className="font-bold text-ink">Published</dt>
                            <dd className="mt-1 text-muted">
                              {formatDateTime(record.published_at)}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-bold text-ink">Updated</dt>
                            <dd className="mt-1 text-muted">
                              {formatDateTime(record.updated_at)}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-wrap gap-2 lg:max-w-72 lg:justify-end">
                        <Link
                          href={`/admin/updates/${record.id}/edit`}
                          className="inline-flex min-h-11 items-center justify-center border border-civic px-3 py-2 text-sm font-bold text-civic no-underline hover:bg-sage"
                        >
                          Edit
                          <span className="sr-only"> {record.title}</span>
                        </Link>
                        <Link
                          href={`/admin/updates/${record.id}/preview`}
                          className="inline-flex min-h-11 items-center justify-center border border-line px-3 py-2 text-sm font-bold text-civic no-underline hover:bg-sage"
                        >
                          Preview
                          <span className="sr-only"> {record.title}</span>
                        </Link>
                        {record.status === "published" ? (
                          <form action={inactivateAction}>
                            <button
                              type="submit"
                              className="min-h-11 border border-muted/50 px-3 py-2 text-sm font-bold text-ink hover:bg-sage"
                            >
                              Set inactive
                              <span className="sr-only"> {record.title}</span>
                            </button>
                          </form>
                        ) : (
                          <form action={publishAction}>
                            <button
                              type="submit"
                              className="min-h-11 bg-civic px-3 py-2 text-sm font-bold text-white hover:bg-civic-deep"
                            >
                              Publish
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
