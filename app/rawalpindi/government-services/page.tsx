import type { Metadata } from "next";
import { ExternalArrow } from "@/components/city/external-arrow";

import { CityPageIntro } from "@/components/city/city-page-intro";
import { CityContextNote, CitySources } from "@/components/city/city-sources";
import {
  eKhidmatCentre,
  governmentServices,
  publicOffices,
} from "@/data/rawalpindi/government";

export const metadata: Metadata = {
  title: "Government services in Rawalpindi",
  description:
    "Official pathways for certificates, licences, e-Khidmat and useful public offices serving Rawalpindi.",
};

export default function GovernmentServicesPage() {
  return (
    <>
      <CityPageIntro
        eyebrow="Government services"
        title="Find the right public service"
        description="Official pathways for certificates, licences and everyday government services in Rawalpindi."
        sections={[
          { href: "#certificates-licences", label: "Certificates & licences" },
          { href: "#e-khidmat", label: "e-Khidmat Markaz" },
          { href: "#public-offices", label: "Useful public offices" },
        ]}
      />

      <section id="certificates-licences" aria-labelledby="government-tasks-heading" className="scroll-mt-6 bg-page">
        <div className="civic-container grid gap-8 py-9 sm:py-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="civic-eyebrow">Everyday paperwork</p>
            <h2 id="government-tasks-heading" className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
              Certificates &amp; licences
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted">
              District Rawalpindi’s official directory lists these e-Khidmat pathways.
              Use it to reach the responsible government service.
            </p>
            <p className="mt-4 max-w-lg border-s-2 border-accent ps-4 text-sm leading-6 text-muted">
              Applications are handled by official providers. Confirm current requirements
              and service availability with them.
            </p>
          </div>
          <div className="min-w-0">
            <ol className="border-t-2 border-ink">
              {governmentServices.map((service, index) => (
                <li key={service.id} id={`service-${service.id}`} className="scroll-mt-6 border-b border-line py-5 sm:py-6">
                  <div className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-3 sm:gap-5">
                    <span aria-hidden="true" className="pt-1 text-xs font-semibold tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-[-0.025em] text-ink sm:text-xl">{service.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted">{service.description}</p>
                      <a href={service.href} className="civic-link mt-2 min-h-11 text-sm">
                        <span>Official district directory<span className="sr-only"> for {service.title}; external website</span></span>
                        <ExternalArrow />
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <CitySources ids={["gov-district-pathways"]} className="mt-5" />
          </div>
        </div>
      </section>

      <section id="e-khidmat" aria-labelledby="centre-heading" className="scroll-mt-6 border-y border-line bg-sage">
        <div className="civic-container grid gap-7 py-9 sm:py-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="civic-eyebrow">Several departments, one centre</p>
            <h2 id="centre-heading" className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl">
              {eKhidmatCentre.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">{eKhidmatCentre.description}</p>
          </div>
          <div className="min-w-0">
            <p className="text-base leading-7 text-ink">{eKhidmatCentre.reportDescription}</p>
            <p className="mt-4 text-sm leading-6 text-muted">{eKhidmatCentre.beforeVisiting}</p>
            <a href={eKhidmatCentre.href} className="civic-link mt-3 min-h-11">
              <span>e-Khidmat programme information<span className="sr-only">; external website</span></span>
              <ExternalArrow />
            </a>
            <CitySources ids={eKhidmatCentre.sourceIds} className="mt-4" />
          </div>
        </div>
      </section>

      <section id="public-offices" aria-labelledby="public-offices-heading" className="scroll-mt-6 bg-page">
        <div className="civic-container py-9 sm:py-12">
          <div className="max-w-2xl">
            <p className="civic-eyebrow">Who helps with what</p>
            <h2 id="public-offices-heading" className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
              Useful public offices
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              A guide to different public responsibilities. Check each organization’s
              official information for its service area and current pathways.
            </p>
          </div>
          <ul className="mt-6 border-t-2 border-ink">
            {publicOffices.map((office) => (
              <li key={office.id} id={`office-${office.id}`} className="grid min-w-0 gap-3 border-b border-line py-5 sm:py-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16">
                <h3 className="text-lg font-semibold leading-snug tracking-[-0.025em] text-ink">{office.title}</h3>
                <div className="min-w-0">
                  <p className="text-sm leading-6 text-muted">{office.description}</p>
                  <a href={office.href} className="civic-link mt-1 min-h-11 text-sm">
                    <span>Official information<span className="sr-only"> for {office.title}; external website</span></span>
                    <ExternalArrow />
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <CitySources ids={["gov-rda-functions", "gov-wasa-role", "flood-pdma-pathways"]} className="mt-5" />
        </div>
      </section>
      <CityContextNote />
    </>
  );
}
