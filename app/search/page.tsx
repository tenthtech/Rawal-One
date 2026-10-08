import type { Metadata } from "next";
import Link from "next/link";

import {
  filterSearchResults,
  getSearchFilter,
  searchFilters,
  searchRawalOne,
  tidySearchQuery,
  type SearchFilter,
} from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Rawal One services, documents, notices, community information and current resident updates.",
  robots: {
    index: false,
    follow: true,
  },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const suggestedSearches = [
  { label: "Water", query: "water" },
  { label: "Waste", query: "waste" },
  { label: "Building permit", query: "building permit" },
  { label: "Road issue", query: "road issue" },
  { label: "Recreation", query: "recreation" },
] as const;

const filteredResultLabels: Record<Exclude<SearchFilter, "all">, string> = {
  services: "service",
  documents: "document",
  "updates-notices": "update or notice",
  community: "community",
  alerts: "current alert",
};

function getFirstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function buildSearchHref(query: string, filter: SearchFilter = "all") {
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (filter !== "all") params.set("type", filter);

  const search = params.toString();
  return search ? `/search?${search}` : "/search";
}

function getResultStatus(count: number, query: string, filter: SearchFilter) {
  if (filter === "all") {
    return `${count} ${count === 1 ? "result" : "results"} for “${query}”`;
  }

  const resultLabel = filteredResultLabels[filter];
  return `${count} ${resultLabel} ${count === 1 ? "result" : "results"} for “${query}”`;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = tidySearchQuery(getFirstParam(params.q));
  const requestedFilter = getSearchFilter(
    getFirstParam(params.type).trim().toLowerCase() || undefined,
  );
  const activeFilter = query ? requestedFilter : "all";
  const allResults = query ? await searchRawalOne(query) : [];
  const results = filterSearchResults(allResults, activeFilter);
  const resultStatus = getResultStatus(results.length, query, activeFilter);

  return (
    <>
      <section
        className="border-b border-line bg-sage"
        aria-labelledby="search-page-heading"
      >
        <div className="mx-auto grid max-w-[76rem] gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(27rem,1.1fr)] lg:items-center lg:gap-16 lg:px-10 lg:py-16">
          <div className="max-w-2xl">
            <div className="mb-5 h-1 w-12 rounded-full bg-accent" aria-hidden="true" />
            <p className="text-xs font-bold tracking-[0.14em] text-civic uppercase sm:text-sm">
              Resident information
            </p>
            <h1
              id="search-page-heading"
              className="mt-3 text-4xl leading-[1.12] font-bold tracking-tight text-ink sm:text-5xl"
            >
              Search Rawal One
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
              Find services, documents, notices, community information and current
              resident updates.
            </p>
          </div>

          <div className="rounded-md border border-line bg-surface p-5 shadow-[0_10px_30px_-24px_rgba(24,37,33,0.35)] sm:p-7">
            <form action="/search" method="get" role="search">
              <label
                htmlFor="global-search"
                className="block text-base font-bold text-ink"
              >
                Search Rawal One
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
                    id="global-search"
                    name="q"
                    type="search"
                    defaultValue={query}
                    maxLength={200}
                    placeholder="Search water, permits, waste, roads..."
                    className="search-preview min-h-14 w-full min-w-0 rounded-md border border-civic bg-white py-3 pe-4 ps-12 text-base text-ink"
                  />
                </div>
                {activeFilter !== "all" ? (
                  <input type="hidden" name="type" value={activeFilter} />
                ) : null}
                <button
                  type="submit"
                  className="min-h-14 rounded-md bg-civic px-6 py-3 font-bold text-white hover:bg-civic-deep"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {!query ? (
        <section
          className="bg-page"
          aria-labelledby="search-suggestions-heading"
        >
          <div className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
            <p className="text-xs font-bold tracking-[0.14em] text-civic uppercase sm:text-sm">
              A place to start
            </p>
            <h2
              id="search-suggestions-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl"
            >
              Try searching for a service or local topic.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              Start with one of these common resident searches.
            </p>
            <ul className="mt-6 max-w-3xl border-t border-line sm:grid sm:grid-cols-2 sm:gap-x-10">
              {suggestedSearches.map((suggestion) => (
                <li key={suggestion.query} className="border-b border-line">
                  <Link
                    href={buildSearchHref(suggestion.query)}
                    className="group flex min-h-14 items-center justify-between gap-4 py-3 font-bold text-civic underline decoration-civic/25 underline-offset-4 hover:decoration-civic"
                  >
                    {suggestion.label}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <div className="bg-page">
          <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 lg:px-10">
            <nav className="border-t-2 border-accent pt-5" aria-labelledby="search-filters-heading">
              <h2
                id="search-filters-heading"
                className="text-lg font-bold tracking-tight text-ink"
              >
                Filter results
              </h2>
              <ul className="mt-4 grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
                {searchFilters.map((filter) => {
                  const isCurrent = activeFilter === filter.value;

                  return (
                    <li key={filter.value}>
                      <Link
                        href={buildSearchHref(query, filter.value)}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`flex min-h-12 items-center gap-2 rounded-sm border-s-2 px-3 py-2 font-semibold no-underline ${
                          isCurrent
                            ? "border-s-civic bg-sage text-civic"
                            : "border-s-transparent text-ink hover:border-s-accent hover:bg-surface hover:text-civic"
                        }`}
                      >
                        {isCurrent ? <span aria-hidden="true">✓</span> : null}
                        <span className="min-w-0">{filter.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <section className="min-w-0" aria-labelledby="search-results-heading">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <h2
                  id="search-results-heading"
                  className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
                >
                  {results.length === 0 ? "No results found" : "Search results"}
                </h2>
                <p
                  role="status"
                  aria-atomic="true"
                  className="max-w-full [overflow-wrap:anywhere] text-sm font-semibold text-civic sm:text-base"
                >
                  {resultStatus}
                </p>
              </div>

              {results.length === 0 ? (
                <div className="mt-6 rounded-sm border border-line bg-surface px-5 py-7 sm:px-7">
                  <p className="max-w-xl text-lg leading-8 text-muted">
                    Try a different term or browse services and documents.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {activeFilter !== "all" && allResults.length > 0 ? (
                      <Link
                        href={buildSearchHref(query)}
                        className="inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
                      >
                        View all results
                      </Link>
                    ) : null}
                    <Link
                      href="/services"
                      className="inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
                    >
                      Browse all services
                    </Link>
                    <Link
                      href="/documents"
                      className="inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
                    >
                      Browse documents
                    </Link>
                  </div>
                </div>
              ) : (
                <ol className="mt-6 divide-y divide-line border-y border-line bg-surface px-4 sm:px-6">
                  {results.map((result) => (
                    <li key={result.id} className="min-w-0">
                      <article className="py-5 sm:py-6">
                        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-sm [overflow-wrap:anywhere]">
                          <p className="font-bold text-civic">{result.typeLabel}</p>
                          {result.category ? (
                            <>
                              <span className="text-line" aria-hidden="true">
                                |
                              </span>
                              <p className="text-muted">{result.category}</p>
                            </>
                          ) : null}
                          {result.date ? (
                            <>
                              <span className="text-line" aria-hidden="true">
                                |
                              </span>
                              <time className="text-muted" dateTime={result.date.dateTime}>
                                {result.date.label}
                              </time>
                            </>
                          ) : null}
                        </div>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                          <Link
                            href={result.href}
                            className="text-ink underline decoration-civic/35 underline-offset-4 [overflow-wrap:anywhere] hover:text-civic hover:decoration-civic"
                          >
                            {result.title}
                            <span className="whitespace-nowrap text-civic" aria-hidden="true">
                              {" →"}
                            </span>
                          </Link>
                        </h3>
                        <p className="mt-2 max-w-3xl leading-7 text-muted [overflow-wrap:anywhere]">
                          {result.summary}
                        </p>
                      </article>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
}
