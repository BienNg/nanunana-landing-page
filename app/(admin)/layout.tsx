import type { Metadata, Viewport } from "next";
import { Document } from "@/components/layout/Document";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0b7793",
  width: "device-width",
  initialScale: 1,
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <Document locale="en">{children}</Document>;
}
