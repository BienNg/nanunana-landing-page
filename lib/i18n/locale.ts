export const locales = ["vi", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";
export const LOCALE_HEADER = "x-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "vi" || value === "de";
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/de" || pathname.startsWith("/de/") ? "de" : "vi";
}

/** Path without a `/de` prefix. `/de` and `/de/` become `/`. */
export function unlocalizedPath(pathname: string): string {
  if (pathname === "/de" || pathname === "/de/") return "/";
  if (pathname.startsWith("/de/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

/**
 * Prefix an internal href for German. External, hash-only, and already
 * prefixed hrefs are left alone. Query and hash are preserved.
 */
export function localePath(locale: Locale, href: string): string {
  if (locale !== "de") return href;
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const hashAt = href.indexOf("#");
  const beforeHash = hashAt === -1 ? href : href.slice(0, hashAt);
  const hash = hashAt === -1 ? "" : href.slice(hashAt);
  const queryAt = beforeHash.indexOf("?");
  const pathname = queryAt === -1 ? beforeHash : beforeHash.slice(0, queryAt);
  const query = queryAt === -1 ? "" : beforeHash.slice(queryAt);

  if (pathname === "/de" || pathname.startsWith("/de/")) return href;
  const prefixed = pathname === "/" || pathname === "" ? "/de" : `/de${pathname}`;
  return `${prefixed}${query}${hash}`;
}

/** Canonical URL plus hreflang alternates. `path` is the unprefixed route. */
export function pageAlternates(locale: Locale, path: string) {
  const clean = unlocalizedPath(path.split("#")[0]?.split("?")[0] || "/");
  const vi = clean || "/";
  const de = vi === "/" ? "/de" : `/de${vi}`;
  return {
    canonical: locale === "de" ? de : vi,
    languages: {
      vi,
      de,
      "x-default": vi,
    },
  };
}

export function openGraphLocale(locale: Locale) {
  return locale === "de" ? "de_DE" : "vi_VN";
}

export function dateLocale(locale: Locale) {
  return locale === "de" ? "de-DE" : "vi-VN";
}
