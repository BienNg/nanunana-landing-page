import type { Metadata } from "next";
import { Briefcase, Check, Mail, MapPin } from "lucide-react";
import { careers } from "@/content/careers";
import { isVisible } from "@/content/verify";
import { AnchorButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { VerifyMark } from "@/components/ui/VerifyMark";

export const metadata: Metadata = {
  title: "Tuyển Dụng",
  description: careers.intro,
  alternates: { canonical: "/tuyen-dung" },
};

function applyHref(roleTitle?: string) {
  const subject = `${careers.applySubjectPrefix} ${roleTitle ?? "Ứng tuyển tự do"}`;
  return `mailto:${careers.applyEmail}?subject=${encodeURIComponent(subject)}`;
}

export default function CareersPage() {
  const openRoles = careers.roles.filter((r) => isVisible(r.open) && r.open.value);

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
              <li key={role.id}>
                <Card tier={1} interactive className="flex h-full flex-col">
                  <h3 className="text-headline-md text-ink">
                    <VerifyMark claim={role.open}>{() => role.title}</VerifyMark>
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
                  <VerifyMark claim={role.requirements} as="div" className="mt-4">
                    {(items) => (
                      <ul className="space-y-2">
                        {items.map((r) => (
                          <li key={r} className="flex gap-2 text-body-md text-ink">
                            <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-teal" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}
                  </VerifyMark>
                  <div className="mt-auto pt-6">
                    <AnchorButton href={applyHref(role.title)} variant="secondary">
                      <Mail aria-hidden /> Ứng tuyển vị trí này
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
            <AnchorButton href={applyHref()} variant="primary" className="shrink-0">
              <Mail aria-hidden /> {careers.applyEmail}
            </AnchorButton>
          </Card>
        </div>
      </section>
    </>
  );
}
