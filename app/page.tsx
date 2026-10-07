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

export default async function HomePage() {
  const activeAlerts = await getActivePublicAlerts();

  return (
    <>
      {activeAlerts.length > 0 ? (
        <section
          id="current-alerts"
          aria-labelledby="current-alerts-heading"
          className="scroll-mt-6 border-b border-line bg-page"
        >
          <div className="mx-auto max-w-[76rem] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
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
              <p className="mt-3 leading-7 text-muted">
                Active emergency and service information published by the Rawal
                One communications demonstration.
              </p>
            </div>

            <ul className="mt-6 space-y-5">
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
        <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.88fr)_minmax(24rem,1.12fr)] lg:items-center lg:gap-16 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-sm font-bold tracking-[0.08em] text-civic uppercase">
              <span className="h-0.5 w-8 bg-accent" aria-hidden="true" />
              Resident services
            </p>
            <h1
              id="help-heading"
              className="mt-5 max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.25rem]"
            >
              What can we help you with?
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Find services, report local issues, check city updates and access
              the information you need.
            </p>
          </div>

          <form
            action="/search"
            method="get"
            role="search"
            className="border-t-4 border-accent bg-surface p-5 shadow-[0_1px_0_rgba(24,37,33,0.08)] sm:p-8"
          >
            <label htmlFor="global-search" className="block text-base font-bold text-ink">
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
                  placeholder="Search water, permits, waste, roads..."
                  className="search-preview min-h-14 w-full min-w-0 rounded-sm border-2 border-civic bg-white py-3 pe-4 ps-12 text-base text-ink"
                />
              </div>
              <button
                type="submit"
                className="min-h-14 rounded-sm bg-civic px-6 py-3 font-bold text-white hover:bg-civic-deep"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="bg-page">
        <div className="mx-auto max-w-[76rem] px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10">
          <ServiceNotice {...serviceNotice} />
        </div>
      </div>

      <section className="bg-page" aria-labelledby="popular-services-heading">
        <div className="mx-auto max-w-[76rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] md:items-end md:gap-12">
            <div>
              <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
                Start here
              </p>
              <h2
                id="popular-services-heading"
                className="mt-3 text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl"
              >
                Popular services
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted md:justify-self-end">
              Quick access to common services and information for everyday city
              life.
            </p>
          </div>

          <ul className="mt-8 grid border-t border-line md:grid-cols-2 md:gap-x-10">
            {popularServices.map((service) => (
              <li key={service.title} className="border-b border-line">
                <Link
                  href={service.href}
                  className="group flex min-h-28 items-start justify-between gap-5 px-1 py-5 no-underline hover:bg-sage sm:px-3 sm:py-6"
                >
                  <span>
                    <span className="block text-lg font-bold text-ink group-hover:text-civic">
                      {service.title}
                    </span>
                    <span className="mt-1 block max-w-xl leading-7 text-muted">
                      {service.description}
                    </span>
                  </span>
                  <span className="mt-1 shrink-0 text-xl font-bold text-civic" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-civic text-white" aria-labelledby="report-problem-heading">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(25rem,1.25fr)] lg:items-end lg:gap-16">
            <div>
              <p className="text-sm font-bold tracking-[0.08em] text-white/75 uppercase">
                Resident action
              </p>
              <h2
                id="report-problem-heading"
                className="mt-3 text-3xl font-bold tracking-[-0.025em] sm:text-4xl"
              >
                Report a local problem
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/80">
              Tell us about an issue in your neighbourhood and find the right
              service for help.
            </p>
          </div>

          <ul className="mt-8 grid border-y border-white/25 sm:grid-cols-3">
            {problemPathways.map((pathway) => (
              <li
                key={pathway.title}
                className="border-b border-white/25 last:border-b-0 sm:border-e sm:border-b-0 sm:last:border-e-0"
              >
                <Link
                  href={pathway.href}
                  className="group flex h-full min-h-32 flex-col justify-between gap-4 px-4 py-5 text-white no-underline hover:bg-white/10 sm:px-5"
                >
                  <span>
                    <span className="block text-lg font-bold">{pathway.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-white/75">
                      {pathway.description}
                    </span>
                  </span>
                  <span className="font-bold underline decoration-white/40 underline-offset-4 group-hover:decoration-white">
                    {pathway.linkLabel}
                  </span>
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
        <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(16rem,0.62fr)_minmax(0,1.38fr)] lg:gap-16 lg:px-10">
          <div>
            <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
              Latest information
            </p>
            <h2
              id="updates-heading"
              className="mt-3 text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl"
            >
              City updates
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-muted">
              Service changes, community information and public notices in one
              place.
            </p>
          </div>

          <ul className="border-y border-line divide-y divide-line">
            {cityUpdates.map((update) => (
              <li key={update.title}>
                <article className="py-6 sm:py-7">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <p className="font-bold text-civic">{update.category}</p>
                    <time className="text-muted" dateTime={update.dateTime}>
                      {update.date}
                    </time>
                  </div>
                  <h3 className="mt-3 text-xl font-bold tracking-[-0.015em] text-ink">
                    {update.title}
                  </h3>
                  <p className="mt-2 max-w-3xl leading-7 text-muted">
                    {update.description}
                  </p>
                  <Link
                    href={update.href}
                    className="mt-3 inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
                  >
                    {update.linkLabel}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="community"
        className="scroll-mt-6 bg-sage"
        aria-labelledby="community-heading"
      >
        <div className="mx-auto max-w-[76rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
            Events & activities
          </p>
          <h2
            id="community-heading"
            className="mt-3 text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl"
          >
            Around the community
          </h2>

          <ul className="mt-9 grid gap-8 md:grid-cols-2 md:gap-12">
            {communityEvents.map((event) => (
              <li key={event.title}>
                <article className="border-t-2 border-civic pt-5">
                  <time className="text-sm font-bold text-advisory" dateTime={event.dateTime}>
                    {event.date}
                  </time>
                  <h3 className="mt-3 text-xl font-bold tracking-[-0.015em] text-ink">
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
      </section>

      <section className="bg-page" aria-labelledby="useful-information-heading">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <h2
            id="useful-information-heading"
            className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl"
          >
            Useful information
          </h2>
          <ul className="mt-7 grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
            {usefulLinks.map((item) => (
              <li key={item.label} className="border-b border-line">
                <Link
                  href={item.href}
                  className="flex min-h-14 items-center justify-between gap-4 py-3 font-bold text-civic underline decoration-civic/25 underline-offset-4 hover:decoration-civic"
                >
                  {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
