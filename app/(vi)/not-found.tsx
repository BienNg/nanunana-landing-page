import type { Metadata } from "next";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { ui } from "@/content/ui";

export const metadata: Metadata = {
  title: ui.vi.notFound.metaTitle,
  robots: { index: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
