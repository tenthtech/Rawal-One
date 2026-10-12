import assert from "node:assert/strict";
import { test } from "node:test";

import {
  getAnalyticsMeasurementId,
  getPublicAnalyticsPage,
  getPublicAnalyticsParameters,
  isLocalAnalyticsHostname,
  isPublicAnalyticsEnabled,
} from "../lib/public-analytics.ts";

const configured = {
  measurementId: "G-11Q13VK1YX",
  privacyReady: true,
  production: true,
  allowLocal: false,
  hostname: "rawalone.thetenthtech.com",
  doNotTrack: null,
  globalPrivacyControl: false,
};

test("requires a valid public Measurement ID", () => {
  assert.equal(getAnalyticsMeasurementId("G-11Q13VK1YX"), configured.measurementId);
  for (const value of [undefined, "", "G-", "UA-123", "G-123\";alert(1)", " G-11Q13VK1YX", "G-11Q13VK1YX\n"]) {
    assert.equal(getAnalyticsMeasurementId(value), null);
  }
});

test("missing ID or unconfirmed stream privacy settings fail closed", () => {
  assert.equal(isPublicAnalyticsEnabled(configured), true);
  assert.equal(isPublicAnalyticsEnabled({ ...configured, measurementId: null }), false);
  assert.equal(isPublicAnalyticsEnabled({ ...configured, privacyReady: false }), false);
});

test("development stays off even with a valid ID and hosted hostname", () => {
  assert.equal(isPublicAnalyticsEnabled({ ...configured, production: false }), false);
  assert.equal(isPublicAnalyticsEnabled({ ...configured, production: false, allowLocal: true }), true);
});

test("production localhost requires a separate explicit opt-in", () => {
  for (const hostname of ["localhost", "LOCALHOST", "localhost.", "app.localhost", "app.local", "127.0.0.1", "127.2.3.4", "0.0.0.0", "::1", "[::1]"]) {
    assert.equal(isLocalAnalyticsHostname(hostname), true, hostname);
    assert.equal(isPublicAnalyticsEnabled({ ...configured, hostname }), false, hostname);
    assert.equal(isPublicAnalyticsEnabled({ ...configured, hostname, allowLocal: true }), true, hostname);
  }
  assert.equal(isLocalAnalyticsHostname(configured.hostname), false);
});

test("local opt-in never bypasses missing ID, privacy gate or browser choices", () => {
  const local = { ...configured, allowLocal: true, production: false, hostname: "localhost" };
  assert.equal(isPublicAnalyticsEnabled({ ...local, measurementId: null }), false);
  assert.equal(isPublicAnalyticsEnabled({ ...local, privacyReady: false }), false);
  assert.equal(isPublicAnalyticsEnabled({ ...local, doNotTrack: "1" }), false);
  assert.equal(isPublicAnalyticsEnabled({ ...local, globalPrivacyControl: true }), false);
});

test("Do Not Track and Global Privacy Control suppress analytics", () => {
  for (const doNotTrack of ["1", "yes"]) {
    assert.equal(isPublicAnalyticsEnabled({ ...configured, doNotTrack }), false);
  }
  assert.equal(isPublicAnalyticsEnabled({ ...configured, globalPrivacyControl: true }), false);
  assert.equal(isPublicAnalyticsEnabled({ ...configured, doNotTrack: "0" }), true);
});

test("every known public page has fixed, content-independent metadata", () => {
  const routes = ["/", "/services", "/services/water-service-interruptions", "/search", "/documents", "/notices", "/accessibility", "/image-credits", "/privacy",
    "/services/waste-collection-schedules", "/services/missed-waste-collection",
    "/services/bulky-waste-disposal-guidance", "/services/water-billing-account-help",
    "/services/new-water-sewer-connections", "/services/report-pothole-road-issue",
    "/services/report-streetlight-problem", "/services/road-works-local-closures",
    "/services/building-permits-applications", "/services/signage-commercial-permits",
    "/services/development-information", "/services/parks-community-facilities",
    "/services/recreation-programmes", "/services/licences-certificates",
    "/services/community-information-support"];
  for (const route of routes) {
    const page = getPublicAnalyticsPage(route);
    assert.ok(page, route);
    const parameters = getPublicAnalyticsParameters(route, "https://rawalone.thetenthtech.com");
    assert.deepEqual(parameters, {
      page_path: route,
      page_location: "https://rawalone.thetenthtech.com" + route,
      page_title: page.title,
      page_referrer: "",
    });
  }
});

test("all admin, login, authentication and CMS paths are excluded", () => {
  const excluded = ["/admin", "/admin/", "/admin/login", "/admin/notices", "/admin/documents/new", "/admin/events/123/edit", "/admin/updates/123/preview", "/admin/alerts", "/admin/services", "/auth/callback", "/api/upload", "/ADMIN/login", "/%61dmin/login"];
  for (const route of excluded) {
    assert.equal(getPublicAnalyticsPage(route), null, route);
    assert.equal(getPublicAnalyticsParameters(route, "https://rawalone.thetenthtech.com"), null, route);
  }
});

test("unknown paths, PDFs and potentially identifying dynamic segments are excluded", () => {
  for (const route of ["/unknown", "/residents/alice@example.test", "/documents/private-name.pdf", "/notices/alice@example.test", "/services/unknown"] ) {
    assert.equal(getPublicAnalyticsParameters(route, "https://rawalone.thetenthtech.com"), null, route);
  }
});

test("query strings and fragments cannot enter the path allowlist", () => {
  for (const route of ["/search?q=private-medical-issue", "/services?email=alice@example.test", "/documents#resident-123", "/notices?token=secret"]) {
    assert.equal(getPublicAnalyticsPage(route), null, route);
    assert.equal(getPublicAnalyticsParameters(route, "https://rawalone.thetenthtech.com"), null, route);
  }
});
