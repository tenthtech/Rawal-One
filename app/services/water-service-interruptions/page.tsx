import type { Metadata } from "next";
import Link from "next/link";

import { PublicPageIntro } from "@/components/public-page-intro";
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
      <div className="border-b border-line bg-surface">
        <div className="civic-container py-2">
          <nav aria-label="Breadcrumb">
            <ol className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0 text-sm leading-6">
              <li>
                <Link
                  href="/"
                  className="civic-link inline-flex min-h-11 items-center font-medium"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted">
                /
              </li>
              <li>
                <Link
                  href="/services"
                  className="civic-link inline-flex min-h-11 items-center font-medium"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted">
                /
              </li>
              <li
                aria-current="page"
                className="min-w-0 [overflow-wrap:anywhere] font-semibold text-ink"
              >
                {service.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <article>
        <PublicPageIntro
          id="water-service-heading"
          eyebrow={service.category}
          title={service.title}
          description={service.summary}
        >
          <div className="border-s-[3px] border-accent ps-5">
            <p className="civic-eyebrow">Explore the category</p>
            <p className="mt-2 max-w-xs text-base leading-7 text-muted">
              Find other water and sewer guidance in the services directory.
            </p>
            <Link
              href={service.categoryHref}
              className="civic-link mt-3 inline-flex min-h-11 items-center gap-2 font-semibold"
            >
              Browse {service.category.toLowerCase()} services
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </PublicPageIntro>

        <div className="bg-page">
          <div className="civic-container py-10 sm:py-14">
            <section
              aria-labelledby="current-status-heading"
              className="border border-line bg-surface shadow-[0_12px_28px_-28px_rgba(16,55,44,0.4)]"
            >
              <div className="grid lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
                <div className="border-s-4 border-advisory bg-warm/55 px-5 py-7 sm:px-8 sm:py-8">
                  <p className="inline-flex items-center gap-2 border border-advisory/30 bg-surface px-3 py-1 text-sm font-semibold tracking-[0.08em] text-advisory uppercase">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-advisory" />
                    {service.status.type}
                  </p>
                  <h2
                    id="current-status-heading"
                    className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl"
                  >
                    {service.status.heading}
                  </h2>
                  <p className="mt-3 text-xl font-semibold text-advisory sm:text-2xl">
                    {service.status.label}
                  </p>
                  <p className="mt-3 max-w-xl leading-7 text-muted">
                    {service.status.description}
                  </p>
                </div>

                <dl className="grid gap-x-8 gap-y-6 border-t border-line p-5 sm:grid-cols-2 sm:p-8 lg:border-t-0">
                  <div>
                    <dt className="text-sm font-semibold tracking-[0.06em] text-civic uppercase">Affected area</dt>
                    <dd className="mt-2 leading-7 text-ink">
                      {service.status.affectedArea}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold tracking-[0.06em] text-civic uppercase">Maintenance window</dt>
                    <dd className="mt-2 leading-7 text-ink">
                      <time dateTime={service.status.maintenanceStart.dateTime}>
                        {service.status.maintenanceStart.label}
                      </time>
                      {" – "}
                      <time dateTime={service.status.maintenanceEnd.dateTime}>
                        {service.status.maintenanceEnd.label}
                      </time>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold tracking-[0.06em] text-civic uppercase">Expected impact</dt>
                    <dd className="mt-2 leading-7 text-ink">
                      {service.status.impact}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold tracking-[0.06em] text-civic uppercase">Last updated</dt>
                    <dd className="mt-2 leading-7 text-ink">
                      <time dateTime={service.status.lastUpdated.dateTime}>
                        {service.status.lastUpdated.label}
                      </time>
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <div className="mt-12 grid min-w-0 gap-12 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
              <div className="min-w-0">
                <section aria-labelledby="resident-actions-heading">
                  <p className="civic-eyebrow">Resident guidance</p>
                  <h2
                    id="resident-actions-heading"
                    className="civic-heading mt-2"
                  >
                    What you should do
                  </h2>
                  <ol className="mt-6 divide-y divide-line border-t-2 border-ink border-b border-b-line">
                    {service.immediateActions.map((action, index) => (
                      <li
                        key={action}
                        className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-4 py-5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-5"
                      >
                        <span
                          aria-hidden="true"
                          className="text-2xl font-semibold leading-7 tracking-[-0.06em] text-civic"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="max-w-2xl leading-7 text-ink">{action}</p>
                      </li>
                    ))}
                  </ol>
                </section>

                <section
                  aria-labelledby="help-pathways-heading"
                  className="mt-14 border-t border-line pt-10"
                >
                  <h2
                    id="help-pathways-heading"
                    className="civic-heading"
                  >
                    Service help pathways
                  </h2>
                  <ul className="mt-6 divide-y divide-line border-t-2 border-ink border-b border-b-line">
                    {service.helpPathways.map((pathway) => (
                      <li key={pathway.title}>
                        <article className="grid gap-3 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-8">
                          <div>
                            <h3 className="text-xl font-semibold tracking-[-0.025em] text-ink">
                              {pathway.title}
                            </h3>
                            <p className="mt-2 max-w-2xl leading-7 text-muted">
                              {pathway.description}
                            </p>
                          </div>
                          <Link
                            href={pathway.href}
                            className="civic-link group inline-flex min-h-11 items-center gap-2 font-semibold"
                          >
                            {pathway.linkLabel}
                            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">→</span>
                          </Link>
                        </article>
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  aria-labelledby="interruption-types-heading"
                  className="mt-14 border-t border-line pt-10"
                >
                  <h2
                    id="interruption-types-heading"
                    className="civic-heading"
                  >
                    Planned vs unexpected interruptions
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {service.interruptionTypes.map((type) => (
                      <section
                        key={type.title}
                        aria-labelledby={`interruption-${type.title.toLowerCase().replaceAll(" ", "-")}`}
                        className="border-t-[3px] border-civic bg-surface px-5 py-6"
                      >
                        <h3
                          id={`interruption-${type.title.toLowerCase().replaceAll(" ", "-")}`}
                          className="text-xl font-semibold tracking-[-0.025em] text-ink"
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
                  className="mt-14 border-t border-line pt-10"
                >
                  <h2
                    id="interruption-guidance-heading"
                    className="civic-heading"
                  >
                    Before, during and after an interruption
                  </h2>
                  <div className="mt-6 grid gap-7 md:grid-cols-3 md:gap-8">
                    {service.guidanceStages.map((stage) => (
                      <section
                        key={stage.title}
                        aria-labelledby={`guidance-${stage.title.toLowerCase()}`}
                        className="border-t-[3px] border-accent pt-5"
                      >
                        <h3
                          id={`guidance-${stage.title.toLowerCase()}`}
                          className="text-xl font-semibold tracking-[-0.025em] text-ink"
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
                  className="mt-14 border-t border-line pt-10"
                >
                  <h2
                    id="faq-heading"
                    className="civic-heading"
                  >
                    Frequently asked questions
                  </h2>
                  <div className="mt-6 border-t-2 border-ink">
                    {service.faqs.map((faq) => (
                      <details key={faq.question} className="group border-b border-line open:bg-sage/35">
                        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-lg font-semibold leading-7 text-ink hover:text-civic [&::-webkit-details-marker]:hidden">
                          <span>{faq.question}</span>
                          <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center border border-line bg-surface text-xl font-normal text-civic">
                            <span className="group-open:hidden">+</span>
                            <span className="hidden group-open:block">−</span>
                          </span>
                        </summary>
                        <p className="max-w-3xl pb-5 pe-12 leading-7 text-muted">
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
                  className="scroll-mt-6 border-t-[3px] border-accent bg-civic-deep px-6 py-7 text-white sm:px-7"
                >
                  <p className="text-xs font-semibold tracking-[0.12em] text-warm uppercase">
                    Service support
                  </p>
                  <h2
                    id="service-support-heading"
                    className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white"
                  >
                    {service.support.title}
                  </h2>
                  <dl className="mt-6 space-y-5 border-t border-white/25 pt-5 text-sm">
                    <div>
                      <dt className="font-semibold text-white">Service area</dt>
                      <dd className="mt-1 leading-6 text-white/80">
                        {service.support.serviceArea}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-white">Hours</dt>
                      <dd className="mt-1 leading-6 text-white/80">
                        {service.support.hours}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href={service.support.href}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-warm/60 underline-offset-4 hover:decoration-white"
                  >
                    {service.support.linkLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                </section>

                <section
                  aria-labelledby="related-services-heading"
                  className="mt-5 border-t-[3px] border-accent bg-surface px-6 py-7 sm:px-7"
                >
                  <h2
                    id="related-services-heading"
                    className="text-xl font-semibold tracking-[-0.03em] text-ink"
                  >
                    Related services
                  </h2>
                  <ul className="mt-5 divide-y divide-line border-t border-line">
                    {service.relatedServices.map((relatedService) => (
                      <li key={relatedService.label}>
                        <Link
                          href={relatedService.href}
                          className="group flex min-h-14 items-center justify-between gap-4 py-3 font-semibold text-civic underline decoration-civic/30 underline-offset-4 hover:decoration-civic"
                        >
                          <span>{relatedService.label}</span>
                          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </aside>
            </div>

            <footer className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-8">
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
