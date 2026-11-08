"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ui } from "@/content/ui";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localePath, unlocalizedPath, type Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/cn";

function subscribeToHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
}

/** VI | DE. Swaps only the /de prefix and keeps the path and hash. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => "",
  );
  const copy = ui[locale];

  const bare = unlocalizedPath(pathname);
  const target = `${bare}${hash}`;

  return (
    <nav
      aria-label={copy.language}
      className={cn("flex items-center gap-1 text-label-sm", className)}
    >
      <LocaleChoice code="vi" href={target} current={locale} />
      <span aria-hidden className="text-ink-subtle">
        |
      </span>
      <LocaleChoice code="de" href={localePath("de", target)} current={locale} />
    </nav>
  );
}

function LocaleChoice({ code, href, current }: { code: Locale; href: string; current: Locale }) {
  const selected = current === code;
  return (
    <Link
      href={href}
      hrefLang={code}
      lang={code}
      aria-current={selected ? "page" : undefined}
      className={cn(
        "inline-flex min-h-tap items-center rounded-control px-1.5 uppercase",
        selected ? "font-bold text-brand-teal-dark" : "text-ink-subtle hover:text-ink",
      )}
    >
      {code}
    </Link>
  );
}
