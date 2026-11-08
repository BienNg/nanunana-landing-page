import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { siteCopy } from "@/content/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { openGraphLocale, pageAlternates } from "@/lib/i18n/locale";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["vietnamese", "latin-ext", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = siteCopy[locale];
  const alternates = pageAlternates(locale, "/");
  return {
    metadataBase: getSiteUrl(),
    title: {
      default: copy.metaTitle,
      template: copy.metaTitleTemplate,
    },
    description: copy.metaDescription,
    applicationName: copy.fullName,
    alternates,
    openGraph: {
      type: "website",
      locale: openGraphLocale(locale),
      alternateLocale: [locale === "de" ? "vi_VN" : "de_DE"],
      url: alternates.canonical,
      siteName: copy.fullName,
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b7793",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={jakarta.variable} data-scroll-behavior="smooth">
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
        {/* Scripts are served by Vercel (they 404 on a local `pnpm start`, which is harmless). */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
