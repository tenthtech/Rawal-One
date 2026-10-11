import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminNoticeForm } from "@/components/admin-notice-form";
import { CmsDataError, readAdminNotices } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Edit public notice",
  description: "Edit and publish a Rawal One public notice.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EditNoticePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditNoticePage({ params }: EditNoticePageProps) {
  const { id } = await params;
  let result;

  try {
    result = await readAdminNotices();
  } catch (error) {
    if (!(error instanceof CmsDataError)) throw error;

    return (
      <div className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl border-s-4 border-emergency bg-surface px-5 py-5">
          <h1 className="text-2xl font-bold text-ink">
            Notice storage is unavailable
          </h1>
          <p className="mt-2 leading-7 text-muted">
            The notice could not be loaded. Confirm the Supabase configuration
            and CMS schema, then try again.
          </p>
          <Link
            href="/admin/notices"
            className="mt-4 inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4"
          >
            Return to Public Notices
          </Link>
        </div>
      </div>
    );
  }

  if (result.mode === "unavailable") {
    return (
      <div className="px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl border-s-4 border-emergency bg-surface px-5 py-5">
          <h1 className="text-2xl font-bold text-ink">
            Connect Supabase to edit notices
          </h1>
          <p className="mt-2 leading-7 text-muted">
            Notice storage is not configured in this environment.
          </p>
          <Link
            href="/admin/notices"
            className="mt-4 inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4"
          >
            Return to Public Notices
          </Link>
        </div>
      </div>
    );
  }

  const notice = result.records.find((record) => record.id === id);
  if (!notice) notFound();

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
            Edit public notice
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
            Update the content, review the preview and choose when residents can
            see this notice.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-9 sm:px-8 sm:py-12 lg:px-10">
        {result.mode === "local" ? (
          <div className="mb-8 border-s-4 border-information bg-surface px-5 py-4">
            <p className="font-bold text-ink">Local fallback record</p>
            <p className="mt-1 text-sm leading-6 text-muted">
              You can review this content, but Supabase must be connected before
              changes can be saved.
            </p>
          </div>
        ) : null}
        <AdminNoticeForm notice={notice} />
      </div>
    </div>
  );
}
