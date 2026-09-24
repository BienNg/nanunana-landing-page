import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";
import { JsonLd } from "./JsonLd";

/** EducationalOrganization structured data (rendered on every page). */
export function OrganizationJsonLd() {
  const base = getSiteUrl().origin;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "@id": `${base}/#organization`,
        name: site.fullName,
        legalName: site.legalName,
        alternateName: site.name,
        url: `${base}/`,
        logo: `${base}/brand/logo-full.png`,
        image: `${base}/opengraph-image`,
        description: site.description,
        slogan: site.slogan,
        telephone: site.phone.e164,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          postalCode: site.address.postalCode,
          addressCountry: site.address.countryCode,
        },
        areaServed: ["VN", "DE"],
        knowsLanguage: ["vi", "de"],
        founder: { "@type": "Person", name: site.director },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone.e164,
          email: site.email,
          contactType: "customer service",
          availableLanguage: ["Vietnamese", "German"],
        },
        sameAs: site.socials.map((s) => s.href),
      }}
    />
  );
}
