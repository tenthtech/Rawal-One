import type { Metadata } from "next";
import { ExternalArrow } from "@/components/city/external-arrow";

import { CityPageIntro } from "@/components/city/city-page-intro";
import { CityContextNote, CitySources } from "@/components/city/city-sources";
import { floodAdvice, floodGuidance, nullahLai } from "@/data/rawalpindi/flood";

export const metadata: Metadata = {
  title: "Understanding Nullah Lai",
  description:
    "Source-backed background on Rawalpindi’s watercourse, monsoon awareness and official flood-information pathways.",
};

export default function NullahLaiPage() {
  return (
    <>
      <CityPageIntro
        eyebrow="City watercourse"
        title={nullahLai.title}
        description={nullahLai.description}
        sections={[
          { href: "#understanding-lai", label: "The watercourse" },
          { href: "#heavy-rain", label: "During heavy rain" },
          { href: "#official-information", label: "Official information" },
        ]}
      />

      <section id="understanding-lai" aria-labelledby="watercourse-heading" className="scroll-mt-6 bg-page">
        <div className="civic-container grid gap-8 py-9 sm:py-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="civic-eyebrow">Water &amp; the city</p>
            <h2 id="watercourse-heading" className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
              A watercourse through Rawalpindi
            </h2>
            <div className="mt-5 border-s-2 border-accent bg-sage px-5 py-5 sm:px-6">
              <svg aria-hidden="true" focusable="false" viewBox="0 0 280 100" className="h-24 w-full max-w-sm text-civic" fill="none">
                <path d="M0 70C43 70 32 21 73 21s32 57 73 57 31-55 69-55 32 39 65 39" stroke="currentColor" strokeWidth="3" />
                <path d="M0 83C43 83 32 34 73 34s32 57 73 57 31-55 69-55 32 39 65 39" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              </svg>
              <p className="mt-2 text-sm leading-6 text-muted">
                The city’s urban runoff and its watercourse are part of the same story.
              </p>
              <p className="mt-2 text-xs leading-5 text-muted">Illustrative linework; not a geographic map.</p>
            </div>
          </div>
          <div className="min-w-0">
            <p className="max-w-3xl text-xl leading-8 tracking-[-0.02em] text-ink sm:text-2xl sm:leading-9">
              {nullahLai.paragraphs[0]}
            </p>
            <div className="mt-5 space-y-4 text-base leading-7 text-muted">
              {nullahLai.paragraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <CitySources ids={nullahLai.sourceIds} className="mt-6" />
          </div>
        </div>
      </section>

      <section id="heavy-rain" aria-labelledby="heavy-rain-heading" className="scroll-mt-6 border-y border-line bg-warm">
        <div className="civic-container grid gap-7 py-9 sm:py-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="civic-eyebrow">Flood awareness</p>
            <h2 id="heavy-rain-heading" className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
              {floodGuidance.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">{floodGuidance.description}</p>
          </div>
          <div className="min-w-0">
            <ul className="border-t-2 border-ink">
              {floodAdvice.map((advice, index) => (
                <li key={advice} className="flex gap-4 border-b border-line py-5">
                  <span aria-hidden="true" className="pt-1 text-xs font-semibold tabular-nums text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base font-semibold leading-7 text-ink">{advice}</p>
                </li>
              ))}
            </ul>
            <CitySources ids={["flood-pdma-guidance"]} className="mt-5" />
          </div>
        </div>
      </section>

      <section id="official-information" aria-labelledby="official-information-heading" className="scroll-mt-6 bg-page">
        <div className="civic-container py-9 sm:py-12">
          <div className="max-w-3xl border-s-2 border-accent ps-5 sm:ps-6">
            <p className="civic-eyebrow">Go to the source</p>
            <h2 id="official-information-heading" className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
              Follow official authorities
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">{floodGuidance.authorityNote}</p>
            <a href={floodGuidance.href} className="civic-link mt-3 min-h-11">
              <span>PDMA weather &amp; flood advisories<span className="sr-only">; external website</span></span>
              <ExternalArrow />
            </a>
          </div>
          <CitySources ids={["flood-pdma-pathways"]} className="mt-5" />
        </div>
      </section>
      <CityContextNote />
    </>
  );
}
