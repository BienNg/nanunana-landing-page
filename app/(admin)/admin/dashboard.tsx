import type { ReactNode } from "react";
import type { Dashboard } from "@/lib/stats/query";
import { logoutStats } from "./actions";
import { RefreshLink } from "./refresh-link";

const nf = new Intl.NumberFormat("en-GB");

function formatWatch(ms: number) {
  if (ms <= 0) return "—";
  const total = Math.round(ms / 1000);
  if (total <= 0) return "under 1 second";
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  if (hours > 0) return minutes > 0 ? `${hours} hr ${minutes} min` : `${hours} hr`;
  if (minutes > 0) return seconds > 0 ? `${minutes} min ${seconds} sec` : `${minutes} min`;
  return `${seconds} sec`;
}

function counted(count: number, one: string, many: string) {
  return `${nf.format(count)} ${count === 1 ? one : many}`;
}

function percent(count: number, total: number) {
  if (total <= 0) return "0%";
  return `${Math.round((count / total) * 100)}%`;
}

const ranges = [
  { days: 7, label: "7 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
] as const;

export function StatsDashboard({ data }: { data: Dashboard }) {
  const maxVisits = Math.max(1, ...data.series.map((day) => day.visits));
  const maxWatch = Math.max(1, ...data.sections.map((section) => section.watchMs));
  const rangeLabel = `Last ${data.rangeDays} days`;
  const empty = data.range.visits === 0 && data.range.pageviews === 0 && data.clicks.length === 0;

  return (
    <div className="container-page py-8 md:py-12">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-label-sm tracking-wide text-teal uppercase">NaNu NaNa</p>
          <h1 className="mt-1 text-headline-lg text-ink md:text-headline-xl">Visitor stats</h1>
          <p className="mt-2 max-w-2xl text-body-sm text-ink-muted">
            Recorded by this site. A visit is one session, and a new one starts after 30 minutes
            away. Updated {data.updatedAt}. Dates use Vietnam time.
          </p>
          {data.storage === "file" ? (
            <p className="mt-2 max-w-2xl text-body-sm text-ink-muted">
              Saved on the computer running the site. On Vercel, set{" "}
              <code className="text-ink">UPSTASH_REDIS_REST_URL</code> and{" "}
              <code className="text-ink">UPSTASH_REDIS_REST_TOKEN</code> so the numbers survive a
              new server.
            </p>
          ) : null}
        </div>
        <form action={logoutStats}>
          <button
            type="submit"
            className="inline-flex min-h-tap items-center rounded-control border border-border-control px-4 text-label-md text-ink hover:border-teal"
          >
            Log out
          </button>
        </form>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Today"
          hint="Vietnam time"
          visits={data.today.visits}
          pageviews={data.today.pageviews}
          uniques={data.today.uniques}
        />
        <StatCard
          title="This week"
          hint="Monday through today"
          visits={data.week.visits}
          pageviews={data.week.pageviews}
          uniques={data.week.uniques}
        />
        <StatCard
          title="This month"
          hint="From the 1st through today"
          visits={data.month.visits}
          pageviews={data.month.pageviews}
          uniques={data.month.uniques}
        />
        <StatCard
          title={rangeLabel}
          hint="The range shown below"
          visits={data.range.visits}
          pageviews={data.range.pageviews}
          uniques={data.range.uniques}
        />
      </section>

      <nav aria-label="Time range" className="mt-8 flex flex-wrap gap-2">
        {ranges.map((item) => {
          const current = item.days === data.rangeDays;
          return (
            <a
              key={item.days}
              href={item.days === 30 ? "/admin" : `/admin?range=${item.days}`}
              aria-current={current ? "page" : undefined}
              className={
                current
                  ? "inline-flex min-h-tap items-center rounded-control bg-brand-teal-dark px-4 text-label-md text-white"
                  : "inline-flex min-h-tap items-center rounded-control border border-border-control px-4 text-label-md text-ink hover:border-teal"
              }
            >
              {item.label}
            </a>
          );
        })}
        <RefreshLink href={data.rangeDays === 30 ? "/admin" : `/admin?range=${data.rangeDays}`} />
      </nav>

      {empty ? (
        <p className="mt-6 rounded-card border border-border-subtle bg-white px-4 py-3 text-body-md text-ink-muted">
          No visits in this range yet. Open the homepage, click a few buttons, scroll through the
          sections, then refresh this page.
        </p>
      ) : null}

      <section className="mt-6 rounded-card border border-border-subtle bg-white p-4 shadow-tier-1 md:p-6">
        <h2 className="text-headline-sm text-ink">Visits by day</h2>
        <p className="mt-1 text-body-sm text-ink-muted">
          {rangeLabel}, newest first. The bar is the number of sessions.
        </p>
        <div className="mt-4 max-h-[32rem] space-y-1.5 overflow-y-auto pr-1">
          {data.series.map((day) => (
            <div
              key={day.date}
              className="grid grid-cols-[6.5rem_minmax(0,1fr)_auto] items-center gap-3 text-body-sm"
            >
              <span className="text-ink-muted tabular-nums">{day.label}</span>
              <div className="h-2 rounded-full bg-surface-container" aria-hidden>
                <div
                  className="h-2 rounded-full bg-brand-teal-dark"
                  style={{
                    width: `${Math.max(day.visits > 0 ? 4 : 0, (day.visits / maxVisits) * 100)}%`,
                  }}
                />
              </div>
              <span className="text-right text-ink tabular-nums">
                {nf.format(day.visits)}
                <span className="text-ink-subtle"> · {counted(day.pageviews, "view", "views")}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel
          title="Buttons clicked"
          hint="Each row is one button or link, including where it sits on the page."
        >
          {data.clicks.length === 0 ? (
            <Empty>No clicks yet.</Empty>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-body-sm">
                <thead>
                  <tr className="border-b border-border-subtle text-label-sm text-ink-subtle">
                    <th scope="col" className="py-2 pr-3 font-semibold">
                      Button
                    </th>
                    <th scope="col" className="py-2 pr-3 font-semibold">
                      Where
                    </th>
                    <th scope="col" className="py-2 pr-3 font-semibold">
                      Page
                    </th>
                    <th scope="col" className="py-2 text-right font-semibold">
                      Clicks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.clicks.map((click) => (
                    <tr
                      key={`${click.page}|${click.section}|${click.label}|${click.href}`}
                      className="border-b border-border-subtle/80 align-top last:border-0"
                    >
                      <td className="py-2.5 pr-3 text-ink">
                        {click.label}
                        {click.href ? (
                          <span className="mt-0.5 block max-w-56 truncate text-ink-subtle">
                            {click.href}
                          </span>
                        ) : null}
                      </td>
                      <td className="py-2.5 pr-3 text-ink-muted">{click.section}</td>
                      <td className="py-2.5 pr-3 text-ink-muted">{click.page}</td>
                      <td className="py-2.5 text-right font-semibold text-ink tabular-nums">
                        {nf.format(click.count)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <Panel
          title="Sections watched"
          hint="Time the section filled most of the screen. A view counts once each time the page is opened."
        >
          {data.sections.length === 0 ? (
            <Empty>No sections watched yet.</Empty>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left text-body-sm">
                <thead>
                  <tr className="border-b border-border-subtle text-label-sm text-ink-subtle">
                    <th scope="col" className="py-2 pr-3 font-semibold">
                      Section
                    </th>
                    <th scope="col" className="py-2 pr-3 text-right font-semibold">
                      Views
                    </th>
                    <th scope="col" className="py-2 pr-3 text-right font-semibold">
                      Time
                    </th>
                    <th scope="col" className="py-2 text-right font-semibold">
                      Average
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.sections.map((section) => (
                    <tr key={section.id} className="border-b border-border-subtle/80 last:border-0">
                      <td className="py-2.5 pr-3 text-ink">
                        {section.label}
                        <span
                          className="mt-1.5 block h-1.5 rounded-full bg-surface-container"
                          aria-hidden
                        >
                          <span
                            className="block h-1.5 rounded-full bg-teal"
                            style={{ width: `${(section.watchMs / maxWatch) * 100}%` }}
                          />
                        </span>
                      </td>
                      <td className="py-2.5 pr-3 text-right text-ink tabular-nums">
                        {nf.format(section.views)}
                      </td>
                      <td className="py-2.5 pr-3 text-right text-ink tabular-nums">
                        {formatWatch(section.watchMs)}
                      </td>
                      <td className="py-2.5 text-right text-ink-muted tabular-nums">
                        {section.views > 0 ? formatWatch(section.watchMs / section.views) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel
          title="Country"
          hint="Counted per visit. On Vercel this comes from the hosting network. A local machine usually shows Unknown."
        >
          <GeoList
            rows={data.countries.map((row) => ({
              key: row.name,
              title: row.name,
              count: row.count,
            }))}
            total={data.range.visits}
            empty="No visits in this range."
          />
        </Panel>
        <Panel
          title="City"
          hint="Shown when the server knows the city. IP addresses are not stored."
        >
          <GeoList
            rows={data.cities.map((row) => ({
              key: `${row.country}|${row.city}`,
              title: row.city,
              detail: row.country,
              count: row.count,
            }))}
            total={data.range.visits}
            empty="No cities yet. These appear after the site runs on Vercel."
          />
        </Panel>
      </div>
    </div>
  );
}

function StatCard({
  title,
  hint,
  visits,
  pageviews,
  uniques,
}: {
  title: string;
  hint: string;
  visits: number;
  pageviews: number;
  uniques: number;
}) {
  return (
    <article className="rounded-card border border-border-subtle bg-white p-4 shadow-tier-1">
      <h2 className="text-label-md text-ink">{title}</h2>
      <p className="mt-1 text-body-sm text-ink-subtle">{hint}</p>
      <p className="mt-3 text-headline-lg text-ink tabular-nums">{nf.format(visits)}</p>
      <p className="text-body-sm text-ink-muted">visits</p>
      <p className="mt-2 text-body-sm text-ink-muted tabular-nums">
        {counted(pageviews, "page view", "page views")} · {counted(uniques, "person", "people")}
      </p>
    </article>
  );
}

function Panel({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <section className="rounded-card border border-border-subtle bg-white p-4 shadow-tier-1 md:p-6">
      <h2 className="text-headline-sm text-ink">{title}</h2>
      <p className="mt-1 text-body-sm text-ink-muted">{hint}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Empty({ children }: { children: ReactNode }) {
  return <p className="text-body-sm text-ink-muted">{children}</p>;
}

function GeoList({
  rows,
  total,
  empty,
}: {
  rows: { key: string; title: string; detail?: string; count: number }[];
  total: number;
  empty: string;
}) {
  if (rows.length === 0) return <Empty>{empty}</Empty>;
  const max = Math.max(1, ...rows.map((row) => row.count));
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.key}>
          <div className="flex items-baseline justify-between gap-3 text-body-sm">
            <span className="text-ink">
              {row.title}
              {row.detail ? <span className="text-ink-subtle"> · {row.detail}</span> : null}
            </span>
            <span className="shrink-0 text-ink tabular-nums">
              {nf.format(row.count)}
              <span className="text-ink-subtle"> · {percent(row.count, total)}</span>
            </span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-surface-container" aria-hidden>
            <div
              className="h-1.5 rounded-full bg-brand-teal-dark"
              style={{ width: `${(row.count / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
