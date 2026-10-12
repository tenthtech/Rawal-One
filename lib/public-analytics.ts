const publicPages = new Map([
  ["/", "Rawal One | Your city. One place."],
  ["/services", "Services | Rawal One"],
  ["/services/water-service-interruptions", "Water service interruptions | Rawal One"],
  ["/services/waste-collection-schedules", "Waste collection schedules | Rawal One"],
  ["/services/missed-waste-collection", "Missed waste collection | Rawal One"],
  ["/services/bulky-waste-disposal-guidance", "Bulky waste & disposal guidance | Rawal One"],
  ["/services/water-billing-account-help", "Water billing & account help | Rawal One"],
  ["/services/new-water-sewer-connections", "New water & sewer connections | Rawal One"],
  ["/services/report-pothole-road-issue", "Report a pothole or road issue | Rawal One"],
  ["/services/report-streetlight-problem", "Report a streetlight problem | Rawal One"],
  ["/services/road-works-local-closures", "Road works & local closures | Rawal One"],
  ["/services/building-permits-applications", "Building permits & applications | Rawal One"],
  ["/services/signage-commercial-permits", "Signage & commercial permits | Rawal One"],
  ["/services/development-information", "Development information | Rawal One"],
  ["/services/parks-community-facilities", "Parks & community facilities | Rawal One"],
  ["/services/recreation-programmes", "Recreation programmes | Rawal One"],
  ["/services/licences-certificates", "Licences & certificates | Rawal One"],
  ["/services/community-information-support", "Community information & support | Rawal One"],
  ["/search", "Search | Rawal One"],
  ["/documents", "Documents & forms | Rawal One"],
  ["/notices", "Public notices | Rawal One"],
  ["/accessibility", "Accessibility | Rawal One"],
  ["/image-credits", "Image credits | Rawal One"],
  ["/privacy", "Privacy | Rawal One"],
]);

export function getAnalyticsMeasurementId(value: string | undefined) {
  return value && /^G-[A-Z0-9]+$/.test(value) ? value : null;
}

export function getPublicAnalyticsPage(pathname: string) {
  const title = publicPages.get(pathname);
  return title ? { pathname, title } : null;
}

export function isLocalAnalyticsHostname(hostname: string) {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  return (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host === "0.0.0.0" ||
    /^127\./.test(host) ||
    host === "::1" ||
    host === "[::1]"
  );
}

export function isPublicAnalyticsEnabled({
  measurementId,
  privacyReady,
  production,
  allowLocal,
  hostname,
  doNotTrack,
  globalPrivacyControl,
}: {
  measurementId: string | null;
  privacyReady: boolean;
  production: boolean;
  allowLocal: boolean;
  hostname: string;
  doNotTrack: string | null | undefined;
  globalPrivacyControl: boolean | undefined;
}) {
  return Boolean(
    measurementId &&
    privacyReady &&
    hostname &&
    (allowLocal || (production && !isLocalAnalyticsHostname(hostname))) &&
    doNotTrack !== "1" &&
    doNotTrack !== "yes" &&
    !globalPrivacyControl,
  );
}

export function getPublicAnalyticsParameters(pathname: string, origin: string) {
  const page = getPublicAnalyticsPage(pathname);
  if (!page) return null;

  // Only fixed, known paths/titles enter GA. Never read document.title,
  // location.href, search parameters, fragments, referrers or resident content.
  return {
    page_path: page.pathname,
    page_location: `${origin}${page.pathname}`,
    page_title: page.title,
    page_referrer: "",
  };
}
