import type { Metadata } from "next";
import Link from "next/link";

import { PublicPageIntro } from "@/components/public-page-intro";
import {
  getDocumentCategoryLabel,
  municipalDocuments,
  type MunicipalDocument,
} from "@/data/documents";

export const metadata: Metadata = {
  title: "Documents & forms",
  description:
    "Find common forms, guides and municipal reference documents in the Rawal One demonstration.",
};

type DocumentsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getFirstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function tidyQuery(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, 200).trim();
}

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getSearchableText(document: MunicipalDocument) {
  return normalizeSearchText(
    [
      document.title,
      document.description,
      getDocumentCategoryLabel(document.category),
      ...document.keywords,
    ].join(" "),
  );
}

function filterDocuments(query: string) {
  const terms = normalizeSearchText(query).split(" ").filter(Boolean);

  if (terms.length === 0) return [...municipalDocuments];

  return municipalDocuments.filter((document) => {
    const searchableText = getSearchableText(document);
    return terms.every((term) => searchableText.includes(term));
  });
}

function getResultStatus(count: number, query: string) {
  const documentLabel = count === 1 ? "document" : "documents";
  return query
    ? `${count} ${documentLabel} matching “${query}”`
    : `${count} ${documentLabel}`;
}

export default async function DocumentsPage({ searchParams }: DocumentsPageProps) {
  const params = await searchParams;
  const query = tidyQuery(getFirstParam(params.q));
  const matchingDocuments = filterDocuments(query);
  const resultStatus = getResultStatus(matchingDocuments.length, query);

  return (
    <>
      <PublicPageIntro
        id="documents-page-heading"
        eyebrow="Resident resources"
        title="Documents & forms"
        description="Find commonly used forms, guides, notices and municipal reference documents."
      >
        <div className="border-t-[3px] border-accent bg-surface px-5 py-5 shadow-[0_14px_34px_-30px_rgba(16,55,44,0.45)] sm:px-7 sm:py-6">
          <form action="/documents" method="get" role="search">
            <label
              htmlFor="documents-search"
              className="block text-base font-semibold tracking-[-0.01em] text-ink"
            >
              Search documents
            </label>
            <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-civic"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>
                <input
                  key={query}
                  id="documents-search"
                  name="q"
                  type="search"
                  defaultValue={query}
                  maxLength={200}
                  placeholder="Search forms, permits, waste, water..."
                  className="civic-input search-preview min-h-14 w-full min-w-0 ps-12"
                />
              </div>
              <button
                type="submit"
                className="civic-button min-h-14 px-7"
              >
                Search
              </button>
            </div>
            {query ? (
              <Link
                href="/documents"
                className="civic-link mt-2 inline-flex min-h-11 items-center text-sm font-semibold"
              >
                Clear search
              </Link>
            ) : (
              <p className="mt-3 text-sm leading-6 text-muted">
                Search by document title, topic, category or a common resident term.
              </p>
            )}
          </form>
        </div>
      </PublicPageIntro>

      <section className="bg-page" aria-labelledby="documents-results-heading">
        <div className="civic-container py-10 sm:py-12 lg:py-16">
          <div className="flex flex-col gap-3 border-b-2 border-ink pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <p className="civic-eyebrow">Resource library</p>
              <h2
                id="documents-results-heading"
                className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl"
              >
                {matchingDocuments.length === 0 ? "No documents found" : "Documents"}
              </h2>
            </div>
            <p
              role="status"
              aria-atomic="true"
              className="max-w-full [overflow-wrap:anywhere] text-sm font-semibold text-civic"
            >
              {resultStatus}
            </p>
          </div>

          {matchingDocuments.length === 0 ? (
            <div className="mt-6 border-s-[3px] border-accent bg-surface px-5 py-8 sm:px-7">
              <p className="max-w-xl text-lg leading-8 text-muted">
                Try a different search term or view all documents.
              </p>
              <Link
                href="/documents"
                className="civic-button mt-5 inline-flex min-h-11 items-center px-5 py-3"
              >
                View all documents
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line border-b border-b-line">
              {matchingDocuments.map((document) => (
                <li
                  id={document.slug}
                  key={document.slug}
                  className="scroll-mt-6"
                >
                  <article className="grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 gap-y-3 py-6 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-x-5 sm:py-7 lg:grid-cols-[3.25rem_minmax(0,1fr)_auto] lg:items-center lg:gap-x-8">
                    <div
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center border border-line bg-sage text-civic sm:h-13 sm:w-13"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 2.75h7l5 5V21H6a2 2 0 0 1-2-2V4.75a2 2 0 0 1 2-2Z" />
                        <path d="M13 2.75v5h5" />
                        <path d="M8 13h6M8 17h8" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm [overflow-wrap:anywhere]">
                        <p className="border border-line bg-surface px-2 py-0.5 text-xs font-semibold tracking-[0.08em] text-civic uppercase">
                          {document.format}
                        </p>
                        <p className="font-medium text-civic">
                          {getDocumentCategoryLabel(document.category)}
                        </p>
                        <span className="text-line" aria-hidden="true">
                          |
                        </span>
                        <p className="text-muted">
                          Updated{" "}
                          <time dateTime={document.updatedDateTime}>
                            {document.updatedDate}
                          </time>
                        </p>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.025em] text-ink sm:text-[1.35rem]">
                        {document.title}
                      </h3>
                      <p className="mt-2 max-w-2xl leading-7 text-muted">
                        {document.description}
                      </p>
                    </div>
                    <a
                      href={document.href}
                      download={document.fileName}
                      className="group col-start-2 inline-flex min-h-11 items-center justify-self-start gap-2 font-semibold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic lg:col-start-auto lg:justify-self-end"
                    >
                      Download PDF
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 items-center justify-center border border-line bg-surface text-base text-civic transition-colors duration-200 group-hover:border-civic group-hover:bg-civic group-hover:text-white motion-reduce:transition-none"
                      >
                        ↓
                      </span>
                      <span className="sr-only">: {document.title}</span>
                    </a>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
