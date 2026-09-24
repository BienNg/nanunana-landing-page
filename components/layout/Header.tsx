"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { cn } from "@/lib/cn";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { contactHref, mainNav } from "@/content/nav";
import { site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { MessengerIcon, ZaloIcon } from "@/components/icons/brand";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

const spyIds = mainNav.flatMap((item) => item.spy ?? []);

export function Header() {
  const pathname = usePathname();
  const active = useScrollSpy(pathname === "/" ? spyIds : []);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string, spy?: string[]) =>
    href.startsWith("/#")
      ? pathname === "/" && !!active && !!spy?.includes(active)
      : pathname === href;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md backdrop-saturate-150 transition-[border-color,box-shadow] duration-200 supports-[not(backdrop-filter:blur(0))]:bg-white",
        scrolled ? "border-border-subtle shadow-tier-1" : "border-transparent",
      )}
    >
      <div className="container-page flex h-header items-center justify-between gap-4">
        <Logo priority />

        <nav aria-label="Điều hướng chính" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const current = isActive(item.href, item.spy);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
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
          <a
            href={site.phone.href}
            className="hidden min-h-tap items-center gap-2 rounded-control px-2 text-label-md text-ink hover:text-brand-teal-dark xl:inline-flex"
          >
            <Phone aria-hidden className="size-4 text-teal" />
            {site.phone.display}
          </a>
          <a
            href={site.channels.zalo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nhắn tin Zalo"
            className="hidden size-tap place-items-center rounded-control text-[22px] text-[#0068ff] transition-colors hover:bg-surface-container-low md:grid"
          >
            <ZaloIcon />
          </a>
          <a
            href={site.channels.messenger}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nhắn tin Messenger"
            className="hidden size-tap place-items-center rounded-control text-[22px] text-[#0866ff] transition-colors hover:bg-surface-container-low md:grid"
          >
            <MessengerIcon />
          </a>
          <LinkButton href={contactHref} size="sm" className="hidden sm:inline-flex">
            Tư Vấn Miễn Phí
          </LinkButton>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Mở menu"
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
