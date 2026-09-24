import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["vietnamese", "latin-ext", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "NaNu NaNa – Du Học Đức | Tiếng Đức A1–C1, Du học đại học & Du học nghề",
    template: "%s | NaNu NaNa – Du Học Đức",
  },
  description:
    "Nhắc đến du học Đức là nhắc đến NaNu NaNa — Chất lượng và sự tử tế. Khoá học tiếng Đức A1–C1, tư vấn du học đại học và du học nghề (Ausbildung) tại Đức.",
  applicationName: "NaNu NaNa – Du Học Đức",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "NaNu NaNa – Du Học Đức",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b7793",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={jakarta.variable}>
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
