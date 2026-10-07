export const alertSeverities = ["advisory", "warning", "emergency"] as const;

export const alertStatuses = ["draft", "published", "inactive"] as const;

export const alertFieldLimits = {
  title: 120,
  message: 600,
  affectedArea: 120,
  moreInfoUrl: 300,
} as const;

export type AlertSeverity = (typeof alertSeverities)[number];
export type AlertStatus = (typeof alertStatuses)[number];

export type EmergencyAlert = {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  affectedArea: string;
  publishedAt: string | null;
  expiresAt: string | null;
  status: AlertStatus;
  moreInfoUrl: string | null;
  updatedAt: string;
};

export type CreateAlertInput = Pick<
  EmergencyAlert,
  "severity" | "title" | "message" | "affectedArea" | "expiresAt" | "moreInfoUrl"
>;

const severityLabels = {
  advisory: "Advisory",
  warning: "Warning",
  emergency: "Emergency",
} as const satisfies Record<AlertSeverity, string>;

const statusLabels = {
  draft: "Draft",
  published: "Published",
  inactive: "Inactive",
} as const satisfies Record<AlertStatus, string>;

export function getAlertSeverityLabel(severity: AlertSeverity) {
  return severityLabels[severity];
}

export function getAlertStatusLabel(status: AlertStatus) {
  return statusLabels[status];
}

export function isAlertExpired(
  alert: Pick<EmergencyAlert, "expiresAt">,
  now = new Date(),
) {
  if (!alert.expiresAt) return false;

  return new Date(alert.expiresAt).getTime() <= now.getTime();
}

export function formatAlertDateTime(value: string) {
  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "long",
    timeStyle: "short",
    hour12: true,
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}
