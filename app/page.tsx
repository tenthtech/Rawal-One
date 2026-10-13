import Link from "next/link";

import { CityGlance } from "@/components/city/city-glance";
import { CivicIcon } from "@/components/civic-icon";
import { EmergencyAlert } from "@/components/emergency-alert";
import { PublicGallery } from "@/components/public-gallery";
import { ServiceNotice } from "@/components/service-notice";
import {
  popularServices,
  problemPathways,
  serviceNotice,
  usefulLinks,
} from "@/data/homepage";
import { getActivePublicAlerts } from "@/lib/alerts";
import {
  readPublishedCityUpdates,
  readPublishedCommunityEvents,
} from "@/lib/cms";
import {
  formatEventDate,
  formatPublicDate,
  getSeededCityUpdateLink,
} from "@/lib/public-content";

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
    href: "/services/water-billing-account-help",
  },
  { label: "Waste collection", href: "/services/waste-collection-schedules" },
  {
    label: "Report a road issue",
    href: "/services/report-pothole-road-issue",
  },
  {
    label: "Building permits",
    href: "/services/building-permits-applications",
  },
];

type PublishedCityUpdate = Awaited<
  ReturnType<typeof readPublishedCityUpdates>
>[number];

function getCityUpdateLink(update: PublishedCityUpdate) {
  const seededLink = getSeededCityUpdateLink(
    update.id,
    update.title,
    update.category,
  );
  if (seededLink) return seededLink;

  if (update.category === "Service update") {
    return { href: "/services", label: "Browse services" };
  }

  if (update.category === "Public notice") {
    return { href: "/notices", label: "View public notices" };
  }

  return {
    href: `/search?q=${encodeURIComponent(update.category)}`,
    label: "Search this topic",
  };
}

export default async function HomePage() {
  const now = new Date();
  const [activeAlerts, cityUpdates, communityEvents] = await Promise.all([
    getActivePublicAlerts(now),
    readPublishedCityUpdates(3),
    readPublishedCommunityEvents(2, now),
  ]);
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
            <p className="civic-eyebrow">Rawalpindi · Community services</p>
            <h1 id="help-heading" className="hero-title">
              What can we
              <br className="hidden lg:block" /> help you with?
            </h1>
            <p className="hero-description">
              Find services, local information, public notices and community
              updates for everyday life in Rawalpindi.
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
                Find what you need
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
              <p className="text-xs font-medium text-muted">Everyday tasks</p>
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

          <PublicGallery
            id="hero-gallery"
            label="Rawalpindi street and park photographs"
            variant="hero"
            initialPhotoId="lalkurti"
            preload
            sizes="(min-width: 1280px) 492px, (min-width: 1024px) 43vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
          />
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
                Most-used services
              </h2>
            </div>
            <Link href="/services" className="civic-link">
              Find a service <CivicIcon name="arrow" />
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
        className="home-service-information"
        aria-labelledby="service-information-heading"
      >
        <div className="civic-container service-information-grid">
          <div className="service-information-intro">
            <p className="civic-eyebrow">Before you set out</p>
            <h2 id="service-information-heading" className="service-information-title">
              Current service information
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Planned work and routine changes that may affect your day.
            </p>
          </div>
          <ServiceNotice {...serviceNotice} />
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
              Report a local problem
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
              A pothole, a broken streetlight or a missed collection? Find the
              right service and what to do next.
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

      <CityGlance />

      <section
        id="updates"
        className="home-updates scroll-mt-6"
        aria-labelledby="updates-heading"
      >
        <div className="civic-container">
          <div className="section-heading-row">
            <div>
              <p className="civic-eyebrow">In your city</p>
              <h2 id="updates-heading" className="civic-heading mt-4">
                Latest from Rawalpindi
              </h2>
            </div>
            <Link href="/notices" className="civic-link">
              View public notices <CivicIcon name="arrow" />
            </Link>
          </div>
          {featuredUpdate ? (
            <div className="updates-grid">
              <article
                className={
                  secondaryUpdates.length === 0
                    ? "featured-update lg:col-span-2"
                    : "featured-update"
                }
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  <p className="font-semibold text-civic">
                    {featuredUpdate.category}
                  </p>
                  <time
                    dateTime={
                      featuredUpdate.published_at ?? featuredUpdate.updated_at
                    }
                    className="text-muted"
                  >
                    {formatPublicDate(
                      featuredUpdate.published_at ?? featuredUpdate.updated_at,
                    )}
                  </time>
                </div>
                <h3>{featuredUpdate.title}</h3>
                <p className="mt-4 max-w-lg text-base leading-7 text-muted">
                  {featuredUpdate.summary}
                </p>
                <Link
                  href={getCityUpdateLink(featuredUpdate).href}
                  className="civic-link mt-6"
                >
                  {getCityUpdateLink(featuredUpdate).label}
                  <CivicIcon name="arrow" />
                </Link>
              </article>
              {secondaryUpdates.length > 0 ? (
                <ul className="secondary-updates">
                  {secondaryUpdates.map((update) => (
                    <li key={update.id}>
                      <article>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                          <p className="font-semibold text-civic">
                            {update.category}
                          </p>
                          <time
                            dateTime={update.published_at ?? update.updated_at}
                            className="text-muted"
                          >
                            {formatPublicDate(
                              update.published_at ?? update.updated_at,
                            )}
                          </time>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold leading-7 tracking-[-0.025em] text-ink">
                          {update.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {update.summary}
                        </p>
                        <Link
                          href={getCityUpdateLink(update).href}
                          className="civic-link mt-2"
                        >
                          {getCityUpdateLink(update).label}
                          <CivicIcon name="arrow" />
                        </Link>
                      </article>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : (
            <div className="civic-empty-state">
              <h3>No city updates are published at this time.</h3>
              <p>Find current guidance in service information and public notices.</p>
            </div>
          )}
        </div>
      </section>

      <section
        id="community"
        className="home-community scroll-mt-6"
        aria-labelledby="community-heading"
      >
        <div className="civic-container community-grid">
          <PublicGallery
            id="community-gallery"
            label="Around Rawalpindi photographs"
            variant="community"
            initialPhotoId="ayub-park"
            sizes="(min-width: 1280px) 556px, (min-width: 1024px) 46vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
          />
          <div className="community-content">
            <p className="civic-eyebrow">Our shared spaces</p>
            <h2 id="community-heading" className="civic-heading mt-4">
              Around Rawalpindi
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted">
              From neighbourhood streets to shared green spaces, explore
              community life and upcoming events across Rawalpindi.
            </p>
            <div id="community-events" className="scroll-mt-6">
            {communityEvents.length > 0 ? (
              <ul className="community-events">
                {communityEvents.map((event) => {
                  const dateParts = formatEventDate(event.starts_at).split(" ");

                  return (
                    <li key={event.id}>
                      <article>
                        <time
                          dateTime={event.starts_at}
                          className="community-date"
                        >
                          <span>{dateParts[0]}</span>
                          <span>{dateParts.slice(1).join(" ")}</span>
                        </time>
                        <div>
                          <h3 className="text-lg font-semibold leading-6 tracking-[-0.02em] text-ink">
                            {event.title}
                          </h3>
                          {event.location ? (
                            <p className="community-event-location">{event.location}</p>
                          ) : null}
                          <p className="mt-2 text-sm leading-6 text-muted">
                            {event.summary}
                          </p>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-7 border-t border-[#d1c6b4] py-5 text-sm leading-6 text-muted">
                There are no upcoming community events at this time.
              </p>
            )}
            </div>
            <Link href="/services/community-information-support" className="civic-link mt-4">
              Find community services <CivicIcon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="useful-information"
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
              Documents & useful information
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
