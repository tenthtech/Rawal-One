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
    <div className="bg-page">
      <header className="border-b border-line bg-sage">
        <div className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <Link
            href="/admin"
            className="inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
          >
            <span aria-hidden="true">←</span>
            Communications
          </Link>
          <p className="mt-6 text-sm font-bold tracking-[0.08em] text-civic uppercase">
            Rawal One administration
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl">
            Create emergency alert
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Save a draft for later or continue directly to a public-presentation
            preview. Nothing appears on the resident homepage until it is
            published.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <AlertForm />
      </div>
    </div>
  );
}
