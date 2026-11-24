import type { Metadata } from "next";
import { ArrowLeft, CircleCheck, Mail } from "lucide-react";
import { applicationRoleLabel, applyHref, careersContent } from "@/content/careers";
import { ApplicationTracker } from "@/components/analytics/ApplicationTracker";
import { AnchorButton, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getLocale } from "@/lib/i18n/get-locale";

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: careersContent(locale).success.metaTitle,
    robots: { index: false, follow: false },
  };
}

/** Success page after a job application. ?vi-tri= carries the position only. */
export default async function ApplicationSentPage({ searchParams }: Props) {
  const locale = await getLocale();
  const careers = careersContent(locale);
  const copy = careers.success;
  const param = (await searchParams)["vi-tri"];
  const value = typeof param === "string" ? param : undefined;
  const roleLabel = applicationRoleLabel(locale, value);
  const role = roleLabel ? value! : "";

  return (
    <section className="section-y">
      <ApplicationTracker role={role} />
      <div className="container-page max-w-2xl">
        <Card tier={2} className="flex flex-col items-center py-10 text-center md:py-14">
          <span className="grid size-16 place-items-center rounded-full bg-badge-comm text-trust-emerald-text">
            <CircleCheck aria-hidden className="size-9" />
          </span>
          <h1 className="mt-5 text-headline-lg text-ink">{copy.title}</h1>
          {roleLabel ? (
            <p className="mt-3 text-body-md text-ink">
              <span className="text-ink-subtle">{copy.roleLabel}</span>{" "}
              <strong className="font-semibold">{roleLabel}</strong>
            </p>
          ) : null}
          <p className="mt-4 max-w-md text-body-lg text-ink-muted">{copy.body}</p>
          <p className="mt-3 max-w-md text-body-md font-semibold text-ink">{copy.spam}</p>
          <p className="mt-6 max-w-md text-body-md text-ink-muted">{copy.fallback}</p>
          <AnchorButton
            href={applyHref(locale, roleLabel ? { title: roleLabel } : undefined)}
            variant="outline"
            className="mt-3"
          >
            <Mail aria-hidden /> {careers.applyEmail}
          </AnchorButton>
          <LinkButton href="/tuyen-dung" variant="ghost" size="sm" className="mt-8">
            <ArrowLeft aria-hidden /> {copy.back}
          </LinkButton>
        </Card>
      </div>
    </section>
  );
}
