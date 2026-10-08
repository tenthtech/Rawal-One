import Image from "next/image";
import Link from "next/link";

import { EmergencyAlert } from "@/components/emergency-alert";
import { ServiceNotice } from "@/components/service-notice";
import {
  cityUpdates,
  communityEvents,
  popularServices,
  problemPathways,
  serviceNotice,
  usefulLinks,
} from "@/data/homepage";
import { getActivePublicAlerts } from "@/lib/alerts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const serviceIconPaths = [
  "M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13M10 11v6m4-6v6",
  "M12 3c3.5 4.5 6 7.8 6 11a6 6 0 0 1-12 0c0-3.2 2.5-6.5 6-11Z",
  "M7 3h7l4 4v14H7zM14 3v5h4M10 13h5m-5 4h5",
  "M8 3 4 21M16 3l4 18M12 4v4m0 4v3m0 4v2",
  "M12 3 5 14h14L12 3ZM12 14v7M6 21h12",
  "M4 6h16v12H4zM8 10h3m-3 4h8",
];

export default async function HomePage() {
  const activeAlerts = await getActivePublicAlerts();

  return (
    <>
      {activeAlerts.length > 0 ? (
        <section
          id="current-alerts"
          aria-labelledby="current-alerts-heading"
          className="scroll-mt-6 border-b border-line bg-surface"
        >
          <div className="mx-auto max-w-[76rem] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
            <div className="max-w-4xl">
              <p className="text-sm font-bold tracking-[0.08em] text-emergency uppercase">
                Important resident information
              </p>
              <h2
                id="current-alerts-heading"
                className="mt-2 text-3xl font-bold tracking-[-0.025em] text-ink"
              >
                Current alerts
              </h2>
              <p className="mt-2 leading-7 text-muted">
                Alerts published through this Rawal One demonstration. This is
                not an official emergency service.
              </p>
            </div>

            <ul className="mt-5 space-y-4">
              {activeAlerts.map((alert) => (
                <li key={alert.id}>
                  <EmergencyAlert alert={alert} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-b border-line bg-sage" aria-labelledby="help-heading">
        <div className="mx-auto grid max-w-[76rem] gap-6 px-5 py-8 sm:gap-8 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:items-center lg:gap-12 lg:px-10 lg:py-14">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-extrabold tracking-[0.12em] text-civic uppercase">
              <span className="h-0.5 w-8 bg-accent" aria-hidden="true" />
              Here for everyday life
            </p>
            <h1
              id="help-heading"
              className="mt-5 max-w-xl text-[2.5rem] font-extrabold leading-[1.08] tracking-[-0.05em] text-ink sm:text-5xl lg:text-[3.5rem]"
            >
              What can we help you with?
            </h1>
            <p className="mt-4 max-w-[34rem] text-base leading-7 text-muted sm:mt-5 sm:text-lg sm:leading-8">
              From water and waste to local updates, find the services and
              information that make the day a little easier.
            </p>

            <form
              action="/search"
              method="get"
              role="search"
              className="mt-6 max-w-[36rem] border border-line border-t-4 border-t-accent bg-surface p-4 shadow-[0_10px_28px_rgba(23,76,60,0.07)] sm:mt-8 sm:p-5"
            >
              <label htmlFor="global-search" className="block text-sm font-bold text-ink">
                Search Rawal One
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <div className="relative min-w-0 flex-1">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-civic"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m16 16 4 4" />
                  </svg>
                  <input
                    id="global-search"
                    name="q"
                    type="search"
                    maxLength={200}
                    placeholder="Water, permits, waste, roads..."
                    className="search-preview min-h-13 w-full min-w-0 rounded-sm border-2 border-civic bg-white py-3 pe-4 ps-12 text-base text-ink"
                  />
                </div>
                <button
                  type="submit"
                  className="min-h-13 rounded-sm bg-civic px-6 py-3 font-bold text-white hover:bg-civic-deep"
                >
                  Search
                </button>
              </div>
            </form>
            <Link
              href="/services"
              className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic sm:mt-4"
            >
              Browse all services <span aria-hidden="true">→</span>
            </Link>
          </div>

          <figure className="min-w-0 overflow-hidden border border-line bg-surface shadow-[0_14px_35px_rgba(23,76,60,0.08)]">
            <Image
              src="/images/neighbourhood-street.webp"
              alt="Illustrative tree-lined neighbourhood street with pedestrians and a rickshaw"
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="h-44 w-full object-cover object-center sm:h-72 lg:h-[25rem]"
            />
            <figcaption className="border-t border-line px-4 py-2.5 text-xs leading-5 text-muted">
              Illustrative scene inspired by neighbourhood life in Rawalpindi.
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="bg-page">
        <div className="mx-auto max-w-[76rem] px-5 pt-7 sm:px-8 sm:pt-9 lg:px-10">
          <ServiceNotice {...serviceNotice} />
        </div>
      </div>

      <section className="bg-page" aria-labelledby="popular-services-heading">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] md:items-end md:gap-12">
            <div>
              <p className="text-xs font-extrabold tracking-[0.12em] text-civic uppercase">
                Find your way
              </p>
              <h2
                id="popular-services-heading"
                className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-4xl"
              >
                Popular services
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted md:justify-self-end">
              A quick route to the things residents look for most often.
            </p>
          </div>

          <ul className="mt-8 grid border-t border-line md:grid-cols-2 md:gap-x-8">
            {popularServices.map((service, index) => (
              <li key={service.title} className="border-b border-line">
                <Link
                  href={service.href}
                  className="group flex min-h-25 items-start gap-4 px-1 py-5 no-underline hover:bg-sage sm:px-3 sm:py-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-line bg-surface text-civic group-hover:border-civic/40" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d={serviceIconPaths[index]} />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1.0625rem] font-bold text-ink group-hover:text-civic">
                      {service.title}
                    </span>
                    <span className="mt-1 block max-w-xl text-sm leading-6 text-muted">
                      {service.description}
                    </span>
                  </span>
                  <span className="mt-1 shrink-0 text-lg font-bold text-civic transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-civic text-white" aria-labelledby="report-problem-heading">
        <div className="mx-auto grid max-w-[76rem] gap-7 px-5 py-11 sm:px-8 sm:py-13 lg:grid-cols-[minmax(0,0.72fr)_minmax(25rem,1.28fr)] lg:items-start lg:gap-16 lg:px-10">
          <div>
            <p className="flex items-center gap-3 text-xs font-extrabold tracking-[0.12em] text-white/85 uppercase">
              <span aria-hidden="true" className="h-0.5 w-7 bg-accent" />
              Resident action
            </p>
            <h2
              id="report-problem-heading"
              className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl"
            >
              Report a local problem
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/85">
              Find the right pathway when something in your neighbourhood
              needs attention.
            </p>
          </div>

          <ul className="border-y border-white/25">
            {problemPathways.map((pathway) => (
              <li key={pathway.title} className="border-b border-white/25 last:border-b-0">
                <Link
                  href={pathway.href}
                  className="group flex min-h-21 items-start justify-between gap-5 py-4 text-white no-underline hover:bg-white/10 sm:px-4"
                >
                  <span>
                    <span className="block text-lg font-bold">{pathway.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-white/80">
                      {pathway.description}
                    </span>
                  </span>
                  <span aria-hidden="true" className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/55 text-lg transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
                    →
                  </span>
                  <span className="sr-only">{pathway.linkLabel}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="updates"
        className="scroll-mt-6 border-b border-line bg-surface"
        aria-labelledby="updates-heading"
      >
        <div className="mx-auto grid max-w-[76rem] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(16rem,0.62fr)_minmax(0,1.38fr)] lg:gap-16 lg:px-10">
          <div>
            <p className="text-xs font-extrabold tracking-[0.12em] text-civic uppercase">
              News &amp; notices
            </p>
            <h2
              id="updates-heading"
              className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-4xl"
            >
              City updates
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-muted">
              A quick look at what is changing around the community.
            </p>
            <Link
              href="/notices"
              className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
            >
              Browse public notices <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ul className="border-y border-line divide-y divide-line">
            {cityUpdates.map((update) => (
              <li key={update.title}>
                <article className="py-5 sm:py-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <p className="font-extrabold text-civic">{update.category}</p>
                    <time className="text-muted" dateTime={update.dateTime}>
                      {update.date}
                    </time>
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-[-0.025em] text-ink sm:text-[1.375rem]">
                    {update.title}
                  </h3>
                  <p className="mt-2 max-w-3xl leading-7 text-muted">
                    {update.description}
                  </p>
                  <Link
                    href={update.href}
                    className="mt-2 inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
                  >
                    {update.linkLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="community"
        className="scroll-mt-6 border-b border-line bg-warm"
        aria-labelledby="community-heading"
      >
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <p className="text-xs font-extrabold tracking-[0.12em] text-civic uppercase">
            Life around Rawalpindi
          </p>
          <h2
            id="community-heading"
            className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-4xl"
          >
            Around the community
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Neighbourhood activities and shared spaces are part of what makes a
            city feel like home.
          </p>

          <div className="mt-7 grid gap-8 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:items-start lg:gap-12">
            <figure className="min-w-0 overflow-hidden border border-line bg-surface">
              <Image
                src="/images/community-park.webp"
                alt="Illustrative neighbourhood park with families, trees and a play area"
                width={1536}
                height={1024}
                sizes="(min-width: 768px) 43vw, 100vw"
                className="h-52 w-full object-cover sm:h-64 md:h-[19rem]"
              />
              <figcaption className="px-4 py-2.5 text-xs leading-5 text-muted">
                Illustrative scene inspired by community spaces in Rawalpindi.
              </figcaption>
            </figure>
            <ul className="border-t border-line">
              {communityEvents.map((event) => (
                <li key={event.title} className="border-b border-line">
                  <article className="py-5 sm:py-6">
                    <time
                      className="text-sm font-extrabold text-advisory"
                      dateTime={event.dateTime}
                    >
                      {event.date}
                    </time>
                    <h3 className="mt-2 text-xl font-bold tracking-[-0.025em] text-ink">
                      {event.title}
                    </h3>
                    <p className="mt-2 max-w-xl leading-7 text-muted">
                      {event.description}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface" aria-labelledby="useful-information-heading">
        <div className="mx-auto max-w-[76rem] px-5 py-11 sm:px-8 sm:py-14 lg:px-10">
          <p className="text-xs font-extrabold tracking-[0.12em] text-civic uppercase">
            Keep exploring
          </p>
          <h2
            id="useful-information-heading"
            className="mt-3 text-2xl font-extrabold tracking-[-0.035em] text-ink sm:text-3xl"
          >
            Useful information
          </h2>
          <ul className="mt-6 grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
            {usefulLinks.map((item) => (
              <li key={item.label} className="border-b border-line">
                <Link
                  href={item.href}
                  className="group flex min-h-14 items-center justify-between gap-4 py-3 font-bold text-civic no-underline hover:underline hover:underline-offset-4"
                >
                  {item.label}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
