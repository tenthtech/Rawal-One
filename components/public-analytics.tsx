"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";

import {
  getAnalyticsMeasurementId,
  getPublicAnalyticsParameters,
  isPublicAnalyticsEnabled,
} from "@/lib/public-analytics";

declare global {
  interface Window {
    rawalGaDataLayer?: IArguments[];
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const measurementId = getAnalyticsMeasurementId(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
);
const privacyReady = process.env.NEXT_PUBLIC_GA_PRIVACY_READY === "true";
const allowLocal = process.env.NEXT_PUBLIC_GA_ALLOW_LOCAL === "true";

function browserAllowsAnalytics() {
  const browser = navigator as Navigator & { globalPrivacyControl?: boolean };
  return isPublicAnalyticsEnabled({
    measurementId,
    privacyReady,
    production: process.env.NODE_ENV === "production",
    allowLocal,
    hostname: window.location.hostname,
    doNotTrack: browser.doNotTrack,
    globalPrivacyControl: browser.globalPrivacyControl,
  });
}

// These browser settings are checked at hydration and on route renders.
// The server snapshot keeps third-party scripts out of the initial HTML.
const subscribe = () => () => {};
const serverSnapshot = () => false;

export function PublicAnalytics() {
  const pathname = usePathname();
  const browserAllowed = useSyncExternalStore(
    subscribe,
    browserAllowsAnalytics,
    serverSnapshot,
  );
  const initialized = useRef(false);
  const loaded = useRef(false);
  const failed = useRef(false);
  const lastPathname = useRef<string | null>(null);
  const page = getPublicAnalyticsParameters(pathname, "");
  const enabled = browserAllowed && Boolean(page);

  useLayoutEffect(() => {
    if (!measurementId) return;

    const disableKey = `ga-disable-${measurementId}` as const;
    const parameters = getPublicAnalyticsParameters(
      window.location.pathname,
      window.location.origin,
    );

    // The guard remains mounted on admin/unknown routes. Removing a Script
    // component alone would leave Google's already-loaded listeners active.
    window[disableKey] = !enabled || !parameters || failed.current;
    if (window[disableKey]) {
      lastPathname.current = null;
      if (!loaded.current) {
        window.rawalGaDataLayer?.splice(0);
        initialized.current = false;
      }
      return;
    }

    if (!parameters || lastPathname.current === parameters.page_path) return;

    window.rawalGaDataLayer ??= [];
    function gtag() {
      // Google tag's command format is an arguments object, not resident data.
      // eslint-disable-next-line prefer-rest-params
      window.rawalGaDataLayer?.push(arguments);
    }
    const command = gtag as (...values: unknown[]) => void;

    if (!initialized.current) {
      command("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      command("set", "ads_data_redaction", true);
      command("set", "url_passthrough", false);
      command("js", new Date());
      initialized.current = true;
    }

    // Apply clean defaults to automatic session metadata as well as this view.
    // Enhanced Measurement must also be OFF in the stream before activation.
    command("set", parameters);
    command("config", measurementId, {
      ...parameters,
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ignore_referrer: true,
    });
    command("event", "page_view", { ...parameters, send_to: measurementId });
    lastPathname.current = parameters.page_path;

    return () => {
      window[disableKey] = true;
    };
  }, [enabled, pathname]);

  if (!enabled || !measurementId) return null;

  return (
    <Script
      id="rawal-one-ga4"
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}&l=rawalGaDataLayer`}
      // Next's afterInteractive preload omits referrerPolicy. Loading at idle
      // keeps the SDK request private and avoids delaying the public interface.
      strategy="lazyOnload"
      referrerPolicy="no-referrer"
      onReady={() => {
        loaded.current = true;
      }}
      onError={() => {
        failed.current = true;
        window[`ga-disable-${measurementId}`] = true;
        window.rawalGaDataLayer?.splice(0);
      }}
    />
  );
}
