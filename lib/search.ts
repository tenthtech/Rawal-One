import "server-only";

import { cityUpdates, communityEvents } from "@/data/homepage";
import {
  getServiceCategoryLabel,
  services,
  type ServiceRecord,
} from "@/data/services";
import { waterServiceDetail } from "@/data/water-service";
import { getAlertSeverityLabel, formatAlertDateTime } from "@/lib/alert-model";
import { getActivePublicAlerts } from "@/lib/alerts";

export const searchFilters = [
  { value: "all", label: "All" },
  { value: "services", label: "Services" },
  { value: "updates-notices", label: "Updates & notices" },
  { value: "community", label: "Community" },
  { value: "alerts", label: "Current alerts" },
] as const;

export type SearchFilter = (typeof searchFilters)[number]["value"];
export type SearchResultGroup = Exclude<SearchFilter, "all">;

export type SearchResult = {
  id: string;
  group: SearchResultGroup;
  typeLabel: string;
  title: string;
  summary: string;
  href: string;
  category?: string;
  date?: {
    dateTime: string;
    label: string;
  };
};

type SearchDocument = SearchResult & {
  keywords: readonly string[];
  body: readonly string[];
};

type RankedResult = {
  result: SearchResult;
  score: number;
};

const synonymMap: Readonly<Record<string, readonly string[]>> = {
  garbage: ["waste"],
  trash: ["waste"],
  licence: ["license"],
  licences: ["licenses"],
  license: ["licence"],
  licenses: ["licences"],
  pothole: ["road"],
  streetlight: ["street light"],
  outage: ["interruption"],
  interruption: ["outage"],
  pay: ["payment"],
  permit: ["application"],
  park: ["recreation"],
  program: ["programme"],
  programme: ["program"],
  recreation: ["park"],
};

const ignoredQueryTerms = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "do",
  "find",
  "for",
  "how",
  "i",
  "in",
  "is",
  "me",
  "my",
  "of",
  "on",
  "or",
  "please",
  "the",
  "to",
  "what",
  "when",
  "where",
  "with",
]);

const groupPriority: Record<SearchResultGroup, number> = {
  services: 0,
  "updates-notices": 1,
  community: 2,
  alerts: 3,
};

export function tidySearchQuery(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, 200).trim();
}

export function getSearchFilter(value: string | undefined): SearchFilter {
  return searchFilters.some((filter) => filter.value === value)
    ? (value as SearchFilter)
    : "all";
}

export function filterSearchResults(
  results: readonly SearchResult[],
  filter: SearchFilter,
) {
  if (filter === "all") return [...results];
  return results.filter((result) => result.group === filter);
}

function normalizeSearchText(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function getWordForms(word: string) {
  const forms = new Set([word]);

  if (word.length <= 2) return forms;

  forms.add(`${word}s`);
  forms.add(`${word}es`);

  if (word.endsWith("y")) {
    forms.add(`${word.slice(0, -1)}ies`);
  }

  if (word.endsWith("ies") && word.length > 3) {
    forms.add(`${word.slice(0, -3)}y`);
  }

  if (word.endsWith("es") && word.length > 3) {
    forms.add(word.slice(0, -2));
  }

  if (word.endsWith("s") && !word.endsWith("ss") && word !== "news") {
    forms.add(word.slice(0, -1));
  }

  return forms;
}

function wordsMatch(left: string, right: string) {
  if (left === right) return true;

  const leftForms = getWordForms(left);
  const rightForms = getWordForms(right);
  return [...leftForms].some((form) => rightForms.has(form));
}

function containsSearchTerm(value: string, term: string) {
  const valueWords = normalizeSearchText(value).split(" ").filter(Boolean);
  const termWords = normalizeSearchText(term).split(" ").filter(Boolean);

  if (termWords.length === 0 || termWords.length > valueWords.length) return false;

  return valueWords.some((_, startIndex) =>
    termWords.every((termWord, offset) => {
      const valueWord = valueWords[startIndex + offset];
      return valueWord ? wordsMatch(termWord, valueWord) : false;
    }),
  );
}

function getSynonyms(term: string) {
  for (const form of getWordForms(term)) {
    if (synonymMap[form]) return synonymMap[form];
  }

  return [];
}

function getQueryConcepts(query: string) {
  const normalizedQuery = normalizeSearchText(query).replace(
    /\bstreet light\b/g,
    "streetlight",
  );

  return {
    normalizedQuery,
    concepts: normalizedQuery
      .split(" ")
      .filter((term) => Boolean(term) && !ignoredQueryTerms.has(term))
      .map((term) => [term, ...getSynonyms(term)]),
  };
}

function buildServiceHref(service: ServiceRecord) {
  if (service.detailHref) return service.detailHref;

  const params = new URLSearchParams({
    q: service.title,
    category: service.category,
  });
  return `/services?${params.toString()}`;
}

function getServiceDocuments(): SearchDocument[] {
  return services.map((service) => {
    const category = getServiceCategoryLabel(service.category) ?? "Service";

    if (service.slug === "water-service-interruptions") {
      return {
        id: `service:${service.slug}`,
        group: "services",
        typeLabel: "Service",
        title: service.title,
        summary: waterServiceDetail.summary,
        href: buildServiceHref(service),
        category: `${category} · Detailed guidance`,
        keywords: service.keywords,
        body: [
          waterServiceDetail.status.label,
          waterServiceDetail.status.description,
          waterServiceDetail.status.affectedArea,
          waterServiceDetail.status.impact,
        ],
      };
    }

    return {
      id: `service:${service.slug}`,
      group: "services",
      typeLabel: "Service",
      title: service.title,
      summary: service.summary,
      href: buildServiceHref(service),
      category,
      keywords: service.keywords,
      body: [],
    };
  });
}

function getUpdateDocuments(): SearchDocument[] {
  return cityUpdates.map((update, index) => {
    const isPublicNotice = update.category === "Public notice";

    return {
      id: `update:${index}:${normalizeSearchText(update.title).replace(/ /g, "-")}`,
      group: "updates-notices",
      typeLabel: isPublicNotice ? "Public notice" : "City update",
      title: update.title,
      summary: update.description,
      href: "/#updates",
      category: isPublicNotice ? undefined : update.category,
      date: {
        dateTime: update.dateTime,
        label: update.date,
      },
      keywords: [],
      body: [],
    };
  });
}

function getCommunityDocuments(): SearchDocument[] {
  return communityEvents.map((event, index) => ({
    id: `event:${index}:${normalizeSearchText(event.title).replace(/ /g, "-")}`,
    group: "community",
    typeLabel: "Community event",
    title: event.title,
    summary: event.description,
    href: "/#community",
    category: "Community",
    date: {
      dateTime: event.dateTime,
      label: event.date,
    },
    keywords: [],
    body: [],
  }));
}

async function getAlertDocuments(now: Date): Promise<SearchDocument[]> {
  const alerts = await getActivePublicAlerts(now);

  return alerts.map((alert) => ({
    id: `alert:${alert.id}`,
    group: "alerts",
    typeLabel: "Current alert",
    title: alert.title,
    summary: alert.message,
    href: "/#current-alerts",
    category: `${getAlertSeverityLabel(alert.severity)} · ${alert.affectedArea}`,
    date: alert.publishedAt
      ? {
          dateTime: alert.publishedAt,
          label: formatAlertDateTime(alert.publishedAt),
        }
      : undefined,
    keywords: [getAlertSeverityLabel(alert.severity), alert.affectedArea],
    body: [],
  }));
}

function scoreConcept(document: SearchDocument, alternatives: readonly string[]) {
  const title = normalizeSearchText(document.title);
  const summary = normalizeSearchText(document.summary);
  const context = normalizeSearchText(
    [document.typeLabel, document.category].filter(Boolean).join(" "),
  );
  const keywords = document.keywords.map(normalizeSearchText);
  const body = document.body.map(normalizeSearchText);
  let bestScore = 0;

  alternatives.forEach((alternative, index) => {
    const normalizedAlternative = normalizeSearchText(alternative);
    const synonymMultiplier = index === 0 ? 1 : 0.2;
    let fieldScore = 0;

    if (containsSearchTerm(title, normalizedAlternative)) {
      fieldScore = 60;
    } else if (keywords.some((keyword) => keyword === normalizedAlternative)) {
      fieldScore = 36;
    } else if (
      keywords.some((keyword) => containsSearchTerm(keyword, normalizedAlternative))
    ) {
      fieldScore = 30;
    } else if (containsSearchTerm(summary, normalizedAlternative)) {
      fieldScore = 15;
    } else if (containsSearchTerm(context, normalizedAlternative)) {
      fieldScore = 8;
    } else if (
      body.some((value) => containsSearchTerm(value, normalizedAlternative))
    ) {
      fieldScore = 4;
    }

    bestScore = Math.max(bestScore, fieldScore * synonymMultiplier);
  });

  return bestScore;
}

function rankDocument(
  document: SearchDocument,
  normalizedQuery: string,
  concepts: readonly (readonly string[])[],
): RankedResult | null {
  const conceptScores = concepts.map((concept) => scoreConcept(document, concept));

  if (conceptScores.some((score) => score === 0)) return null;

  const title = normalizeSearchText(document.title);
  let score = conceptScores.reduce((total, conceptScore) => total + conceptScore, 0);

  if (title === normalizedQuery) {
    score += 180;
  } else if (containsSearchTerm(title, normalizedQuery)) {
    score += 90;
  }

  const result: SearchResult = {
    id: document.id,
    group: document.group,
    typeLabel: document.typeLabel,
    title: document.title,
    summary: document.summary,
    href: document.href,
    category: document.category,
    date: document.date,
  };
  return { result, score };
}

export async function searchRawalOne(query: string, now = new Date()) {
  const tidyQuery = tidySearchQuery(query);
  const { normalizedQuery, concepts } = getQueryConcepts(tidyQuery);

  if (!normalizedQuery || concepts.length === 0) return [];

  const documents = [
    ...getServiceDocuments(),
    ...getUpdateDocuments(),
    ...getCommunityDocuments(),
    ...(await getAlertDocuments(now)),
  ];

  return documents
    .map((document) => rankDocument(document, normalizedQuery, concepts))
    .filter((ranked): ranked is RankedResult => ranked !== null)
    .sort(
      (left, right) =>
        right.score - left.score ||
        groupPriority[left.result.group] - groupPriority[right.result.group] ||
        left.result.title.localeCompare(right.result.title, "en") ||
        left.result.id.localeCompare(right.result.id, "en"),
    )
    .map(({ result }) => result);
}
