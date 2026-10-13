"use client";

import { useState } from "react";
import { ExternalArrow } from "@/components/city/external-arrow";

import {
  policeCircles,
  policeStations,
} from "@/data/rawalpindi/police";

import styles from "./police-directory.module.css";

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function PoliceDirectory() {
  const [query, setQuery] = useState("");
  const [circle, setCircle] = useState("");
  const terms = normalize(query).split(" ").filter(Boolean);
  const matching = policeStations.filter((station) => {
    if (circle && station.circle !== circle) return false;
    const text = normalize(
      `${station.title} ${station.circle} ${station.kind} ${station.kind === "Police station" ? "thana" : ""}`,
    );
    return terms.every((term) => text.includes(term));
  });
  const hasFilters = query !== "" || circle !== "";

  function resetFilters() {
    setQuery("");
    setCircle("");
  }

  return (
    <div className={styles.directory} data-police-directory>
      <form
        role="search"
        aria-label="Find a police station"
        className={styles.filters}
        onSubmit={(event) => event.preventDefault()}
      >
        <div className={styles.control}>
          <label htmlFor="police-directory-query">Station or post name</label>
          <input
            id="police-directory-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="civic-input search-preview"
            placeholder="For example, Waris Khan"
            aria-describedby="police-filter-help"
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="police-directory-circle">Police circle</label>
          <select
            id="police-directory-circle"
            value={circle}
            onChange={(event) => setCircle(event.target.value)}
            className="civic-input"
          >
            <option value="">All circles</option>
            {policeCircles.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={resetFilters} className={styles.reset}>
          Reset filters
        </button>
      </form>
      <p id="police-filter-help" className={styles.help}>
        Filter this published directory by name or circle. Station / Thana contacts
        are separate from Police Emergency 15.
      </p>
      <noscript>
        <p className={styles.help}>
          All stations and posts are listed below. Interactive filters require JavaScript.
        </p>
      </noscript>
      <p role="status" aria-live="polite" aria-atomic="true" className={styles.resultCount}>
        {matching.length} {matching.length === 1 ? "directory entry" : "directory entries"}
        {hasFilters ? " matching your filters" : " in the published listing"}
      </p>

      {matching.length === 0 ? (
        <div className={styles.empty}>
          <h3>No matching stations or posts</h3>
          <p>Try a different name or choose another circle.</p>
          <button type="button" onClick={resetFilters} className="civic-link">
            Show all stations and posts
          </button>
        </div>
      ) : (
        <div className={styles.groups}>
          {policeCircles.map((name) => {
            const stations = matching.filter((station) => station.circle === name);
            if (stations.length === 0) return null;

            return (
              <section key={name} className={styles.circle} aria-labelledby={`circle-${name.toLowerCase().replaceAll(" ", "-")}`}>
                <h3 id={`circle-${name.toLowerCase().replaceAll(" ", "-")}`}>
                  {name}
                </h3>
                <ul className={styles.rows}>
                  {stations.map((station) => (
                    <li key={station.id}>
                      <article id={`station-${station.id}`} className={styles.station} data-police-entry>
                        <div className={styles.stationName}>
                          <p className={styles.kind}>{station.kind}</p>
                          <h4>{station.title}</h4>
                        </div>
                        <div className={styles.contacts}>
                          {station.phones.length > 0 ? (
                            station.phones.map((phone) => (
                              <a key={phone.tel} href={`tel:${phone.tel}`} className="civic-link" aria-label={`${station.title}: ${phone.label}`}>
                                {phone.label}
                              </a>
                            ))
                          ) : (
                            <a href="https://www.punjabpolice.gov.pk/RawalpindiDirectory" className="civic-link">
                              Check the official directory
                              <span className="sr-only"> for {station.title}</span>
                              <ExternalArrow />
                            </a>
                          )}
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
