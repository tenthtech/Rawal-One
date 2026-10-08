import "server-only";

import { randomUUID } from "node:crypto";
import { readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import type { CreateAlertInput, EmergencyAlert } from "@/lib/alert-model";
import { isAlertExpired } from "@/lib/alert-model";
import {
  getSupabaseConfiguration,
  isLocalJsonFallbackEnabled,
} from "@/lib/supabase/config";
import type { AlertRow } from "@/lib/supabase/database.types";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const alertsFilePath = path.join(process.cwd(), "data", "alerts.json");
const severityPriority = {
  emergency: 0,
  warning: 1,
  advisory: 2,
} as const;

let mutationQueue: Promise<void> = Promise.resolve();

const alertColumns =
  "id,severity,title,message,affected_area,status,more_info_url,published_at,expires_at,created_at,updated_at";

function mapAlertRow(row: AlertRow): EmergencyAlert {
  return {
    id: row.id,
    severity: row.severity,
    title: row.title,
    message: row.message,
    affectedArea: row.affected_area,
    status: row.status,
    moreInfoUrl: row.more_info_url,
    publishedAt: row.published_at,
    expiresAt: row.expires_at,
    updatedAt: row.updated_at,
  };
}

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
  if (isLocalJsonFallbackEnabled()) {
    const alerts = await readAlertsFromDisk();

    return alerts.sort(
      (left, right) =>
        new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("alerts")
    .select(alertColumns)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(`Could not read alerts: ${error.message}`);

  return data.map(mapAlertRow);
}

export async function getAlertById(id: string) {
  if (isLocalJsonFallbackEnabled()) {
    const alerts = await readAlertsFromDisk();
    return alerts.find((alert) => alert.id === id) ?? null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("alerts")
    .select(alertColumns)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Could not read the alert: ${error.message}`);

  return data ? mapAlertRow(data) : null;
}

export async function createAlert(input: CreateAlertInput) {
  if (isLocalJsonFallbackEnabled()) {
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

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("alerts")
    .insert({
      severity: input.severity,
      title: input.title,
      message: input.message,
      affected_area: input.affectedArea,
      expires_at: input.expiresAt,
      more_info_url: input.moreInfoUrl,
    })
    .select(alertColumns)
    .single();

  if (error) throw new Error(`Could not create the alert: ${error.message}`);

  return mapAlertRow(data);
}

export async function publishAlert(id: string) {
  if (isLocalJsonFallbackEnabled()) {
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

  const current = await getAlertById(id);

  if (!current) throw new Error("Alert not found.");
  if (isAlertExpired(current)) {
    throw new Error("An expired alert cannot be published.");
  }

  const timestamp = new Date().toISOString();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("alerts")
    .update({
      status: "published",
      published_at: timestamp,
      updated_at: timestamp,
    })
    .eq("id", id)
    .select(alertColumns)
    .single();

  if (error) throw new Error(`Could not publish the alert: ${error.message}`);

  return mapAlertRow(data);
}

export async function deactivateAlert(id: string) {
  if (isLocalJsonFallbackEnabled()) {
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

  const timestamp = new Date().toISOString();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("alerts")
    .update({ status: "inactive", updated_at: timestamp })
    .eq("id", id)
    .select(alertColumns)
    .single();

  if (error) throw new Error(`Could not deactivate the alert: ${error.message}`);

  return mapAlertRow(data);
}

export async function getActivePublicAlerts(now = new Date()) {
  let alerts: EmergencyAlert[];
  const configuration = getSupabaseConfiguration();

  if (configuration.status === "missing") {
    alerts = await readAlertsFromDisk();
  } else {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("alerts")
      .select(alertColumns)
      .eq("status", "published")
      .not("published_at", "is", null)
      .or(`expires_at.is.null,expires_at.gt.${now.toISOString()}`);

    if (error) throw new Error(`Could not read public alerts: ${error.message}`);

    alerts = data.map(mapAlertRow);
  }

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
