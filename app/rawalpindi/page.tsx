import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CityPopulation } from "@/components/city/city-population";
import { CityContextNote, CitySources } from "@/components/city/city-sources";
import { CivicIcon } from "@/components/civic-icon";
import { PlacePhotograph } from "@/components/place-photograph";
import { cityEssentials } from "@/data/rawalpindi/overview";
import { cityPlaces } from "@/data/rawalpindi/places";
import { rawalpindiGalleryPhotos } from "@/data/rawalpindi-gallery";

export const metadata: Metadata = {
  title: "Know Rawalpindi",
  description: "Practical, sourced information about Rawalpindi: population, hospitals, emergency services, government pathways, Metrobus and public places.",
};

const topics = [
  { number: "01", title: "Health & emergency", description: "Emergency numbers and official information for major hospitals.", href: "/rawalpindi/health-emergency", label: "Find health information" },
  { number: "02", title: "Police & public safety", description: "Find a station or police post in the published Punjab Police directory.", href: "/rawalpindi/public-safety", label: "Find a police station" },
  { number: "03", title: "Government services", description: "Follow official pathways for certificates, licences and public services.", href: "/rawalpindi/government-services", label: "Find the right provider" },
  { number: "04", title: "Nullah Lai", description: "Understand the city watercourse and find official flood-awareness guidance.", href: "/rawalpindi/nullah-lai", label: "Understand Nullah Lai" },
] as const;

export default function RawalpindiPage() {
  const hero = rawalpindiGalleryPhotos.find((photo) => photo.id === "murree-road")!;

  return (
    <>
      <section className="city-hub-hero" aria-labelledby="rawalpindi-heading">
        <div className="civic-container city-hub-hero-grid">
          <div className="city-hub-hero-copy">
            <p className="civic-eyebrow">Our city, everyday</p>
            <h1 id="rawalpindi-heading" className="city-hub-title">Know Rawalpindi</h1>
            <p className="city-hub-description">Practical information about the city, public services, transport, health, safety and places residents use every day.</p>
            <nav aria-label="Rawalpindi information sections" className="city-hub-jump-nav">
              <a href="#at-a-glance" className="civic-link">City at a glance<CivicIcon name="arrow" /></a>
              <a href="#city-essentials" className="civic-link">City essentials<CivicIcon name="arrow" /></a>
              <a href="#places" className="civic-link">Around the city<CivicIcon name="arrow" /></a>
            </nav>
          </div>
          <figure className="city-hub-hero-figure">
            <div className="city-hub-photo-window"><Image src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} sizes="(min-width: 1024px) 48vw, 100vw" preload className="city-hub-photo" /></div>
            <figcaption className="city-hub-photo-caption"><span>{hero.place}</span><span>{hero.caption}</span></figcaption>
          </figure>
        </div>
      </section>

      <section id="at-a-glance" className="city-hub-section bg-surface" aria-labelledby="city-facts-heading">
        <div className="civic-container">
          <div className="city-section-heading">
            <p className="civic-eyebrow">People & place</p>
            <h2 id="city-facts-heading" className="civic-heading mt-3">Rawalpindi at a glance</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">Two census geographies. A clearer picture of the city and its wider district.</p>
          </div>
          <CityPopulation />
        </div>
      </section>

      <section id="city-essentials" className="city-hub-section" aria-labelledby="city-essentials-heading">
        <div className="civic-container">
          <div className="city-section-heading">
            <p className="civic-eyebrow">Find your way</p>
            <h2 id="city-essentials-heading" className="civic-heading mt-3">City essentials</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">Start with the information you need. Official sources and service providers are clearly identified on each page.</p>
          </div>
          <nav aria-label="City essentials">
            <ul className="city-essentials-list">
              {cityEssentials.map((item) => (
                <li key={item.href}><Link className="city-essential-link" href={item.href}><span><strong>{item.title}</strong><span>{item.description}</span></span><CivicIcon name="arrow" /></Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="city-hub-transport" aria-labelledby="hub-transport-heading">
        <div className="civic-container city-hub-transport-grid">
          <div>
            <p className="civic-eyebrow">Getting around</p>
            <h2 id="hub-transport-heading" className="civic-heading mt-4">One route.<br />Twenty-four stations.</h2>
            <p className="mt-5 max-w-xl text-base leading-7">Explore PMA’s published Rawalpindi–Islamabad Metrobus route, from Saddar to Pak Secretariat, with a complete station list and an accessible route diagram.</p>
            <Link href="/rawalpindi/metrobus" className="civic-link mt-5">Explore the Metrobus route<CivicIcon name="arrow" /></Link>
          </div>
          <div className="city-hub-route" aria-label="Metrobus route endpoints">
            <p><span className="city-hub-route-dot" aria-hidden="true" /><strong>Saddar</strong><span>Start terminal</span></p>
            <span className="city-hub-route-line" aria-hidden="true" />
            <p><span className="city-hub-route-dot" aria-hidden="true" /><strong>Pak Secretariat</strong><span>End terminal</span></p>
            <p className="city-hub-route-label">Pakistan Metrobus System<br />Rawalpindi–Islamabad</p>
          </div>
        </div>
        <div className="civic-container"><CitySources ids={["pma-profile", "pma-map"]} className="mt-7" /></div>
      </section>

      <section className="city-hub-section bg-surface" aria-labelledby="city-information-heading">
        <div className="civic-container">
          <div className="city-section-heading"><p className="civic-eyebrow">Everyday information</p><h2 id="city-information-heading" className="civic-heading mt-3">Understand the services around you</h2></div>
          <div className="city-topic-grid">
            {topics.map((topic) => (
              <article className="city-topic" key={topic.href}>
                <span className="city-topic-number" aria-hidden="true">{topic.number}</span>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em] text-ink">{topic.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{topic.description}</p>
                <Link href={topic.href} className="civic-link mt-4">{topic.label}<CivicIcon name="arrow" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="places" className="city-hub-section" aria-labelledby="city-places-heading">
        <div className="civic-container city-places-grid">
          <div>
            <p className="civic-eyebrow">Around the city</p>
            <h2 id="city-places-heading" className="civic-heading mt-3">Shared places,<br />local connections.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">Recognizable places, alongside the practical information that helps residents navigate everyday city life.</p>
            <ul className="city-place-list">
              {cityPlaces.map((place) => (
                <li key={place.id} id={`place-${place.id}`}>
                  <p className="city-small-label">{place.category}</p>
                  <h3 className="mt-2 text-xl font-semibold text-ink">{place.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{place.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-5 text-muted">For current visiting information, confirm details with the relevant public authority.</p>
            <CitySources ids={["places-district"]} className="mt-5" />
          </div>
          <PlacePhotograph photoId="ayub-park" sizes="(min-width: 1024px) 42vw, 100vw" className="city-places-photograph" />
        </div>
      </section>
      <CityContextNote />
    </>
  );
}
