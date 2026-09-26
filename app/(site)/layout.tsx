import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { SkipLink } from "@/components/layout/SkipLink";
import { AttributionCapture } from "@/components/analytics/AttributionCapture";
import { BehaviorTracker } from "@/components/analytics/BehaviorTracker";
import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
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
      <SectionViewTracker />
      <BehaviorTracker />
      <TrackingScripts />
      <OrganizationJsonLd />
    </>
  );
}
