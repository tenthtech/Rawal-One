import type { CivicReference } from "@/data/rawalpindi/sources";

type PopulationFact = CivicReference & {
  id: string;
  title: string;
  display: string;
  value: number;
  censusYear: number;
  context: string;
};

export const cityPopulationFacts = [
  {
    id: "metropolitan-corporation",
    title: "Rawalpindi Metropolitan Corporation",
    display: "2.28M",
    value: 2284014,
    censusYear: 2023,
    context: "Metropolitan Corporation · urban locality",
    sourceIds: ["pbs-corporation"],
    geographicScope: "Rawalpindi Metropolitan Corporation, PBS Census 2023 urban locality",
    lastVerified: "2026-10-13",
  },
  {
    id: "district",
    title: "Rawalpindi District",
    display: "6.12M",
    value: 6118911,
    censusYear: 2023,
    context: "District · PBS census geography",
    sourceIds: ["pbs-district"],
    geographicScope: "Rawalpindi District as tabulated by PBS for Census 2023",
    lastVerified: "2026-10-13",
  },
] as const satisfies readonly PopulationFact[];

export const cityEssentials = [
  { href: "/rawalpindi/health-emergency#emergency-numbers", title: "Emergency numbers", description: "Official emergency pathways, clearly identified." },
  { href: "/rawalpindi/health-emergency#major-hospitals", title: "Hospitals", description: "Find official hospital information." },
  { href: "/rawalpindi/public-safety#police-stations", title: "Police stations", description: "Browse the published Punjab Police directory." },
  { href: "/rawalpindi/government-services", title: "Government services", description: "Certificates, licences and official providers." },
  { href: "/rawalpindi/metrobus", title: "Metrobus", description: "The published route, station by station." },
] as const;
