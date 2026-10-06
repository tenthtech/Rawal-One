type ServicePathway = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

type GuidanceStage = {
  title: string;
  items: readonly string[];
};

type FrequentlyAskedQuestion = {
  question: string;
  answer: string;
};

export const waterServiceDetail = {
  title: "Water service interruptions",
  summary:
    "Check planned maintenance, current service advisories and what to do when your water supply is interrupted.",
  category: "Water & sewer",
  categoryHref: "/services?category=water-sewer",
  status: {
    type: "Service advisory",
    heading: "Current service status",
    label: "Planned maintenance",
    description:
      "Scheduled water maintenance may affect water pressure in parts of Satellite Town.",
    affectedArea: "Satellite Town",
    impact: "Reduced water pressure or temporary interruption",
    maintenanceStart: {
      dateTime: "2026-10-07T10:00:00+05:00",
      label: "7 October 2026, 10:00 AM",
    },
    maintenanceEnd: {
      dateTime: "2026-10-07T14:00:00+05:00",
      label: "2:00 PM",
    },
    lastUpdated: {
      dateTime: "2026-10-06T16:30:00+05:00",
      label: "6 October 2026, 4:30 PM",
    },
  },
  immediateActions: [
    "Store enough drinking water for the maintenance period if your property is in the affected area.",
    "Keep taps closed during the interruption.",
    "When service returns, run a cold-water tap briefly if the water appears cloudy.",
    "If your supply has not returned after the maintenance window, use the service-help pathway below.",
  ],
  helpPathways: [
    {
      title: "Water still off after maintenance",
      description: "Guidance for residents whose service has not returned.",
      href: "#service-support",
      linkLabel: "Go to service support",
    },
    {
      title: "Water billing & account help",
      description: "Find guidance about water bills and account questions.",
      href: "/services?q=water%20billing&category=water-sewer",
      linkLabel: "Find billing help",
    },
    {
      title: "New water & sewer connections",
      description: "Information for new connections and service requests.",
      href: "/services?q=new%20water%20connections&category=water-sewer",
      linkLabel: "Find connection information",
    },
  ] satisfies readonly ServicePathway[],
  interruptionTypes: [
    {
      title: "Planned maintenance",
      description:
        "Scheduled work that residents may be notified about in advance.",
    },
    {
      title: "Unexpected interruption",
      description:
        "Unplanned loss of service caused by infrastructure faults, damage or emergency repair work.",
    },
  ],
  guidanceStages: [
    {
      title: "Before",
      items: [
        "Store drinking water if advance notice is provided.",
        "Complete water-dependent tasks beforehand where practical.",
        "Check the affected area and expected restoration time.",
      ],
    },
    {
      title: "During",
      items: [
        "Keep taps closed.",
        "Avoid running appliances that depend on water.",
        "Check Rawal One for updated service information.",
      ],
    },
    {
      title: "After",
      items: [
        "Run a cold-water tap briefly if needed.",
        "Follow any advisory information shown on the service page.",
        "Seek service help if supply has not returned.",
      ],
    },
  ] satisfies readonly GuidanceStage[],
  faqs: [
    {
      question: "Why has my water pressure dropped?",
      answer:
        "Planned maintenance or nearby infrastructure work can temporarily affect pressure.",
    },
    {
      question: "How long will an interruption last?",
      answer:
        "Use the latest service-status information shown at the top of the page. Restoration times may change if additional work is required.",
    },
    {
      question: "What should I do if my water has not returned?",
      answer:
        "Wait until the published maintenance window has ended, then use the service-help pathway shown on this page.",
    },
    {
      question: "Why can water look cloudy after service returns?",
      answer:
        "Temporary trapped air can sometimes make water appear cloudy after work. Let a cold tap run briefly and check the latest service guidance.",
    },
  ] satisfies readonly FrequentlyAskedQuestion[],
  support: {
    title: "Water Services Desk",
    serviceArea: "Rawalpindi demonstration area",
    hours: "Monday to Friday, 8:30 AM–4:30 PM",
    href: "/services?category=water-sewer",
    linkLabel: "Find service help",
  },
  relatedServices: [
    {
      label: "Water billing & account help",
      href: "/services?q=water%20billing&category=water-sewer",
    },
    {
      label: "New water & sewer connections",
      href: "/services?q=new%20water%20connections&category=water-sewer",
    },
    {
      label: "Road works & local closures",
      href: "/services?q=road%20works&category=roads-streets",
    },
  ],
  contentOwner: "Water & sewer services",
  contentLastUpdated: {
    dateTime: "2026-10-06",
    label: "6 October 2026",
  },
} as const;
