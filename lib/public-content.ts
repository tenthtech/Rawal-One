import { documentCategories, municipalDocuments } from "@/data/documents";
import { cityUpdates } from "@/data/homepage";
import { publicNotices } from "@/data/notices";
import { getCmsSeedId } from "@/lib/cms-seed-ids";

const publicDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Karachi",
});

const eventDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  timeZone: "Asia/Karachi",
});

export function formatPublicDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : publicDateFormatter.format(date);
}

export function formatEventDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : eventDateFormatter.format(date);
}

export function getDocumentCategoryLabelFromSlug(category: string) {
  return (
    documentCategories.find((option) => option.slug === category)?.label ??
    category
  );
}

export function getNoticePublicStatus(
  closingAt: string | null,
  now = new Date(),
) {
  if (!closingAt) return "Current";

  const closingTime = new Date(closingAt).getTime();
  return Number.isFinite(closingTime) && closingTime > now.getTime()
    ? "Open"
    : "Current";
}

export function getSeededNoticePresentation(
  recordId: string,
  title: string,
) {
  const notice = publicNotices.find(
    (candidate, index) =>
      getCmsSeedId("notice", index) === recordId && candidate.title === title,
  );

  if (!notice) return null;

  return {
    openStatusLabel:
      notice.status === "Open for feedback" ? notice.status : undefined,
    relatedLink: notice.relatedLink,
  };
}

export function getSeededCityUpdateLink(
  recordId: string,
  title: string,
  category: string,
) {
  const update = cityUpdates.find(
    (candidate, index) =>
      getCmsSeedId("city-update", index) === recordId &&
      candidate.title === title &&
      candidate.category === category,
  );

  return update ? { href: update.href, label: update.linkLabel } : null;
}

export function getPublicDocumentDownloadUrl(
  fileUrl: string,
  fileName: string,
  storagePath: string | null,
) {
  if (!storagePath) return fileUrl;

  try {
    const downloadUrl = new URL(fileUrl);
    downloadUrl.searchParams.set("download", fileName);
    return downloadUrl.toString();
  } catch {
    return fileUrl;
  }
}

export function getPublicContentAnchor(
  title: string,
  recordType: "document" | "notice",
  recordId: string,
) {
  const legacySlug =
    recordType === "notice"
      ? publicNotices.find(
          (_, index) => getCmsSeedId("notice", index) === recordId,
        )?.slug
      : municipalDocuments.find(
          (_, index) => getCmsSeedId("document", index) === recordId,
        )?.slug;

  if (legacySlug) return legacySlug;

  const slug = title
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

  const uniqueSuffix = `${recordType}-${recordId}`;
  return slug ? `${slug}-${uniqueSuffix}` : uniqueSuffix;
}
