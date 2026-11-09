"use client";

import { useActionState } from "react";
import { loginStats } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginStats, { error: "" });

  return (
    <form action={action} className="mt-6 space-y-4">
      <div>
        <label htmlFor="stats-password" className="text-label-md text-ink">
          Password
        </label>
        <input
          id="stats-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1.5 w-full rounded-control border border-border-control bg-white px-4 py-3 text-body-md text-ink outline-none focus:border-teal focus:ring-[3px] focus:ring-teal/15"
        />
      </div>
      {state.error ? (
        <p role="alert" className="text-body-sm text-error">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-control w-full items-center justify-center rounded-control bg-brand-teal-dark px-4 text-label-lg text-white transition-colors hover:bg-teal-hover disabled:opacity-60"
      >
        {pending ? "Opening…" : "View stats"}
      </button>
    </form>
  );
}
