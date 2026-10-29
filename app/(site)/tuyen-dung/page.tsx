import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Mail, MapPin } from "lucide-react";
import { applyHref, careerHref, careers, openRoles as getOpenRoles } from "@/content/careers";
import { isVisible } from "@/content/verify";
import { AnchorButton, LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { VerifyMark } from "@/components/ui/VerifyMark";

export const metadata: Metadata = {
  title: "Tuyển Dụng",
  description: careers.intro,
  alternates: { canonical: "/tuyen-dung" },
};

export default function CareersPage() {
  const openRoles = getOpenRoles();

  return (
    <>
      <section className="border-b border-border-subtle bg-white">
        <div className="container-page py-14 md:py-20">
          <Badge>
            <Briefcase aria-hidden /> Gia nhập NaNu NaNa
          </Badge>
          <h1 className="mt-4 text-display-hero-mobile text-ink md:text-display-hero">
            {careers.title}
          </h1>
          <p className="mt-4 max-w-2xl text-body-lg text-ink-muted">{careers.intro}</p>
        </div>
      </section>

      <section aria-labelledby="vi-tri" className="section-y">
        <div className="container-page">
          <h2 id="vi-tri" className="text-headline-lg text-ink">
            Vị trí đang tuyển
          </h2>
          {openRoles.length === 0 ? (
            <p className="mt-4 max-w-2xl text-body-md text-ink-muted">{careers.noOpenRoles}</p>
          ) : null}
          <ul className="mt-6 grid gap-gutter-mobile md:grid-cols-2 md:gap-gutter">
            {openRoles.map((role) => (
              <li key={role.slug}>
                <Card tier={1} interactive className="flex h-full flex-col">
                  <h3 className="text-headline-md text-ink">
                    <Link href={careerHref(role.slug)} className="hover:text-teal">
                      {role.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-body-sm text-ink-subtle">
                    <VerifyMark claim={role.type} />
                    {isVisible(role.location) ? (
                      <span className="inline-flex items-center gap-1">
                        <MapPin aria-hidden className="size-3.5" />
                        <VerifyMark claim={role.location} />
                      </span>
                    ) : null}
                  </p>
                  <VerifyMark claim={role.summary} as="div" className="mt-3">
                    {(s) => <p className="text-body-md text-ink-muted">{s}</p>}
                  </VerifyMark>
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <LinkButton href={careerHref(role.slug)} variant="outline">
                      Xem chi tiết <ArrowRight aria-hidden />
                    </LinkButton>
                    <AnchorButton
                      href={applyHref(role)}
                      variant="primary"
                      apply={{ role: role.slug, placement: "role_list" }}
                    >
                      <Mail aria-hidden /> Gửi CV
                    </AnchorButton>
                  </div>
                </Card>
              </li>
            ))}
          </ul>

          <Card
            tier={2}
            className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 className="text-headline-sm text-ink">Chưa thấy vị trí phù hợp?</h2>
              <p className="mt-1 max-w-xl text-body-md text-ink-muted">{careers.applyHowTo}</p>
            </div>
            <AnchorButton
              href={applyHref()}
              variant="primary"
              className="shrink-0"
              apply={{ role: "general", placement: "general" }}
            >
              <Mail aria-hidden /> {careers.applyEmail}
            </AnchorButton>
          </Card>
        </div>
      </section>
    </>
  );
}
