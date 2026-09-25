import { ArrowUpRight, Headset, Phone } from "lucide-react";
import { contactSection } from "@/content/contact";
import { sectionIds } from "@/content/nav";
import { site } from "@/content/site";
import { ChatLink } from "@/components/analytics/ChatLink";
import { MessengerIcon, WhatsAppIcon, ZaloIcon } from "@/components/icons/brand";
import { Badge } from "@/components/ui/Badge";
import { VerifyMark } from "@/components/ui/VerifyMark";
import type { ChatChannel } from "@/lib/analytics";
import { cn } from "@/lib/cn";

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

const channelName: Record<(typeof channels)[number]["id"], ChatChannel> = {
  zalo: "zalo",
  messenger: "messenger",
  whatsapp: "whatsapp",
  hotline: "phone",
};

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
              const lead = c.id === "zalo";
              return (
                <li key={c.id}>
                  <ChatLink
                    href={c.href}
                    channel={channelName[c.id]}
                    placement="contact"
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "group flex min-h-16 items-center gap-4 rounded-card border p-4 transition-colors [--icon-contrast:var(--color-ink)]",
                      lead
                        ? "border-white bg-white text-ink shadow-tier-2 hover:bg-surface-container-low"
                        : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-control text-[22px]",
                        lead
                          ? "bg-coral-fill text-white [--icon-contrast:var(--color-coral-fill)]"
                          : "bg-white text-brand-teal-dark",
                      )}
                    >
                      <Icon aria-hidden className="size-[1em]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block text-label-lg", lead ? "text-ink" : "text-white")}>
                        {c.label}
                      </span>
                      <span
                        className={cn(
                          "block truncate text-body-sm",
                          lead ? "text-ink-muted" : "text-ink-inverse-muted",
                        )}
                      >
                        {c.detail}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className={cn(
                        "size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                        lead ? "text-coral-fill" : "text-ink-inverse-muted",
                      )}
                    />
                  </ChatLink>
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
