import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminDocumentForm } from "@/components/admin-document-form";
import { CmsDataError, readAdminDocument } from "@/lib/cms";
import { requireAdminSession } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Edit document",
  description: "Edit, replace or publish a Rawal One resident document.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EditDocumentPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditDocumentPage({
  params,
}: EditDocumentPageProps) {
  const session = await requireAdminSession();
  const { id } = await params;

  let document: Awaited<ReturnType<typeof readAdminDocument>>;

  try {
    document = await readAdminDocument(id);
  } catch (error) {
    if (!(error instanceof CmsDataError)) throw error;

    return (
      <div className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl border-s-4 border-emergency bg-surface px-5 py-5">
          <h1 className="text-2xl font-bold text-ink">
            Document storage is unavailable
          </h1>
          <p className="mt-2 leading-7 text-muted">
            The document could not be loaded. Confirm the Supabase
            configuration, CMS schema and Storage bucket, then try again.
          </p>
          <Link
            href="/admin/documents"
            className="mt-4 inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4"
          >
            Return to Documents
          </Link>
        </div>
      </div>
    );
  }

  if (!document) notFound();

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
            {document.status} record
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            Edit document
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Update the metadata, replace the PDF when needed and choose whether
            residents can access this document.
          </p>
        </header>

        {session.mode === "local" ? (
          <section
            aria-labelledby="local-document-edit-heading"
            className="mt-6 border-s-4 border-information bg-surface px-5 py-4"
          >
            <h2 id="local-document-edit-heading" className="font-bold text-ink">
              Local fallback document
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              You can review this record and its current PDF, but Supabase must
              be connected before metadata or files can be changed.
            </p>
          </section>
        ) : null}

        <div className="mt-8">
          <AdminDocumentForm document={document} />
        </div>
      </div>
    </div>
  );
}
