import Link from "next/link";
import { siteCopy } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";
import { localePath, type Locale } from "@/lib/i18n/locale";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({
  locale,
  items,
}: {
  locale: Locale;
  items: { name: string; path: string }[];
}) {
  const base = getSiteUrl().origin;
  const trail = [{ name: siteCopy[locale].homeLabel, path: "/" }, ...items];
  return (
    <>
      <nav
        aria-label={locale === "de" ? "Brotkrumennavigation" : "Đường dẫn trang"}
        className="container-page py-4 text-body-sm text-ink-muted"
      >
        <ol className="flex flex-wrap items-center gap-2">
          {trail.map((item, index) => (
            <li key={item.path} className="inline-flex items-center gap-2">
              {index > 0 && <span aria-hidden>/</span>}
              {index === trail.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link
                  className="inline-flex min-h-9 items-center text-brand-teal-dark hover:underline"
                  href={localePath(locale, item.path)}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${base}${localePath(locale, item.path)}`,
          })),
        }}
      />
    </>
  );
}
