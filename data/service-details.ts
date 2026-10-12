import { services } from "@/data/services";
import type { ServiceCategorySlug } from "@/data/services";

type CatalogServiceSlug = (typeof services)[number]["slug"];

export type ServiceDetailSlug = Exclude<
  CatalogServiceSlug,
  "water-service-interruptions"
>;

export type PublicServiceDetail = {
  slug: ServiceDetailSlug;
  title: string;
  category: ServiceCategorySlug;
  summary: string;
  serviceNote: string;
  helpsWith: readonly string[];
  steps: readonly { title: string; body: string }[];
  readyInformation: readonly string[];
  pathways: readonly { href: string; label: string; description: string }[];
  faqs: readonly { question: string; answer: string }[];
  support: {
    title: string;
    description: string;
    items: readonly string[];
    href: string;
    linkLabel: string;
  };
  relatedSlugs: readonly CatalogServiceSlug[];
  updatedAt: string;
};

const demonstrationNote =
  "This is informational guidance for the Rawal One demonstration. This website does not accept service requests, applications or personal documents. Confirm current arrangements with the responsible local authority.";

export const serviceDetails = [
  {
    slug: "waste-collection-schedules",
    title: "Waste collection schedules",
    category: "waste-recycling",
    summary:
      "Understand household collection guidance and prepare the information you need to confirm your area's collection arrangements.",
    serviceNote: demonstrationNote,
    helpsWith: [
      "Finding household waste and recycling guidance",
      "Checking how changes or public notices may affect collection",
      "Preparing questions about your street or shared collection point",
    ],
    steps: [
      {
        title: "Identify your collection area",
        body: "Note your neighbourhood, street and usual collection point. A shared bin area or apartment building may have different arrangements from individual households.",
      },
      {
        title: "Review collection guidance",
        body: "Read the demonstration waste guide and check public notices for example service changes. These resources illustrate the information a collection service may provide; they do not confirm a live collection day.",
      },
      {
        title: "Confirm local arrangements",
        body: "Ask the responsible collection provider about the collection day, accepted materials and how to present waste safely without blocking pavements or access routes.",
      },
    ],
    readyInformation: [
      "Your neighbourhood and street name",
      "The usual bin or shared collection location",
      "Whether the question concerns household waste, recycling or a large item",
    ],
    pathways: [
      {
        href: "/documents?q=waste",
        label: "Read waste guides",
        description: "Find the demonstration collection guide and disposal information.",
      },
      {
        href: "/notices",
        label: "Check public notices",
        description: "Browse published demonstration notices for service information.",
      },
      {
        href: "/services/missed-waste-collection",
        label: "Get missed collection guidance",
        description: "Prepare a clear enquiry when waste has not been collected.",
      },
    ],
    faqs: [
      {
        question: "Can I look up a live collection day here?",
        answer: "No. Rawal One demonstrates collection guidance and does not hold a live address-based collection calendar. Confirm your collection day with the responsible local provider.",
      },
      {
        question: "Are large household items part of regular collection?",
        answer: "Accepted items vary by provider. Check bulky waste guidance and confirm the appropriate disposal route before leaving furniture or appliances at a collection point.",
      },
      {
        question: "What if my building uses shared bins?",
        answer: "Your building manager or collection provider may be able to confirm the shared collection point and arrangements. Keep access routes clear and follow the site's posted guidance.",
      },
    ],
    support: {
      title: "Prepare a collection enquiry",
      description: "Use verified contact details for your local collection provider. This demonstration does not connect you to a collection team.",
      items: [
        "Ask which collection arrangements apply to your street or building.",
        "Ask where to find changes to collection days and accepted materials.",
        "Share an address only through the provider's verified official channel.",
      ],
      href: "/services?category=waste-recycling",
      linkLabel: "Browse waste & recycling services",
    },
    relatedSlugs: ["missed-waste-collection", "bulky-waste-disposal-guidance"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "missed-waste-collection",
    title: "Missed waste collection",
    category: "waste-recycling",
    summary:
      "Check common reasons for a missed household collection and prepare a useful enquiry for the responsible collection provider.",
    serviceNote: demonstrationNote,
    helpsWith: [
      "Checking whether a collection change may explain a missed pickup",
      "Recording the location and expected collection date",
      "Preparing a clear description without sharing unnecessary personal details",
    ],
    steps: [
      {
        title: "Check the expected collection",
        body: "Confirm the usual collection arrangement and check whether your building or street has received a change notice. Ask the provider about its reporting window; this demonstration does not set one.",
      },
      {
        title: "Describe what happened",
        body: "Note the expected date, the type of waste and whether nearby households were also affected. Describe where the waste was placed and any access obstruction you observed.",
      },
      {
        title: "Use an official reporting channel",
        body: "Contact the responsible collection provider through verified details. Follow its instructions about storing waste safely while your enquiry is reviewed.",
      },
    ],
    readyInformation: [
      "Street or shared collection point",
      "Expected collection date and approximate time waste was presented",
      "Waste type and whether neighbouring collections were affected",
      "An optional photograph that avoids people, vehicle plates and private interiors",
    ],
    pathways: [
      {
        href: "/services/waste-collection-schedules",
        label: "Review collection guidance",
        description: "Check what to confirm about your local collection arrangement.",
      },
      {
        href: "/notices",
        label: "Check collection notices",
        description: "Look for published demonstration information about service changes.",
      },
      {
        href: "/documents?q=waste",
        label: "Find waste resources",
        description: "Read the example household collection and disposal guide.",
      },
    ],
    faqs: [
      {
        question: "Does this page report a missed collection?",
        answer: "No. It helps you prepare an enquiry. Rawal One does not submit reports or arrange a return collection.",
      },
      {
        question: "Should I leave the waste outside?",
        answer: "Follow the collection provider's instructions and keep footpaths, drains and access routes clear. This page does not establish a local storage or collection rule.",
      },
      {
        question: "Can I include a photograph?",
        answer: "An official provider may accept a photograph. Take one only from a safe position and avoid unnecessary personal information. Do not upload it to this demonstration.",
      },
    ],
    support: {
      title: "Prepare a missed collection enquiry",
      description: "The responsible provider can confirm whether a report is needed and what happens next. No collection team receives information through Rawal One.",
      items: [
        "Describe one collection point and the expected date clearly.",
        "Ask whether a service change, access issue or waste restriction applies.",
        "Keep any official reference number for follow-up through the same verified channel.",
      ],
      href: "/services?category=waste-recycling",
      linkLabel: "Browse waste & recycling services",
    },
    relatedSlugs: ["waste-collection-schedules", "bulky-waste-disposal-guidance"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "bulky-waste-disposal-guidance",
    title: "Bulky waste & disposal guidance",
    category: "waste-recycling",
    summary:
      "Explore responsible options for furniture, appliances and other household items that may need separate disposal arrangements.",
    serviceNote: demonstrationNote,
    helpsWith: [
      "Identifying items that may need a separate collection or disposal route",
      "Considering reuse before disposal",
      "Preparing questions about accepted materials and safe handling",
    ],
    steps: [
      {
        title: "Identify the item and its condition",
        body: "List each item, its approximate size and whether it contains batteries, electrical components or potentially hazardous material. Do not dismantle an item if doing so could be unsafe.",
      },
      {
        title: "Consider a suitable reuse option",
        body: "If the item is safe and usable, consider repair, donation or reuse through a reputable local organisation. Confirm what the organisation accepts before arranging a handover.",
      },
      {
        title: "Confirm an authorised disposal route",
        body: "Ask the responsible local provider which items it accepts and whether separate transport or collection is required. Do not leave large items on a road, pavement or open plot without confirmed permission.",
      },
    ],
    readyInformation: [
      "Item type, quantity and approximate dimensions",
      "Whether the item is electrical or contains hazardous components",
      "Any access or lifting constraints at the property",
    ],
    pathways: [
      {
        href: "/documents?q=waste",
        label: "Read disposal guidance",
        description: "Browse the demonstration waste resource library.",
      },
      {
        href: "/services/waste-collection-schedules",
        label: "Review household collection",
        description: "Distinguish regular collection questions from larger-item disposal.",
      },
    ],
    faqs: [
      {
        question: "Can I book a bulky waste pickup here?",
        answer: "No. This demonstration provides preparation guidance and does not offer collection bookings, fees or confirmed disposal locations.",
      },
      {
        question: "What about batteries or electrical appliances?",
        answer: "These may require a separate disposal route. Ask an authorised provider how to handle them safely and avoid placing damaged batteries or hazardous materials with ordinary household waste.",
      },
    ],
    support: {
      title: "Prepare a disposal enquiry",
      description: "Use verified details for an authorised collection or disposal provider before moving an item.",
      items: [
        "Describe the item and ask whether it is accepted.",
        "Confirm any handling, transport and payment arrangements directly with the provider.",
        "Ask about safe alternatives if the item cannot be collected.",
      ],
      href: "/services?category=waste-recycling",
      linkLabel: "Browse waste & recycling services",
    },
    relatedSlugs: ["waste-collection-schedules", "missed-waste-collection"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "water-billing-account-help",
    title: "Water billing & account help",
    category: "water-sewer",
    summary:
      "Understand what to check on a water bill and prepare questions about charges, account details or an unexpected change.",
    serviceNote: demonstrationNote,
    helpsWith: [
      "Checking billing periods and the information shown on a bill",
      "Preparing a question about a charge or meter reading",
      "Keeping account information secure when contacting the official provider",
    ],
    steps: [
      {
        title: "Review the bill details",
        body: "Check the billing period, service address and the explanation of charges. If readings are shown, compare them with earlier bills before drawing conclusions about a change.",
      },
      {
        title: "Prepare one clear question",
        body: "Note the part of the bill you want explained and any change in use or occupancy that may be relevant. Keep copies of earlier bills for your own reference.",
      },
      {
        title: "Contact the verified billing provider",
        body: "Use contact details verified from the provider's official website or correspondence. Ask about its correction, payment or account-update process; do not enter account details on Rawal One.",
      },
    ],
    readyInformation: [
      "Billing period and the specific charge or reading in question",
      "Earlier bills or receipts kept privately for comparison",
      "An account reference, shared only through a verified official channel",
    ],
    pathways: [
      {
        href: "/services/water-service-interruptions",
        label: "Review water service information",
        description: "Find demonstration supply interruption guidance.",
      },
      {
        href: "/services/new-water-sewer-connections",
        label: "Explore new connection guidance",
        description: "Prepare a separate enquiry about a new water or sewer connection.",
      },
      {
        href: "/documents?q=water",
        label: "Browse water resources",
        description: "Find example water-related documents and forms.",
      },
    ],
    faqs: [
      {
        question: "Can I pay a water bill through Rawal One?",
        answer: "No. This demonstration does not accept payments or connect to billing accounts. Use a payment method confirmed by your official service provider.",
      },
      {
        question: "What if my bill seems higher than expected?",
        answer: "Check the period, readings and itemised charges where available. Ask the official billing provider to explain the change; this page cannot determine a charge or account balance.",
      },
      {
        question: "Should I send a copy of my bill?",
        answer: "Only share a bill if the verified provider requires it through an appropriate official channel. It may contain an address and account information. Do not submit it to this demonstration.",
      },
    ],
    support: {
      title: "Prepare a billing enquiry",
      description: "The official billing provider can explain charges and account procedures. Rawal One has no access to your account.",
      items: [
        "State the billing period and the charge you want explained.",
        "Ask which evidence is needed before sending documents.",
        "Never share a password, payment card information or verification code with this site.",
      ],
      href: "/services?category=water-sewer",
      linkLabel: "Browse water & sewer services",
    },
    relatedSlugs: ["water-service-interruptions", "new-water-sewer-connections"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "new-water-sewer-connections",
    title: "New water & sewer connections",
    category: "water-sewer",
    summary:
      "Prepare for a new connection enquiry, understand the kinds of information a provider may need and find an example request form.",
    serviceNote: demonstrationNote,
    helpsWith: [
      "Distinguishing a new connection from a supply fault or billing issue",
      "Preparing property and proposed-use information",
      "Understanding that approval and technical requirements must be confirmed officially",
    ],
    steps: [
      {
        title: "Describe the proposed connection",
        body: "Identify whether you need water, sewer or both, and whether the enquiry concerns a new building, an existing property or a change of use.",
      },
      {
        title: "Review example application information",
        body: "Use the demonstration connection form to understand how a request might be organised. Confirm the current official form and required documents before preparing an application.",
      },
      {
        title: "Confirm the official process",
        body: "Ask the responsible provider about network availability, inspections, permissions and any applicable charges. Rawal One does not confirm feasibility, approve works or receive applications.",
      },
    ],
    readyInformation: [
      "Property location and the type of connection being considered",
      "Current or proposed property use",
      "Any existing planning or building reference, kept privately until requested officially",
      "A list of questions about required documents and site access",
    ],
    pathways: [
      {
        href: "/documents?q=water%20connection",
        label: "Find the example connection form",
        description: "Review the demonstration resource before an official enquiry.",
      },
      {
        href: "/services/building-permits-applications",
        label: "Review building application guidance",
        description: "Consider related permissions for proposed building work.",
      },
      {
        href: "/services/water-billing-account-help",
        label: "Get billing and account guidance",
        description: "Find the appropriate pathway for an existing account question.",
      },
    ],
    faqs: [
      {
        question: "Does downloading the form start an application?",
        answer: "No. The PDF is a demonstration resource. Downloading or completing it does not submit a request or secure a connection.",
      },
      {
        question: "Can this page confirm a connection cost or installation date?",
        answer: "No. The responsible provider must confirm technical requirements, charges, approvals and any schedule for your property.",
      },
    ],
    support: {
      title: "Prepare a connection enquiry",
      description: "Contact the responsible water or sewer provider through a verified official channel before arranging any connection work.",
      items: [
        "Explain the property use and which service connection you need.",
        "Ask whether related permits or inspections are required.",
        "Confirm the correct application channel before sharing property documents.",
      ],
      href: "/services?category=water-sewer",
      linkLabel: "Browse water & sewer services",
    },
    relatedSlugs: ["building-permits-applications", "water-billing-account-help", "development-information"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "report-pothole-road-issue",
    title: "Report a pothole or road issue",
    category: "roads-streets",
    summary:
      "Prepare a clear, safe description of a damaged road surface so the responsible road authority can identify the location and issue.",
    serviceNote: `${demonstrationNote} For an immediate danger or emergency, use the appropriate local emergency service. Do not rely on this website for an urgent response.`,
    helpsWith: [
      "Describing a pothole, uneven surface or other road damage",
      "Identifying the location using a nearby junction or landmark",
      "Understanding which details make an official report useful",
    ],
    steps: [
      {
        title: "Stay clear of the hazard",
        body: "Observe from a safe place away from moving traffic. Do not stand in the road, measure a pothole or attempt a repair. Use an appropriate local emergency service if there is immediate danger.",
      },
      {
        title: "Describe the location and damage",
        body: "Note the street, nearest junction or public landmark, and which side or direction of the road is affected. Describe the visible damage without entering traffic to inspect it.",
      },
      {
        title: "Contact the responsible road authority",
        body: "Use verified official reporting details and include the location, observation date and a short description. Confirm which authority is responsible if the road's ownership is unclear.",
      },
    ],
    readyInformation: [
      "Street name, nearest junction and a clear landmark",
      "Direction or side of the road affected",
      "Date observed and a brief description of the damage",
      "An optional photograph taken safely without identifiable people or vehicle plates",
    ],
    pathways: [
      {
        href: "/services/road-works-local-closures",
        label: "Review road works information",
        description: "Check demonstration guidance about maintenance and closures.",
      },
      {
        href: "/notices",
        label: "Browse public notices",
        description: "Look for published demonstration road and street information.",
      },
      {
        href: "/services/report-streetlight-problem",
        label: "Get streetlight guidance",
        description: "Prepare a separate enquiry about damaged or faulty lighting.",
      },
    ],
    faqs: [
      {
        question: "Does this page send a road report?",
        answer: "No. Rawal One helps you prepare a report but does not send it to a road authority or arrange repairs.",
      },
      {
        question: "Do I need a photograph or measurements?",
        answer: "A clear location and description are useful. Do not enter traffic or approach a hazard to take photographs or measurements. Follow the official authority's evidence requirements.",
      },
      {
        question: "What if the road issue is dangerous right now?",
        answer: "Keep away from the hazard and use the appropriate local emergency service for an immediate danger. This demonstration is not monitored for emergencies.",
      },
    ],
    support: {
      title: "Prepare an official road report",
      description: "Use the verified reporting channel of the authority responsible for that road. An urgent hazard requires an appropriate local emergency service.",
      items: [
        "Give a precise location and describe the issue from a safe position.",
        "Ask which authority is responsible if the road is private or responsibility is uncertain.",
        "Keep any official reference for later follow-up; Rawal One does not issue report references.",
      ],
      href: "/services?category=roads-streets",
      linkLabel: "Browse roads & streets services",
    },
    relatedSlugs: ["road-works-local-closures", "report-streetlight-problem"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "report-streetlight-problem",
    title: "Report a streetlight problem",
    category: "roads-streets",
    summary:
      "Prepare location details for a faulty streetlight and understand how to keep clear of damaged electrical equipment.",
    serviceNote: `${demonstrationNote} For exposed wiring, a fallen pole or immediate danger, keep away and use the appropriate local emergency service. This website cannot arrange an urgent response.`,
    helpsWith: [
      "Identifying a light that is not working or remains on unexpectedly",
      "Describing a pole's location without approaching electrical equipment",
      "Distinguishing a routine lighting enquiry from an immediate hazard",
    ],
    steps: [
      {
        title: "Check from a safe distance",
        body: "Do not touch a pole, wiring or damaged equipment. Keep clear of a fallen pole or exposed wires and use an appropriate local emergency service if there is immediate danger.",
      },
      {
        title: "Note the light's location",
        body: "Record the street, nearby junction or landmark and whether one light or several are affected. Include a pole identifier only if it is readable safely without approaching the equipment.",
      },
      {
        title: "Prepare a lighting enquiry",
        body: "Use the responsible authority's verified reporting channel. State when the fault was observed and whether the light is off, flickering or visibly damaged. Do not try to repair or test it.",
      },
    ],
    readyInformation: [
      "Street and nearest public landmark or junction",
      "Safely visible pole identifier, if available",
      "Date, time and whether one or several lights are affected",
      "A short description of the fault without touching the equipment",
    ],
    pathways: [
      {
        href: "/services/report-pothole-road-issue",
        label: "Review road issue guidance",
        description: "Prepare a separate description of damage to the road surface.",
      },
      {
        href: "/services/road-works-local-closures",
        label: "Review road works guidance",
        description: "Find information about demonstration maintenance and closures.",
      },
    ],
    faqs: [
      {
        question: "Can I report a faulty light on this page?",
        answer: "No. This demonstration does not submit lighting reports or dispatch repair teams. Use the responsible authority's verified official channel.",
      },
      {
        question: "What if I can see damaged wiring or a fallen pole?",
        answer: "Stay clear and do not touch the equipment or anything in contact with it. For immediate danger, use the appropriate local emergency service rather than relying on this demonstration.",
      },
      {
        question: "What if I cannot read the pole number?",
        answer: "A street, junction and nearby landmark can help identify the location. Do not approach damaged equipment or step into traffic to find an identifier.",
      },
    ],
    support: {
      title: "Prepare a streetlight enquiry",
      description: "The responsible lighting authority can confirm its reporting process. Rawal One does not monitor faults or arrange repairs.",
      items: [
        "Provide a clear location and the type of fault observed.",
        "Describe nearby lights only from a safe position.",
        "Use an appropriate local emergency service for an immediate electrical danger.",
      ],
      href: "/services?category=roads-streets",
      linkLabel: "Browse roads & streets services",
    },
    relatedSlugs: ["report-pothole-road-issue", "road-works-local-closures"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "road-works-local-closures",
    title: "Road works & local closures",
    category: "roads-streets",
    summary:
      "Understand the information to look for in a road works notice and prepare for changes to your usual route or property access.",
    serviceNote: `${demonstrationNote} Published demonstration notices do not provide live traffic conditions or navigation instructions.`,
    helpsWith: [
      "Reading a works notice for location, dates and access information",
      "Preparing questions about pedestrian, vehicle or delivery access",
      "Finding related road maintenance and service guidance",
    ],
    steps: [
      {
        title: "Read the notice carefully",
        body: "Identify the affected street or stretch of road, the stated dates and any access information. Distinguish a demonstration notice from a current notice issued by the responsible authority.",
      },
      {
        title: "Consider your access needs",
        body: "Think about walking routes, mobility needs, deliveries and access to your home or business. Prepare a specific question if the official notice does not explain an arrangement you need.",
      },
      {
        title: "Check current official information",
        body: "Confirm current arrangements with the responsible authority before travelling. Follow authorised signs and directions at the site and stay out of closed work areas.",
      },
    ],
    readyInformation: [
      "Street or works location and the notice title",
      "Travel or access date relevant to your question",
      "Any pedestrian, mobility or property-access concern",
    ],
    pathways: [
      {
        href: "/notices",
        label: "Browse works notices",
        description: "Read published demonstration information about local works.",
      },
      {
        href: "/documents?q=road",
        label: "Find road-related documents",
        description: "Explore the demonstration municipal resource library.",
      },
      {
        href: "/services/report-pothole-road-issue",
        label: "Prepare a road issue report",
        description: "Find guidance for describing road surface damage safely.",
      },
    ],
    faqs: [
      {
        question: "Are closures on this website live?",
        answer: "No. Rawal One is a demonstration and is not a live traffic or road closure service. Check the responsible authority's current information and follow directions at the site.",
      },
      {
        question: "Who can answer a question about access to my property?",
        answer: "Use the verified contact details on an official works notice or the responsible road authority's website. Explain the location, date and access need clearly.",
      },
    ],
    support: {
      title: "Prepare a works or access enquiry",
      description: "The responsible authority can confirm current work and access arrangements. This demonstration cannot change a closure or provide a travel guarantee.",
      items: [
        "Reference the official notice and the affected location.",
        "Explain the access need and relevant date without unnecessary personal details.",
        "Ask where updated official information will be published.",
      ],
      href: "/services?category=roads-streets",
      linkLabel: "Browse roads & streets services",
    },
    relatedSlugs: ["report-pothole-road-issue", "report-streetlight-problem", "water-service-interruptions"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "building-permits-applications",
    title: "Building permits & applications",
    category: "permits-applications",
    summary:
      "Prepare for a building or renovation enquiry, review an example application and understand what to confirm before work begins.",
    serviceNote: `${demonstrationNote} Guidance here is not planning advice, a permit or permission to begin work.`,
    helpsWith: [
      "Describing proposed building, alteration or renovation work",
      "Reviewing the structure of an example application form",
      "Preparing questions about permissions, drawings and inspections",
    ],
    steps: [
      {
        title: "Outline the proposed work",
        body: "Write a short description of the location, current use and proposed changes. Note whether the work concerns a new building, an extension, a structural alteration or another change.",
      },
      {
        title: "Review the example resources",
        body: "Read the demonstration building application form and development guidance to organise your questions. These resources do not establish current legal requirements or replace professional advice.",
      },
      {
        title: "Confirm requirements before starting",
        body: "Contact the responsible building or planning authority to confirm the correct process, required drawings, permissions and inspections. Obtain the necessary official approvals before beginning work.",
      },
    ],
    readyInformation: [
      "Property location and a short description of the proposed work",
      "Existing and proposed property use",
      "Questions about drawings, supporting documents and related permissions",
      "Any previous application reference, kept private until requested officially",
    ],
    pathways: [
      {
        href: "/documents?q=building%20permit",
        label: "Find the example building form",
        description: "Review a demonstration application document.",
      },
      {
        href: "/services/development-information",
        label: "Read development guidance",
        description: "Explore planning information and public notice pathways.",
      },
      {
        href: "/services/new-water-sewer-connections",
        label: "Review connection guidance",
        description: "Prepare a related water or sewer connection enquiry.",
      },
    ],
    faqs: [
      {
        question: "Can I apply for a permit here?",
        answer: "No. Rawal One does not accept applications or issue permits. The example PDF illustrates a form and must not be treated as an official submission.",
      },
      {
        question: "Does every renovation need a permit?",
        answer: "Requirements depend on the work, location and applicable rules. Ask the responsible authority before starting; this demonstration cannot determine whether your project requires permission.",
      },
      {
        question: "Are fees or decision times listed here?",
        answer: "No. Confirm current fees, document requirements and processing arrangements directly with the responsible authority. This page makes no approval or timing promise.",
      },
    ],
    support: {
      title: "Prepare a building enquiry",
      description: "A verified building or planning authority can confirm the process for your proposal. Qualified professional advice may also be needed.",
      items: [
        "Describe the work and ask which permissions apply.",
        "Confirm the current official form and supporting-document requirements.",
        "Share ownership papers and personal documents only through a verified official channel.",
      ],
      href: "/services?category=permits-applications",
      linkLabel: "Browse permits & development services",
    },
    relatedSlugs: ["development-information", "new-water-sewer-connections", "signage-commercial-permits"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "signage-commercial-permits",
    title: "Signage & commercial permits",
    category: "permits-applications",
    summary:
      "Prepare questions about a shop sign, frontage change or related commercial permission before arranging installation or work.",
    serviceNote: `${demonstrationNote} This page does not grant permission for signage, trading or building work.`,
    helpsWith: [
      "Describing a proposed sign and where it would be installed",
      "Preparing questions about frontage, access and related permissions",
      "Understanding the difference between example guidance and official approval",
    ],
    steps: [
      {
        title: "Describe the proposal",
        body: "Note the site, sign type, approximate dimensions and whether lighting, structural fixing or a change to the frontage is proposed. Keep drawings available for an official enquiry if requested.",
      },
      {
        title: "Consider the setting",
        body: "Identify whether the proposal could affect pedestrian access, visibility or neighbouring property. Ask the responsible authority whether additional building or property-owner permissions are needed.",
      },
      {
        title: "Confirm the official permission route",
        body: "Use verified authority details to confirm the relevant application, documents and any conditions before ordering or installing a sign. Rawal One does not assess a design or receive a commercial application.",
      },
    ],
    readyInformation: [
      "Site location and the type of commercial activity",
      "Proposed sign location, size and lighting details",
      "Questions about owner consent and related building permissions",
    ],
    pathways: [
      {
        href: "/services/building-permits-applications",
        label: "Review building permission guidance",
        description: "Consider related work on a structure or frontage.",
      },
      {
        href: "/services/licences-certificates",
        label: "Explore licence guidance",
        description: "Prepare a separate enquiry about a licence or certificate.",
      },
      {
        href: "/documents?q=permit",
        label: "Browse permit resources",
        description: "Find example application documents in the resource library.",
      },
    ],
    faqs: [
      {
        question: "Does a shop sign always require permission?",
        answer: "Requirements depend on the location and proposal. Confirm the applicable rules with the responsible authority before installation; this page cannot determine an exemption.",
      },
      {
        question: "Can I upload a sign design for review?",
        answer: "No. This demonstration does not receive designs or applications. Ask the responsible authority which documents it accepts through its official process.",
      },
    ],
    support: {
      title: "Prepare a commercial permission enquiry",
      description: "Use verified official details for the authority responsible for commercial signage or permissions in the proposed location.",
      items: [
        "Summarise the proposal and ask which permission applies.",
        "Confirm whether separate owner consent or building approval is needed.",
        "Ask for the current official application channel before sending drawings.",
      ],
      href: "/services?category=permits-applications",
      linkLabel: "Browse permits & development services",
    },
    relatedSlugs: ["building-permits-applications", "licences-certificates", "development-information"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "development-information",
    title: "Development information",
    category: "permits-applications",
    summary:
      "Explore development guidance, understand how to read a public notice and prepare a focused planning information enquiry.",
    serviceNote: `${demonstrationNote} Information here does not establish a property's planning status or provide legal or professional planning advice.`,
    helpsWith: [
      "Finding example planning and development resources",
      "Reading a notice for its location, purpose and stated response arrangements",
      "Preparing questions about the official process for a proposal",
    ],
    steps: [
      {
        title: "Identify the information you need",
        body: "Decide whether your question concerns a proposed project, an application, a public notice or general development guidance. Note the relevant location or public reference where available.",
      },
      {
        title: "Read related resources",
        body: "Browse demonstration notices and documents. When reading an official notice elsewhere, check its issuing authority, publication date, scope and any stated response deadline carefully.",
      },
      {
        title: "Confirm with the responsible authority",
        body: "Use verified planning authority details to ask about the official record or process. Submit any representation only through the channel stated in the current official notice.",
      },
    ],
    readyInformation: [
      "The topic and location relevant to the enquiry",
      "Notice title or public application reference, if available",
      "A concise question about the record, process or proposed work",
    ],
    pathways: [
      {
        href: "/notices",
        label: "Read public notices",
        description: "Browse published demonstration notices and their details.",
      },
      {
        href: "/documents?q=development",
        label: "Find development resources",
        description: "Search the demonstration library for planning-related material.",
      },
      {
        href: "/services/building-permits-applications",
        label: "Review building applications",
        description: "Prepare questions about a building or renovation proposal.",
      },
    ],
    faqs: [
      {
        question: "Can I check a property's planning status here?",
        answer: "No. Rawal One is not an official planning register. Ask the responsible authority for the current record and seek professional advice where needed.",
      },
      {
        question: "Can I comment on a development through this page?",
        answer: "No. This demonstration does not accept consultation responses. Follow the instructions and current deadline on the official notice issued by the responsible authority.",
      },
    ],
    support: {
      title: "Prepare a development information enquiry",
      description: "A verified planning authority can identify the relevant official record and explain its information or consultation process.",
      items: [
        "Give the relevant location or public reference and one clear question.",
        "Ask where the current official documents can be reviewed.",
        "Confirm the official response route if the enquiry concerns a consultation.",
      ],
      href: "/services?category=permits-applications",
      linkLabel: "Browse permits & development services",
    },
    relatedSlugs: ["building-permits-applications", "signage-commercial-permits", "new-water-sewer-connections"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "parks-community-facilities",
    title: "Parks & community facilities",
    category: "parks-recreation",
    summary:
      "Prepare for a visit or facility enquiry, consider access needs and review an example community-space booking resource.",
    serviceNote: `${demonstrationNote} This website does not confirm opening hours, facility availability or bookings.`,
    helpsWith: [
      "Preparing questions about parks, play areas and community spaces",
      "Checking access, facilities and suitability before a visit",
      "Understanding the information a facility booking enquiry may need",
    ],
    steps: [
      {
        title: "Identify the space and purpose",
        body: "Consider whether you are planning an informal park visit, using a sports area or enquiring about a community space for an activity. Note the facility name if you already have one in mind.",
      },
      {
        title: "Check practical and access needs",
        body: "Confirm current opening arrangements, step-free access, seating, toilets and any relevant site rules with the official operator. This demonstration does not provide a live facility directory.",
      },
      {
        title: "Confirm any booking process",
        body: "If you need reserved use, ask the verified operator about availability, permitted activities and the official booking process. Reviewing the example form does not reserve a space.",
      },
    ],
    readyInformation: [
      "Facility or space of interest and the intended activity",
      "Preferred date, time and approximate group size",
      "Access, equipment or other practical requirements",
    ],
    pathways: [
      {
        href: "/documents?q=community%20facility",
        label: "Review the example facility form",
        description: "See how a community-space enquiry might be organised.",
      },
      {
        href: "/services/recreation-programmes",
        label: "Explore recreation guidance",
        description: "Prepare questions about organised activities and participation.",
      },
      {
        href: "/accessibility",
        label: "Read website accessibility information",
        description: "Learn about the accessibility features of this demonstration.",
      },
    ],
    faqs: [
      {
        question: "Can I reserve a facility on Rawal One?",
        answer: "No. This demonstration does not hold availability or accept bookings. Confirm a reservation directly with the verified official facility operator.",
      },
      {
        question: "How can I confirm physical access arrangements?",
        answer: "Ask the facility operator about your specific needs, such as step-free routes, accessible toilets or seating. Website accessibility information does not confirm a facility's physical access.",
      },
      {
        question: "Does the example form guarantee a space?",
        answer: "No. It illustrates the kind of information a booking process may request. An official operator must confirm availability and any conditions.",
      },
    ],
    support: {
      title: "Prepare a facility enquiry",
      description: "Use verified contact details for the operator of the park or community facility you want to visit or use.",
      items: [
        "Explain the intended activity, date and approximate group size.",
        "Ask about access needs and facilities before travelling.",
        "Confirm any reservation and conditions through the operator's official process.",
      ],
      href: "/services?category=parks-recreation",
      linkLabel: "Browse parks & recreation services",
    },
    relatedSlugs: ["recreation-programmes", "community-information-support"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "recreation-programmes",
    title: "Recreation programmes",
    category: "parks-recreation",
    summary:
      "Prepare questions about community activities, participation requirements and access before registering through an official programme provider.",
    serviceNote: `${demonstrationNote} Programme places, dates and registration are not managed by this website.`,
    helpsWith: [
      "Identifying the kind of activity you are interested in",
      "Checking age suitability, equipment and access arrangements",
      "Preparing for an official programme or registration enquiry",
    ],
    steps: [
      {
        title: "Choose the type of activity",
        body: "Think about the activity, location and time that would suit you or your household. Consider whether you are looking for a one-off community event or an ongoing programme.",
      },
      {
        title: "Confirm practical requirements",
        body: "Ask the verified provider about current dates, age suitability, equipment, access and any participation conditions. Do not assume a programme is available from a demonstration listing.",
      },
      {
        title: "Use the official registration route",
        body: "If you choose to take part, confirm the provider's registration process and any charges directly. Share participant information only through the verified official channel, not through Rawal One.",
      },
    ],
    readyInformation: [
      "Activity type and preferred location or time",
      "Relevant age group and any equipment questions",
      "Access or participation needs you choose to discuss privately with the provider",
    ],
    pathways: [
      {
        href: "/#community",
        label: "Explore community life",
        description: "Browse the homepage's demonstration community information.",
      },
      {
        href: "/services/parks-community-facilities",
        label: "Review parks and facilities guidance",
        description: "Prepare questions about a venue or community space.",
      },
      {
        href: "/services/community-information-support",
        label: "Find community support guidance",
        description: "Explore how to identify an appropriate local information pathway.",
      },
    ],
    faqs: [
      {
        question: "Can I register for a programme here?",
        answer: "No. This demonstration does not accept registrations, payments or participant details. Confirm current programmes with the verified official provider.",
      },
      {
        question: "How can I ask about access or adaptations?",
        answer: "Contact the programme provider through a verified channel and describe the practical arrangement you need. Share health or other sensitive information only if needed through an appropriate official process.",
      },
      {
        question: "Are programme dates and places confirmed?",
        answer: "No. Demonstration content illustrates a community website experience. The official provider must confirm dates, places, eligibility and any charges.",
      },
    ],
    support: {
      title: "Prepare a programme enquiry",
      description: "The verified programme provider can confirm current activities and how to take part. Rawal One does not manage registrations.",
      items: [
        "State the activity and the age group or level you are asking about.",
        "Ask about access, equipment and current availability.",
        "Confirm how personal participant information is handled before registering.",
      ],
      href: "/services?category=parks-recreation",
      linkLabel: "Browse parks & recreation services",
    },
    relatedSlugs: ["parks-community-facilities", "community-information-support"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "licences-certificates",
    title: "Licences & certificates",
    category: "licences-certificates",
    summary:
      "Identify the licence, certificate or record you need and prepare questions about the responsible issuing authority and official application process.",
    serviceNote: `${demonstrationNote} This website does not issue, renew or verify licences, certificates or identity records.`,
    helpsWith: [
      "Distinguishing a new application, renewal or replacement enquiry",
      "Identifying which authority is responsible for the document",
      "Preparing questions about evidence while keeping identity documents private",
    ],
    steps: [
      {
        title: "Identify the document and purpose",
        body: "Note the document name and whether you need a new issue, renewal, replacement or a copy of a record. Different documents may be handled by different authorities.",
      },
      {
        title: "Confirm the issuing authority",
        body: "Use a verified official website or office to establish who handles the document. Ask about eligibility, evidence, current forms and whether an appointment is needed.",
      },
      {
        title: "Prepare for the official process",
        body: "Make a private checklist of the documents the authority requires. Confirm its submission and payment arrangements before sending identity papers or other personal records.",
      },
    ],
    readyInformation: [
      "The document name and why it is needed",
      "Whether the enquiry concerns a new issue, renewal, replacement or record copy",
      "Questions about evidence and the official submission process",
    ],
    pathways: [
      {
        href: "/documents",
        label: "Browse example documents",
        description: "Explore the demonstration municipal resource library.",
      },
      {
        href: "/services/signage-commercial-permits",
        label: "Review commercial permission guidance",
        description: "Find a related pathway for signage or commercial proposals.",
      },
      {
        href: "/services/community-information-support",
        label: "Find information pathway guidance",
        description: "Prepare an enquiry when you are unsure which service is responsible.",
      },
    ],
    faqs: [
      {
        question: "Can I obtain or renew a certificate here?",
        answer: "No. Rawal One does not issue or renew documents and cannot verify a person's records. Contact the responsible issuing authority through its official process.",
      },
      {
        question: "Which identity documents do I need?",
        answer: "Requirements depend on the document and issuing authority. Ask the authority for its current requirements. Do not upload identity documents or enter identification numbers on this demonstration.",
      },
      {
        question: "Does the document library contain every official form?",
        answer: "No. The library contains selected demonstration resources. Confirm the current official form and requirements with the responsible authority.",
      },
    ],
    support: {
      title: "Prepare a licence or certificate enquiry",
      description: "Use verified official contact details for the issuing authority. Rawal One cannot authenticate documents or access personal records.",
      items: [
        "Explain the document needed and the type of request.",
        "Ask for the current checklist and any appointment requirements.",
        "Keep identity numbers and personal records out of public messages and this demonstration.",
      ],
      href: "/services?category=licences-certificates",
      linkLabel: "Browse licences & certificates services",
    },
    relatedSlugs: ["signage-commercial-permits", "community-information-support", "building-permits-applications"],
    updatedAt: "2026-10-11",
  },
  {
    slug: "community-information-support",
    title: "Community information & support",
    category: "community-services",
    summary:
      "Find your way through public information and prepare a clear enquiry when you are unsure which service or community resource is appropriate.",
    serviceNote: `${demonstrationNote} This website is not a crisis, emergency or live case-support service. For immediate danger, use the appropriate local emergency service.`,
    helpsWith: [
      "Choosing a service category or searching for a public resource",
      "Preparing a general question without sharing sensitive personal circumstances",
      "Considering communication and access needs when contacting an official service",
    ],
    steps: [
      {
        title: "Describe the topic in general terms",
        body: "Choose a short description such as a collection question, facility enquiry or document request. Avoid including names, account numbers, health details or other private information in website searches.",
      },
      {
        title: "Explore the relevant resources",
        body: "Browse service categories, public notices and the document library. The links explain demonstration pathways and do not connect you to a live support worker.",
      },
      {
        title: "Confirm the right official contact",
        body: "Use verified public-service or community-organisation details to ask who is responsible. Explain any practical communication or access arrangement you need, and share personal information only through an appropriate verified channel.",
      },
    ],
    readyInformation: [
      "A short, general description of the topic",
      "The service or public resource you have already checked",
      "Any preferred communication or access arrangement you wish to discuss",
    ],
    pathways: [
      {
        href: "/services",
        label: "Browse all services",
        description: "Explore the public service directory by topic.",
      },
      {
        href: "/search",
        label: "Search public information",
        description: "Use general terms to find demonstration services and resources.",
      },
      {
        href: "/accessibility",
        label: "Read accessibility information",
        description: "Learn about website controls and accessible navigation.",
      },
    ],
    faqs: [
      {
        question: "Can someone handle my case through this website?",
        answer: "No. Rawal One is a public-site demonstration and does not receive casework, personal requests or emergency messages. Use a verified official or community support provider for real assistance.",
      },
      {
        question: "What should I put in a search?",
        answer: "Use a general topic such as water billing, building permit or community facility. Do not include an account number, identity number, exact personal circumstances or other sensitive information.",
      },
      {
        question: "What if I need help using an official service?",
        answer: "Ask the verified service provider about its available communication or access arrangements. The controls on Rawal One support use of this website and do not establish another provider's arrangements.",
      },
    ],
    support: {
      title: "Prepare a general service enquiry",
      description: "A verified official service or established community organisation can help identify an appropriate real-world pathway. This demonstration cannot provide live support.",
      items: [
        "Start with the topic and ask which service is responsible.",
        "Describe any practical communication arrangement you need.",
        "For immediate danger, use the appropriate local emergency service rather than this website.",
      ],
      href: "/services",
      linkLabel: "Browse the service directory",
    },
    relatedSlugs: ["licences-certificates", "parks-community-facilities", "recreation-programmes"],
    updatedAt: "2026-10-11",
  },
] as const satisfies readonly PublicServiceDetail[];

export function getServiceDetail(slug: string): PublicServiceDetail | undefined {
  return serviceDetails.find((service) => service.slug === slug);
}
