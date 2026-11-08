import "server-only";
import { headers } from "next/headers";
import { defaultLocale, isLocale, LOCALE_HEADER, type Locale } from "./locale";

/** Locale set by `proxy.ts` from the public URL. Vietnamese when the header is absent. */
export async function getLocale(): Promise<Locale> {
  const value = (await headers()).get(LOCALE_HEADER);
  return isLocale(value) ? value : defaultLocale;
}
