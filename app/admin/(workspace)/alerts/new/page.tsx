import type { Metadata } from "next";
import Link from "next/link";

import { AlertForm } from "@/components/alert-form";
import { requireAdminSession } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Create emergency alert",
  description:
    "Create a fictional emergency alert in the Rawal One administration demonstration.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function NewAlertPage() {
  await requireAdminSession();

  return (
    <div className="px-5 py-7 sm:px-8 sm:py-9 xl:px-10">
      <div className="mx-auto max-w-[78rem]">
        <header className="border-b border-line pb-6">
          <Link
            href="/admin/alerts"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
          >
            <span aria-hidden="true">←</span>
            Emergency Alerts
          </Link>
          <p className="mt-4 text-xs font-bold tracking-[0.12em] text-civic uppercase">
            Content
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            Create emergency alert
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-muted">
            Save a draft for later or continue directly to a public-presentation
            preview. Nothing appears on the resident homepage until it is
            published.
          </p>
        </header>

        <div className="max-w-4xl py-8 sm:py-10">
          <AlertForm />
        </div>
      </div>
    </div>
  );
}
