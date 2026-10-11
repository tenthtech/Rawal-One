import type { Metadata } from "next";
import Link from "next/link";

import { PublicPageIntro } from "@/components/public-page-intro";
import { readPublishedNotices } from "@/lib/cms";
import {
  formatPublicDate,
  getNoticePublicStatus,
  getPublicContentAnchor,
  getSeededNoticePresentation,
} from "@/lib/public-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Public notices",
  description:
    "Read demonstration consultations, notices and public information published through Rawal One.",
};

function getNoticeParagraphs(body: string) {
  return body
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default async function NoticesPage() {
  const notices = await readPublishedNotices();
  const now = new Date();

  return (
    <>
      <PublicPageIntro
        id="notices-page-heading"
        eyebrow="Resident information"
        title="Public notices"
        description="Read community updates, consultations and public information in this Rawal One demonstration."
      >
        <aside className="border-s-2 border-accent py-1 ps-4">
          <p className="civic-eyebrow">About this demonstration</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            These are Tenth Tech R&amp;D examples. They have not been issued by
            a government authority.
          </p>
        </aside>
      </PublicPageIntro>

      <section className="bg-page" aria-labelledby="published-notices-heading">
        <div className="civic-container py-7 sm:py-9 lg:py-10">
          <div className="flex flex-col gap-2 border-b-2 border-ink pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <p className="civic-eyebrow">Published information</p>
              <h2
                id="published-notices-heading"
                className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-ink"
              >
                Notices
              </h2>
            </div>
            <p className="text-sm font-semibold text-civic">
              {notices.length} {notices.length === 1 ? "notice" : "notices"}
            </p>
          </div>

          {notices.length === 0 ? (
            <div className="mt-6 border-s-[3px] border-accent bg-surface px-5 py-8 sm:px-7">
              <p className="max-w-xl text-lg leading-8 text-muted">
                There are no published notices at this time.
              </p>
            </div>
          ) : (
            <ol className="divide-y divide-line border-b border-b-line">
              {notices.map((notice) => {
                const anchor = getPublicContentAnchor(
                  notice.title,
                  "notice",
                  notice.id,
                );
                const paragraphs = getNoticeParagraphs(notice.body);
                const presentation = getSeededNoticePresentation(
                  notice.id,
                  notice.title,
                );
                const noticeStatus = getNoticePublicStatus(
                  notice.closing_at,
                  now,
                );

                return (
                  <li key={notice.id}>
                    <article
                      id={anchor}
                      className="grid scroll-mt-6 gap-y-3 py-6 lg:grid-cols-[11.5rem_minmax(0,1fr)] lg:gap-x-10"
                    >
                      <h3 className="text-lg font-semibold leading-snug tracking-[-0.025em] text-ink sm:text-xl lg:col-start-2">
                        {notice.title}
                      </h3>

                      <div className="min-w-0 text-xs lg:col-start-1 lg:row-start-1 lg:row-span-2">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 lg:block">
                          <p className="font-semibold tracking-[0.06em] text-civic uppercase">
                            {notice.category}
                          </p>
                          <p className="inline-flex items-center gap-2 border border-line bg-sage px-2.5 py-1 font-semibold text-civic lg:mt-2">
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-civic"
                            />
                            <span className="sr-only">Status: </span>
                            {noticeStatus === "Open" &&
                            presentation?.openStatusLabel
                              ? presentation.openStatusLabel
                              : noticeStatus}
                          </p>
                        </div>
                        <dl className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2 text-xs text-muted lg:grid-cols-1">
                          {notice.published_at ? (
                            <div>
                              <dt className="font-medium">Published</dt>
                              <dd className="mt-0.5 font-semibold text-ink">
                                <time dateTime={notice.published_at}>
                                  {formatPublicDate(notice.published_at)}
                                </time>
                              </dd>
                            </div>
                          ) : null}
                          {notice.closing_at ? (
                            <div>
                              <dt className="font-medium">Closes</dt>
                              <dd className="mt-0.5 font-semibold text-ink">
                                <time dateTime={notice.closing_at}>
                                  {formatPublicDate(notice.closing_at)}
                                </time>
                              </dd>
                            </div>
                          ) : null}
                        </dl>
                      </div>

                      <div className="min-w-0 lg:col-start-2">
                        <p className="max-w-3xl text-sm leading-6 text-muted">
                          {notice.summary}
                        </p>

                        <details className="mt-3 max-w-3xl border-t border-line open:bg-sage/40">
                          <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold text-civic underline decoration-civic/35 underline-offset-4 marker:text-civic hover:decoration-civic">
                            Read notice details
                            <span className="sr-only"> for {notice.title}</span>
                          </summary>
                          <div className="border-s-[3px] border-accent bg-surface px-5 py-4 sm:px-6">
                            {paragraphs.map((paragraph, index) => (
                              <p
                                key={`${notice.id}-detail-${index}`}
                                className="mt-2 leading-7 text-muted first:mt-0"
                              >
                                {paragraph}
                              </p>
                            ))}
                            {presentation?.relatedLink ? (
                              <Link
                                href={presentation.relatedLink.href}
                                className="civic-link mt-4 inline-flex min-h-11 items-center font-semibold"
                              >
                                {presentation.relatedLink.label}
                              </Link>
                            ) : null}
                          </div>
                        </details>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}
