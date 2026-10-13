import { civicSources, type CivicSourceId } from "@/data/rawalpindi/sources";
import { ExternalArrow } from "@/components/city/external-arrow";

const verifiedDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function CitySources({ ids, className = "" }: { ids: readonly CivicSourceId[]; className?: string }) {
  const verifiedDates = [...new Set(ids.map((id) => civicSources[id].lastVerified))].sort();

  return (
    <div className={`city-source-note ${className}`.trim()}>
      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">Official sources</p>
      <ul className="flex flex-wrap gap-x-6">
        {ids.map((id) => {
          const source = civicSources[id];
          return (
            <li key={id} className="min-w-0 max-w-full">
              <a className="civic-link text-xs" href={source.sourceUrl}>
                <span>{source.sourceName} · {source.title}</span><ExternalArrow />
              </a>
            </li>
          );
        })}
      </ul>
      <p className="text-xs leading-5 text-muted">
        Last verified: {verifiedDates.map((date, index) => (
          <span key={date}>{index > 0 ? "; " : ""}<time dateTime={date}>{verifiedDateFormatter.format(new Date(date))}</time></span>
        ))}.
      </p>
    </div>
  );
}

export function CityContextNote() {
  return (
    <aside className="border-t border-line bg-surface" aria-label="About this information">
      <div className="civic-container py-7">
        <p className="max-w-3xl text-sm leading-6 text-muted">
          Rawal One brings together information from public sources for this R&amp;D demonstration.
          For urgent or time-sensitive information, confirm details with the relevant official service.
        </p>
      </div>
    </aside>
  );
}
