export const documentCategories = [
  { slug: "waste-recycling", label: "Waste & recycling" },
  { slug: "permits-development", label: "Permits & development" },
  { slug: "water-sewer", label: "Water & sewer" },
  { slug: "parks-recreation", label: "Parks & recreation" },
  { slug: "roads-streets", label: "Roads & streets" },
  { slug: "community-services", label: "Community services" },
  { slug: "corporate-information", label: "Corporate information" },
  { slug: "public-safety", label: "Public safety" },
] as const;

export type DocumentCategorySlug = (typeof documentCategories)[number]["slug"];

export type MunicipalDocument = {
  slug: string;
  title: string;
  format: "PDF";
  category: DocumentCategorySlug;
  updatedDate: string;
  updatedDateTime: string;
  description: string;
  fileName: string;
  href: `/documents/${string}.pdf`;
  keywords: readonly string[];
};

export const municipalDocuments = [
  {
    slug: "waste-collection-guide-2026",
    title: "Waste collection guide 2026",
    format: "PDF",
    category: "waste-recycling",
    updatedDate: "1 September 2026",
    updatedDateTime: "2026-09-01",
    description: "Household collection, disposal and recycling guidance.",
    fileName: "waste-collection-guide-2026.pdf",
    href: "/documents/waste-collection-guide-2026.pdf",
    keywords: [
      "waste",
      "garbage",
      "trash",
      "recycling",
      "collection schedule",
      "household bins",
      "disposal",
    ],
  },
  {
    slug: "building-permit-application-form",
    title: "Building permit application form",
    format: "PDF",
    category: "permits-development",
    updatedDate: "12 August 2026",
    updatedDateTime: "2026-08-12",
    description: "Application form for common building and development work.",
    fileName: "building-permit-application-form.pdf",
    href: "/documents/building-permit-application-form.pdf",
    keywords: [
      "building permit",
      "application",
      "development",
      "construction",
      "planning",
      "renovation",
      "form",
    ],
  },
  {
    slug: "water-connection-request-form",
    title: "Water connection request form",
    format: "PDF",
    category: "water-sewer",
    updatedDate: "20 August 2026",
    updatedDateTime: "2026-08-20",
    description: "Form for requesting a new municipal water or sewer connection.",
    fileName: "water-connection-request-form.pdf",
    href: "/documents/water-connection-request-form.pdf",
    keywords: [
      "water",
      "sewer",
      "connection",
      "supply",
      "application",
      "request",
      "form",
    ],
  },
  {
    slug: "community-facility-booking-form",
    title: "Community facility booking form",
    format: "PDF",
    category: "parks-recreation",
    updatedDate: "3 September 2026",
    updatedDateTime: "2026-09-03",
    description: "Request form for selected community facilities and spaces.",
    fileName: "community-facility-booking-form.pdf",
    href: "/documents/community-facility-booking-form.pdf",
    keywords: [
      "community facility",
      "booking",
      "park",
      "recreation",
      "hall",
      "space",
      "form",
    ],
  },
  {
    slug: "road-excavation-permit-guidance",
    title: "Road excavation permit guidance",
    format: "PDF",
    category: "roads-streets",
    updatedDate: "14 July 2026",
    updatedDateTime: "2026-07-14",
    description: "Guidance for road excavation and related permissions.",
    fileName: "road-excavation-permit-guidance.pdf",
    href: "/documents/road-excavation-permit-guidance.pdf",
    keywords: [
      "road",
      "street",
      "excavation",
      "permit",
      "permission",
      "works",
      "guidance",
    ],
  },
  {
    slug: "public-information-request-form",
    title: "Public information request form",
    format: "PDF",
    category: "community-services",
    updatedDate: "18 August 2026",
    updatedDateTime: "2026-08-18",
    description: "General demonstration form for requesting municipal information.",
    fileName: "public-information-request-form.pdf",
    href: "/documents/public-information-request-form.pdf",
    keywords: [
      "public information",
      "records",
      "resident request",
      "community",
      "information access",
      "form",
    ],
  },
  {
    slug: "accessibility-statement",
    title: "Accessibility statement",
    format: "PDF",
    category: "corporate-information",
    updatedDate: "30 June 2026",
    updatedDateTime: "2026-06-30",
    description: "Rawal One accessibility approach and resident support information.",
    fileName: "accessibility-statement.pdf",
    href: "/documents/accessibility-statement.pdf",
    keywords: [
      "accessibility",
      "accessible",
      "disability",
      "support",
      "inclusive",
      "statement",
    ],
  },
  {
    slug: "emergency-preparedness-guide",
    title: "Emergency preparedness guide",
    format: "PDF",
    category: "public-safety",
    updatedDate: "25 August 2026",
    updatedDateTime: "2026-08-25",
    description: "General preparedness information for households and communities.",
    fileName: "emergency-preparedness-guide.pdf",
    href: "/documents/emergency-preparedness-guide.pdf",
    keywords: [
      "emergency",
      "preparedness",
      "safety",
      "household plan",
      "community",
      "supplies",
      "guide",
    ],
  },
] as const satisfies readonly MunicipalDocument[];

export function getDocumentCategoryLabel(categorySlug: DocumentCategorySlug) {
  return documentCategories.find((category) => category.slug === categorySlug)?.label;
}
