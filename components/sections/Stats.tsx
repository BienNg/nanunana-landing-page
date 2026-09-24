import { Building2, GraduationCap, History, BadgeCheck, type LucideIcon } from "lucide-react";
import { stats, type StatIcon } from "@/content/stats";
import { isVisible } from "@/content/verify";
import { VerifyMark } from "@/components/ui/VerifyMark";

const icons: Record<StatIcon, LucideIcon> = {
  students: GraduationCap,
  years: History,
  pass: BadgeCheck,
  partners: Building2,
};

const nf = new Intl.NumberFormat("vi-VN");

/** Stats strip — renders only confirmed stats in production. */
export function Stats() {
  const visible = stats.filter((s) => isVisible(s.value));
  if (visible.length === 0) return null;

  return (
    <section
      aria-label="Thành tích của NaNu NaNa"
      className="border-y border-border-subtle bg-white"
    >
      <dl className="container-page grid grid-cols-2 gap-x-gutter-mobile gap-y-8 py-10 md:py-12 lg:grid-cols-4 lg:gap-gutter">
        {visible.map((s) => {
          const Icon = icons[s.icon];
          return (
            <div key={s.id} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-control bg-surface-container-low text-brand-teal-dark">
                <Icon aria-hidden className="size-5" />
              </span>
              <div className="flex flex-col">
                <dt className="order-2 text-label-md text-ink">{s.label}</dt>
                <dd className="order-1 text-headline-lg text-brand-teal-dark tabular-nums md:text-headline-xl">
                  <VerifyMark claim={s.value}>
                    {(v) => (
                      <span data-countup={v}>
                        {s.prefix}
                        {nf.format(v)}
                        {s.suffix}
                      </span>
                    )}
                  </VerifyMark>
                </dd>
                <dd className="order-3 mt-0.5 text-body-sm text-ink-subtle">{s.detail}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
