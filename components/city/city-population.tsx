import { CitySources } from "@/components/city/city-sources";
import { cityPopulationFacts } from "@/data/rawalpindi/overview";

export function CityPopulation({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <dl className={`city-population ${compact ? "city-population--compact" : ""}`.trim()}>
        {cityPopulationFacts.map((fact) => (
          <div key={fact.id} className="city-population-fact">
            <dt className="city-population-label">{fact.title}</dt>
            <dd className="city-population-number" aria-label={`${fact.value.toLocaleString("en-PK")} people`}>{fact.display}</dd>
            <dd className="city-population-detail">
              {fact.value.toLocaleString("en-PK")} people<br />
              {fact.context} · {fact.censusYear} Census
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-muted">
        City and district figures cover different geographic areas. These figures follow
        the areas used in the PBS 2023 census tables.
      </p>
      <CitySources ids={["pbs-corporation", "pbs-district"]} className="mt-5" />
    </div>
  );
}
