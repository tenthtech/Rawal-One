export type CivicSource = {
  title: string;
  sourceName: string;
  sourceUrl: string;
  geographicScope: string;
  lastVerified: string;
  publishedAt?: string;
};

const checked = "2026-10-13";

export const civicSources = {
  "pbs-corporation": {
    title: "Census 2023 · urban localities, Table 2",
    sourceName: "Pakistan Bureau of Statistics",
    sourceUrl: "https://www.pbs.gov.pk/wp-content/uploads/census_tables/tables/table_2_punjab_districts.pdf#page=6",
    geographicScope: "Rawalpindi Metropolitan Corporation, PBS Census 2023 urban locality",
    lastVerified: checked,
  },
  "pbs-district": {
    title: "Census 2023 · districts, Table 1",
    sourceName: "Pakistan Bureau of Statistics",
    sourceUrl: "https://www.pbs.gov.pk/wp-content/uploads/census_tables/tables/table_1_punjab_districts.pdf#page=7",
    geographicScope: "Rawalpindi District as tabulated in PBS Census 2023",
    lastVerified: checked,
  },
  "punjab-tertiary": {
    title: "Teaching & specialized hospitals",
    sourceName: "Punjab Specialized Healthcare & Medical Education Department",
    sourceUrl: "https://health.punjab.gov.pk/TertiaryHospitals.aspx",
    geographicScope: "Punjab tertiary hospital directory, Rawalpindi entries",
    lastVerified: checked,
  },
  "ric-about": {
    title: "About the institution",
    sourceName: "Rawalpindi Institute of Cardiology",
    sourceUrl: "https://ric.gop.pk/about",
    geographicScope: "Rawalpindi Institute of Cardiology",
    lastVerified: checked,
  },
  "ric-contact": {
    title: "General enquiries",
    sourceName: "Rawalpindi Institute of Cardiology",
    sourceUrl: "https://ric.gop.pk/contact",
    geographicScope: "Rawalpindi Institute of Cardiology, general contact",
    lastVerified: checked,
  },
  "rescue-number": {
    title: "Emergency number 1122",
    sourceName: "Punjab Emergency Services Department",
    sourceUrl: "https://www.rescue.gov.pk/",
    geographicScope: "Punjab emergency service",
    lastVerified: checked,
  },
  "rescue-remit": {
    title: "Rescue 1122 services",
    sourceName: "Punjab Emergency Services Department",
    sourceUrl: "https://www.rescue.gov.pk/Introduction.aspx",
    geographicScope: "Punjab emergency service",
    lastVerified: checked,
  },
  "police-emergency": {
    title: "Police Emergency 15",
    sourceName: "Punjab Police",
    sourceUrl: "https://www.punjabpolice.gov.pk/",
    geographicScope: "Punjab Police emergency service",
    lastVerified: checked,
  },
  "police-directory": {
    title: "SDPOs and police stations · Rawalpindi",
    sourceName: "Punjab Police",
    sourceUrl: "https://www.punjabpolice.gov.pk/RawalpindiDirectory",
    geographicScope: "Published Rawalpindi directory, including Murree and Kotli Sattian",
    lastVerified: checked,
  },
  "pma-profile": {
    title: "Pakistan Metrobus System",
    sourceName: "Punjab Masstransit Authority",
    sourceUrl: "https://pma.punjab.gov.pk/pakistan-metrobus-system",
    geographicScope: "Rawalpindi–Islamabad Pakistan Metrobus System",
    lastVerified: checked,
  },
  "pma-terminals": {
    title: "Metrobus systems and official information",
    sourceName: "Punjab Masstransit Authority",
    sourceUrl: "https://pma.punjab.gov.pk/",
    geographicScope: "Pakistan Metrobus System, Saddar–Pak Secretariat corridor",
    lastVerified: checked,
  },
  "pma-map": {
    title: "Official Pakistan Metrobus route map",
    sourceName: "Punjab Masstransit Authority",
    sourceUrl: "https://pma.punjab.gov.pk/system/files/PMBS1.jpg",
    geographicScope: "Published Saddar–Pak Secretariat station sequence",
    lastVerified: checked,
  },
  "gov-ekhidmat-programme": {
    title: "Citizen Facilitation & Service Centers",
    sourceName: "Punjab Information Technology Board",
    sourceUrl: "https://pitb.gov.pk/cfsc",
    geographicScope: "Punjab e-Khidmat programme, including Rawalpindi",
    lastVerified: checked,
  },
  "gov-ekhidmat-rawalpindi": {
    title: "Rawalpindi e-Khidmat centre report",
    sourceName: "Punjab Information Technology Board",
    sourceUrl: "https://pitb.gov.pk/node/10466",
    geographicScope: "Rawalpindi e-Khidmat centre",
    lastVerified: checked,
    publishedAt: "2024-11-29",
  },
  "gov-district-pathways": {
    title: "Official government-service pathways",
    sourceName: "District Rawalpindi, Government of Punjab",
    sourceUrl: "https://rawalpindi.punjab.gov.pk/services",
    geographicScope: "District Rawalpindi links to Punjab government services",
    lastVerified: checked,
  },
  "gov-rda-functions": {
    title: "Powers & functions of the authority",
    sourceName: "Rawalpindi Development Authority",
    sourceUrl: "https://rda.gop.pk/authority",
    geographicScope: "RDA jurisdiction in Rawalpindi",
    lastVerified: checked,
  },
  "gov-wasa-role": {
    title: "Water, sewerage & sanitation services",
    sourceName: "WASA Rawalpindi",
    sourceUrl: "https://wasarwp.gop.pk/",
    geographicScope: "WASA Rawalpindi services",
    lastVerified: checked,
  },
  "flood-lai-2026": {
    title: "Monsoon Contingency Plan 2026 · Lai Nullah",
    sourceName: "PDMA Punjab",
    sourceUrl: "https://pdma.punjab.gov.pk/system/files/PDMA%20BOOk%202026-compressed.pdf#page=28",
    geographicScope: "Lai Nullah through Rawalpindi City, provincial monsoon planning",
    lastVerified: checked,
    publishedAt: "2026",
  },
  "flood-pdma-guidance": {
    title: "Safety measures regarding floods",
    sourceName: "PDMA Punjab",
    sourceUrl: "https://pdma.punjab.gov.pk/system/files/Untitled.pdf",
    geographicScope: "General Punjab flood safety guidance",
    lastVerified: checked,
  },
  "flood-pdma-pathways": {
    title: "Official weather & flood advisories",
    sourceName: "PDMA Punjab",
    sourceUrl: "https://pdma.punjab.gov.pk/advisories",
    geographicScope: "Punjab official advisory pathways",
    lastVerified: checked,
  },
  "places-district": {
    title: "Important public places",
    sourceName: "District Rawalpindi, Government of Punjab",
    sourceUrl: "https://rawalpindi.punjab.gov.pk/important_places",
    geographicScope: "District list, selected Rawalpindi city parks",
    lastVerified: checked,
  },
} as const satisfies Readonly<Record<string, CivicSource>>;

export type CivicSourceId = keyof typeof civicSources;

export type CivicReference = {
  sourceIds: readonly CivicSourceId[];
  geographicScope: string;
  lastVerified: string;
};
