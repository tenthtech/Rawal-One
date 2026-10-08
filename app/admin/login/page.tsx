import type { Metadata } from "next";
import Link from "next/link";

import { AdminLoginForm } from "@/components/admin-login-form";
import {
  getSupabaseConfiguration,
  isLocalJsonFallbackEnabled,
} from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Administration sign in",
  description: "Sign in to the Rawal One demonstration administration area.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const configuration = getSupabaseConfiguration();
  const isConfigured = configuration.status === "configured";
  const isLocalFallback = isLocalJsonFallbackEnabled();

  return (
    <div className="bg-page">
      <header className="border-b border-line bg-sage">
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
            Rawal One administration
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl">
            Sign in
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            Access the demonstration workspace for creating and publishing
            fictional municipal emergency alerts.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <section
          aria-labelledby="admin-login-heading"
          className="border border-line bg-surface px-5 py-7 sm:px-8"
        >
          <h2 id="admin-login-heading" className="text-2xl font-bold text-ink">
            Demonstration administrator
          </h2>
          <p className="mt-2 leading-7 text-muted">
            Use the single demonstration account created by the project
            administrator. Rawal One does not offer public registration.
          </p>

          {!isConfigured ? (
            <div className="mt-6 border-s-4 border-information bg-page px-5 py-4">
              <p className="font-bold text-ink">
                {configuration.status === "incomplete"
                  ? "Supabase configuration is incomplete"
                  : "Supabase authentication is not configured"}
              </p>
              <p className="mt-1 leading-7 text-muted">
                Set both Supabase environment variables before using hosted
                administration.
              </p>
              {isLocalFallback ? (
                <p className="mt-3 leading-7 text-muted">
                  Local development is using the JSON alert fallback. You can{" "}
                  <Link
                    href="/admin"
                    className="font-bold text-civic underline decoration-civic/35 underline-offset-4"
                  >
                    open the communications workspace
                  </Link>{" "}
                  without signing in.
                </p>
              ) : null}
            </div>
          ) : null}

          <AdminLoginForm enabled={isConfigured} />
        </section>
      </div>
    </div>
  );
}
