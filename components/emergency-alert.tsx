import Link from "next/link";

import type { AlertSeverity, EmergencyAlert } from "@/lib/alert-model";
import { formatAlertDateTime, getAlertSeverityLabel } from "@/lib/alert-model";

type EmergencyAlertProps = {
  alert: EmergencyAlert;
  headingLevel?: "h2" | "h3";
};

const severityStyles: Record<
  AlertSeverity,
  { border: string; label: string; surface: string; badge: string }
> = {
  advisory: {
    border: "border-s-information",
    label: "text-information",
    surface: "bg-[#f2f7fa]",
    badge: "border-information/25 bg-information/10",
  },
  warning: {
    border: "border-s-warning",
    label: "text-warning",
    surface: "bg-[#fcf5ed]",
    badge: "border-warning/25 bg-warning/10",
  },
  emergency: {
    border: "border-s-emergency",
    label: "text-emergency",
    surface: "bg-[#fcf3f1]",
    badge: "border-emergency/25 bg-emergency/10",
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
      className={`min-w-0 border border-line border-s-4 ${styles.border} ${styles.surface} px-5 py-6 sm:px-7 sm:py-7`}
    >
      <p
        className={`inline-flex items-center gap-2 rounded-sm border px-2.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.08em] uppercase ${styles.label} ${styles.badge}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-3.5 w-3.5"
        >
          <circle cx="8" cy="8" r="6" />
          <path d="M8 4.5v4M8 10.5v1" />
        </svg>
        {getAlertSeverityLabel(alert.severity)} alert
      </p>
      <Heading
        id={headingId}
        className="mt-4 [overflow-wrap:anywhere] text-2xl font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-3xl"
      >
        {alert.title}
      </Heading>
      <p className="mt-4 max-w-4xl whitespace-pre-line leading-7 text-ink">
        {alert.message}
      </p>

      <dl className="mt-5 grid gap-x-8 gap-y-4 border-t border-line pt-5 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <div className="min-w-0">
          <dt className="font-semibold text-ink">Affected area</dt>
          <dd className="mt-1 [overflow-wrap:anywhere] leading-6 text-muted">
            {alert.affectedArea}
          </dd>
        </div>
        {alert.publishedAt ? (
          <div className="min-w-0">
            <dt className="font-semibold text-ink">Published</dt>
            <dd className="mt-1 leading-6 text-muted">
              <time dateTime={alert.publishedAt}>
                {formatAlertDateTime(alert.publishedAt)} PKT
              </time>
            </dd>
          </div>
        ) : null}
        {alert.expiresAt ? (
          <div className="min-w-0">
            <dt className="font-semibold text-ink">Expires</dt>
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
          className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-civic underline decoration-civic/50 underline-offset-4 transition-colors duration-200 hover:decoration-civic"
        >
          More information
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </article>
  );
}
