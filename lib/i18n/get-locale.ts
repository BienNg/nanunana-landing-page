import "server-only";
import { cache } from "react";
import { defaultLocale, type Locale } from "./locale";

const requestLocale = cache((): { current: Locale } => ({ current: defaultLocale }));

/**
 * Pin the language for this render. Call it from a layout or page.
 * Reading the request headers would make every page uncacheable.
 */
export function setLocale(locale: Locale) {
  requestLocale().current = locale;
}

/** Language of the current page. Vietnamese until a layout or page sets it. */
export async function getLocale(): Promise<Locale> {
  return requestLocale().current;
}
