import type { Metadata } from "next";
import { ExternalArrow } from "@/components/city/external-arrow";
import Link from "next/link";

import { CityPageIntro } from "@/components/city/city-page-intro";
import { CityContextNote, CitySources } from "@/components/city/city-sources";
import { MetroRoute } from "@/components/city/metro-route";
import { metroRoute } from "@/data/rawalpindi/transport";
import { civicSources } from "@/data/rawalpindi/sources";

export const metadata: Metadata = {
  title: "Rawalpindi–Islamabad Metrobus",
  description: "See the verified Saddar–Pak Secretariat station sequence for the Pakistan Metrobus System and find official Punjab Masstransit information.",
};

export default function MetrobusPage() {
  return (
    <article>
      <CityPageIntro
        eyebrow="Metro & transport"
        title={metroRoute.title}
        description={metroRoute.description}
        sections={[
          { href: "#metro-route", label: "Route & stations" },
          { href: "#plan-your-journey", label: "Official travel information" },
        ]}
      />

      <section id="metro-route" aria-labelledby="metro-route-heading" className="scroll-mt-6 bg-page">
        <div className="civic-container py-10 sm:py-14">
          <div className="mb-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
            <div>
              <p className="civic-eyebrow">{metroRoute.officialName}</p>
              <h2 id="metro-route-heading" className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
                One route, two cities
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted lg:pt-2">
              The Pakistan Metrobus System connects Rawalpindi and Islamabad.
              PMA’s published route runs between Saddar and Pak Secretariat, with {metroRoute.stationCount} stations.
            </p>
          </div>

          <MetroRoute />

          <div className="mt-5 max-w-3xl">
            <p className="text-sm leading-6 text-muted">
              Station names follow the official map. The map is undated and describes the
              published route; it does not show live service availability or disruptions.
            </p>
          </div>
          <CitySources ids={metroRoute.sourceIds} className="mt-6" />
        </div>
      </section>

      <section id="plan-your-journey" aria-labelledby="plan-your-journey-heading" className="scroll-mt-6 border-t border-line bg-surface">
        <div className="civic-container grid gap-7 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="civic-eyebrow">Before you travel</p>
            <h2 id="plan-your-journey-heading" className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
              Check with the operator
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-muted">
              Use Punjab Masstransit Authority’s official information to confirm fares,
              operating hours and any service changes before travelling.
            </p>
          </div>
          <div className="border-t-2 border-civic lg:mt-1">
            <a className="civic-link flex min-h-14 justify-between gap-4 border-b border-line py-4" href={civicSources["pma-terminals"].sourceUrl}>
              <span>Punjab Masstransit Authority</span><ExternalArrow />
            </a>
            <a className="civic-link flex min-h-14 justify-between gap-4 border-b border-line py-4" href={civicSources["pma-map"].sourceUrl}>
              <span>View the official route map</span><ExternalArrow />
            </a>
            <Link className="civic-link flex min-h-14 justify-between gap-4 border-b border-line py-4" href="/rawalpindi">
              <span>More everyday city information</span><span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <CityContextNote />
    </article>
  );
}
