import "server-only";

import { createClient } from "@supabase/supabase-js";

import { requireSupabaseConfiguration } from "@/lib/supabase/config";
import type { Database } from "@/lib/supabase/database.types";

export function createSupabasePublicClient() {
  const { url, anonKey } = requireSupabaseConfiguration();

  return createClient<Database>(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
