import "server-only";

import { randomUUID } from "node:crypto";
import { readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import type { CreateAlertInput, EmergencyAlert } from "@/lib/alert-model";
import { isAlertExpired } from "@/lib/alert-model";

const alertsFilePath = path.join(process.cwd(), "data", "alerts.json");
const severityPriority = {
  emergency: 0,
  warning: 1,
  advisory: 2,
} as const;

let mutationQueue: Promise<void> = Promise.resolve();

async function readAlertsFromDisk(): Promise<EmergencyAlert[]> {
  const source = await readFile(alertsFilePath, "utf8");
  const parsed: unknown = JSON.parse(source);

  if (!Array.isArray(parsed)) {
    throw new Error("The alert store must contain a JSON array.");
  }

  return parsed as EmergencyAlert[];
}

async function writeAlertsToDisk(alerts: readonly EmergencyAlert[]) {
  const temporaryPath = `${alertsFilePath}.${process.pid}.${randomUUID()}.tmp`;

  try {
    await writeFile(temporaryPath, `${JSON.stringify(alerts, null, 2)}\n`, "utf8");
    await rename(temporaryPath, alertsFilePath);
  } catch (error) {
    await rm(temporaryPath, { force: true });
    throw error;
  }
}

async function mutateAlerts<T>(
  mutation: (alerts: EmergencyAlert[]) => {
    alerts: EmergencyAlert[];
    result: T;
  },
) {
  const operation = mutationQueue.then(async () => {
    const alerts = await readAlertsFromDisk();
    const next = mutation(alerts);
    await writeAlertsToDisk(next.alerts);
    return next.result;
  });

  mutationQueue = operation.then(
    () => undefined,
    () => undefined,
  );

  return operation;
}

export async function readAlerts() {
  const alerts = await readAlertsFromDisk();

  return alerts.sort(
    (left, right) =>
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
  );
}

export async function getAlertById(id: string) {
  const alerts = await readAlertsFromDisk();
  return alerts.find((alert) => alert.id === id) ?? null;
}

export async function createAlert(input: CreateAlertInput) {
  return mutateAlerts((alerts) => {
    const timestamp = new Date().toISOString();
    const alert: EmergencyAlert = {
      id: randomUUID(),
      ...input,
      publishedAt: null,
      status: "draft",
      updatedAt: timestamp,
    };

    return {
      alerts: [alert, ...alerts],
      result: alert,
    };
  });
}

export async function publishAlert(id: string) {
  return mutateAlerts((alerts) => {
    const index = alerts.findIndex((alert) => alert.id === id);

    if (index === -1) {
      throw new Error("Alert not found.");
    }

    if (isAlertExpired(alerts[index])) {
      throw new Error("An expired alert cannot be published.");
    }

    const timestamp = new Date().toISOString();
    const alert: EmergencyAlert = {
      ...alerts[index],
      status: "published",
      publishedAt: timestamp,
      updatedAt: timestamp,
    };
    const nextAlerts = [...alerts];
    nextAlerts[index] = alert;

    return { alerts: nextAlerts, result: alert };
  });
}

export async function deactivateAlert(id: string) {
  return mutateAlerts((alerts) => {
    const index = alerts.findIndex((alert) => alert.id === id);

    if (index === -1) {
      throw new Error("Alert not found.");
    }

    const alert: EmergencyAlert = {
      ...alerts[index],
      status: "inactive",
      updatedAt: new Date().toISOString(),
    };
    const nextAlerts = [...alerts];
    nextAlerts[index] = alert;

    return { alerts: nextAlerts, result: alert };
  });
}

export async function getActivePublicAlerts(now = new Date()) {
  const alerts = await readAlertsFromDisk();

  return alerts
    .filter(
      (alert) =>
        alert.status === "published" &&
        Boolean(alert.publishedAt) &&
        !isAlertExpired(alert, now),
    )
    .sort((left, right) => {
      const severityDifference =
        severityPriority[left.severity] - severityPriority[right.severity];

      if (severityDifference !== 0) return severityDifference;

      return (
        new Date(right.publishedAt ?? 0).getTime() -
        new Date(left.publishedAt ?? 0).getTime()
      );
    });
}
