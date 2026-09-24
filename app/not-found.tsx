import type { Metadata } from "next";
import SiteLayout from "./(site)/layout";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  robots: { index: false },
};

/** Unmatched URLs render outside the (site) group, so wrap them in the site layout here. */
export default function NotFound() {
  return (
    <SiteLayout>
      <NotFoundContent />
    </SiteLayout>
  );
}
