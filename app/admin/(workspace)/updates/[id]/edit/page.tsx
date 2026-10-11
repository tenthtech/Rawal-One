import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { inactivateCityUpdateAction } from "@/app/admin/updates/actions";
import { AdminCityUpdateForm } from "@/components/admin-city-update-form";
import { AdminRecordLoadError } from "@/components/admin-record-load-error";
import { CmsDataError, readAdminCityUpdate, updateCategories } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Edit City Update",
  description: "Edit a City Update in Rawal One administration.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EditCityUpdatePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ notice?: string | string[] }>;
};

export default async function EditCityUpdatePage({
  params,
  searchParams,
}: EditCityUpdatePageProps) {
  const { id } = await params;
  let record: Awaited<ReturnType<typeof readAdminCityUpdate>>;

  try {
    record = await readAdminCityUpdate(id);
  } catch (error) {
    if (!(error instanceof CmsDataError)) throw error;

    return (
      <AdminRecordLoadError
        heading="City Update storage is unavailable"
        message="The record could not be loaded. Confirm the Supabase configuration and CMS schema, then try again."
        returnHref="/admin/updates"
        returnLabel="Return to City Updates"
      />
    );
  }

  if (!record) notFound();

  const query = await searchParams;
  const notice = Array.isArray(query.notice) ? query.notice[0] : query.notice;
  const inactivateAction = inactivateCityUpdateAction.bind(null, record.id);

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
            {record.status} record
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            Edit City Update
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Update the saved content or change its publication state.
          </p>
        </header>

        {notice === "draft-saved" || notice === "published" ? (
          <div className="mt-6 border-s-4 border-success bg-surface px-5 py-4">
            <p className="font-bold text-ink">
              {notice === "published" ? "City Update published" : "Draft saved"}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted">
              {notice === "published"
                ? "The saved update is eligible to appear publicly."
                : "The saved update is not public."}
            </p>
          </div>
        ) : null}

        <AdminCityUpdateForm categories={updateCategories} record={record} />

        {record.status === "published" ? (
          <section className="mt-10 border-t border-line pt-7" aria-labelledby="update-visibility-heading">
            <h2 id="update-visibility-heading" className="text-xl font-bold text-ink">
              Public visibility
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Setting this record to inactive removes it from public pages and
              search while retaining it in administration.
            </p>
            <form action={inactivateAction} className="mt-4">
              <button
                type="submit"
                className="min-h-12 border-2 border-muted/60 bg-white px-5 py-3 font-bold text-ink hover:bg-sage"
              >
                Set inactive
              </button>
            </form>
          </section>
        ) : null}
      </div>
    </div>
  );
}
