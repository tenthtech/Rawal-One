export type HomepageLink = {
  title: string;
  description: string;
  href: string;
};

export type ProblemPathway = HomepageLink & {
  linkLabel: string;
};

export type CityUpdate = {
  category: string;
  title: string;
  description: string;
  date: string;
  dateTime: string;
  href: string;
  linkLabel: string;
};

export type CommunityEvent = {
  title: string;
  description: string;
  date: string;
  dateTime: string;
};

export const serviceNotice = {
  label: "Service advisory",
  title: "Planned water maintenance in Satellite Town",
  description:
    "Scheduled maintenance may affect water pressure in parts of Satellite Town on 10 October.",
  metadata: [
    { label: "Affected area", value: "Satellite Town" },
    { label: "Status", value: "Planned maintenance" },
  ],
  href: "/services/water-service-interruptions",
  linkLabel: "View service update",
};

export const popularServices: HomepageLink[] = [
  {
    title: "Waste & recycling",
    description: "Collection schedules, missed pickups and disposal guidance.",
    href: "/services?category=waste-recycling",
  },
  {
    title: "Water & sewer services",
    description: "Service interruptions, billing information and new connections.",
    href: "/services?category=water-sewer",
  },
  {
    title: "Permits & applications",
    description: "Building, signage and other common applications.",
    href: "/services?category=permits-applications",
  },
  {
    title: "Roads & street issues",
    description: "Report potholes, streetlight problems and local road concerns.",
    href: "/services?category=roads-streets",
  },
  {
    title: "Parks & recreation",
    description: "Facilities, programmes and community spaces.",
    href: "/services?category=parks-recreation",
  },
  {
    title: "Licences & certificates",
    description: "Find common licences, certificates and application guidance.",
    href: "/services?category=licences-certificates",
  },
];

export const problemPathways: ProblemPathway[] = [
  {
    title: "Road or pothole issue",
    description: "Find help with damaged roads and street surfaces.",
    href: "/services?q=pothole&category=roads-streets",
    linkLabel: "Find road and pothole services",
  },
  {
    title: "Streetlight problem",
    description: "Find the right service for a faulty streetlight.",
    href: "/services?q=streetlight&category=roads-streets",
    linkLabel: "Find streetlight services",
  },
  {
    title: "Missed waste collection",
    description: "Get guidance when a scheduled pickup is missed.",
    href: "/services?q=missed%20collection&category=waste-recycling",
    linkLabel: "Find waste collection services",
  },
];

export const cityUpdates: CityUpdate[] = [
  {
    category: "Service update",
    title: "Road maintenance planned near Sixth Road",
    description:
      "Crews will carry out scheduled road maintenance in the area. Drivers should allow extra travel time.",
    date: "8 October 2026",
    dateTime: "2026-10-08",
    href: "/services?category=roads-streets",
    linkLabel: "Find road services",
  },
  {
    category: "Community",
    title: "Recreation programme registration opens Monday",
    description:
      "Registration will open for the next round of community recreation programmes.",
    date: "12 October 2026",
    dateTime: "2026-10-12",
    href: "/services?category=parks-recreation",
    linkLabel: "Find recreation services",
  },
  {
    category: "Public notice",
    title: "Development application consultation",
    description:
      "Residents can review information related to a demonstration development application and consultation period.",
    date: "5 October 2026",
    dateTime: "2026-10-05",
    href: "/notices#development-application-consultation",
    linkLabel: "Read public notice",
  },
];

export const communityEvents: CommunityEvent[] = [
  {
    title: "Community clean-up morning",
    description:
      "Neighbourhood volunteers can join a morning clean-up activity and waste-awareness session.",
    date: "17 October",
    dateTime: "2026-10-17",
  },
  {
    title: "Family recreation evening",
    description:
      "An evening of family activities and community recreation programming.",
    date: "24 October",
    dateTime: "2026-10-24",
  },
];

export const usefulLinks = [
  { label: "Browse all services", href: "/services" },
  { label: "Forms & documents", href: "/documents" },
  { label: "Accessibility statement", href: "/documents?q=accessibility" },
  { label: "Public notices", href: "/notices" },
  { label: "Community services", href: "/services?category=community-services" },
  { label: "About this demonstration", href: "/#about-this-demo" },
];
