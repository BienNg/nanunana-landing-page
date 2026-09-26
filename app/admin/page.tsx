import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { serverEnv } from "@/lib/env";
import { ADMIN_COOKIE, adminSessionValid } from "@/lib/stats/auth";
import { loadDashboard, type RangeDays } from "@/lib/stats/query";
import { formatStamp } from "@/lib/stats/time";
import { StatsDashboard } from "./dashboard";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Stats",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function rangeFrom(value: string | string[] | undefined): RangeDays {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "7" || raw === "90") return Number(raw) as RangeDays;
  return 30;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string | string[] }>;
}) {
  const password = serverEnv.statsAdmin();

  if (!password) {
    return (
      <Shell>
        <h1 className="text-headline-md text-ink">Stats are not turned on</h1>
        <p className="mt-3 text-body-md text-ink-muted">
          Add <code className="text-ink">STATS_ADMIN_PASSWORD</code> to the environment, then reload
          this page. The numbers also need Upstash Redis (
          <code className="text-ink">UPSTASH_REDIS_REST_URL</code> and{" "}
          <code className="text-ink">UPSTASH_REDIS_REST_TOKEN</code>).
        </p>
      </Shell>
    );
  }

  const jar = await cookies();
  if (!adminSessionValid(jar.get(ADMIN_COOKIE)?.value, password)) {
    return (
      <Shell>
        <p className="text-label-sm tracking-wide text-teal uppercase">NaNu NaNa</p>
        <h1 className="mt-1 text-headline-md text-ink">Visitor stats</h1>
        <p className="mt-2 text-body-sm text-ink-muted">
          This page is private. Enter the password from{" "}
          <code className="text-ink">STATS_ADMIN_PASSWORD</code>.
        </p>
        <LoginForm />
      </Shell>
    );
  }

  const range = rangeFrom((await searchParams).range);
  const result = await loadDashboard(range, formatStamp());

  if (result.status === "unconfigured") {
    return (
      <Shell>
        <h1 className="text-headline-md text-ink">Nowhere to store the numbers</h1>
        <p className="mt-3 text-body-md text-ink-muted">
          Set <code className="text-ink">UPSTASH_REDIS_REST_URL</code> and{" "}
          <code className="text-ink">UPSTASH_REDIS_REST_TOKEN</code>. This is the same Redis used to
          rate-limit the consultation form.
        </p>
      </Shell>
    );
  }

  if (result.status === "error") {
    return (
      <Shell>
        <h1 className="text-headline-md text-ink">Could not load the numbers</h1>
        <p className="mt-3 text-body-md text-ink-muted">
          Redis did not respond. Refresh the page in a few minutes.
        </p>
      </Shell>
    );
  }

  return <StatsDashboard data={result.dashboard} />;
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-dvh place-items-center px-5 py-16">
      <div className="w-full max-w-md rounded-card border border-border-subtle bg-white p-6 shadow-tier-2">
        {children}
      </div>
    </main>
  );
}
