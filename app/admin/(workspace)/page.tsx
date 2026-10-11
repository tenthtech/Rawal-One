import type { Metadata } from "next";
import Link from "next/link";

import { readAdminOverview } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Administration overview",
  description: "Rawal One municipal communications administration overview.",
};

const quickActions = [
  { href: "/admin/alerts/new", label: "Create alert" },
  { href: "/admin/notices/new", label: "Create public notice" },
  { href: "/admin/documents/new", label: "Add document" },
  { href: "/admin/updates/new", label: "Create City Update" },
  { href: "/admin/events/new", label: "Add community event" },
] as const;

const countLinks = [
  { key: "alerts", label: "Active alerts", href: "/admin/alerts" },
  { key: "notices", label: "Published notices", href: "/admin/notices" },
  { key: "documents", label: "Published documents", href: "/admin/documents" },
  { key: "updates", label: "Published City Updates", href: "/admin/updates" },
  { key: "events", label: "Published community events", href: "/admin/events" },
] as const;

const statusLabels = {
  draft: "Draft",
  published: "Published",
  inactive: "Inactive",
} as const;

function formatAdminDateTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}

export default async function AdminOverviewPage() {
  let overview: Awaited<ReturnType<typeof readAdminOverview>> | null = null;

  try {
    overview = await readAdminOverview();
  } catch {
    overview = null;
  }

  return (
    <div className="px-5 py-7 sm:px-8 sm:py-9 xl:px-10">
      <div className="mx-auto max-w-[78rem]">
        <header className="border-b border-line pb-6">
          <p className="text-xs font-bold tracking-[0.12em] text-civic uppercase">
            Administration
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            Overview
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Manage the information residents see across Rawal One.
          </p>
        </header>

        {!overview ? (
          <section
            aria-labelledby="overview-error-heading"
            className="mt-6 border-s-4 border-emergency bg-surface px-5 py-5"
          >
            <h2 id="overview-error-heading" className="font-bold text-ink">
              Content summary unavailable
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
              The administration could not load the current content summary.
              Try refreshing the page or check the Supabase configuration.
            </p>
          </section>
        ) : overview.mode !== "supabase" ? (
          <section
            aria-labelledby="overview-mode-heading"
            className="mt-6 border-s-4 border-information bg-surface px-5 py-5"
          >
            <h2 id="overview-mode-heading" className="font-bold text-ink">
              {overview.mode === "local"
                ? "Local development content"
                : "Supabase is not configured"}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
              {overview.mode === "local"
                ? "These counts reflect the repository datasets. Connect Supabase to manage records."
                : "Live counts and content management are unavailable until both public Supabase environment variables are configured."}
            </p>
          </section>
        ) : null}

        <section aria-labelledby="content-summary-heading" className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2
                id="content-summary-heading"
                className="text-xl font-bold tracking-[-0.02em] text-ink"
              >
                Published content
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted">
                Current records available to residents.
              </p>
            </div>
            {overview?.mode === "supabase" ? (
              <span className="border border-success/35 px-2.5 py-1 text-xs font-bold text-success">
                Live from Supabase
              </span>
            ) : null}
          </div>

          <dl className="mt-4 grid border-t border-s border-line sm:grid-cols-2 xl:grid-cols-5">
            {countLinks.map((item) => (
              <div
                key={item.key}
                className="border-e border-b border-line bg-surface px-4 py-4"
              >
                <dt className="text-sm leading-5 text-muted">{item.label}</dt>
                <dd className="mt-2 text-2xl font-bold tracking-[-0.03em] text-ink">
                  {overview ? overview.counts[item.key] : "—"}
                </dd>
                <Link
                  href={item.href}
                  className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-civic underline decoration-civic/35 underline-offset-4"
                >
                  View records
                  <span className="sr-only"> for {item.label}</span>
                </Link>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] xl:gap-12">
          <section aria-labelledby="quick-actions-heading">
            <h2
              id="quick-actions-heading"
              className="border-b border-line pb-3 text-xl font-bold tracking-[-0.02em] text-ink"
            >
              Quick actions
            </h2>
            <ul className="divide-y divide-line border-b border-line bg-surface">
              {quickActions.map((action) => (
                <li key={action.href}>
                  <Link
                    href={action.href}
                    className="flex min-h-12 items-center gap-3 px-4 py-2 font-semibold text-civic no-underline hover:bg-sage"
                  >
                    {action.label}
                    <span aria-hidden="true" className="ms-auto">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="recently-updated-heading">
            <h2
              id="recently-updated-heading"
              className="border-b border-line pb-3 text-xl font-bold tracking-[-0.02em] text-ink"
            >
              Recently updated
            </h2>
            {overview && overview.recent.length > 0 ? (
              <ul className="divide-y divide-line border-b border-line bg-surface">
                {overview.recent.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="grid min-h-16 gap-2 px-4 py-4 text-ink no-underline hover:bg-sage sm:grid-cols-[8.5rem_minmax(0,1fr)_7rem_10rem] sm:items-center sm:gap-4"
                    >
                      <span className="text-xs font-bold tracking-[0.06em] text-civic uppercase">
                        {item.type}
                      </span>
                      <span className="min-w-0 font-semibold [overflow-wrap:anywhere]">
                        {item.title}
                      </span>
                      <span className="w-fit border border-line px-2 py-1 text-xs font-bold text-muted">
                        {statusLabels[item.status]}
                      </span>
                      <time
                        dateTime={item.updatedAt}
                        className="text-xs text-muted sm:text-end"
                      >
                        {formatAdminDateTime(item.updatedAt)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border-b border-line bg-surface px-4 py-7">
                <p className="font-semibold text-ink">No recent records</p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Recently updated content will appear here.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
