import Image from "next/image";
import Link from "next/link";

import { CivicIcon } from "@/components/civic-icon";
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

const serviceIcons = [
  "waste",
  "water",
  "document",
  "road",
  "park",
  "licence",
] as const;
const problemIcons = ["road", "light", "waste"] as const;
const quickActions = [
  {
    label: "Water billing help",
    href: "/services?q=billing&category=water-sewer",
  },
  { label: "Waste collection", href: "/services?category=waste-recycling" },
  {
    label: "Report a road issue",
    href: "/services?q=pothole&category=roads-streets",
  },
  {
    label: "Building permits",
    href: "/services?q=building&category=permits-applications",
  },
];

export default async function HomePage() {
  const activeAlerts = await getActivePublicAlerts();
  const [featuredUpdate, ...secondaryUpdates] = cityUpdates;

  return (
    <>
      {activeAlerts.length > 0 ? (
        <section
          id="current-alerts"
          aria-labelledby="current-alerts-heading"
          className="scroll-mt-6 border-b border-line bg-surface"
        >
          <div className="civic-container py-7 sm:py-9">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <h2
                id="current-alerts-heading"
                className="text-2xl font-semibold tracking-tight text-ink"
              >
                Current alerts
              </h2>
              <p className="max-w-xl text-sm leading-6 text-muted">
                Alerts published through this Rawal One demonstration. This is
                not an official emergency service.
              </p>
            </div>
            <ul className="space-y-4">
              {activeAlerts.map((alert) => (
                <li key={alert.id}>
                  <EmergencyAlert alert={alert} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="home-hero" aria-labelledby="help-heading">
        <div className="civic-container hero-grid">
          <div className="hero-content">
            <p className="civic-eyebrow">For the place we call home</p>
            <h1 id="help-heading" className="hero-title">
              What can we
              <br className="hidden lg:block" /> help you with?
            </h1>
            <p className="hero-description">
              Find a service, solve an everyday problem, or see what’s happening
              in your neighbourhood.
            </p>

            <form
              action="/search"
              method="get"
              role="search"
              className="hero-search"
            >
              <label
                htmlFor="global-search"
                className="mb-3 block text-sm font-semibold text-ink"
              >
                Search Rawal One
              </label>
              <div className="hero-search-control">
                <CivicIcon name="search" className="hero-search-icon" />
                <input
                  id="global-search"
                  name="q"
                  type="search"
                  maxLength={200}
                  placeholder="Water, waste, permits…"
                  className="search-preview"
                />
                <button type="submit">
                  Search{" "}
                  <CivicIcon name="arrow" className="hidden h-4 w-4 sm:block" />
                </button>
              </div>
            </form>

            <nav
              aria-label="Common resident tasks"
              className="hero-quick-actions"
            >
              <p className="text-xs font-medium text-muted">Common tasks</p>
              <ul>
                {quickActions.map((action) => (
                  <li key={action.href}>
                    <Link href={action.href}>
                      {action.label}
                      <CivicIcon name="arrow" className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <figure className="hero-photograph">
            <div className="hero-photo-window">
              <Image
                src="/images/lalkurti-street.webp"
                alt="People walking between shops and market stalls beneath colourful evening lights in Lalkurti, Rawalpindi"
                width={1920}
                height={1920}
                priority
                sizes="(min-width: 1280px) 492px, (min-width: 1024px) 43vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
              />
            </div>
            <figcaption>
              <span className="photo-caption-rule" aria-hidden="true" />
              <span>
                <strong>The life of our streets</strong>
                <span>An evening in Lalkurti, Rawalpindi.</span>
              </span>
            </figcaption>
          </figure>
        </div>
        <div className="civic-container pb-8 sm:pb-12">
          <ServiceNotice {...serviceNotice} />
        </div>
      </section>

      <section
        className="home-services"
        aria-labelledby="popular-services-heading"
      >
        <div className="civic-container">
          <div className="section-heading-row">
            <div>
              <p className="civic-eyebrow">Everyday essentials</p>
              <h2 id="popular-services-heading" className="civic-heading mt-4">
                Popular services
              </h2>
            </div>
            <Link href="/services" className="civic-link">
              Explore all services <CivicIcon name="arrow" />
            </Link>
          </div>
          <ul className="popular-service-grid">
            {popularServices.map((service, index) => (
              <li key={service.title}>
                <Link href={service.href} className="popular-service-link">
                  <span className="popular-service-icon">
                    <CivicIcon name={serviceIcons[index]} />
                  </span>
                  <span className="popular-service-copy">
                    <span className="popular-service-title">
                      {service.title}
                    </span>
                    <span className="popular-service-description">
                      {service.description}
                    </span>
                  </span>
                  <CivicIcon name="arrow" className="popular-service-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="resident-action-band"
        aria-labelledby="report-problem-heading"
      >
        <div className="civic-container resident-action-grid">
          <div>
            <p className="civic-eyebrow text-white/80">Let’s put it right</p>
            <h2
              id="report-problem-heading"
              className="civic-heading mt-4 text-white"
            >
              Report a<br className="hidden lg:block" /> local problem
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
              Something in your neighbourhood needs attention? Find the right
              place to start.
            </p>
          </div>
          <ul className="problem-pathways">
            {problemPathways.map((pathway, index) => (
              <li key={pathway.title}>
                <Link href={pathway.href} className="problem-pathway">
                  <CivicIcon
                    name={problemIcons[index]}
                    className="problem-icon"
                  />
                  <span className="problem-copy">
                    <span className="block text-base font-semibold leading-6">
                      {pathway.title}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-white/75">
                      {pathway.description}
                    </span>
                  </span>
                  <CivicIcon name="arrow" className="problem-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="updates"
        className="home-updates scroll-mt-6"
        aria-labelledby="updates-heading"
      >
        <div className="civic-container">
          <div className="section-heading-row">
            <div>
              <p className="civic-eyebrow">Keep in the know</p>
              <h2 id="updates-heading" className="civic-heading mt-4">
                City updates
              </h2>
            </div>
            <Link href="/notices" className="civic-link">
              All public notices <CivicIcon name="arrow" />
            </Link>
          </div>
          <div className="updates-grid">
            <article className="featured-update">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                <p className="font-semibold text-civic">
                  {featuredUpdate.category}
                </p>
                <time dateTime={featuredUpdate.dateTime} className="text-muted">
                  {featuredUpdate.date}
                </time>
              </div>
              <h3>{featuredUpdate.title}</h3>
              <p className="mt-4 max-w-lg text-base leading-7 text-muted">
                {featuredUpdate.description}
              </p>
              <Link href={featuredUpdate.href} className="civic-link mt-6">
                {featuredUpdate.linkLabel}
                <CivicIcon name="arrow" />
              </Link>
            </article>
            <ul className="secondary-updates">
              {secondaryUpdates.map((update) => (
                <li key={update.title}>
                  <article>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                      <p className="font-semibold text-civic">
                        {update.category}
                      </p>
                      <time dateTime={update.dateTime} className="text-muted">
                        {update.date}
                      </time>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold leading-7 tracking-[-0.025em] text-ink">
                      {update.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {update.description}
                    </p>
                    <Link href={update.href} className="civic-link mt-2">
                      {update.linkLabel}
                      <CivicIcon name="arrow" />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="community"
        className="home-community scroll-mt-6"
        aria-labelledby="community-heading"
      >
        <div className="civic-container community-grid">
          <figure className="community-photograph">
            <Image
              src="/images/ayub-park-lake.webp"
              alt="A fountain rises from the lake in Ayub Park, Rawalpindi, surrounded by trees and a waterside path"
              width={2000}
              height={1500}
              sizes="(min-width: 1280px) 556px, (min-width: 1024px) 46vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
            />
            <figcaption>
              Room to pause. The lake at Ayub Park, Rawalpindi.
            </figcaption>
          </figure>
          <div className="community-content">
            <p className="civic-eyebrow">Life beyond the everyday</p>
            <h2 id="community-heading" className="civic-heading mt-4">
              Around the
              <br className="hidden lg:block" /> community
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted">
              Neighbourhood activities and shared spaces are part of what makes
              a city feel like home.
            </p>
            <ul className="community-events">
              {communityEvents.map((event) => (
                <li key={event.title}>
                  <article>
                    <time dateTime={event.dateTime} className="community-date">
                      <span>{event.date.split(" ")[0]}</span>
                      <span>{event.date.split(" ").slice(1).join(" ")}</span>
                    </time>
                    <div>
                      <h3 className="text-lg font-semibold leading-6 tracking-[-0.02em] text-ink">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {event.description}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="home-utility"
        aria-labelledby="useful-information-heading"
      >
        <div className="civic-container utility-grid">
          <div>
            <p className="civic-eyebrow">Your next step</p>
            <h2
              id="useful-information-heading"
              className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-[-0.035em] text-ink"
            >
              Useful information
            </h2>
          </div>
          <ul>
            {usefulLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>
                  {item.label}
                  <CivicIcon name="arrow" className="h-4 w-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
