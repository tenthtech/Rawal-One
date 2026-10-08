import "server-only";

import { redirect } from "next/navigation";

import {
  getSupabaseConfiguration,
  isLocalJsonFallbackEnabled,
} from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminSession = { mode: "local" } | { mode: "supabase" };

export async function requireAdminSession(): Promise<AdminSession> {
  if (isLocalJsonFallbackEnabled()) {
    return { mode: "local" };
  }

  if (getSupabaseConfiguration().status !== "configured") {
    redirect("/admin/login");
  }

  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.getClaims().catch(() => null);

  if (result?.error || !result?.data?.claims.sub) {
    redirect("/admin/login");
  }

  return { mode: "supabase" };
}
