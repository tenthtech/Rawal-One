"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  signInAction,
  type LoginState,
} from "@/app/admin/login/actions";

const initialState: LoginState = { attempt: 0 };

export function AdminLoginForm({ enabled }: { enabled: boolean }) {
  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialState,
  );
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.attempt > 0 && state.error) {
      errorRef.current?.focus();
    }
  }, [state.attempt, state.error]);

  return (
    <form action={formAction} aria-busy={isPending} className="mt-8 space-y-6">
      {state.error ? (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="border-s-4 border-emergency bg-page px-5 py-4"
        >
          <p className="font-bold text-ink">Sign in was not successful</p>
          <p className="mt-1 leading-7 text-ink">{state.error}</p>
        </div>
      ) : null}

      <div>
        <label htmlFor="email" className="block font-bold text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={!enabled || isPending}
          className="mt-2 min-h-12 w-full rounded-sm border border-line bg-surface px-4 py-3 text-ink disabled:cursor-not-allowed disabled:bg-page"
        />
      </div>

      <div>
        <label htmlFor="password" className="block font-bold text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={!enabled || isPending}
          className="mt-2 min-h-12 w-full rounded-sm border border-line bg-surface px-4 py-3 text-ink disabled:cursor-not-allowed disabled:bg-page"
        />
      </div>

      <button
        type="submit"
        disabled={!enabled || isPending}
        className="inline-flex min-h-12 items-center justify-center rounded-sm bg-civic px-6 py-3 font-bold text-white hover:bg-civic-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
