import type { Metadata } from "next";
import { Document } from "@/components/layout/Document";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ui } from "@/content/ui";
import { setLocale } from "@/lib/i18n/get-locale";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: ui.vi.notFound.metaTitle,
  robots: { index: false },
};

/** Unmatched URLs outside both language trees. Known misses use the group not-found. */
export default function GlobalNotFound() {
  setLocale("vi");
  return (
    <Document locale="vi">
      <SiteLayout>
        <NotFoundContent />
      </SiteLayout>
    </Document>
  );
}
