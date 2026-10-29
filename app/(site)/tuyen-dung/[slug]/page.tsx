import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, Check, Mail, MapPin, X } from "lucide-react";
import {
  applyHref,
  applySubject,
  careerHref,
  careers,
  openRoles,
  type RoleItem,
  type RoleSection,
} from "@/content/careers";
import { claimValue, isVisible } from "@/content/verify";
import { AnchorButton, LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { VerifyMark } from "@/components/ui/VerifyMark";
import { FaqList } from "@/components/sections/FaqList";
import { ApplyLink } from "@/components/analytics/ApplyLink";
import type { ApplyPlacement } from "@/lib/analytics";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return openRoles().map((role) => ({ slug: role.slug }));
}

function findRole(slug: string) {
  return openRoles().find((role) => role.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const role = findRole((await params).slug);
  if (!role) return {};
  return {
    title: `${role.title} · Tuyển Dụng`,
    description: claimValue(role.summary, careers.intro),
    alternates: { canonical: careerHref(role.slug) },
  };
}

function CheckList({ items }: { items: RoleItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const text = typeof item === "string" ? item : item.text;
        return (
          <li key={text} className="flex gap-2 text-body-md text-ink">
            <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-teal" />
            <span>
              {text}
              {typeof item === "string" ? null : (
                <Badge className="ml-2 align-middle">{item.tag}</Badge>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function RoleSectionBlock({ section }: { section: RoleSection }) {
  if (!isVisible(section.intro) && !isVisible(section.items) && !isVisible(section.crossedOut)) {
    return null;
  }
  return (
    <div>
      <h2 className="text-headline-md text-ink">{section.heading}</h2>
      <VerifyMark claim={section.intro} as="div" className="mt-3">
        {(text) => <p className="text-body-md text-ink-muted">{text}</p>}
      </VerifyMark>
      <VerifyMark claim={section.items} as="div" className="mt-4">
        {(items) => <CheckList items={items} />}
      </VerifyMark>
      <VerifyMark claim={section.crossedOut} as="div" className="mt-5">
        {(items) => (
          <>
            <p className="text-label-md font-semibold text-ink-subtle">{section.crossedOutLabel}</p>
            <ul className="mt-2 space-y-2">
              {items.map((item) => (
                <li key={item} className="flex gap-2 text-body-md text-ink-subtle">
                  <X aria-hidden className="mt-0.5 size-5 shrink-0" />
                  <s>{item}</s>
                </li>
              ))}
            </ul>
          </>
        )}
      </VerifyMark>
    </div>
  );
}

export default async function CareerRolePage({ params }: Props) {
  const role = findRole((await params).slug);
  if (!role) notFound();

  const apply = (placement: ApplyPlacement) => (
    <AnchorButton
      href={applyHref(role)}
      variant="primary"
      className="shrink-0"
      apply={{ role: role.slug, placement }}
    >
      <Mail aria-hidden /> Gửi CV qua email
    </AnchorButton>
  );
  const facts = role.facts?.filter((f) => isVisible(f.value)) ?? [];
  const faq = role.faq?.filter((f) => isVisible(f.a)) ?? [];

  return (
    <>
      <section className="border-b border-border-subtle bg-white">
        <div className="container-page py-14 md:py-20">
          <LinkButton href="/tuyen-dung" variant="ghost" size="sm">
            <ArrowLeft aria-hidden /> Tất cả vị trí
          </LinkButton>
          <Badge className="mt-6">
            <Briefcase aria-hidden /> Tuyển dụng
          </Badge>
          <h1 className="mt-4 text-display-hero-mobile text-ink md:text-display-hero">
            {role.title}
          </h1>
          {facts.length === 0 ? (
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-body-md text-ink-subtle">
              <VerifyMark claim={role.type} />
              {isVisible(role.location) ? (
                <span className="inline-flex items-center gap-1">
                  <MapPin aria-hidden className="size-4" />
                  <VerifyMark claim={role.location} />
                </span>
              ) : null}
            </p>
          ) : null}
          <VerifyMark claim={role.summary} as="div" className="mt-4">
            {(s) => <p className="max-w-2xl text-body-lg text-ink-muted">{s}</p>}
          </VerifyMark>
          {facts.length > 0 ? (
            <dl className="mt-8 grid max-w-3xl gap-x-8 gap-y-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-label-md text-ink-subtle">{fact.label}</dt>
                  <dd className="mt-1 text-body-md font-semibold text-ink">
                    <VerifyMark claim={fact.value} />
                  </dd>
                </div>
              ))}
              <div>
                <dt className="text-label-md text-ink-subtle">Liên hệ</dt>
                <dd className="mt-1 text-body-md font-semibold text-ink">
                  <ApplyLink
                    href={applyHref(role)}
                    role={role.slug}
                    placement="role_contact"
                    className="underline underline-offset-2 hover:text-teal"
                  >
                    {careers.applyEmail}
                  </ApplyLink>
                </dd>
              </div>
            </dl>
          ) : null}
          <div className="mt-8">{apply("role_header")}</div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page max-w-3xl space-y-12">
          <div>
            <h2 className="text-headline-md text-ink">{careers.about.heading}</h2>
            <p className="mt-3 text-body-md text-ink-muted">{careers.about.text}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-body-md text-ink">
              {careers.about.offices.map((city) => (
                <span key={city} className="inline-flex items-center gap-1">
                  <MapPin aria-hidden className="size-4 text-teal" /> {city}
                </span>
              ))}
            </p>
            <p className="mt-3 text-body-md font-semibold text-ink italic">
              {careers.about.slogan}
            </p>
          </div>

          {role.sections.map((section) => (
            <RoleSectionBlock key={section.heading} section={section} />
          ))}

          {role.application ? (
            <Card tier={2}>
              <h2 className="text-headline-md text-ink">Ứng tuyển</h2>
              <VerifyMark claim={role.application.send} as="div" className="mt-4">
                {(items) => (
                  <>
                    <p className="text-label-md font-semibold text-ink-subtle">Hồ sơ cần gửi</p>
                    <div className="mt-2">
                      <CheckList items={items} />
                    </div>
                  </>
                )}
              </VerifyMark>
              <div className="mt-5 text-body-md text-ink">
                <p className="text-label-md font-semibold text-ink-subtle">Gửi đến</p>
                <p className="mt-1">{careers.applyEmail}</p>
                <p className="mt-3 text-label-md font-semibold text-ink-subtle">Tiêu đề email</p>
                <p className="mt-1 font-mono text-body-sm">{applySubject(role)}</p>
              </div>
              <VerifyMark claim={role.application.steps} as="div" className="mt-5">
                {(steps) => (
                  <>
                    <p className="text-label-md font-semibold text-ink-subtle">Quy trình</p>
                    <ol className="mt-3 grid gap-3 sm:grid-cols-2">
                      {steps.map((step, i) => (
                        <li key={step} className="flex items-start gap-3 text-body-md text-ink">
                          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-teal-dark text-label-md font-semibold text-white">
                            {i + 1}
                          </span>
                          <span className="pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </VerifyMark>
              <div className="mt-6">{apply("role_footer")}</div>
            </Card>
          ) : (
            <Card
              tier={2}
              className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="text-headline-sm text-ink">Ứng tuyển vị trí này</h2>
                <p className="mt-1 max-w-xl text-body-md text-ink-muted">
                  {careers.roleApplyHowTo}
                </p>
              </div>
              {apply("role_footer")}
            </Card>
          )}

          {faq.length > 0 ? (
            <div>
              <h2 className="text-headline-md text-ink">Câu hỏi thường gặp</h2>
              <div className="mt-4">
                <FaqList
                  items={faq.map((f, i) => ({
                    id: `${role.slug}-faq-${i}`,
                    question: f.q,
                    answer: f.a.value,
                    verifyNote: f.a.status === "verify" ? f.a.note : undefined,
                  }))}
                />
              </div>
            </div>
          ) : null}

          <p className="border-t border-border-subtle pt-6 text-body-sm text-ink-subtle">
            {careers.equalOpportunity}
          </p>
        </div>
      </section>
    </>
  );
}
