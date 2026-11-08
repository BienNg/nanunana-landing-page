import type { Metadata } from "next";
import SiteLayout from "./(site)/layout";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { ui } from "@/content/ui";
import { getLocale } from "@/lib/i18n/get-locale";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: ui[await getLocale()].notFound.metaTitle,
    robots: { index: false },
  };
}

/** Unmatched URLs render outside the (site) group, so wrap them in the site layout here. */
export default function NotFound() {
  return (
    <SiteLayout>
      <NotFoundContent />
    </SiteLayout>
  );
}
