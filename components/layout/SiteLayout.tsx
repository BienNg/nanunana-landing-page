import { PrivacyPreferences } from "@/components/analytics/PrivacyPreferences";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { SkipLink } from "@/components/layout/SkipLink";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { TrackingScripts } from "@/components/analytics/TrackingScripts";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <SkipLink />
      <Header />
      <main id="noi-dung" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <MobileCtaBar />
      <PrivacyPreferences />
      <TrackingScripts />
      <OrganizationJsonLd />
    </LocaleProvider>
  );
}
