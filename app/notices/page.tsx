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
        <div className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <div className="max-w-3xl">
            <div className="mb-5 h-1 w-12 rounded-full bg-accent" aria-hidden="true" />
            <p className="text-xs font-bold tracking-[0.14em] text-civic uppercase sm:text-sm">
              Resident information
            </p>
            <h1
              id="notices-page-heading"
              className="mt-3 text-4xl leading-[1.12] font-bold tracking-tight text-ink sm:text-5xl"
            >
              Public notices
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
              Read community updates, consultations and public information in
              this Rawal One demonstration.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-page" aria-labelledby="published-notices-heading">
        <div className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <h2
              id="published-notices-heading"
              className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
            >
              Notices
            </h2>
            <p className="text-sm font-semibold text-civic sm:text-base">
              {publicNotices.length} notices
            </p>
          </div>

          <p className="mt-6 max-w-3xl border-s-2 border-accent bg-surface px-4 py-3 text-sm leading-6 text-muted">
            These are Tenth Tech R&amp;D examples. They have not been issued by a
            government authority.
          </p>

          <ol className="mt-7 divide-y divide-line border-y border-line bg-surface px-4 sm:px-6">
            {publicNotices.map((notice) => (
              <li key={notice.slug}>
                <article
                  id={notice.slug}
                  className="scroll-mt-6 py-6 sm:py-7"
                >
                  <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-sm [overflow-wrap:anywhere]">
                    <p className="font-bold text-civic">{notice.category}</p>
                    <p className="rounded-sm bg-sage px-2 py-0.5 text-xs font-bold tracking-[0.04em] text-civic">
                      <span className="sr-only">Status: </span>
                      {notice.status}
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

                  <h3 className="mt-3 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    {notice.title}
                  </h3>
                  <p className="mt-2 max-w-3xl leading-7 text-muted">
                    {notice.summary}
                  </p>

                  <details className="mt-2 max-w-3xl">
                    <summary className="min-h-12 cursor-pointer py-3 font-bold text-civic underline decoration-civic/35 underline-offset-4 marker:text-civic hover:decoration-civic">
                      Read notice details
                      <span className="sr-only"> for {notice.title}</span>
                    </summary>
                    <div className="border-s-2 border-accent bg-page px-4 py-2 sm:px-5">
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
