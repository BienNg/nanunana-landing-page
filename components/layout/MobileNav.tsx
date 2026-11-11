"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown, ChevronRight, Phone, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { contactHref, mainNav } from "@/content/nav";
import { siteFor } from "@/content/site";
import { ui } from "@/content/ui";
import { localePath } from "@/lib/i18n/locale";
import { AnchorButton, LinkButton } from "@/components/ui/Button";
import { ChatLink } from "@/components/analytics/ChatLink";
import { MessengerIcon, WhatsAppIcon, ZaloIcon, zaloOnCoral } from "@/components/icons/brand";
import { Logo } from "./Logo";

const subscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/** Full-height drawer for < lg. Rendered in a portal (header has backdrop-filter). */
export function MobileNav({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string, spy?: readonly string[]) => boolean;
}) {
  const isClient = useIsClient();
  const locale = useLocale();
  const nav = mainNav[locale];
  const site = siteFor(locale);
  const copy = ui[locale];
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Escape to close, focus trap, scroll lock.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Close if the viewport grows to desktop while open.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && onClose();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open, onClose]);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <m.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />
          <m.div
            ref={panelRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={copy.menu}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-tier-3"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
          >
            <div className="flex h-header items-center justify-between border-b border-border-subtle px-margin-mobile">
              <Logo />
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                aria-label={copy.closeMenu}
                className="grid size-tap place-items-center rounded-control text-ink hover:bg-surface-container-low"
              >
                <X aria-hidden className="size-6" />
              </button>
            </div>

            <nav aria-label={copy.navMobile} className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col">
                {nav.map((item, i) => {
                  const groupOpen = expanded === item.label;
                  const current =
                    isActive(item.href, item.spy) ||
                    !!item.children?.some((child) => isActive(child.href, child.spy));
                  return (
                    <m.li
                      key={item.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.03, duration: 0.25 }}
                    >
                      {item.children ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={groupOpen}
                            onClick={() => setExpanded(groupOpen ? null : item.label)}
                            className={cn(
                              "flex min-h-13 w-full items-center justify-between rounded-control px-3 text-left text-headline-sm transition-colors hover:bg-surface-container-low",
                              current ? "text-brand-teal-dark" : "text-ink",
                            )}
                          >
                            {item.label}
                            <ChevronDown
                              aria-hidden
                              className={cn(
                                "size-5 text-ink-subtle transition-transform duration-200",
                                groupOpen && "rotate-180",
                              )}
                            />
                          </button>
                          {groupOpen ? (
                            <ul className="mb-2 ml-3 border-l border-border-subtle pl-2">
                              {item.children.map((child) => {
                                const active = isActive(child.href, child.spy);
                                return (
                                  <li key={child.href}>
                                    <Link
                                      href={localePath(locale, child.href)}
                                      onClick={onClose}
                                      aria-current={active ? "page" : undefined}
                                      className={cn(
                                        "flex min-h-tap items-center rounded-control px-3 text-body-lg transition-colors hover:bg-surface-container-low",
                                        active ? "text-brand-teal-dark" : "text-ink-muted",
                                      )}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : null}
                        </>
                      ) : (
                        <Link
                          href={localePath(locale, item.href)}
                          onClick={onClose}
                          aria-current={current ? "location" : undefined}
                          className={cn(
                            "flex min-h-13 items-center justify-between rounded-control px-3 text-headline-sm transition-colors hover:bg-surface-container-low",
                            current ? "text-brand-teal-dark" : "text-ink",
                          )}
                        >
                          {item.label}
                          <ChevronRight aria-hidden className="size-5 text-ink-subtle" />
                        </Link>
                      )}
                    </m.li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex flex-col gap-3 border-t border-border-subtle p-margin-mobile pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <LanguageSwitcher className="justify-center" />
              <AnchorButton
                href={site.channels.zalo}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                size="lg"
                track={{ channel: "zalo", placement: "mobile_nav" }}
                className={zaloOnCoral}
                onClick={onClose}
              >
                <ZaloIcon /> {copy.zalo}
              </AnchorButton>
              <LinkButton
                href={contactHref}
                onClick={onClose}
                fullWidth
                size="lg"
                variant="outline"
              >
                {copy.leaveInfo}
              </LinkButton>
              <div className="grid grid-cols-3 gap-2">
                <AnchorButton
                  href={site.channels.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  track={{ channel: "messenger", placement: "mobile_nav" }}
                  onClick={onClose}
                  className="h-auto flex-col gap-0.5 px-1 py-2 text-[12px] leading-tight whitespace-normal"
                >
                  <MessengerIcon /> {copy.chat}
                </AnchorButton>
                <AnchorButton
                  href={site.channels.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  track={{ channel: "whatsapp", placement: "mobile_nav" }}
                  onClick={onClose}
                  className="h-auto flex-col gap-0.5 px-1 py-2 text-[12px] leading-tight whitespace-normal"
                >
                  <WhatsAppIcon /> WhatsApp
                </AnchorButton>
                <AnchorButton
                  href={site.phone.href}
                  variant="outline"
                  size="sm"
                  track={{ channel: "phone", placement: "mobile_nav" }}
                  onClick={onClose}
                  className="h-auto flex-col gap-0.5 px-1 py-2 text-[12px] leading-tight whitespace-normal"
                >
                  <Phone aria-hidden /> {copy.call}
                </AnchorButton>
              </div>
              <p className="text-center text-body-sm text-ink-subtle">
                {copy.hotline}:{" "}
                <ChatLink
                  href={site.phone.href}
                  channel="phone"
                  placement="mobile_nav"
                  onClick={onClose}
                  className="font-semibold text-ink"
                >
                  {site.phone.display}
                </ChatLink>
              </p>
            </div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
