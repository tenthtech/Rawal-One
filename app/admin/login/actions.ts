"use server";

import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/supabase/auth";
import { getSupabaseConfiguration } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type LoginState = {
  error?: string;
  attempt: number;
};

export async function signInAction(
  previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";
  const attempt = previousState.attempt + 1;

  if (!email || !password) {
    return { error: "Enter both the email address and password.", attempt };
  }

  if (getSupabaseConfiguration().status !== "configured") {
    return {
      error: "Authentication is not configured for this environment.",
      attempt,
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return {
        error: "The email address or password was not accepted.",
        attempt,
      };
    }
  } catch {
    return {
      error: "Sign in is temporarily unavailable. Try again.",
      attempt,
    };
  }

  redirect("/admin");
}

export async function signOutAction() {
  await requireAdminSession();
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut({ scope: "local" });
  redirect("/admin/login");
}
