"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import { defaultLocale, localeFromPathname, type Locale } from "@/lib/i18n/locale";

const LocaleContext = createContext<Locale>(defaultLocale);

/**
 * The URL is the source of truth. A cached layout can keep the server
 * locale from the previous page, so client navigations read the path.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = localeFromPathname(usePathname());
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Current page language. Vietnamese when no provider is mounted (admin, dev UI). */
export function useLocale(): Locale {
  return useContext(LocaleContext);
}
