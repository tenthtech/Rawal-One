export const serviceCategories = [
  { slug: "waste-recycling", label: "Waste & recycling" },
  { slug: "water-sewer", label: "Water & sewer" },
  { slug: "roads-streets", label: "Roads & streets" },
  { slug: "permits-applications", label: "Permits & development" },
  { slug: "parks-recreation", label: "Parks & recreation" },
  { slug: "licences-certificates", label: "Licences & certificates" },
  { slug: "community-services", label: "Community services" },
] as const;

export type ServiceCategorySlug = (typeof serviceCategories)[number]["slug"];

export type ServiceRecord = {
  slug: string;
  title: string;
  summary: string;
  category: ServiceCategorySlug;
  keywords: readonly string[];
};

export const services = [
  {
    slug: "waste-collection-schedules",
    title: "Waste collection schedules",
    summary: "Find regular household waste collection information.",
    category: "waste-recycling",
    keywords: [
      "garbage",
      "rubbish",
      "trash",
      "refuse",
      "household waste",
      "bins",
      "pickup",
      "collection day",
      "collection calendar",
    ],
  },
  {
    slug: "missed-waste-collection",
    title: "Missed waste collection",
    summary: "Find help when scheduled household waste was not collected.",
    category: "waste-recycling",
    keywords: [
      "garbage",
      "rubbish",
      "bin",
      "pickup",
      "not collected",
      "skipped collection",
      "report",
      "issue",
    ],
  },
  {
    slug: "bulky-waste-disposal-guidance",
    title: "Bulky waste & disposal guidance",
    summary: "Guidance for larger household items and responsible disposal.",
    category: "waste-recycling",
    keywords: [
      "large items",
      "furniture",
      "appliances",
      "dumping",
      "recycling centre",
      "recycling center",
    ],
  },
  {
    slug: "water-service-interruptions",
    title: "Water service interruptions",
    summary: "Check service advisories and planned maintenance information.",
    category: "water-sewer",
    keywords: [
      "water outage",
      "no water",
      "low pressure",
      "water pressure",
      "supply",
      "maintenance",
      "service advisory",
      "Satellite Town",
    ],
  },
  {
    slug: "water-billing-account-help",
    title: "Water billing & account help",
    summary: "Find guidance about water bills and account questions.",
    category: "water-sewer",
    keywords: ["water bill", "billing", "account", "payment", "charges", "meter"],
  },
  {
    slug: "new-water-sewer-connections",
    title: "New water & sewer connections",
    summary: "Information for new connections and service requests.",
    category: "water-sewer",
    keywords: [
      "new connection",
      "sewerage",
      "water supply",
      "application",
      "apply",
      "forms",
      "documents",
    ],
  },
  {
    slug: "report-pothole-road-issue",
    title: "Report a pothole or road issue",
    summary: "Find the correct pathway for damaged roads and street surfaces.",
    category: "roads-streets",
    keywords: ["pothole", "road damage", "damaged road", "street surface", "repair", "report"],
  },
  {
    slug: "report-streetlight-problem",
    title: "Report a streetlight problem",
    summary: "Find help for faulty or damaged streetlights.",
    category: "roads-streets",
    keywords: [
      "street light",
      "lamp",
      "lighting",
      "broken light",
      "faulty light",
      "damaged",
      "report",
    ],
  },
  {
    slug: "road-works-local-closures",
    title: "Road works & local closures",
    summary: "Check information about scheduled road maintenance and closures.",
    category: "roads-streets",
    keywords: ["roadworks", "traffic", "diversion", "Sixth Road"],
  },
  {
    slug: "building-permits-applications",
    title: "Building permits & applications",
    summary: "Guidance for common building and development applications.",
    category: "permits-applications",
    keywords: [
      "permit",
      "approval",
      "construction",
      "planning",
      "renovation",
      "forms",
      "documents",
      "apply",
    ],
  },
  {
    slug: "signage-commercial-permits",
    title: "Signage & commercial permits",
    summary: "Information about signage and related commercial permissions.",
    category: "permits-applications",
    keywords: [
      "permit",
      "permission",
      "signboard",
      "business",
      "shop",
      "application",
      "forms",
      "documents",
    ],
  },
  {
    slug: "development-information",
    title: "Development information",
    summary: "Access development-related guidance and public information.",
    category: "permits-applications",
    keywords: [
      "planning",
      "public notice",
      "consultation",
      "application review",
      "land use",
      "documents",
    ],
  },
  {
    slug: "parks-community-facilities",
    title: "Parks & community facilities",
    summary: "Find parks, facilities and community spaces.",
    category: "parks-recreation",
    keywords: [
      "park",
      "playground",
      "garden",
      "facility",
      "community centre",
      "community center",
      "booking",
      "sports ground",
      "open space",
    ],
  },
  {
    slug: "recreation-programmes",
    title: "Recreation programmes",
    summary: "Find information about recreation activities and programme registration.",
    category: "parks-recreation",
    keywords: ["program", "sports", "classes", "family", "youth", "events"],
  },
  {
    slug: "licences-certificates",
    title: "Licences & certificates",
    summary: "Find common licence, certificate and application guidance.",
    category: "licences-certificates",
    keywords: [
      "license",
      "licensing",
      "certification",
      "application",
      "forms",
      "documents",
      "records",
    ],
  },
  {
    slug: "community-information-support",
    title: "Community information & support",
    summary: "Find useful local information, public resources and community support pathways.",
    category: "community-services",
    keywords: [
      "resident help",
      "accessibility",
      "accessible",
      "disability",
      "contact information",
      "contact",
      "phone",
      "telephone",
      "address",
      "office",
      "forms",
      "documents",
    ],
  },
] as const satisfies readonly ServiceRecord[];

const categoryAliases: Record<string, ServiceCategorySlug> = {
  waste: "waste-recycling",
  water: "water-sewer",
  roads: "roads-streets",
  permits: "permits-applications",
  parks: "parks-recreation",
  licences: "licences-certificates",
  licenses: "licences-certificates",
  community: "community-services",
};

export function getServiceCategory(value: string | undefined) {
  if (!value) return undefined;

  const canonicalValue = categoryAliases[value] ?? value;

  return serviceCategories.find((category) => category.slug === canonicalValue);
}

export function getServiceCategoryLabel(categorySlug: ServiceCategorySlug) {
  return serviceCategories.find((category) => category.slug === categorySlug)?.label;
}
