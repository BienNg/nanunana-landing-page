"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { cn } from "@/lib/cn";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { mainNav } from "@/content/nav";
import { siteFor } from "@/content/site";
import { ui } from "@/content/ui";
import { localePath, unlocalizedPath } from "@/lib/i18n/locale";
import { AnchorButton } from "@/components/ui/Button";
import { ChatLink } from "@/components/analytics/ChatLink";
import { MessengerIcon, WhatsAppIcon, ZaloIcon, zaloOnCoral } from "@/components/icons/brand";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  const locale = useLocale();
  const nav = mainNav[locale];
  const site = siteFor(locale);
  const copy = ui[locale];
  const spyIds = nav.flatMap((item) => item.spy ?? []);
  const pathname = usePathname();
  const path = unlocalizedPath(pathname);
  const active = useScrollSpy(path === "/" ? spyIds : []);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string, spy?: readonly string[]) =>
    href.startsWith("/#")
      ? path === "/" && !!active && !!spy?.includes(active)
      : path === unlocalizedPath(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md backdrop-saturate-150 transition-[border-color,box-shadow] duration-200 supports-[not(backdrop-filter:blur(0))]:bg-white",
        scrolled ? "border-border-subtle shadow-tier-1" : "border-transparent",
      )}
    >
      <div className="container-page flex h-header items-center justify-between gap-4">
        <Logo priority />

        <nav aria-label={copy.nav} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const current = isActive(item.href, item.spy);
              return (
                <li key={item.href}>
                  <Link
                    href={localePath(locale, item.href)}
                    aria-current={
                      current ? (item.href.startsWith("/#") ? "location" : "page") : undefined
                    }
                    className={cn(
                      "relative inline-flex min-h-tap items-center rounded-control px-3 text-label-md transition-colors hover:text-brand-teal-dark",
                      current ? "text-brand-teal-dark" : "text-ink-muted",
                      "after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:rounded-full after:bg-teal after:transition-transform after:duration-200",
                      current ? "after:scale-x-100" : "after:scale-x-0",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher className="mr-1" />
          <ChatLink
            href={site.phone.href}
            channel="phone"
            placement="header"
            className="hidden min-h-tap items-center gap-2 rounded-control px-2 text-label-md text-ink hover:text-brand-teal-dark xl:inline-flex"
          >
            <Phone aria-hidden className="size-4 text-teal" />
            {site.phone.display}
          </ChatLink>
          <AnchorButton
            href={site.channels.zalo}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            track={{ channel: "zalo", placement: "header" }}
            className={cn("hidden md:inline-flex", zaloOnCoral)}
          >
            <ZaloIcon /> {copy.zalo}
          </AnchorButton>
          <ChatLink
            href={site.channels.messenger}
            channel="messenger"
            placement="header"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.messenger}
            className="hidden size-tap place-items-center rounded-control text-[22px] text-[#0866ff] transition-colors hover:bg-surface-container-low md:grid"
          >
            <MessengerIcon />
          </ChatLink>
          <ChatLink
            href={site.channels.whatsapp}
            channel="whatsapp"
            placement="header"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.whatsapp}
            className="hidden size-tap place-items-center rounded-control text-[22px] text-[#128C7E] transition-colors hover:bg-surface-container-low lg:grid"
          >
            <WhatsAppIcon />
          </ChatLink>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={copy.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(true)}
            className="grid size-tap place-items-center rounded-control text-ink transition-colors hover:bg-surface-container-low xl:hidden"
          >
            <Menu aria-hidden className="size-6" />
          </button>
        </div>
      </div>

      <MobileNav
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }}
        isActive={isActive}
      />
    </header>
  );
}
