"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "motion/react";
import { ChevronRight, Phone, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { contactHref, mainNav } from "@/content/nav";
import { site } from "@/content/site";
import { AnchorButton, LinkButton } from "@/components/ui/Button";
import { MessengerIcon, ZaloIcon } from "@/components/icons/brand";
import { Logo } from "./Logo";

const subscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/** Full-height drawer for < xl. Rendered in a portal (header has backdrop-filter). */
export function MobileNav({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string, spy?: string[]) => boolean;
}) {
  const isClient = useIsClient();
  const panelRef = useRef<HTMLDivElement>(null);

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
    const mq = window.matchMedia("(min-width: 80rem)");
    const onChange = () => mq.matches && onClose();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open, onClose]);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60] xl:hidden">
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
            aria-label="Menu"
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
                aria-label="Đóng menu"
                className="grid size-tap place-items-center rounded-control text-ink hover:bg-surface-container-low"
              >
                <X aria-hidden className="size-6" />
              </button>
            </div>

            <nav
              aria-label="Điều hướng chính (di động)"
              className="flex-1 overflow-y-auto px-3 py-4"
            >
              <ul className="flex flex-col">
                {mainNav.map((item, i) => {
                  const current = isActive(item.href, item.spy);
                  return (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.03, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
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
                    </m.li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex flex-col gap-3 border-t border-border-subtle p-margin-mobile pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <LinkButton href={contactHref} onClick={onClose} fullWidth size="lg">
                Tư Vấn Miễn Phí
              </LinkButton>
              <div className="grid grid-cols-3 gap-2">
                <AnchorButton href={site.phone.href} variant="outline" size="sm">
                  <Phone aria-hidden /> Gọi
                </AnchorButton>
                <AnchorButton
                  href={site.channels.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                >
                  <ZaloIcon /> Zalo
                </AnchorButton>
                <AnchorButton
                  href={site.channels.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                >
                  <MessengerIcon /> Chat
                </AnchorButton>
              </div>
              <p className="text-center text-body-sm text-ink-subtle">
                Hotline:{" "}
                <a href={site.phone.href} className="font-semibold text-ink">
                  {site.phone.display}
                </a>
              </p>
            </div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
