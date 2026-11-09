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
  setLocale("vi");
  return siteMetadata("vi");
}

export default function VietnameseLayout({ children }: { children: React.ReactNode }) {
  setLocale("vi");
  return (
    <Document locale="vi">
      <SiteLayout>{children}</SiteLayout>
    </Document>
  );
}
