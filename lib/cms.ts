import "server-only";

import {
  municipalDocuments,
  type DocumentCategorySlug,
} from "@/data/documents";
import { cityUpdates, communityEvents } from "@/data/homepage";
import { publicNotices } from "@/data/notices";
import { isAlertExpired } from "@/lib/alert-model";
import { readAlerts } from "@/lib/alerts";
import { getCmsSeedId } from "@/lib/cms-seed-ids";
import {
  getSupabaseConfiguration,
  isLocalJsonFallbackEnabled,
} from "@/lib/supabase/config";
import type {
  CityUpdateInsert,
  CityUpdateRow,
  CmsStatus,
  CommunityEventInsert,
  CommunityEventRow,
  DocumentInsert,
  DocumentRow,
  NoticeInsert,
  NoticeRow,
} from "@/lib/supabase/database.types";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type { CmsStatus } from "@/lib/supabase/database.types";

export const cmsStatuses: readonly CmsStatus[] = [
  "draft",
  "published",
  "inactive",
];

export const noticeCategories = [
  "Planning & development",
  "Roads & transport",
  "Community services",
  "Waste & recycling",
] as const;

export const updateCategories = [
  "Service update",
  "Community",
  "Public notice",
] as const;

export type CmsSourceMode = "supabase" | "local" | "unavailable";

export type CmsAdminResult<T> = {
  mode: CmsSourceMode;
  records: T[];
};

export class CmsDataError extends Error {
  constructor(message = "The content operation could not be completed.") {
    super(message);
    this.name = "CmsDataError";
  }
}

function dateAtMidnight(date: string) {
  return `${date}T00:00:00.000Z`;
}

function dateAtEndOfDayInPakistan(date: string) {
  return `${date}T23:59:59.999+05:00`;
}

function getCmsSourceMode(): CmsSourceMode {
  const configuration = getSupabaseConfiguration();

  if (configuration.status === "configured") return "supabase";
  if (isLocalJsonFallbackEnabled()) return "local";
  return "unavailable";
}

const localNotices: NoticeRow[] = publicNotices.map((notice, index) => ({
  id: getCmsSeedId("notice", index),
  title: notice.title,
  category: notice.category,
  summary: notice.summary,
  body: notice.detail.join("\n\n"),
  status: "published",
  published_at: dateAtMidnight(notice.publishedDateTime),
  closing_at: notice.closingDateTime
    ? dateAtEndOfDayInPakistan(notice.closingDateTime)
    : null,
  keywords: [...notice.keywords],
  created_at: dateAtMidnight(notice.publishedDateTime),
  updated_at: dateAtMidnight(notice.publishedDateTime),
}));

const localDocuments: DocumentRow[] = municipalDocuments.map(
  (document, index) => ({
    id: getCmsSeedId("document", index),
    title: document.title,
    description: document.description,
    category: document.category,
    document_type: document.format,
    file_name: document.fileName,
    file_url: document.href,
    storage_path: null,
    file_size_bytes: null,
    status: "published",
    published_at: dateAtMidnight(document.updatedDateTime),
    keywords: [...document.keywords],
    created_at: dateAtMidnight(document.updatedDateTime),
    updated_at: dateAtMidnight(document.updatedDateTime),
  }),
);

const localCityUpdates: CityUpdateRow[] = cityUpdates.map((update, index) => ({
  id: getCmsSeedId("city-update", index),
  title: update.title,
  category: update.category,
  summary: update.description,
  status: "published",
  published_at: dateAtMidnight(update.dateTime),
  keywords: [],
  created_at: dateAtMidnight(update.dateTime),
  updated_at: dateAtMidnight(update.dateTime),
}));

const localCommunityEvents: CommunityEventRow[] = communityEvents.map(
  (event, index) => ({
    id: getCmsSeedId("community-event", index),
    title: event.title,
    summary: event.description,
    location: null,
    starts_at: dateAtMidnight(event.dateTime),
    ends_at: null,
    status: "published",
    published_at: null,
    keywords: [],
    created_at: dateAtMidnight(event.dateTime),
    updated_at: dateAtMidnight(event.dateTime),
  }),
);

function publicFailure<T>() {
  return [] as T[];
}

export async function readPublishedNotices(): Promise<NoticeRow[]> {
  const mode = getCmsSourceMode();
  if (mode === "local") return localNotices;
  if (mode !== "supabase") return publicFailure<NoticeRow>();

  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error) return publicFailure<NoticeRow>();
    return data;
  } catch {
    return publicFailure<NoticeRow>();
  }
}

export async function readPublishedDocuments(): Promise<DocumentRow[]> {
  const mode = getCmsSourceMode();
  if (mode === "local") return localDocuments;
  if (mode !== "supabase") return publicFailure<DocumentRow>();

  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error) return publicFailure<DocumentRow>();
    return data;
  } catch {
    return publicFailure<DocumentRow>();
  }
}

export async function readPublishedCityUpdates(
  limit?: number,
): Promise<CityUpdateRow[]> {
  const mode = getCmsSourceMode();
  if (mode === "local") {
    return typeof limit === "number"
      ? localCityUpdates.slice(0, limit)
      : localCityUpdates;
  }
  if (mode !== "supabase") return publicFailure<CityUpdateRow>();

  try {
    const supabase = createSupabasePublicClient();
    let query = supabase
      .from("city_updates")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false });

    if (typeof limit === "number") query = query.limit(limit);
    const { data, error } = await query;

    if (error) return publicFailure<CityUpdateRow>();
    return data;
  } catch {
    return publicFailure<CityUpdateRow>();
  }
}

export async function readAllPublishedCommunityEvents(): Promise<
  CommunityEventRow[]
> {
  const mode = getCmsSourceMode();
  if (mode === "local") return localCommunityEvents;
  if (mode !== "supabase") return publicFailure<CommunityEventRow>();

  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("community_events")
      .select("*")
      .eq("status", "published")
      .order("starts_at", { ascending: false });

    if (error) return publicFailure<CommunityEventRow>();
    return data;
  } catch {
    return publicFailure<CommunityEventRow>();
  }
}

export async function readPublishedCommunityEvents(
  limit = 2,
  now = new Date(),
): Promise<CommunityEventRow[]> {
  const mode = getCmsSourceMode();
  if (mode === "local") {
    const upcoming = localCommunityEvents.filter(
      (event) => new Date(event.starts_at).getTime() >= now.getTime(),
    );
    return (upcoming.length > 0 ? upcoming : localCommunityEvents).slice(0, limit);
  }
  if (mode !== "supabase") return publicFailure<CommunityEventRow>();

  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("community_events")
      .select("*")
      .eq("status", "published")
      .gte("starts_at", now.toISOString())
      .order("starts_at", { ascending: true })
      .limit(limit);

    if (error) return publicFailure<CommunityEventRow>();
    return data;
  } catch {
    return publicFailure<CommunityEventRow>();
  }
}

async function readAdminTable<T>(
  table: "notices" | "documents" | "city_updates" | "community_events",
  localRecords: T[],
): Promise<CmsAdminResult<T>> {
  const mode = getCmsSourceMode();
  if (mode === "local") return { mode, records: localRecords };
  if (mode !== "supabase") return { mode, records: [] };

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw new CmsDataError();
  return { mode, records: data as T[] };
}

export function readAdminNotices() {
  return readAdminTable("notices", localNotices);
}

export function readAdminDocuments() {
  return readAdminTable("documents", localDocuments);
}

export function readAdminCityUpdates() {
  return readAdminTable("city_updates", localCityUpdates);
}

export function readAdminCommunityEvents() {
  return readAdminTable("community_events", localCommunityEvents);
}

async function readAdminRecord<T>(
  table: "notices" | "documents" | "city_updates" | "community_events",
  id: string,
  localRecords: T[],
): Promise<T | null> {
  const mode = getCmsSourceMode();
  if (mode === "local") {
    return (
      localRecords.find(
        (record) => (record as { id?: string }).id === id,
      ) ?? null
    );
  }
  if (mode !== "supabase") return null;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new CmsDataError();
  return data as T | null;
}

export function readAdminNotice(id: string) {
  return readAdminRecord("notices", id, localNotices);
}

export function readAdminDocument(id: string) {
  return readAdminRecord("documents", id, localDocuments);
}

export function readAdminCityUpdate(id: string) {
  return readAdminRecord("city_updates", id, localCityUpdates);
}

export function readAdminCommunityEvent(id: string) {
  return readAdminRecord("community_events", id, localCommunityEvents);
}

function requireCmsWrites() {
  if (getCmsSourceMode() !== "supabase") {
    throw new CmsDataError(
      "Connect Supabase before saving content in this workspace.",
    );
  }
}

function publishDate(status: CmsStatus, current: string | null, requested?: string | null) {
  if (status === "published") return requested ?? current ?? new Date().toISOString();
  return requested === undefined ? current : requested;
}

export async function saveNotice(
  id: string | null,
  input: Omit<NoticeInsert, "status" | "published_at"> & {
    status: CmsStatus;
    published_at?: string | null;
  },
) {
  requireCmsWrites();
  const supabase = await createSupabaseServerClient();
  const current = id ? await readAdminNotice(id) : null;
  const payload: NoticeInsert = {
    ...input,
    published_at: publishDate(
      input.status,
      current?.published_at ?? null,
      input.published_at,
    ),
  };
  const query = id
    ? supabase.from("notices").update(payload).eq("id", id)
    : supabase.from("notices").insert(payload);
  const { data, error } = await query.select("*").single();
  if (error) throw new CmsDataError();
  return data;
}

export async function saveCityUpdate(
  id: string | null,
  input: Omit<CityUpdateInsert, "status" | "published_at"> & {
    status: CmsStatus;
  },
) {
  requireCmsWrites();
  const supabase = await createSupabaseServerClient();
  const current = id ? await readAdminCityUpdate(id) : null;
  const payload: CityUpdateInsert = {
    ...input,
    published_at: publishDate(input.status, current?.published_at ?? null),
  };
  const query = id
    ? supabase.from("city_updates").update(payload).eq("id", id)
    : supabase.from("city_updates").insert(payload);
  const { data, error } = await query.select("*").single();
  if (error) throw new CmsDataError();
  return data;
}

export async function saveCommunityEvent(
  id: string | null,
  input: Omit<CommunityEventInsert, "status" | "published_at"> & {
    status: CmsStatus;
  },
) {
  requireCmsWrites();
  const supabase = await createSupabaseServerClient();
  const current = id ? await readAdminCommunityEvent(id) : null;
  const payload: CommunityEventInsert = {
    ...input,
    published_at: publishDate(input.status, current?.published_at ?? null),
  };
  const query = id
    ? supabase.from("community_events").update(payload).eq("id", id)
    : supabase.from("community_events").insert(payload);
  const { data, error } = await query.select("*").single();
  if (error) throw new CmsDataError();
  return data;
}

export async function saveDocumentRecord(
  id: string | null,
  input: Omit<DocumentInsert, "status" | "published_at"> & {
    status: CmsStatus;
  },
) {
  requireCmsWrites();
  const supabase = await createSupabaseServerClient();
  const current = id ? await readAdminDocument(id) : null;
  const payload: DocumentInsert = {
    ...input,
    published_at: publishDate(input.status, current?.published_at ?? null),
  };
  const query = id
    ? supabase.from("documents").update(payload).eq("id", id)
    : supabase.from("documents").insert(payload);
  const { data, error } = await query.select("*").single();
  if (error) throw new CmsDataError();
  return data;
}

export async function setCmsRecordStatus(
  table: "notices" | "documents" | "city_updates" | "community_events",
  id: string,
  status: CmsStatus,
) {
  requireCmsWrites();
  const supabase = await createSupabaseServerClient();
  let publishedAt: string | undefined;

  if (status === "published") {
    const { data, error: readError } = await supabase
      .from(table)
      .select("published_at")
      .eq("id", id)
      .single();

    if (readError) throw new CmsDataError();
    publishedAt = data.published_at ?? new Date().toISOString();
  }

  const payload = {
    status,
    ...(publishedAt ? { published_at: publishedAt } : {}),
  };
  const { error } = await supabase
    .from(table)
    .update(payload)
    .eq("id", id)
    .select("id")
    .single();
  if (error) throw new CmsDataError();
}

export type UploadedDocument = {
  fileName: string;
  fileUrl: string;
  storagePath: string;
  fileSizeBytes: number;
};

export async function uploadDocumentPdf(file: File): Promise<UploadedDocument> {
  requireCmsWrites();
  const supabase = await createSupabaseServerClient();
  const safeBaseName = file.name
    .replace(/\.pdf$/i, "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "document";
  const storagePath = `${crypto.randomUUID()}/${safeBaseName}.pdf`;
  const { error } = await supabase.storage
    .from("rawal-documents")
    .upload(storagePath, await file.arrayBuffer(), {
      contentType: "application/pdf",
      upsert: false,
    });

  if (error) throw new CmsDataError("The PDF could not be uploaded.");

  const { data } = supabase.storage
    .from("rawal-documents")
    .getPublicUrl(storagePath);

  return {
    fileName: file.name,
    fileUrl: data.publicUrl,
    storagePath,
    fileSizeBytes: file.size,
  };
}

export async function removeStoredDocument(storagePath: string) {
  requireCmsWrites();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.storage
    .from("rawal-documents")
    .remove([storagePath]);
  if (error) throw new CmsDataError("The previous PDF could not be removed.");
}

export async function readAdminOverview(now = new Date()) {
  const [alerts, notices, documents, updates, events] = await Promise.all([
    readAlerts(),
    readAdminNotices(),
    readAdminDocuments(),
    readAdminCityUpdates(),
    readAdminCommunityEvents(),
  ]);
  const modes = [notices.mode, documents.mode, updates.mode, events.mode];
  const mode = modes.includes("supabase")
    ? "supabase"
    : modes.every((value) => value === "local")
      ? "local"
      : "unavailable";
  const recent = [
    ...alerts.map((record) => ({
      id: `alert:${record.id}`,
      type: "Emergency alert",
      title: record.title,
      status: record.status as CmsStatus,
      updatedAt: record.updatedAt,
      href: `/admin/alerts/${record.id}/preview`,
    })),
    ...notices.records.map((record) => ({
      id: `notice:${record.id}`,
      type: "Public notice",
      title: record.title,
      status: record.status,
      updatedAt: record.updated_at,
      href: `/admin/notices/${record.id}/edit`,
    })),
    ...documents.records.map((record) => ({
      id: `document:${record.id}`,
      type: "Document",
      title: record.title,
      status: record.status,
      updatedAt: record.updated_at,
      href: `/admin/documents/${record.id}/edit`,
    })),
    ...updates.records.map((record) => ({
      id: `update:${record.id}`,
      type: "City update",
      title: record.title,
      status: record.status,
      updatedAt: record.updated_at,
      href: `/admin/updates/${record.id}/edit`,
    })),
    ...events.records.map((record) => ({
      id: `event:${record.id}`,
      type: "Community event",
      title: record.title,
      status: record.status,
      updatedAt: record.updated_at,
      href: `/admin/events/${record.id}/edit`,
    })),
  ]
    .filter((record) => new Date(record.updatedAt).getTime() <= now.getTime())
    .sort(
      (left, right) =>
        new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
    )
    .slice(0, 5);

  return {
    mode,
    counts: {
      alerts: alerts.filter(
        (alert) =>
          alert.status === "published" && !isAlertExpired(alert, now),
      ).length,
      notices: notices.records.filter((record) => record.status === "published")
        .length,
      documents: documents.records.filter(
        (record) => record.status === "published",
      ).length,
      updates: updates.records.filter((record) => record.status === "published")
        .length,
      events: events.records.filter((record) => record.status === "published")
        .length,
    },
    recent,
  };
}

export function isDocumentCategory(value: string): value is DocumentCategorySlug {
  return municipalDocuments.some((document) => document.category === value);
}
