import type { Metadata } from "next";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { ui } from "@/content/ui";
import { setLocale } from "@/lib/i18n/get-locale";

export function generateMetadata(): Metadata {
  setLocale("de");
  return {
    title: ui.de.notFound.metaTitle,
    robots: { index: false },
  };
}

export default function NotFound() {
  setLocale("de");
  return <NotFoundContent />;
}
