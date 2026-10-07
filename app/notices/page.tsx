import type { Metadata } from "next";
import Link from "next/link";

import { publicNotices } from "@/data/notices";

export const metadata: Metadata = {
  title: "Public notices",
  description:
    "Read demonstration consultations, notices and public information published through Rawal One.",
};

export default function NoticesPage() {
  return (
    <>
      <section
        className="border-b border-line bg-sage"
        aria-labelledby="notices-page-heading"
      >
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="max-w-3xl border-s-4 border-accent ps-5 sm:ps-7">
            <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
              Resident information
            </p>
            <h1
              id="notices-page-heading"
              className="mt-3 text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl"
            >
              Public notices
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Official-style demonstration notices, consultations and public
              information published through Rawal One.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-page" aria-labelledby="published-notices-heading">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <h2
              id="published-notices-heading"
              className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl"
            >
              Notices
            </h2>
            <p className="font-bold text-civic">{publicNotices.length} notices</p>
          </div>

          <ol className="mt-8 border-t border-line">
            {publicNotices.map((notice) => (
              <li key={notice.slug} className="border-b border-line">
                <article
                  id={notice.slug}
                  className="scroll-mt-6 px-1 py-7 sm:px-3 sm:py-8"
                >
                  <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-sm [overflow-wrap:anywhere]">
                    <p className="font-bold text-civic">{notice.category}</p>
                    <span className="text-line" aria-hidden="true">
                      |
                    </span>
                    <p className="text-muted">
                      Status: <span className="font-bold text-ink">{notice.status}</span>
                    </p>
                    <span className="text-line" aria-hidden="true">
                      |
                    </span>
                    <p className="text-muted">
                      Published{" "}
                      <time dateTime={notice.publishedDateTime}>
                        {notice.publishedDate}
                      </time>
                    </p>
                    {notice.closingDate && notice.closingDateTime ? (
                      <>
                        <span className="text-line" aria-hidden="true">
                          |
                        </span>
                        <p className="text-muted">
                          Closes{" "}
                          <time dateTime={notice.closingDateTime}>
                            {notice.closingDate}
                          </time>
                        </p>
                      </>
                    ) : null}
                  </div>

                  <h3 className="mt-3 text-xl font-bold tracking-[-0.015em] text-ink sm:text-2xl">
                    {notice.title}
                  </h3>
                  <p className="mt-2 max-w-3xl leading-7 text-muted">
                    {notice.summary}
                  </p>

                  <details className="mt-2 max-w-3xl">
                    <summary className="min-h-14 cursor-pointer py-4 font-bold text-civic underline decoration-civic/35 underline-offset-4 marker:text-civic hover:decoration-civic">
                      Read notice details
                      <span className="sr-only"> for {notice.title}</span>
                    </summary>
                    <div className="border-s-4 border-sage pb-2 ps-4 sm:ps-5">
                      {notice.detail.map((paragraph, index) => (
                        <p
                          key={`${notice.slug}-detail-${index}`}
                          className="mt-3 leading-7 text-muted"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {notice.relatedLink ? (
                        <Link
                          href={notice.relatedLink.href}
                          className="mt-4 inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
                        >
                          {notice.relatedLink.label}
                        </Link>
                      ) : null}
                    </div>
                  </details>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
