import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  inactivateCommunityEventAction,
  publishCommunityEventAction,
} from "@/app/admin/events/actions";
import { AdminRecordLoadError } from "@/components/admin-record-load-error";
import { CmsDataError, readAdminCommunityEvent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Community event preview",
  description: "Preview a saved community event before publication.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CommunityEventPreviewPageProps = {
  params: Promise<{ id: string }>;
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}

export default async function CommunityEventPreviewPage({
  params,
}: CommunityEventPreviewPageProps) {
  const { id } = await params;
  let record: Awaited<ReturnType<typeof readAdminCommunityEvent>>;

  try {
    record = await readAdminCommunityEvent(id);
  } catch (error) {
    if (!(error instanceof CmsDataError)) throw error;

    return (
      <AdminRecordLoadError
        heading="Community event preview is unavailable"
        message="The record could not be loaded. Confirm the Supabase configuration and CMS schema, then try again."
        returnHref="/admin/events"
        returnLabel="Return to Community Events"
      />
    );
  }

  if (!record) notFound();

  const publishAction = publishCommunityEventAction.bind(null, record.id);
  const inactivateAction = inactivateCommunityEventAction.bind(null, record.id);
  const contextLabel =
    record.status === "published"
      ? "Published preview"
      : record.status === "inactive"
        ? "Preview — inactive"
        : "Preview — not published";

  return (
    <div className="px-5 py-7 sm:px-8 sm:py-9 xl:px-10">
      <div className="mx-auto max-w-4xl">
        <header className="border-b border-line pb-6">
          <Link
            href="/admin/events"
            className="inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4"
          >
            <span aria-hidden="true">←</span>
            Community Events
          </Link>
          <p className="mt-5 text-xs font-bold tracking-[0.12em] text-civic uppercase">
            Preview
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            Review community event
          </h1>
        </header>

        <section aria-labelledby="event-preview-heading" className="mt-8">
          <div className="border border-line bg-sage px-5 py-5 sm:px-7">
            <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
              Preview context
            </p>
            <h2 id="event-preview-heading" className="mt-2 text-2xl font-bold text-ink">
              {contextLabel}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              This compact preview represents the content used in the public
              community section.
            </p>
          </div>

          <article className="mt-6 border-y border-line bg-surface px-5 py-7 sm:px-7">
            <p className="text-sm font-bold text-civic">
              <time dateTime={record.starts_at}>
                {formatDateTime(record.starts_at)} PKT
              </time>
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-ink">
              {record.title}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
              {record.summary}
            </p>
            {record.location || record.ends_at ? (
              <dl className="mt-6 grid gap-4 border-t border-line pt-5 text-sm sm:grid-cols-2">
                {record.location ? (
                  <div>
                    <dt className="font-bold text-ink">Location</dt>
                    <dd className="mt-1 text-muted [overflow-wrap:anywhere]">
                      {record.location}
                    </dd>
                  </div>
                ) : null}
                {record.ends_at ? (
                  <div>
                    <dt className="font-bold text-ink">Ends</dt>
                    <dd className="mt-1 text-muted">
                      <time dateTime={record.ends_at}>
                        {formatDateTime(record.ends_at)} PKT
                      </time>
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </article>
        </section>

        <section aria-labelledby="event-actions-heading" className="mt-8 border-t border-line pt-7">
          <h2 id="event-actions-heading" className="text-xl font-bold text-ink">
            Publishing actions
          </h2>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {record.status !== "published" ? (
              <form action={publishAction}>
                <button
                  type="submit"
                  className="min-h-12 w-full bg-civic px-5 py-3 font-bold text-white hover:bg-civic-deep sm:w-auto"
                >
                  Publish
                </button>
              </form>
            ) : (
              <form action={inactivateAction}>
                <button
                  type="submit"
                  className="min-h-12 w-full border-2 border-muted/60 bg-white px-5 py-3 font-bold text-ink hover:bg-sage sm:w-auto"
                >
                  Set inactive
                </button>
              </form>
            )}
            <Link
              href={`/admin/events/${record.id}/edit`}
              className="inline-flex min-h-12 items-center justify-center px-3 py-3 font-bold text-civic underline decoration-civic/35 underline-offset-4"
            >
              Edit community event
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
