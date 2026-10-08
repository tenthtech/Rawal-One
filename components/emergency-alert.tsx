import Link from "next/link";

import type { AlertSeverity, EmergencyAlert } from "@/lib/alert-model";
import {
  formatAlertDateTime,
  getAlertSeverityLabel,
} from "@/lib/alert-model";

type EmergencyAlertProps = {
  alert: EmergencyAlert;
  headingLevel?: "h2" | "h3";
};

const severityStyles: Record<
  AlertSeverity,
  { border: string; label: string }
> = {
  advisory: {
    border: "border-s-information",
    label: "text-information",
  },
  warning: {
    border: "border-s-warning",
    label: "text-warning",
  },
  emergency: {
    border: "border-s-emergency",
    label: "text-emergency",
  },
};

export function EmergencyAlert({
  alert,
  headingLevel = "h2",
}: EmergencyAlertProps) {
  const Heading = headingLevel;
  const styles = severityStyles[alert.severity];
  const headingId = `emergency-alert-${alert.id}-heading`;

  return (
    <article
      aria-labelledby={headingId}
      data-alert-severity={alert.severity}
      className={`min-w-0 border border-line border-s-[6px] ${styles.border} bg-surface px-5 py-6 shadow-[0_5px_18px_rgba(24,37,33,0.06)] sm:px-7 sm:py-7`}
    >
      <p
        className={`text-xs font-extrabold tracking-[0.12em] uppercase ${styles.label}`}
      >
        {getAlertSeverityLabel(alert.severity)} alert
      </p>
      <Heading
        id={headingId}
        className="mt-2 [overflow-wrap:anywhere] text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl"
      >
        {alert.title}
      </Heading>
      <p className="mt-4 max-w-4xl whitespace-pre-line leading-7 text-ink">
        {alert.message}
      </p>

      <dl className="mt-5 grid gap-x-8 gap-y-4 border-t border-line pt-5 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <div className="min-w-0">
          <dt className="font-bold text-ink">Affected area</dt>
          <dd className="mt-1 [overflow-wrap:anywhere] leading-6 text-muted">
            {alert.affectedArea}
          </dd>
        </div>
        {alert.publishedAt ? (
          <div className="min-w-0">
            <dt className="font-bold text-ink">Published</dt>
            <dd className="mt-1 leading-6 text-muted">
              <time dateTime={alert.publishedAt}>
                {formatAlertDateTime(alert.publishedAt)} PKT
              </time>
            </dd>
          </div>
        ) : null}
        {alert.expiresAt ? (
          <div className="min-w-0">
            <dt className="font-bold text-ink">Expires</dt>
            <dd className="mt-1 leading-6 text-muted">
              <time dateTime={alert.expiresAt}>
                {formatAlertDateTime(alert.expiresAt)} PKT
              </time>
            </dd>
          </div>
        ) : null}
      </dl>

      {alert.moreInfoUrl ? (
        <Link
          href={alert.moreInfoUrl}
          aria-label={`More information about ${alert.title}`}
          className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
        >
          More information
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </article>
  );
}
