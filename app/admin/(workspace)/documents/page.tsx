import type { Metadata } from "next";
import Link from "next/link";

import {
  inactivateDocumentAction,
  publishDocumentAction,
} from "@/app/admin/documents/actions";
import { documentCategories } from "@/data/documents";
import {
  readAdminDocuments,
  type CmsSourceMode,
  type CmsStatus,
} from "@/lib/cms";

export const metadata: Metadata = {
  title: "Documents administration",
  description: "Upload and manage resident-facing Rawal One documents.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DocumentsPageProps = {
  searchParams: Promise<{ document?: string | string[] }>;
};

const notifications = {
  "draft-saved": {
    heading: "Draft saved",
    message: "The document is saved in the workspace and is not public.",
    tone: "success",
  },
  published: {
    heading: "Document published",
    message: "The document is now available on public pages and in search.",
    tone: "success",
  },
  inactivated: {
    heading: "Document set to inactive",
    message: "The record remains in this workspace and is no longer public.",
    tone: "success",
  },
  "connection-required": {
    heading: "Connect Supabase to change documents",
    message: "Local fallback content and files are read-only in this workspace.",
    tone: "error",
  },
  "replacement-cleanup-failed": {
    heading: "Document saved; previous file needs review",
    message:
      "The new document was saved, but its previous PDF could not be removed from the rawal-documents bucket. Ask an administrator to review Storage.",
    tone: "error",
  },
  "operation-failed": {
    heading: "The action could not be completed",
    message: "Review the document and Supabase configuration, then try again.",
    tone: "error",
  },
} as const;

const statusLabels: Record<CmsStatus, string> = {
  draft: "Draft",
  published: "Published",
  inactive: "Inactive",
};

const statusStyles: Record<CmsStatus, string> = {
  draft: "border-civic/30 bg-sage text-civic",
  published: "border-success/35 bg-white text-success",
  inactive: "border-muted/35 bg-white text-muted",
};

function formatDateTime(value: string | null) {
  if (!value) return "Not published";

  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}

function categoryLabel(category: string) {
  return (
    documentCategories.find((option) => option.slug === category)?.label ??
    category
  );
}

function SourceNotice({ mode }: { mode: CmsSourceMode }) {
  if (mode === "supabase") return null;

  return (
    <section
      aria-labelledby="documents-source-heading"
      className="mt-6 border-s-4 border-information bg-surface px-5 py-4"
    >
      <h2 id="documents-source-heading" className="font-bold text-ink">
        {mode === "local"
          ? "Local fallback documents"
          : "Supabase is not configured"}
      </h2>
      <p className="mt-1 max-w-4xl text-sm leading-6 text-muted">
        {mode === "local"
          ? "These repository PDFs and published records are available for review only. Connect Supabase before uploading, replacing, publishing or inactivating documents."
          : "Connect Supabase and apply the CMS schema before loading or managing documents."}
      </p>
    </section>
  );
}

export default async function DocumentsAdminPage({
  searchParams,
}: DocumentsPageProps) {
  const params = await searchParams;
  const notificationKey = Array.isArray(params.document)
    ? params.document[0]
    : params.document;
  const notification =
    notificationKey && notificationKey in notifications
      ? notifications[notificationKey as keyof typeof notifications]
      : null;

  let result: Awaited<ReturnType<typeof readAdminDocuments>> | null = null;

  try {
    result = await readAdminDocuments();
  } catch {
    result = null;
  }

  return (
    <div className="px-5 py-7 sm:px-8 sm:py-9 xl:px-10">
      <div className="mx-auto max-w-[78rem]">
        <header className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-civic uppercase">
              Content
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
              Documents
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              Upload, replace and publish PDF forms, guides and municipal
              information for residents.
            </p>
          </div>
          <Link
            href="/admin/documents/new"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-sm bg-civic px-4 py-2.5 font-bold text-white no-underline hover:bg-civic-deep"
          >
            Add document
          </Link>
        </header>

        {notification ? (
          <section
            aria-labelledby="documents-notification-heading"
            className={`mt-6 border-s-4 bg-surface px-5 py-4 ${
              notification.tone === "error"
                ? "border-emergency"
                : "border-success"
            }`}
          >
            <h2
              id="documents-notification-heading"
              className="font-bold text-ink"
            >
              {notification.heading}
            </h2>
            <p className="mt-1 max-w-4xl text-sm leading-6 text-muted">
              {notification.message}
            </p>
          </section>
        ) : null}

        {result ? <SourceNotice mode={result.mode} /> : null}

        <section aria-labelledby="document-records-heading" className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-4">
            <h2
              id="document-records-heading"
              className="text-2xl font-bold tracking-[-0.02em] text-ink"
            >
              Document records
            </h2>
            {result ? (
              <p className="text-sm font-semibold text-muted">
                {result.records.length}{" "}
                {result.records.length === 1 ? "record" : "records"}
              </p>
            ) : null}
          </div>

          {!result ? (
            <div className="border-s-4 border-emergency bg-surface px-5 py-5">
              <h3 className="font-bold text-ink">Documents are unavailable</h3>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-muted">
                The workspace could not load document records. Try again or
                check the Supabase configuration and CMS schema.
              </p>
            </div>
          ) : result.records.length === 0 ? (
            <div className="border-b border-line py-10">
              <h3 className="text-xl font-bold text-ink">No documents yet</h3>
              <p className="mt-2 max-w-2xl leading-7 text-muted">
                Add a PDF to begin the draft and publication workflow.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-line border-b border-line">
              {result.records.map((record) => {
                const publishAction = publishDocumentAction.bind(
                  null,
                  record.id,
                );
                const inactivateAction = inactivateDocumentAction.bind(
                  null,
                  record.id,
                );

                return (
                  <li key={record.id} className="py-6">
                    <article className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-8">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                          <span
                            className={`border px-2.5 py-1 tracking-[0.04em] uppercase ${statusStyles[record.status]}`}
                          >
                            <span className="sr-only">Status: </span>
                            {statusLabels[record.status]}
                          </span>
                          <span className="border border-line bg-white px-2.5 py-1 text-muted">
                            {categoryLabel(record.category)}
                          </span>
                          <span className="border border-line bg-white px-2.5 py-1 text-muted">
                            {record.document_type}
                          </span>
                        </div>

                        <h3 className="mt-3 [overflow-wrap:anywhere] text-xl font-bold leading-snug tracking-[-0.02em] text-ink sm:text-2xl">
                          {record.title}
                        </h3>
                        <p className="mt-2 max-w-3xl leading-7 text-muted">
                          {record.description}
                        </p>

                        <dl className="mt-4 grid max-w-3xl gap-3 text-sm sm:grid-cols-2">
                          <div>
                            <dt className="font-bold text-ink">Published</dt>
                            <dd className="mt-1 text-muted">
                              {formatDateTime(record.published_at)}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-bold text-ink">Updated</dt>
                            <dd className="mt-1 text-muted">
                              {formatDateTime(record.updated_at)}
                            </dd>
                          </div>
                        </dl>

                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                          <span className="break-all text-muted">
                            {record.file_name}
                          </span>
                          <a
                            href={record.file_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
                          >
                            Open PDF
                            <span className="sr-only">
                              {" "}
                              for {record.title} in a new tab
                            </span>
                          </a>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 lg:max-w-72 lg:justify-end">
                        <Link
                          href={`/admin/documents/${record.id}/edit`}
                          className="inline-flex min-h-11 items-center justify-center border border-civic px-3 py-2 text-sm font-bold text-civic no-underline hover:bg-sage"
                        >
                          Edit
                          <span className="sr-only"> {record.title}</span>
                        </Link>
                        {record.status === "published" ? (
                          <form action={inactivateAction}>
                            <button
                              type="submit"
                              className="min-h-11 border border-muted/50 px-3 py-2 text-sm font-bold text-ink hover:bg-sage"
                            >
                              Set inactive
                              <span className="sr-only"> {record.title}</span>
                            </button>
                          </form>
                        ) : (
                          <form action={publishAction}>
                            <button
                              type="submit"
                              className="min-h-11 bg-civic px-3 py-2 text-sm font-bold text-white hover:bg-civic-deep"
                            >
                              Publish
                              <span className="sr-only"> {record.title}</span>
                            </button>
                          </form>
                        )}
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
