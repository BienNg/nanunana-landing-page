import type { ReactNode } from "react";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { jakarta } from "@/lib/font";
import { setLocale } from "@/lib/i18n/get-locale";
import type { Locale } from "@/lib/i18n/locale";

/** Root document for one language. Each route group has its own root layout. */
export function Document({ locale, children }: { locale: Locale | "en"; children: ReactNode }) {
  if (locale === "vi" || locale === "de") setLocale(locale);
  return (
    <html lang={locale} className={jakarta.variable} data-scroll-behavior="smooth">
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
