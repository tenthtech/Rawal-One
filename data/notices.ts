export type PublicNotice = {
  slug: string;
  title: string;
  category: string;
  status: "Open" | "Current" | "Open for feedback";
  publishedDate: string;
  publishedDateTime: string;
  closingDate?: string;
  closingDateTime?: string;
  summary: string;
  detail: readonly string[];
  keywords: readonly string[];
  relatedLink?: {
    label: string;
    href: string;
  };
};

export const publicNotices: readonly PublicNotice[] = [
  {
    slug: "development-application-consultation",
    title: "Development application consultation",
    category: "Planning & development",
    status: "Open",
    publishedDate: "5 October 2026",
    publishedDateTime: "2026-10-05",
    closingDate: "30 October 2026",
    closingDateTime: "2026-10-30",
    summary:
      "Residents can review information related to a demonstration development application and consultation period.",
    detail: [
      "This demonstration notice outlines an illustrative proposal for common building and development work. It does not relate to a real property or planning decision.",
      "The notice summarises the example consultation period and the general information a resident might expect to review through a municipal website.",
    ],
    keywords: [
      "development",
      "application",
      "permit",
      "planning",
      "consultation",
      "building",
    ],
    relatedLink: {
      label: "View the building permit application form",
      href: "/documents#building-permit-application-form",
    },
  },
  {
    slug: "temporary-traffic-management-notice",
    title: "Temporary traffic management notice",
    category: "Roads & transport",
    status: "Current",
    publishedDate: "7 October 2026",
    publishedDateTime: "2026-10-07",
    summary:
      "Temporary traffic changes will apply during scheduled demonstration maintenance activity.",
    detail: [
      "This notice demonstrates how temporary traffic information could be presented while routine road maintenance is under way.",
      "Residents should use the current road-services information for available guidance about closures, diversions and street conditions in this demonstration.",
    ],
    keywords: [
      "road",
      "traffic",
      "transport",
      "maintenance",
      "temporary closure",
      "diversion",
    ],
    relatedLink: {
      label: "Find road works and closure information",
      href: "/services?q=road%20works&category=roads-streets",
    },
  },
  {
    slug: "community-facility-operating-hours-update",
    title: "Community facility operating-hours update",
    category: "Community services",
    status: "Current",
    publishedDate: "6 October 2026",
    publishedDateTime: "2026-10-06",
    summary:
      "Updated demonstration operating hours apply to selected community facilities.",
    detail: [
      "Selected demonstration facilities use an updated weekday timetable for general enquiries and community bookings.",
      "This example shows how residents could find a concise operating-hours update alongside related facility information.",
    ],
    keywords: [
      "community facility",
      "operating hours",
      "opening times",
      "recreation",
      "booking",
      "community services",
    ],
    relatedLink: {
      label: "View the community facility booking form",
      href: "/documents#community-facility-booking-form",
    },
  },
  {
    slug: "waste-collection-schedule-consultation",
    title: "Waste collection schedule consultation",
    category: "Waste & recycling",
    status: "Open for feedback",
    publishedDate: "28 September 2026",
    publishedDateTime: "2026-09-28",
    closingDate: "23 October 2026",
    closingDateTime: "2026-10-23",
    summary:
      "Residents can review a proposed demonstration change to collection scheduling.",
    detail: [
      "This demonstration notice presents an illustrative change to the timing of selected household collection routes.",
      "It shows the type of schedule information and closing date that a municipal consultation notice could make easy to find.",
    ],
    keywords: [
      "waste",
      "garbage",
      "trash",
      "recycling",
      "collection schedule",
      "consultation",
      "feedback",
    ],
    relatedLink: {
      label: "Download the waste collection guide",
      href: "/documents#waste-collection-guide-2026",
    },
  },
];
