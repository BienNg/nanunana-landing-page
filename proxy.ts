import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_HEADER, localeFromPathname } from "@/lib/i18n/locale";

/**
 * Sets the locale for the rest of the render. Vietnamese stays on the
 * unprefixed URLs; German is anything under `/de`. No language redirect.
 */
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, localeFromPathname(request.nextUrl.pathname));
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|admin|dev|_next/static|_next/image|.*\\..*).*)"],
};
