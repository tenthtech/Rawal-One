import type { Metadata } from "next";

import { PublicPageIntro } from "@/components/public-page-intro";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How basic usage analytics are handled on the Rawal One demonstration.",
};

export default function PrivacyPage() {
  return (
    <>
      <PublicPageIntro
        id="privacy-heading"
        eyebrow="About this demonstration"
        title="Privacy & analytics"
        description="We may collect basic usage analytics to understand how people use this demonstration and improve its public pages."
      />
      <div className="civic-container py-10 sm:py-14">
        <div className="max-w-3xl space-y-8 text-base leading-7 text-muted">
          <section aria-labelledby="analytics-information-heading">
            <h2
              id="analytics-information-heading"
              className="text-xl font-semibold leading-7 text-ink"
            >
              What analytics collect
            </h2>
            <p className="mt-3">
              When enabled, Google Analytics 4 helps us understand visits to
              recognised public pages. The application sends clean page paths
              and general page names, without search terms, URL query strings,
              fragments, referrers or form values. Admin pages, authentication,
              CMS actions and document uploads are excluded. The application
              does not add personally identifiable information to analytics.
            </p>
            <p className="mt-3">
              Usage reports are aggregated. Google Analytics may use
              pseudonymous analytics cookies and browser or device information;
              Google also receives network metadata, such as an IP address,
              when your browser connects. This is not completely anonymous.
            </p>
          </section>

          <section aria-labelledby="analytics-limits-heading">
            <h2
              id="analytics-limits-heading"
              className="text-xl font-semibold leading-7 text-ink"
            >
              Basic usage only
            </h2>
            <p className="mt-3">
              We do not use advertising, remarketing, Google Signals, user IDs
              or demographic profiling. Analytics are limited to understanding
              use of the public demonstration.
            </p>
          </section>

          <section aria-labelledby="analytics-choice-heading">
            <h2
              id="analytics-choice-heading"
              className="text-xl font-semibold leading-7 text-ink"
            >
              Your browser choices
            </h2>
            <p className="mt-3">
              This site skips analytics when your browser sends Do Not Track or
              Global Privacy Control. You can also use browser privacy controls
              or an analytics blocker and remove analytics cookies through your
              browser settings. The public site works without analytics.
            </p>
            <p className="mt-3">
              Read{" "}
              <a
                href="https://policies.google.com/privacy"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="font-semibold text-civic underline underline-offset-4"
              >
                Google’s privacy policy
              </a>{" "}
              for information about how Google handles data.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
