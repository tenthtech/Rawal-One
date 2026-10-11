import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  inactivateNoticeAction,
  publishNoticeAction,
} from "@/app/admin/notices/actions";
import { CmsDataError, readAdminNotices } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Public notice preview",
  description: "Review a Rawal One public notice before publication.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type NoticePreviewPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ notice?: string | string[] }>;
};

function formatDate(value: string | null) {
  if (!value) return "Not set";

  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "long",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}

function statusLabel(status: "draft" | "published" | "inactive") {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default async function NoticePreviewPage({
  params,
  searchParams,
}: NoticePreviewPageProps) {
  const { id } = await params;
  const query = await searchParams;
  const queryNotice = Array.isArray(query.notice)
    ? query.notice[0]
    : query.notice;
  let result;

  try {
    result = await readAdminNotices();
  } catch (error) {
    if (!(error instanceof CmsDataError)) throw error;

    return (
      <div className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl border-s-4 border-emergency bg-surface px-5 py-5">
          <h1 className="text-2xl font-bold text-ink">
            Notice storage is unavailable
          </h1>
          <p className="mt-2 leading-7 text-muted">
            The notice could not be loaded. Confirm the Supabase configuration
            and CMS schema, then try again.
          </p>
          <Link
            href="/admin/notices"
            className="mt-4 inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4"
          >
            Return to Public Notices
          </Link>
        </div>
      </div>
    );
  }

  if (result.mode === "unavailable") {
    return (
      <div className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl border-s-4 border-emergency bg-surface px-5 py-5">
          <h1 className="text-2xl font-bold text-ink">
            Connect Supabase to preview notices
          </h1>
          <p className="mt-2 leading-7 text-muted">
            Notice storage is not configured in this environment.
          </p>
          <Link
            href="/admin/notices"
            className="mt-4 inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4"
          >
            Return to Public Notices
          </Link>
        </div>
      </div>
    );
  }

  const notice = result.records.find((record) => record.id === id);
  if (!notice) notFound();

  const isPublished = notice.status === "published";
  const contextLabel = isPublished
    ? "Published notice preview"
    : "Preview — not published";
  const publishAction = publishNoticeAction.bind(null, notice.id);
  const inactivateAction = inactivateNoticeAction.bind(null, notice.id);
  const paragraphs = notice.body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="bg-page">
      <header className="border-b border-line bg-sage">
        <div className="mx-auto max-w-[76rem] px-5 py-9 sm:px-8 sm:py-12 lg:px-10">
          <Link
            href="/admin/notices"
            className="inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
          >
            <span aria-hidden="true">←</span>
            Public Notices
          </Link>
          <p className="mt-5 text-sm font-bold tracking-[0.08em] text-civic uppercase">
            Rawal One administration
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            Review public notice
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
            Check the resident-facing content and publication state before
            taking action.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[76rem] px-5 py-9 sm:px-8 sm:py-12 lg:px-10">
        {queryNotice === "draft-saved" ? (
          <div className="mb-7 border-s-4 border-success bg-surface px-5 py-4">
            <p className="font-bold text-ink">Draft saved</p>
            <p className="mt-1 leading-7 text-muted">
              Review the preview below. The notice is not public until you
              publish it.
            </p>
          </div>
        ) : queryNotice === "published" ? (
          <div className="mb-7 border-s-4 border-success bg-surface px-5 py-4">
            <p className="font-bold text-ink">Notice published</p>
            <p className="mt-1 leading-7 text-muted">
              This notice is now available to public content queries.
            </p>
          </div>
        ) : null}

        {result.mode === "local" ? (
          <div className="mb-7 border-s-4 border-information bg-surface px-5 py-4">
            <p className="font-bold text-ink">Local fallback preview</p>
            <p className="mt-1 leading-7 text-muted">
              This record is read-only until Supabase is connected.
            </p>
          </div>
        ) : null}

        <section aria-labelledby="preview-context-heading">
          <div className="border border-line bg-sage px-5 py-5 sm:px-7">
            <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
              Preview context
            </p>
            <h2
              id="preview-context-heading"
              className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink"
            >
              {contextLabel}
            </h2>
            <p className="mt-2 max-w-3xl leading-7 text-muted">
              This mirrors the visual structure residents use on the public
              notices page. Current admin status: {statusLabel(notice.status)}.
            </p>
          </div>

          <article className="mt-6 border-y border-line bg-white py-7 sm:py-9">
            <div className="grid gap-6 px-5 sm:px-7 lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:gap-12">
              <div className="min-w-0 text-sm">
                <p className="font-semibold tracking-[0.08em] text-civic uppercase">
                  {notice.category}
                </p>
                <p className="mt-2 inline-flex items-center gap-2 border border-line bg-sage px-2.5 py-1 font-semibold text-civic">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-civic"
                  />
                  <span className="sr-only">Status: </span>
                  {statusLabel(notice.status)}
                </p>
                <dl className="mt-4 grid gap-x-5 gap-y-3 text-sm text-muted sm:grid-cols-2 lg:grid-cols-1">
                  <div>
                    <dt className="font-medium">Published</dt>
                    <dd className="mt-0.5 font-semibold text-ink">
                      {formatDate(notice.published_at)}
                    </dd>
                  </div>
                  {notice.closing_at ? (
                    <div>
                      <dt className="font-medium">Closes</dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {formatDate(notice.closing_at)}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>

              <div className="min-w-0">
                <h2 className="text-2xl font-semibold leading-snug tracking-[-0.025em] text-ink sm:text-3xl">
                  {notice.title}
                </h2>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-muted">
                  {notice.summary}
                </p>
                <div className="mt-6 max-w-3xl border-s-[3px] border-accent bg-surface px-5 py-5 sm:px-6">
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={`${notice.id}-paragraph-${index}`}
                      className="mt-3 whitespace-pre-line leading-7 text-muted first:mt-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>

        <section
          aria-labelledby="publishing-actions-heading"
          className="mt-8 border-t border-line pt-7"
        >
          <h2
            id="publishing-actions-heading"
            className="text-2xl font-bold tracking-[-0.02em] text-ink"
          >
            Publishing actions
          </h2>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {!isPublished ? (
              <form action={publishAction}>
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-civic px-5 py-3 font-bold text-white hover:bg-civic-deep sm:w-auto"
                >
                  Publish notice
                </button>
              </form>
            ) : (
              <form action={inactivateAction}>
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-sm border-2 border-emergency bg-surface px-5 py-3 font-bold text-emergency hover:bg-page sm:w-auto"
                >
                  Set notice inactive
                </button>
              </form>
            )}
            <Link
              href={`/admin/notices/${notice.id}/edit`}
              className="inline-flex min-h-12 items-center justify-center rounded-sm border-2 border-civic bg-surface px-5 py-3 font-bold text-civic no-underline hover:bg-sage"
            >
              Edit notice
            </Link>
            <Link
              href="/admin/notices"
              className="inline-flex min-h-12 items-center justify-center px-2 py-3 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
            >
              Return to Public Notices
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
