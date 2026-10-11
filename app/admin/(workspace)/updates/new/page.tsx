import type { Metadata } from "next";
import Link from "next/link";

import { AdminCityUpdateForm } from "@/components/admin-city-update-form";
import { updateCategories } from "@/lib/cms";
import { requireAdminSession } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Create City Update",
  description: "Create a City Update in Rawal One administration.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function NewCityUpdatePage() {
  const session = await requireAdminSession();

  return (
    <div className="px-5 py-7 sm:px-8 sm:py-9 xl:px-10">
      <div className="mx-auto max-w-4xl">
        <header className="border-b border-line pb-6">
          <Link
            href="/admin/updates"
            className="inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4"
          >
            <span aria-hidden="true">←</span>
            City Updates
          </Link>
          <p className="mt-5 text-xs font-bold tracking-[0.12em] text-civic uppercase">
            Content
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            Create City Update
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Save a private draft or publish a concise update for residents.
          </p>
        </header>

        {session.mode === "local" ? (
          <div className="mt-6 border-s-4 border-information bg-surface px-5 py-4">
            <p className="font-bold text-ink">Connect Supabase to save content</p>
            <p className="mt-1 text-sm leading-6 text-muted">
              Local development content is read-only. Form validation remains
              available, but records cannot be created until Supabase is connected.
            </p>
          </div>
        ) : null}

        <AdminCityUpdateForm categories={updateCategories} />
      </div>
    </div>
  );
}
