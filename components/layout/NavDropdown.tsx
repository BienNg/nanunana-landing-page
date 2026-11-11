"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { NavItem, NavLink } from "@/content/nav";
import { localePath, type Locale } from "@/lib/i18n/locale";

type Props = {
  item: NavItem & { children: NavLink[] };
  locale: Locale;
  current: boolean;
  isActive: (href: string, spy?: readonly string[]) => boolean;
  /** Changes on navigation so an open menu closes. */
  path: string;
};

const triggerClass =
  "relative inline-flex min-h-tap items-center gap-1 rounded-control px-2.5 text-label-md whitespace-nowrap transition-colors hover:text-brand-teal-dark after:absolute after:inset-x-2.5 after:bottom-1.5 after:h-0.5 after:origin-left after:rounded-full after:bg-teal after:transition-transform after:duration-200";

/** Desktop menu entry with a dropdown. Opens on hover, click and keyboard. */
export function NavDropdown({ item, locale, current, isActive, path }: Props) {
  // The menu remembers the path it was opened on, so it closes after navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === path;
  const setOpen = (value: boolean | ((v: boolean) => boolean)) =>
    setOpenOn((prev) => {
      const next = typeof value === "function" ? value(prev === path) : value;
      return next ? path : null;
    });
  const rootRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenOn(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOn(null);
      rootRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Hover opens the menu just before the click lands; that click must not close it again.
  const hoverOpenedAt = useRef(0);
  const show = () => {
    clearTimeout(closeTimer.current);
    if (!open) hoverOpenedAt.current = Date.now();
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const featured = item.children.filter((link) => link.hint);
  const compact = item.children.filter((link) => !link.hint);

  return (
    <li
      ref={rootRef}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (open && Date.now() - hoverOpenedAt.current < 400) return;
          setOpen((v) => !v);
        }}
        className={cn(
          triggerClass,
          current || open ? "text-brand-teal-dark" : "text-ink-muted",
          current ? "after:scale-x-100" : "after:scale-x-0",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-1/2 z-10 w-80 -translate-x-1/2 pt-2"
      >
        <div className="rounded-card border border-border-subtle bg-white p-2 shadow-tier-3">
          <ul>
            {featured.map((link) => {
              const active = isActive(link.href, link.spy);
              return (
                <li key={link.href}>
                  <Link
                    href={localePath(locale, link.href)}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-control px-3 py-2.5 transition-colors hover:bg-surface-container-low",
                      active && "bg-surface-container-low",
                    )}
                  >
                    <span
                      className={cn(
                        "block text-label-lg",
                        active ? "text-brand-teal-dark" : "text-ink",
                      )}
                    >
                      {link.label}
                    </span>
                    <span className="mt-0.5 block text-body-sm text-ink-subtle">{link.hint}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {compact.length > 0 ? (
            <ul className="mt-1 flex flex-wrap gap-1.5 border-t border-border-subtle px-2 pt-3 pb-2">
              {compact.map((link) => {
                const active = isActive(link.href, link.spy);
                return (
                  <li key={link.href}>
                    <Link
                      href={localePath(locale, link.href)}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex min-h-9 min-w-12 items-center justify-center rounded-full border px-3 text-label-md transition-colors hover:border-teal hover:text-brand-teal-dark",
                        active
                          ? "border-teal text-brand-teal-dark"
                          : "border-border-subtle text-ink-muted",
                      )}
                    >
                      {/* Chips show just the level ("A1"); the full label stays for screen readers. */}
                      <span aria-hidden>{link.label.split(" ").pop()}</span>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </li>
  );
}
