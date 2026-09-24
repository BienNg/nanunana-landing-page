import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { SkipLink } from "@/components/layout/SkipLink";
import { AttributionCapture } from "@/components/analytics/AttributionCapture";
import { TrackingScripts } from "@/components/analytics/TrackingScripts";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="noi-dung" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <MobileCtaBar />
      <AttributionCapture />
      <TrackingScripts />
      <OrganizationJsonLd />
    </>
  );
}
