import { GraduationCap, History, BadgeCheck, MapPin, type LucideIcon } from "lucide-react";
import { stats, type StatIcon } from "@/content/stats";
import { isVisible } from "@/content/verify";
import { VerifyMark } from "@/components/ui/VerifyMark";

const icons: Record<StatIcon, LucideIcon> = {
  students: GraduationCap,
  years: History,
  visa: BadgeCheck,
  offices: MapPin,
};

const nf = new Intl.NumberFormat("vi-VN");

/** Stats strip — renders only confirmed stats in production. */
export function Stats() {
  const visible = stats.filter((s) => isVisible(s.value));
  if (visible.length === 0) return null;

  return (
    <section
      id="thanh-tich"
      aria-label="Thành tích của NaNu NaNa"
      className="border-y border-border-subtle bg-white"
    >
      <dl className="container-page grid grid-cols-2 gap-x-3 gap-y-8 py-10 sm:gap-x-gutter md:py-12 lg:grid-cols-4 lg:gap-y-0">
        {visible.map((s) => {
          const Icon = icons[s.icon];
          return (
            <div key={s.id} className="flex min-w-0 items-start gap-2 sm:gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-control bg-surface-container-low text-brand-teal-dark">
                <Icon aria-hidden className="size-5" />
              </span>
              <div className="flex min-w-0 flex-col">
                <dt className="order-2 text-label-md text-ink lg:whitespace-nowrap">{s.label}</dt>
                <dd className="order-1 text-headline-md whitespace-nowrap text-brand-teal-dark tabular-nums sm:text-headline-lg md:text-headline-xl">
                  <VerifyMark claim={s.value}>
                    {(v) => (
                      <span data-countup={v} data-prefix={s.prefix} data-suffix={s.suffix}>
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
