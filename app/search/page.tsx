import type { Metadata } from "next";
import Link from "next/link";

import { PublicPageIntro } from "@/components/public-page-intro";
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
      <PublicPageIntro
        id="search-page-heading"
        eyebrow="Find local information"
        title="Search Rawal One"
        description="Find services, documents, notices, community information and current resident updates."
      >
        <div className="border-t-[3px] border-accent bg-surface px-5 py-5 shadow-[0_14px_34px_-30px_rgba(16,55,44,0.45)] sm:px-7 sm:py-6">
          <form action="/search" method="get" role="search">
            <label
              htmlFor="global-search"
              className="block text-base font-semibold tracking-[-0.01em] text-ink"
            >
              Search the site
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
                  id="global-search"
                  name="q"
                  type="search"
                  defaultValue={query}
                  maxLength={200}
                  placeholder="Search water, permits, waste, roads..."
                  className="civic-input search-preview min-h-14 w-full min-w-0 ps-12"
                />
              </div>
              {activeFilter !== "all" ? (
                <input type="hidden" name="type" value={activeFilter} />
              ) : null}
              <button type="submit" className="civic-button min-h-14 px-7">
                Search
              </button>
            </div>
          </form>
          <p className="mt-3 text-sm leading-6 text-muted">
            Search across resident services and community information.
          </p>
        </div>
      </PublicPageIntro>

      {!query ? (
        <section
          className="bg-page"
          aria-labelledby="search-suggestions-heading"
        >
          <div className="civic-container grid gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-16">
            <div>
              <p className="civic-eyebrow">A place to start</p>
              <h2 id="search-suggestions-heading" className="civic-heading mt-2 max-w-lg">
                Explore the everyday essentials.
              </h2>
              <p className="mt-4 max-w-md leading-7 text-muted">
                Try a common resident topic, or use the search above for something
                more specific.
              </p>
            </div>
            <ul className="divide-y divide-line border-t-2 border-ink border-b border-b-line">
              {suggestedSearches.map((suggestion) => (
                <li key={suggestion.query}>
                  <Link
                    href={buildSearchHref(suggestion.query)}
                    className="group flex min-h-14 items-center justify-between gap-5 py-3 text-lg font-semibold text-civic no-underline hover:text-civic-deep"
                  >
                    <span className="underline decoration-civic/35 underline-offset-4 group-hover:decoration-civic">
                      {suggestion.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center border border-line bg-surface text-base text-civic transition-colors duration-200 group-hover:border-civic group-hover:bg-civic group-hover:text-white motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <div className="bg-page">
          <div className="civic-container grid gap-10 py-10 sm:py-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-16">
            <nav
              className="min-w-0 border-t-[3px] border-accent pt-5 lg:self-start"
              aria-labelledby="search-filters-heading"
            >
              <p className="civic-eyebrow">Refine</p>
              <h2
                id="search-filters-heading"
                className="mt-2 text-xl font-semibold tracking-[-0.025em] text-ink"
              >
                Filter by type
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2 lg:block lg:border-t lg:border-line">
                {searchFilters.map((filter) => {
                  const isCurrent = activeFilter === filter.value;

                  return (
                    <li key={filter.value}>
                      <Link
                        href={buildSearchHref(query, filter.value)}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`inline-flex min-h-11 items-center gap-2 border px-3 py-2 text-sm font-semibold no-underline transition-colors duration-200 motion-reduce:transition-none lg:flex lg:min-h-12 lg:border-0 lg:border-b lg:border-s-[3px] lg:px-4 ${
                          isCurrent
                            ? "border-civic bg-civic text-white lg:border-line lg:border-s-accent lg:bg-sage lg:text-civic"
                            : "border-line bg-surface text-ink hover:border-civic hover:bg-sage lg:border-line lg:border-s-transparent lg:bg-transparent lg:hover:border-s-accent lg:hover:bg-surface lg:hover:text-civic"
                        }`}
                      >
                        <span className="min-w-0">{filter.label}</span>
                        {isCurrent ? <span aria-hidden="true">✓</span> : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <section className="min-w-0" aria-labelledby="search-results-heading">
              <div className="flex flex-col gap-3 border-b-2 border-ink pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <div>
                  <p className="civic-eyebrow">Matches</p>
                  <h2
                    id="search-results-heading"
                    className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl"
                  >
                    {results.length === 0 ? "No results found" : "Search results"}
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

              {results.length === 0 ? (
                <div className="mt-6 border-s-[3px] border-accent bg-surface px-5 py-8 sm:px-7">
                  <p className="max-w-xl text-lg leading-8 text-muted">
                    Try a different term or browse services and documents.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {activeFilter !== "all" && allResults.length > 0 ? (
                      <Link
                        href={buildSearchHref(query)}
                        className="civic-link inline-flex min-h-11 items-center font-semibold"
                      >
                        View all results
                      </Link>
                    ) : null}
                    <Link
                      href="/services"
                      className="civic-link inline-flex min-h-11 items-center font-semibold"
                    >
                      Browse all services
                    </Link>
                    <Link
                      href="/documents"
                      className="civic-link inline-flex min-h-11 items-center font-semibold"
                    >
                      Browse documents
                    </Link>
                  </div>
                </div>
              ) : (
                <ol className="divide-y divide-line border-b border-b-line">
                  {results.map((result) => (
                    <li key={result.id} className="min-w-0">
                      <article className="py-6 sm:py-7">
                        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-sm [overflow-wrap:anywhere]">
                          <p className="font-semibold tracking-[0.08em] text-civic uppercase">{result.typeLabel}</p>
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
                        <h3 className="mt-2 text-xl font-semibold leading-snug tracking-[-0.025em] text-ink sm:text-[1.35rem]">
                          <Link
                            href={result.href}
                            className="group inline-flex min-h-11 max-w-full items-center gap-3 text-civic underline decoration-civic/35 underline-offset-4 [overflow-wrap:anywhere] hover:decoration-civic"
                          >
                            <span className="min-w-0">{result.title}</span>
                            <span
                              aria-hidden="true"
                              className="flex h-8 w-8 shrink-0 items-center justify-center border border-line bg-surface text-base text-civic transition-colors duration-200 group-hover:border-civic group-hover:bg-civic group-hover:text-white motion-reduce:transition-none"
                            >
                              →
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
