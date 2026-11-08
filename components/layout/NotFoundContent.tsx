import { ArrowLeft } from "lucide-react";
import { contactHref } from "@/content/nav";
import { ui } from "@/content/ui";
import { LinkButton } from "@/components/ui/Button";
import { getLocale } from "@/lib/i18n/get-locale";

export async function NotFoundContent() {
  const copy = ui[await getLocale()].notFound;
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center section-y text-center">
      <p className="text-label-sm text-brand-teal-dark uppercase">{copy.eyebrow}</p>
      <h1 className="mt-3 text-headline-xl-mobile text-ink md:text-headline-xl">{copy.title}</h1>
      <p className="mt-3 max-w-md text-body-md text-ink-muted">{copy.body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/" variant="outline">
          <ArrowLeft aria-hidden /> {copy.home}
        </LinkButton>
        <LinkButton href={contactHref}>{copy.contact}</LinkButton>
      </div>
    </div>
  );
}
