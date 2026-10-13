import type { CivicReference } from "@/data/rawalpindi/sources";

export type GovernmentPathway = CivicReference & {
  id: string;
  title: string;
  description: string;
  href: string;
};

const districtServices = "https://rawalpindi.punjab.gov.pk/services";
const districtReference = {
  sourceIds: ["gov-district-pathways"],
  geographicScope: "District Rawalpindi links to Punjab government services",
  lastVerified: "2026-10-13",
} as const satisfies CivicReference;

export const governmentServices = [
  {
    id: "birth-certificate",
    title: "Birth certificate",
    description: "Find official information about obtaining a birth certificate.",
    href: districtServices,
    ...districtReference,
  },
  {
    id: "death-certificate",
    title: "Death certificate",
    description: "Find the official pathway for a death certificate.",
    href: districtServices,
    ...districtReference,
  },
  {
    id: "marriage-certificate",
    title: "Marriage certificate",
    description: "Find official marriage-certificate service information.",
    href: districtServices,
    ...districtReference,
  },
  {
    id: "domicile-certificate",
    title: "Domicile certificate",
    description: "Find the government pathway for a domicile certificate.",
    href: districtServices,
    ...districtReference,
  },
  {
    id: "character-certificate",
    title: "Character certificate",
    description: "Find official information about the character-certificate service.",
    href: districtServices,
    ...districtReference,
  },
  {
    id: "learner-driving-licence",
    title: "Learner driving licence",
    description: "Find official information for the learner-licence service.",
    href: districtServices,
    ...districtReference,
  },
  {
    id: "fard",
    title: "Issuance of Fard",
    description: "Find the official Fard service pathway in the district directory.",
    href: districtServices,
    ...districtReference,
  },
] as const satisfies readonly GovernmentPathway[];

export const publicOffices = [
  {
    id: "district-administration",
    title: "District Administration Rawalpindi",
    description: "District service information and pathways to government services.",
    href: districtServices,
    ...districtReference,
  },
  {
    id: "e-khidmat",
    title: "e-Khidmat Markaz",
    description: "A shared pathway to Punjab government services, including certificates and licences.",
    href: "https://pitb.gov.pk/cfsc",
    sourceIds: ["gov-ekhidmat-programme", "gov-ekhidmat-rawalpindi"],
    geographicScope: "Punjab e-Khidmat programme and Rawalpindi centre",
    lastVerified: "2026-10-13",
  },
  {
    id: "wasa-rawalpindi",
    title: "WASA Rawalpindi",
    description: "Water supply, sewerage and sanitation services.",
    href: "https://wasarwp.gop.pk/",
    sourceIds: ["gov-wasa-role"],
    geographicScope: "WASA Rawalpindi services, not all district or cantonment services",
    lastVerified: "2026-10-13",
  },
  {
    id: "rda",
    title: "Rawalpindi Development Authority",
    description: "Urban development planning, building and land-use controls, and private housing-scheme approvals.",
    href: "https://rda.gop.pk/authority",
    sourceIds: ["gov-rda-functions"],
    geographicScope: "RDA jurisdiction in Rawalpindi",
    lastVerified: "2026-10-13",
  },
  {
    id: "pdma-punjab",
    title: "PDMA Punjab",
    description: "Official provincial weather and flood advisory pathways.",
    href: "https://pdma.punjab.gov.pk/advisories",
    sourceIds: ["flood-pdma-pathways"],
    geographicScope: "Punjab official advisory pathways",
    lastVerified: "2026-10-13",
  },
] as const satisfies readonly GovernmentPathway[];

export const eKhidmatCentre = {
  title: "e-Khidmat Markaz Rawalpindi",
  description: "A government-service centre bringing several departments together.",
  reportDate: "2024-11-29",
  reportDescription:
    "PITB’s November 2024 report on the Rawalpindi centre lists NADRA, Traffic Police driving-licence services, Excise, the Punjab Land Record Authority and e-Stamping.",
  beforeVisiting:
    "Check the official provider for current services and requirements before visiting. The dated centre report does not confirm today’s availability.",
  href: "https://pitb.gov.pk/cfsc",
  sourceIds: ["gov-ekhidmat-programme", "gov-ekhidmat-rawalpindi"],
  geographicScope: "Rawalpindi e-Khidmat centre, within the Punjab programme",
  lastVerified: "2026-10-13",
} as const satisfies CivicReference & {
  title: string;
  description: string;
  reportDate: string;
  reportDescription: string;
  beforeVisiting: string;
  href: string;
};
