import { locationHref } from "@/content/locations";
import { officeAddresses } from "@/lib/seo/structured-data";
import { site, siteFor } from "@/content/site";
import { getLocale } from "@/lib/i18n/get-locale";
import { localePath } from "@/lib/i18n/locale";
import { getSiteUrl } from "@/lib/site-url";
import { JsonLd } from "./JsonLd";

/** EducationalOrganization structured data (rendered on every page). */
export async function OrganizationJsonLd() {
  const locale = await getLocale();
  const brand = siteFor(locale);
  const base = getSiteUrl().origin;
  const home = localePath(locale, "/");
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "@id": `${base}/#organization`,
        name: brand.fullName,
        legalName: site.legalName,
        alternateName: site.name,
        url: `${base}${home}`,
        logo: `${base}/brand/logo-full.png`,
        image: `${base}/opengraph-image`,
        description: brand.description,
        slogan: brand.slogan,
        telephone: site.phone.e164,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          postalCode: site.address.postalCode,
          addressCountry: site.address.countryCode,
        },
        department: officeAddresses().map((address, index) => ({
          "@type": "EducationalOrganization",
          "@id": `${base}/#office-${index === 0 ? "hcm" : "hanoi"}`,
          name: `${site.name} – ${address.addressLocality}`,
          url: `${base}${localePath(locale, locationHref(index === 0 ? "ho-chi-minh" : "ha-noi"))}`,
          address,
          telephone: site.phone.e164,
          parentOrganization: { "@id": `${base}/#organization` },
        })),
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
