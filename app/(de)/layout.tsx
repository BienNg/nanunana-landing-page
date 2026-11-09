import type { Viewport } from "next";
import { Document } from "@/components/layout/Document";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { setLocale } from "@/lib/i18n/get-locale";
import { siteMetadata } from "@/lib/i18n/site-metadata";
import "../globals.css";

export const viewport: Viewport = {
  themeColor: "#0b7793",
  width: "device-width",
  initialScale: 1,
};

export function generateMetadata() {
  setLocale("de");
  return siteMetadata("de");
}

export default function GermanLayout({ children }: { children: React.ReactNode }) {
  setLocale("de");
  return (
    <Document locale="de">
      <SiteLayout>{children}</SiteLayout>
    </Document>
  );
}
