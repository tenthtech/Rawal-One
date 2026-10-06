import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Administration",
  description: "Reserved administration route for the Rawal One R&D demonstration.",
};

export default function AdminPage() {
  return (
    <section className="bg-page">
      <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="max-w-3xl border-s-4 border-accent ps-6 sm:ps-8">
          <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
            Reserved route
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl">
            Administration
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            The administrative workspace is reserved for a future phase. No
            content management, authentication, or administrative functions
            are included in this foundation.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-11 items-center rounded-sm bg-civic px-5 py-3 font-bold text-white no-underline hover:bg-civic-deep"
          >
            Return to the homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
