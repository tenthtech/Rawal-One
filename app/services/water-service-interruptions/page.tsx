import type { Metadata } from "next";
import Link from "next/link";

import { waterServiceDetail } from "@/data/water-service";

export const metadata: Metadata = {
  title: "Water service interruptions",
  description:
    "Check planned water maintenance, current service advisories and practical interruption guidance in the Rawal One demonstration.",
};

export default function WaterServiceInterruptionsPage() {
  const service = waterServiceDetail;

  return (
    <>
      <div className="border-b border-line bg-page">
        <div className="mx-auto max-w-[76rem] px-5 py-5 sm:px-8 lg:px-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-6">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/30 underline-offset-4 hover:decoration-civic"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted">
                →
              </li>
              <li>
                <Link
                  href="/services"
                  className="inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/30 underline-offset-4 hover:decoration-civic"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted">
                →
              </li>
              <li
                aria-current="page"
                className="min-w-0 [overflow-wrap:anywhere] font-bold text-ink"
              >
                {service.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <article>
        <header className="border-b border-line bg-sage">
          <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
            <div className="max-w-4xl border-s-4 border-accent ps-5 sm:ps-7">
              <Link
                href={service.categoryHref}
                className="inline-flex min-h-11 items-center text-sm font-bold tracking-[0.08em] text-civic uppercase underline decoration-civic/30 underline-offset-4 hover:decoration-civic"
              >
                {service.category}
              </Link>
              <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                {service.summary}
              </p>
            </div>
          </div>
        </header>

        <div className="bg-page">
          <div className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
            <section
              aria-labelledby="current-status-heading"
              className="border-s-4 border-advisory bg-surface px-5 py-7 sm:px-8 sm:py-8"
            >
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(30rem,1.1fr)] lg:items-start lg:gap-12">
                <div>
                  <p className="text-sm font-bold tracking-[0.08em] text-advisory uppercase">
                    {service.status.type}
                  </p>
                  <h2
                    id="current-status-heading"
                    className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl"
                  >
                    {service.status.heading}
                  </h2>
                  <p className="mt-5 text-xl font-bold text-ink">
                    {service.status.label}
                  </p>
                  <p className="mt-2 max-w-2xl leading-7 text-muted">
                    {service.status.description}
                  </p>
                </div>

                <dl className="grid gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-2 lg:border-t-0 lg:border-s lg:pt-0 lg:ps-8">
                  <div>
                    <dt className="font-bold text-ink">Affected area</dt>
                    <dd className="mt-1 leading-7 text-muted">
                      {service.status.affectedArea}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-ink">Maintenance window</dt>
                    <dd className="mt-1 leading-7 text-muted">
                      <time dateTime={service.status.maintenanceStart.dateTime}>
                        {service.status.maintenanceStart.label}
                      </time>
                      –
                      <time dateTime={service.status.maintenanceEnd.dateTime}>
                        {service.status.maintenanceEnd.label}
                      </time>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-ink">Expected impact</dt>
                    <dd className="mt-1 leading-7 text-muted">
                      {service.status.impact}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-ink">Last updated</dt>
                    <dd className="mt-1 leading-7 text-muted">
                      <time dateTime={service.status.lastUpdated.dateTime}>
                        {service.status.lastUpdated.label}
                      </time>
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <div className="mt-12 grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
              <div className="min-w-0">
                <section aria-labelledby="resident-actions-heading">
                  <h2
                    id="resident-actions-heading"
                    className="text-3xl font-bold tracking-[-0.025em] text-ink"
                  >
                    What you should do
                  </h2>
                  <ol className="mt-7 border-y border-line divide-y divide-line">
                    {service.immediateActions.map((action, index) => (
                      <li
                        key={action}
                        className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 py-5 sm:grid-cols-[2.75rem_minmax(0,1fr)] sm:gap-4"
                      >
                        <span
                          aria-hidden="true"
                          className="font-bold text-advisory"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="leading-7 text-ink">{action}</p>
                      </li>
                    ))}
                  </ol>
                </section>

                <section
                  aria-labelledby="help-pathways-heading"
                  className="mt-12 border-t border-line pt-10"
                >
                  <h2
                    id="help-pathways-heading"
                    className="text-3xl font-bold tracking-[-0.025em] text-ink"
                  >
                    Service help pathways
                  </h2>
                  <ul className="mt-7 border-t border-line divide-y divide-line">
                    {service.helpPathways.map((pathway) => (
                      <li key={pathway.title}>
                        <article className="grid gap-4 py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-8">
                          <div>
                            <h3 className="text-xl font-bold tracking-[-0.015em] text-ink">
                              {pathway.title}
                            </h3>
                            <p className="mt-2 max-w-2xl leading-7 text-muted">
                              {pathway.description}
                            </p>
                          </div>
                          <Link
                            href={pathway.href}
                            className="inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
                          >
                            {pathway.linkLabel}
                            <span aria-hidden="true">→</span>
                          </Link>
                        </article>
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  aria-labelledby="interruption-types-heading"
                  className="mt-12 border-t border-line pt-10"
                >
                  <h2
                    id="interruption-types-heading"
                    className="text-3xl font-bold tracking-[-0.025em] text-ink"
                  >
                    Planned vs unexpected interruptions
                  </h2>
                  <div className="mt-7 grid gap-8 sm:grid-cols-2 sm:gap-10">
                    {service.interruptionTypes.map((type) => (
                      <section
                        key={type.title}
                        aria-labelledby={`interruption-${type.title.toLowerCase().replaceAll(" ", "-")}`}
                        className="border-t-2 border-civic pt-5"
                      >
                        <h3
                          id={`interruption-${type.title.toLowerCase().replaceAll(" ", "-")}`}
                          className="text-xl font-bold text-ink"
                        >
                          {type.title}
                        </h3>
                        <p className="mt-3 leading-7 text-muted">
                          {type.description}
                        </p>
                      </section>
                    ))}
                  </div>
                </section>

                <section
                  aria-labelledby="interruption-guidance-heading"
                  className="mt-12 border-t border-line pt-10"
                >
                  <h2
                    id="interruption-guidance-heading"
                    className="text-3xl font-bold tracking-[-0.025em] text-ink"
                  >
                    Before, during and after an interruption
                  </h2>
                  <div className="mt-7 grid gap-8 md:grid-cols-3 md:gap-7">
                    {service.guidanceStages.map((stage) => (
                      <section
                        key={stage.title}
                        aria-labelledby={`guidance-${stage.title.toLowerCase()}`}
                        className="border-t-2 border-civic pt-5"
                      >
                        <h3
                          id={`guidance-${stage.title.toLowerCase()}`}
                          className="text-xl font-bold text-ink"
                        >
                          {stage.title}
                        </h3>
                        <ul className="mt-4 list-disc space-y-3 ps-5 marker:text-advisory">
                          {stage.items.map((item) => (
                            <li key={item} className="leading-7 text-muted">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </section>

                <section
                  aria-labelledby="faq-heading"
                  className="mt-12 border-t border-line pt-10"
                >
                  <h2
                    id="faq-heading"
                    className="text-3xl font-bold tracking-[-0.025em] text-ink"
                  >
                    Frequently asked questions
                  </h2>
                  <div className="mt-7 border-t border-line">
                    {service.faqs.map((faq) => (
                      <details key={faq.question} className="border-b border-line">
                        <summary className="min-h-14 cursor-pointer py-4 text-lg font-bold leading-7 text-ink marker:text-civic">
                          {faq.question}
                        </summary>
                        <p className="max-w-3xl pb-5 pe-4 leading-7 text-muted">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="min-w-0" aria-label="Service support and related services">
                <section
                  id="service-support"
                  aria-labelledby="service-support-heading"
                  className="scroll-mt-6 border-t-4 border-accent bg-sage p-6"
                >
                  <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
                    Service support
                  </p>
                  <h2
                    id="service-support-heading"
                    className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink"
                  >
                    {service.support.title}
                  </h2>
                  <dl className="mt-5 space-y-4 text-sm">
                    <div>
                      <dt className="font-bold text-ink">Service area</dt>
                      <dd className="mt-1 leading-6 text-muted">
                        {service.support.serviceArea}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-bold text-ink">Hours</dt>
                      <dd className="mt-1 leading-6 text-muted">
                        {service.support.hours}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href={service.support.href}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
                  >
                    {service.support.linkLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                </section>

                <section
                  aria-labelledby="related-services-heading"
                  className="mt-8 border-t border-line pt-7"
                >
                  <h2
                    id="related-services-heading"
                    className="text-2xl font-bold tracking-[-0.02em] text-ink"
                  >
                    Related services
                  </h2>
                  <ul className="mt-5 border-t border-line divide-y divide-line">
                    {service.relatedServices.map((relatedService) => (
                      <li key={relatedService.label}>
                        <Link
                          href={relatedService.href}
                          className="flex min-h-14 items-center justify-between gap-4 py-3 font-bold text-civic underline decoration-civic/25 underline-offset-4 hover:decoration-civic"
                        >
                          <span>{relatedService.label}</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </aside>
            </div>

            <footer className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <p>
                <span className="font-bold text-ink">Last updated:</span>{" "}
                <time dateTime={service.contentLastUpdated.dateTime}>
                  {service.contentLastUpdated.label}
                </time>
              </p>
              <p>{service.contentOwner}</p>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
}
