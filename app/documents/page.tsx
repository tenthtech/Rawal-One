import type { Metadata } from "next";
import Link from "next/link";

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
      <section
        className="border-b border-line bg-sage"
        aria-labelledby="documents-page-heading"
      >
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="max-w-3xl border-s-4 border-accent ps-5 sm:ps-7">
            <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
              Resident resources
            </p>
            <h1
              id="documents-page-heading"
              className="mt-3 text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl"
            >
              Documents &amp; forms
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Find commonly used forms, guides, notices and municipal reference
              documents.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-page" aria-labelledby="documents-results-heading">
        <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <h2
              id="documents-results-heading"
              className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl"
            >
              {matchingDocuments.length === 0 ? "No documents found" : "Documents"}
            </h2>
            <p
              role="status"
              aria-atomic="true"
              className="max-w-full [overflow-wrap:anywhere] text-base font-bold text-civic"
            >
              {resultStatus}
            </p>
          </div>

          <form
            action="/documents"
            method="get"
            role="search"
            className="mt-7 border-y border-line bg-surface px-5 py-6 sm:px-7"
          >
            <label htmlFor="documents-search" className="block text-base font-bold text-ink">
              Search documents
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
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
                  className="search-preview min-h-14 w-full min-w-0 rounded-sm border-2 border-civic bg-white py-3 pe-4 ps-12 text-base text-ink"
                />
              </div>
              <button
                type="submit"
                className="min-h-14 rounded-sm bg-civic px-6 py-3 font-bold text-white hover:bg-civic-deep"
              >
                Search
              </button>
            </div>
            {query ? (
              <Link
                href="/documents"
                className="mt-3 inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
              >
                Clear search
              </Link>
            ) : (
              <p className="mt-3 text-sm leading-6 text-muted">
                Search by document title, topic, category or a common resident term.
              </p>
            )}
          </form>

          {matchingDocuments.length === 0 ? (
            <div className="mt-8 border-y border-line bg-surface px-5 py-8 sm:px-7">
              <p className="max-w-xl text-lg leading-8 text-muted">
                Try a different search term or view all documents.
              </p>
              <Link
                href="/documents"
                className="mt-5 inline-flex min-h-11 items-center rounded-sm bg-civic px-5 py-3 font-bold text-white no-underline hover:bg-civic-deep"
              >
                View all documents
              </Link>
            </div>
          ) : (
            <ul className="mt-8 border-t border-line">
              {matchingDocuments.map((document) => (
                <li
                  id={document.slug}
                  key={document.slug}
                  className="scroll-mt-6 border-b border-line"
                >
                  <article className="grid min-w-0 gap-5 px-1 py-6 sm:px-3 sm:py-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm [overflow-wrap:anywhere]">
                        <p className="font-bold text-civic">{document.format}</p>
                        <span className="text-line" aria-hidden="true">
                          |
                        </span>
                        <p className="text-muted">
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
                      <h3 className="mt-2 text-xl font-bold tracking-[-0.015em] text-ink sm:text-2xl">
                        {document.title}
                      </h3>
                      <p className="mt-2 max-w-3xl leading-7 text-muted">
                        {document.description}
                      </p>
                    </div>
                    <a
                      href={document.href}
                      download={document.fileName}
                      className="inline-flex min-h-11 items-center justify-center justify-self-start rounded-sm border-2 border-civic px-4 py-2 font-bold text-civic no-underline hover:bg-sage md:justify-self-end"
                    >
                      Download PDF
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
