import type { CivicReference } from "@/data/rawalpindi/sources";

export type MetroStation = {
  id: string;
  title: string;
  order: number;
};

// Names and sequence are transcribed from PMA's published Pakistan Metrobus map.
// The numbers describe route order, not official station identifiers.
export const metroStations = [
  { id: "saddar", title: "Saddar", order: 1 },
  { id: "marrir-chowk", title: "Marrir Chowk", order: 2 },
  { id: "liaquat-bagh", title: "Liaquat Bagh", order: 3 },
  { id: "committee-chowk", title: "Committee Chowk", order: 4 },
  { id: "waris-khan", title: "Waris Khan", order: 5 },
  { id: "chandni-chowk", title: "Chandni Chowk", order: 6 },
  { id: "rehmanabad", title: "Rehmanabad", order: 7 },
  { id: "6th-road-station", title: "6th Road Station", order: 8 },
  { id: "shamsabad", title: "Shamsabad", order: 9 },
  { id: "faizabad", title: "Faizabad", order: 10 },
  { id: "ijp", title: "IJP", order: 11 },
  { id: "potohar", title: "Potohar", order: 12 },
  { id: "khayaban-e-johar", title: "Khayaban-e-Johar", order: 13 },
  { id: "faiz-ahmed-faiz", title: "Faiz Ahmed Faiz", order: 14 },
  { id: "kashmir-highway", title: "Kashmir Highway", order: 15 },
  { id: "chaman", title: "Chaman", order: 16 },
  { id: "ibn-e-sina", title: "Ibn-e-Sina", order: 17 },
  { id: "katchery", title: "Katchery", order: 18 },
  { id: "pims", title: "PIMS", order: 19 },
  { id: "stock-exchange", title: "Stock Exchange", order: 20 },
  { id: "7th-avenue", title: "7th Avenue", order: 21 },
  { id: "shaheed-e-millat", title: "Shaheed-e-Millat", order: 22 },
  { id: "parade-ground", title: "Parade Ground", order: 23 },
  { id: "pak-secretariat", title: "Pak Secretariat", order: 24 },
] as const satisfies readonly MetroStation[];

export const metroRoute = {
  title: "Rawalpindi–Islamabad Metrobus",
  officialName: "Pakistan Metrobus System",
  description:
    "Follow the published station sequence between Saddar and Pak Secretariat, with official links for planning your journey.",
  terminals: [metroStations[0].title, metroStations[metroStations.length - 1].title],
  stationCount: metroStations.length,
  sourceIds: ["pma-profile", "pma-terminals", "pma-map"],
  geographicScope: "Pakistan Metrobus System, Saddar–Pak Secretariat corridor between Rawalpindi and Islamabad",
  lastVerified: "2026-10-13",
} as const satisfies CivicReference & {
  title: string;
  officialName: string;
  description: string;
  terminals: readonly string[];
  stationCount: number;
};
