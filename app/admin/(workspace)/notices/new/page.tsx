import type { Metadata } from "next";
import Link from "next/link";

import { AdminNoticeForm } from "@/components/admin-notice-form";
import { requireAdminSession } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Create public notice",
  description: "Create and publish a Rawal One public notice.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function NewNoticePage() {
  const session = await requireAdminSession();

  return (
    <div className="bg-page">
      <header className="border-b border-line bg-sage">
        <div className="mx-auto max-w-[76rem] px-5 py-9 sm:px-8 sm:py-12 lg:px-10">
          <Link
            href="/admin/notices"
            className="inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
          >
            <span aria-hidden="true">←</span>
            Public Notices
          </Link>
          <p className="mt-5 text-sm font-bold tracking-[0.08em] text-civic uppercase">
            Rawal One administration
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            Create public notice
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
            Save a private draft, review the resident-facing preview or publish
            the notice when it is ready.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-9 sm:px-8 sm:py-12 lg:px-10">
        {session.mode === "local" ? (
          <section
            aria-labelledby="local-notice-form-heading"
            className="mb-8 border-s-4 border-information bg-surface px-5 py-4"
          >
            <h2 id="local-notice-form-heading" className="font-bold text-ink">
              Connect Supabase to save notices
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              Local fallback content is read-only. You can review the form, but
              drafts and publications require a Supabase connection.
            </p>
          </section>
        ) : null}
        <AdminNoticeForm />
      </div>
    </div>
  );
}
