import type { Metadata } from "next";
import Link from "next/link";

import { AccessibilityPreferencesButton } from "@/components/accessibility-preferences";
import { PublicPageIntro } from "@/components/public-page-intro";

export const metadata: Metadata = {
  title: "Accessibility at Rawal One",
  description:
    "Our approach to accessibility, display preferences and keyboard use in the Rawal One demonstration.",
};

const pageSections = [
  { id: "our-approach", title: "Our approach" },
  { id: "what-rawal-one-supports", title: "What Rawal One supports" },
  { id: "display-preferences", title: "Accessibility preferences" },
  { id: "keyboard-use", title: "Keyboard use" },
  { id: "known-scope", title: "Known scope" },
];

const supportedFeatures = [
  {
    title: "Keyboard navigation and visible focus",
    description:
      "Links, buttons and form controls can be reached with a keyboard. A visible focus indicator shows where you are, and Skip to main content takes you past the header.",
  },
  {
    title: "Text that responds to your screen",
    description:
      "Responsive layouts, resizable text and reflow help you read on smaller screens or with browser zoom.",
  },
  {
    title: "Clear structure and forms",
    description:
      "Semantic headings and page regions support screen-reader navigation. Search and filter controls have explicit labels, and links describe their destinations.",
  },
  {
    title: "Contrast and meaningful status text",
    description:
      "Text, controls and focus states are designed for sufficient contrast. Alerts and other statuses use words alongside colour to communicate their meaning.",
  },
  {
    title: "Reduced motion",
    description:
      "Non-essential movement is reduced when your device requests it or when you enable Reduce motion in Rawal One. Emergency information stays stable.",
  },
  {
    title: "Practical document access",
    description:
      "Documents have descriptive titles, file information and separate View PDF and Download PDF actions. You can open a PDF in your browser or save it to use with your preferred reader.",
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <PublicPageIntro
        id="accessibility-page-heading"
        eyebrow="For everyone in our community"
        title="Accessibility at Rawal One"
        description="Accessibility is a core requirement of Rawal One. We consider how people read, navigate and use our public services throughout design, content and implementation."
      >
        <div className="public-intro-aside">
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-ink">
            Make it comfortable to read
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Adjust text size, contrast, link underlines and motion on this
            device. These optional preferences supplement the default
            experience.
          </p>
          <AccessibilityPreferencesButton className="civic-button mt-4 min-h-11 px-5 py-3" />
        </div>
      </PublicPageIntro>

      <div className="civic-container grid gap-8 py-8 sm:py-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12 lg:py-12">
        <nav aria-label="On this page" className="accessibility-contents min-w-0">
          <h2 className="civic-eyebrow">On this page</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-5 border-t border-line lg:block">
            {pageSections.map((section) => (
              <li key={section.id} className="border-b border-line">
                <a
                  href={`#${section.id}`}
                  className="civic-link min-h-11 w-full py-2 text-sm leading-6"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 max-w-3xl space-y-10 sm:space-y-12">
          <section aria-labelledby="our-approach" className="scroll-mt-6">
            <h2
              id="our-approach"
              className="text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl"
            >
              Our approach
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              Rawal One is an internal municipal digital-services R&amp;D
              demonstration created by Tenth Tech in Rawalpindi, Pakistan. It is
              designed with WCAG 2.2 AA principles in mind, with accessibility
              considered in the way pages are structured, information is written
              and interactions are built.
            </p>
            <p className="mt-4 text-base leading-8 text-muted">
              You should be able to use the default experience without enabling
              any presentation preference. The Accessibility control offers
              additional choices for reading comfort.
            </p>
          </section>

          <section
            aria-labelledby="what-rawal-one-supports"
            className="scroll-mt-6 border-t border-line pt-8 sm:pt-10"
          >
            <h2
              id="what-rawal-one-supports"
              className="text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl"
            >
              What Rawal One supports
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {supportedFeatures.map((feature) => (
                <li key={feature.title} className="min-w-0">
                  <h3 className="text-base font-semibold leading-7 text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="display-preferences"
            className="scroll-mt-6 border-t border-line pt-8 sm:pt-10"
          >
            <h2
              id="display-preferences"
              className="text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl"
            >
              Accessibility preferences
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              Select Accessibility in the header or mobile menu to adjust how
              Rawal One is displayed on this device.
            </p>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              <div className="grid gap-2 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5">
                <dt className="font-semibold text-ink">Text size</dt>
                <dd className="text-sm leading-7 text-muted">
                  Choose Default, Large or Extra large. You can also use your
                  browser&apos;s zoom controls.
                </dd>
              </div>
              <div className="grid gap-2 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5">
                <dt className="font-semibold text-ink">High contrast</dt>
                <dd className="text-sm leading-7 text-muted">
                  Strengthen text contrast, boundaries and focus indicators.
                </dd>
              </div>
              <div className="grid gap-2 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5">
                <dt className="font-semibold text-ink">Underline links</dt>
                <dd className="text-sm leading-7 text-muted">
                  Keep underlines visible on standard text links.
                </dd>
              </div>
              <div className="grid gap-2 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5">
                <dt className="font-semibold text-ink">Reduce motion</dt>
                <dd className="text-sm leading-7 text-muted">
                  Minimise non-essential animation. Your device&apos;s
                  reduced-motion preference is also respected.
                </dd>
              </div>
            </dl>
            <p className="mt-5 text-sm leading-7 text-muted">
              Preferences are saved in this browser on this device and remain
              when you visit another page or refresh. No account is needed. Use
              Reset accessibility preferences to return these controls to their
              defaults.
            </p>
          </section>

          <section
            aria-labelledby="keyboard-use"
            className="scroll-mt-6 border-t border-line pt-8 sm:pt-10"
          >
            <h2
              id="keyboard-use"
              className="text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl"
            >
              Keyboard use
            </h2>
            <ul className="mt-5 space-y-3 text-base leading-8 text-muted">
              <li>
                <span className="font-semibold text-ink">Tab / Shift+Tab:</span>{" "}
                move forwards or backwards through links and controls.
              </li>
              <li>
                <span className="font-semibold text-ink">Enter:</span> follow a
                focused link or activate a button. Use{" "}
                <span className="font-semibold text-ink">Space</span> for buttons,
                checkboxes and disclosure controls.
              </li>
              <li>
                <span className="font-semibold text-ink">Escape:</span> close
                Accessibility preferences or the mobile menu. Focus returns to
                the control that opened it.
              </li>
            </ul>
            <p className="mt-4 text-sm leading-7 text-muted">
              The first keyboard link is Skip to main content. In the
              Accessibility preferences panel, focus stays inside the panel
              until you close it.
            </p>
          </section>

          <section
            aria-labelledby="known-scope"
            className="scroll-mt-6 border-t border-line pt-8 sm:pt-10"
          >
            <h2
              id="known-scope"
              className="text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl"
            >
              Known scope
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              Rawal One is an R&amp;D demonstration and has not undergone formal
              third-party accessibility certification. The approach described
              here is a design and implementation commitment, not a claim of
              formal WCAG certification.
            </p>
            <p className="mt-4 text-base leading-8 text-muted">
              The downloadable PDFs have not been independently audited for
              accessibility. The website&apos;s document titles and actions help
              you find, open and save them, but accessibility within each PDF may
              vary. You can browse them in{" "}
              <Link
                href="/documents"
                className="font-semibold text-civic underline underline-offset-4"
              >
                Documents &amp; forms
              </Link>
              .
            </p>
            <p className="mt-4 text-base leading-8 text-muted">
              This demonstration is not an official government service.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
