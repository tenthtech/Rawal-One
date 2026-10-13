import Link from "next/link";

import { CityPopulation } from "@/components/city/city-population";
import { CivicIcon } from "@/components/civic-icon";
import { cityEssentials } from "@/data/rawalpindi/overview";

export function CityGlance() {
  return (
    <section id="city-at-a-glance" className="city-glance" aria-labelledby="city-glance-heading">
      <div className="civic-container">
        <div className="city-glance-layout">
          <div>
            <p className="civic-eyebrow">Know your city</p>
            <h2 id="city-glance-heading" className="civic-heading mt-4">Rawalpindi at a glance</h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-muted">Useful facts and everyday information about the city.</p>
            <Link className="civic-link mt-5" href="/rawalpindi">Explore Rawalpindi <CivicIcon name="arrow" /></Link>
          </div>
          <CityPopulation compact />
        </div>
        <nav aria-label="City essentials" className="city-glance-essentials">
          <p className="city-small-label">City essentials</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-1">
            {cityEssentials.map((item) => (
              <li key={item.href}><Link href={item.href} className="civic-link">{item.title}<CivicIcon name="arrow" /></Link></li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
