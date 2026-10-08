import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  deactivateAlertAction,
  publishAlertAction,
} from "@/app/admin/alerts/actions";
import { EmergencyAlert } from "@/components/emergency-alert";
import { getAlertStatusLabel, isAlertExpired } from "@/lib/alert-model";
import { getAlertById } from "@/lib/alerts";
import { requireAdminSession } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Alert preview",
  description:
    "Review an emergency alert in the Rawal One administration demonstration.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AlertPreviewPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ notice?: string | string[] }>;
};

export default async function AlertPreviewPage({
  params,
  searchParams,
}: AlertPreviewPageProps) {
  await requireAdminSession();

  const { id } = await params;
  const alert = await getAlertById(id);

  if (!alert) notFound();

  const query = await searchParams;
  const notice = Array.isArray(query.notice) ? query.notice[0] : query.notice;
  const expired = isAlertExpired(alert);
  const isPublic = alert.status === "published" && !expired;
  const contextLabel = expired
    ? "Preview — expired"
    : isPublic
      ? "Published alert preview"
      : alert.status === "inactive"
        ? "Preview — inactive"
        : "Preview — not published";
  const publishAction = publishAlertAction.bind(null, alert.id);
  const deactivateAction = deactivateAlertAction.bind(null, alert.id);

  return (
    <div className="bg-page">
      <header className="border-b border-line bg-sage">
        <div className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <Link
            href="/admin"
            className="inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
          >
            <span aria-hidden="true">←</span>
            Emergency alerts
          </Link>
          <p className="mt-6 text-sm font-bold tracking-[0.08em] text-civic uppercase">
            Rawal One administration
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl">
            Review alert
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Check the resident-facing presentation and publishing state before
            taking action.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        {notice === "draft-created" ? (
          <div className="mb-7 border-s-4 border-success bg-surface px-5 py-4">
            <p className="font-bold text-ink">Draft saved</p>
            <p className="mt-1 leading-7 text-muted">
              Review the preview below. The alert is not public until you publish
              it.
            </p>
          </div>
        ) : null}

        <section aria-labelledby="preview-context-heading">
          <div className="border border-line bg-sage px-5 py-5 sm:px-7">
            <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
              Preview context
            </p>
            <h2
              id="preview-context-heading"
              className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink"
            >
              {contextLabel}
            </h2>
            <p className="mt-2 max-w-3xl leading-7 text-muted">
              This uses the same alert presentation residents see on the public
              homepage. Current admin status: {getAlertStatusLabel(alert.status)}.
            </p>
          </div>

          <div className="mt-6">
            <EmergencyAlert alert={alert} headingLevel="h2" />
          </div>
        </section>

        <section
          aria-labelledby="publishing-actions-heading"
          className="mt-8 border-t border-line pt-7"
        >
          <h2
            id="publishing-actions-heading"
            className="text-2xl font-bold tracking-[-0.02em] text-ink"
          >
            Publishing actions
          </h2>

          {expired ? (
            <p className="mt-3 max-w-3xl leading-7 text-advisory">
              This alert has expired and cannot be published. It remains available
              in the administration list for context.
            </p>
          ) : null}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {!isPublic && !expired ? (
              <form action={publishAction}>
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-civic px-5 py-3 font-bold text-white hover:bg-civic-deep sm:w-auto"
                >
                  Publish alert
                </button>
              </form>
            ) : null}

            {alert.status === "published" ? (
              <form action={deactivateAction}>
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-sm border-2 border-emergency bg-surface px-5 py-3 font-bold text-emergency hover:bg-page sm:w-auto"
                >
                  Deactivate alert
                </button>
              </form>
            ) : null}

            <Link
              href="/admin"
              className="inline-flex min-h-12 items-center justify-center px-2 py-3 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
            >
              Return to emergency alerts
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
