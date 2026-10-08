export type SupabaseConfigurationState =
  | {
      status: "configured";
      url: string;
      anonKey: string;
    }
  | {
      status: "missing" | "incomplete";
    };

export function getSupabaseConfiguration(): SupabaseConfigurationState {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url && !anonKey) {
    return { status: "missing" };
  }

  if (!url || !anonKey) {
    return { status: "incomplete" };
  }

  return { status: "configured", url, anonKey };
}

export function requireSupabaseConfiguration() {
  const configuration = getSupabaseConfiguration();

  if (configuration.status !== "configured") {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY together.",
    );
  }

  return configuration;
}

export function isLocalJsonFallbackEnabled() {
  return (
    process.env.NODE_ENV === "development" &&
    getSupabaseConfiguration().status === "missing"
  );
}
