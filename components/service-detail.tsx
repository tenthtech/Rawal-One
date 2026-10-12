import Link from "next/link";

import { CivicIcon } from "@/components/civic-icon";
import { PublicPageIntro } from "@/components/public-page-intro";
import type { PublicServiceDetail } from "@/data/service-details";
import { getServiceCategoryLabel, services } from "@/data/services";
import { formatPublicDate } from "@/lib/public-content";

const sections = [
  ["service-overview", "Overview"],
  ["service-steps", "Steps"],
  ["service-prepare", "Preparation"],
  ["service-pathways", "Pathways"],
  ["service-faq", "Questions"],
  ["service-support", "Support"],
] as const;

export function ServiceDetail({ service }: { service: PublicServiceDetail }) {
  const category = getServiceCategoryLabel(service.category) ?? "Resident services";
  const related = service.relatedSlugs.flatMap((slug) => {
    const record = services.find((item) => item.slug === slug);
    return record ? [record] : [];
  });

  return (
    <>
      <div className="border-b border-line bg-surface">
        <nav aria-label="Breadcrumb" className="civic-container py-2">
          <ol className="flex flex-wrap items-center gap-x-2 text-sm leading-6">
            <li><Link href="/" className="civic-link min-h-11">Home</Link></li>
            <li aria-hidden="true" className="text-muted">/</li>
            <li><Link href="/services" className="civic-link min-h-11">Services</Link></li>
            <li aria-hidden="true" className="text-muted">/</li>
            <li aria-current="page" className="min-w-0 font-semibold text-ink [overflow-wrap:anywhere]">{service.title}</li>
          </ol>
        </nav>
      </div>
      <article>
        <PublicPageIntro
          id="service-heading"
          eyebrow={category}
          title={service.title}
          description={service.summary}
        />
        <div className="civic-container py-8 sm:py-10">
          <div className="service-guidance-note">
            <p className="civic-eyebrow">Service note</p>
            <p className="mt-2 max-w-4xl leading-7 text-ink">{service.serviceNote}</p>
          </div>
          <nav aria-labelledby="service-on-this-page" className="service-page-index">
            <h2 id="service-on-this-page" className="text-sm font-semibold text-ink">On this page</h2>
            <ul className="flex flex-wrap gap-x-5">
              {sections.map(([id, label]) => <li key={id}><Link href={`#${id}`} className="civic-link min-h-11 text-sm">{label}</Link></li>)}
            </ul>
          </nav>
          <div className="service-detail-layout">
            <div className="min-w-0 space-y-10 sm:space-y-12">
              <section id="service-overview" aria-labelledby="service-overview-heading" className="scroll-mt-6">
                <h2 id="service-overview-heading" className="civic-heading">What this service helps with</h2>
                <ul className="service-guidance-list mt-5">
                  {service.helpsWith.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
              <section id="service-steps" aria-labelledby="service-steps-heading" className="scroll-mt-6">
                <p className="civic-eyebrow">Resident guidance</p>
                <h2 id="service-steps-heading" className="civic-heading mt-2">What you should do</h2>
                <ol className="service-guidance-steps mt-5">
                  {service.steps.map((step, index) => (
                    <li key={step.title}>
                      <span aria-hidden="true" className="service-step-number">{String(index + 1).padStart(2, "0")}</span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold leading-7 text-ink">{step.title}</h3>
                        <p className="mt-2 leading-7 text-muted">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
              <section id="service-prepare" aria-labelledby="service-prepare-heading" className="scroll-mt-6">
                <h2 id="service-prepare-heading" className="civic-heading">Have this information ready</h2>
                <p className="mt-3 leading-7 text-muted">Keep these details for the responsible provider. Do not send personal information through this demonstration.</p>
                <ul className="service-guidance-list mt-5">
                  {service.readyInformation.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
              <section id="service-pathways" aria-labelledby="service-pathways-heading" className="scroll-mt-6">
                <h2 id="service-pathways-heading" className="civic-heading">Helpful pathways</h2>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {service.pathways.map((pathway) => (
                    <li key={pathway.href} className="py-4">
                      <Link href={pathway.href} className="civic-link min-h-11"><span>{pathway.label}</span><CivicIcon name="arrow" /></Link>
                      <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">{pathway.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
              <section id="service-faq" aria-labelledby="service-faq-heading" className="scroll-mt-6">
                <h2 id="service-faq-heading" className="civic-heading">Common questions</h2>
                <div className="mt-5 divide-y divide-line border-y border-line">
                  {service.faqs.map((faq) => (
                    <details key={faq.question} className="py-1">
                      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold leading-7 text-civic">
                        <span>{faq.question}</span><span aria-hidden="true" className="shrink-0 text-xl">+</span>
                      </summary>
                      <p className="max-w-2xl pb-4 leading-7 text-muted">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
              <section id="service-support" aria-labelledby="service-support-heading" className="service-support-block scroll-mt-6">
                <p className="civic-eyebrow">Getting support</p>
                <h2 id="service-support-heading" className="mt-2 text-2xl font-semibold leading-8 tracking-tight text-ink">{service.support.title}</h2>
                <p className="mt-3 leading-7 text-muted">{service.support.description}</p>
                <ul className="service-guidance-list mt-4">
                  {service.support.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link href={service.support.href} className="civic-link mt-4 min-h-11"><span>{service.support.linkLabel}</span><CivicIcon name="arrow" /></Link>
              </section>
              <p className="border-t border-line pt-5 text-sm leading-6 text-muted">Last updated <time dateTime={service.updatedAt}>{formatPublicDate(service.updatedAt)}</time> · Demonstration guidance</p>
            </div>
            <aside className="service-detail-aside" aria-label="Service navigation">
              <nav aria-labelledby="service-related-heading">
                <h2 id="service-related-heading" className="text-base font-semibold text-ink">Related services</h2>
                <ul className="mt-3 border-t border-line">
                  {related.map((record) => <li key={record.slug} className="border-b border-line"><Link href={`/services/${record.slug}`} className="civic-link min-h-11 py-3 text-sm">{record.title}</Link></li>)}
                </ul>
                <Link href={`/services?category=${service.category}`} className="civic-link mt-3 min-h-11 text-sm"><span>All {category.toLowerCase()} services</span><CivicIcon name="arrow" /></Link>
              </nav>
              <p className="mt-7 text-sm leading-6 text-muted">Rawal One is a research demonstration. These pages explain how to prepare; they do not submit requests, accept payments or book appointments.</p>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
