import type { Metadata } from "next";
import Link from "next/link";

import { AdminDocumentForm } from "@/components/admin-document-form";
import { requireAdminSession } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Add document",
  description: "Upload and publish a Rawal One resident document.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function NewDocumentPage() {
  const session = await requireAdminSession();

  return (
    <div className="px-5 py-7 sm:px-8 sm:py-9 xl:px-10">
      <div className="mx-auto max-w-4xl">
        <header className="border-b border-line pb-6">
          <Link
            href="/admin/documents"
            className="inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
          >
            <span aria-hidden="true">←</span>
            Documents
          </Link>
          <p className="mt-5 text-xs font-bold tracking-[0.12em] text-civic uppercase">
            Content
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            Add document
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Upload a PDF, describe it for residents and choose whether to save
            a private draft or publish it.
          </p>
        </header>

        {session.mode === "local" ? (
          <section
            aria-labelledby="local-document-form-heading"
            className="mt-6 border-s-4 border-information bg-surface px-5 py-4"
          >
            <h2 id="local-document-form-heading" className="font-bold text-ink">
              Connect Supabase to upload documents
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              Local fallback content is read-only. Form and PDF validation are
              available, but the record and file cannot be saved until Supabase
              is connected.
            </p>
          </section>
        ) : null}

        <div className="mt-8">
          <AdminDocumentForm />
        </div>
      </div>
    </div>
  );
}
