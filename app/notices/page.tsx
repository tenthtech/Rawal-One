import type { Metadata } from "next";
import Link from "next/link";

import { PublicPageIntro } from "@/components/public-page-intro";
import { publicNotices } from "@/data/notices";

export const metadata: Metadata = {
  title: "Public notices",
  description:
    "Read demonstration consultations, notices and public information published through Rawal One.",
};

export default function NoticesPage() {
  return (
    <>
      <PublicPageIntro
        id="notices-page-heading"
        eyebrow="Resident information"
        title="Public notices"
        description="Read community updates, consultations and public information in this Rawal One demonstration."
      >
        <aside className="border-s-[3px] border-accent bg-surface px-5 py-5 sm:px-6">
          <p className="civic-eyebrow">About this demonstration</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted">
            These are Tenth Tech R&amp;D examples. They have not been issued by a
            government authority.
          </p>
        </aside>
      </PublicPageIntro>

      <section className="bg-page" aria-labelledby="published-notices-heading">
        <div className="civic-container py-10 sm:py-12 lg:py-16">
          <div className="flex flex-col gap-3 border-b-2 border-ink pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <p className="civic-eyebrow">Published information</p>
              <h2
                id="published-notices-heading"
                className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl"
              >
                Notices
              </h2>
            </div>
            <p className="text-sm font-semibold text-civic">
              {publicNotices.length} notices
            </p>
          </div>

          <ol className="divide-y divide-line border-b border-b-line">
            {publicNotices.map((notice) => (
              <li key={notice.slug}>
                <article
                  id={notice.slug}
                  className="grid scroll-mt-6 gap-5 py-7 sm:py-8 lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:gap-12"
                >
                  <div className="min-w-0 text-sm">
                    <p className="font-semibold tracking-[0.08em] text-civic uppercase">
                      {notice.category}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-2 border border-line bg-sage px-2.5 py-1 font-semibold text-civic">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-civic" />
                      <span className="sr-only">Status: </span>
                      {notice.status}
                    </p>
                    <dl className="mt-4 grid gap-x-5 gap-y-2 text-sm text-muted sm:grid-cols-2 lg:grid-cols-1">
                      <div>
                        <dt className="font-medium">Published</dt>
                        <dd className="mt-0.5 font-semibold text-ink">
                          <time dateTime={notice.publishedDateTime}>
                            {notice.publishedDate}
                          </time>
                        </dd>
                      </div>
                      {notice.closingDate && notice.closingDateTime ? (
                        <div>
                          <dt className="font-medium">Closes</dt>
                          <dd className="mt-0.5 font-semibold text-ink">
                          <time dateTime={notice.closingDateTime}>
                            {notice.closingDate}
                          </time>
                          </dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold leading-snug tracking-[-0.025em] text-ink sm:text-2xl">
                      {notice.title}
                    </h3>
                    <p className="mt-3 max-w-3xl leading-7 text-muted">
                      {notice.summary}
                    </p>

                    <details className="mt-5 max-w-3xl border-t border-line">
                      <summary className="min-h-12 cursor-pointer py-3 font-semibold text-civic underline decoration-civic/35 underline-offset-4 marker:text-civic hover:decoration-civic">
                        Read notice details
                        <span className="sr-only"> for {notice.title}</span>
                      </summary>
                      <div className="border-s-[3px] border-accent bg-surface px-5 py-4 sm:px-6">
                        {notice.detail.map((paragraph, index) => (
                          <p
                            key={`${notice.slug}-detail-${index}`}
                            className="mt-2 leading-7 text-muted first:mt-0"
                          >
                            {paragraph}
                          </p>
                        ))}
                        {notice.relatedLink ? (
                          <Link
                            href={notice.relatedLink.href}
                            className="civic-link mt-4 inline-flex min-h-11 items-center font-semibold"
                          >
                            {notice.relatedLink.label}
                          </Link>
                        ) : null}
                      </div>
                    </details>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
