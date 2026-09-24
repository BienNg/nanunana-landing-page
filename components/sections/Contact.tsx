import { ArrowUpRight, Headset, Phone } from "lucide-react";
import { contactSection } from "@/content/contact";
import { sectionIds } from "@/content/nav";
import { site } from "@/content/site";
import { MessengerIcon, WhatsAppIcon, ZaloIcon } from "@/components/icons/brand";
import { Badge } from "@/components/ui/Badge";
import { VerifyMark } from "@/components/ui/VerifyMark";

const channels = [
  {
    id: "zalo",
    label: "Nhắn tin Zalo",
    detail: site.phone.display,
    href: site.channels.zalo,
    icon: ZaloIcon,
    external: true,
  },
  {
    id: "messenger",
    label: "Facebook Messenger",
    detail: "NaNu NaNa – Du Học Đức",
    href: site.channels.messenger,
    icon: MessengerIcon,
    external: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail: site.phone.display,
    href: site.channels.whatsapp,
    icon: WhatsAppIcon,
    external: true,
  },
  {
    id: "hotline",
    label: "Gọi hotline",
    detail: site.phone.display,
    href: site.phone.href,
    icon: Phone,
    external: false,
  },
] as const;

/**
 * Dark consultation section. `form` is the consultation form (Phase 5).
 */
export function Contact({ form }: { form?: React.ReactNode }) {
  return (
    <section
      id={sectionIds.contact}
      aria-labelledby={`${sectionIds.contact}-title`}
      className="relative overflow-hidden bg-ink section-y text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_10%_0%,rgba(0,163,191,0.22),transparent_70%)]"
      />
      <div className="relative container-page grid gap-10 lg:grid-cols-12 lg:gap-gutter">
        <div className="lg:col-span-5">
          <VerifyMark claim={contactSection.badge}>
            {(t) => (
              <Badge tone="inverse">
                <Headset aria-hidden /> {t}
              </Badge>
            )}
          </VerifyMark>
          <h2
            id={`${sectionIds.contact}-title`}
            className="mt-4 text-headline-xl-mobile md:text-headline-xl"
          >
            {contactSection.title}
          </h2>
          <p className="mt-4 text-body-md text-inverse-on-surface/85 md:text-body-lg">
            {contactSection.intro}
          </p>

          <h3 className="mt-8 text-label-sm text-inverse-primary uppercase">
            {contactSection.channelsTitle}
          </h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.id}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-h-16 items-center gap-4 rounded-card border border-white/10 bg-white/5 p-4 transition-colors [--icon-contrast:var(--color-ink)] hover:border-white/25 hover:bg-white/10"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-control bg-white text-[22px] text-brand-teal-dark">
                      <Icon aria-hidden className="size-[1em]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-label-lg text-white">{c.label}</span>
                      <span className="block truncate text-body-sm text-ink-inverse-muted">
                        {c.detail}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-ink-inverse-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-card bg-white p-6 text-ink shadow-tier-3 md:p-8">
            <h3 className="text-headline-md text-ink">
              <VerifyMark
                claim={contactSection.formTitle}
                fallback={contactSection.formTitleFallback}
              />
            </h3>
            <p className="mt-1.5 text-body-md text-ink-muted">
              <VerifyMark
                claim={contactSection.formSubtitle}
                fallback={contactSection.formSubtitleFallback}
              />
            </p>
            <div className="mt-6">
              {form ?? (
                <p className="rounded-control border border-dashed border-border-control p-6 text-center text-body-sm text-ink-subtle">
                  Form đăng ký tư vấn — Phase 5
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
