import Link from "next/link";
import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import { site } from "@/content/site";
import { courses } from "@/content/courses";
import { careersHref, privacyHref, sectionIds } from "@/content/nav";
import { VerifyMark } from "@/components/ui/VerifyMark";
import { isVisible } from "@/content/verify";
import { ChatLink } from "@/components/analytics/ChatLink";
import { SocialIcon } from "@/components/icons/SocialIcon";
import { PrefillLink } from "@/components/form/PrefillLink";
import { Logo } from "./Logo";

const linkClass =
  "inline-flex min-h-tap items-center gap-2 text-body-md text-ink-inverse-muted transition-colors hover:text-white md:min-h-9";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-label-sm text-white uppercase">{title}</h2>
      {children}
    </div>
  );
}

export function Footer() {
  // Evaluated at build/render time; the site is rebuilt on every deploy.
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-ink text-ink-inverse-muted">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-gutter">
        <div className="lg:col-span-4">
          <Logo tone="dark" />
          <p className="mt-4 max-w-sm text-body-md">{site.description}</p>
          <p className="mt-2 max-w-sm text-body-sm italic">{site.slogan}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Mạng xã hội">
            {site.socials.map((s) => {
              const className =
                "grid size-tap place-items-center rounded-full bg-white/10 text-[20px] text-white transition-colors [--icon-contrast:var(--color-ink)] hover:bg-brand-teal-dark";
              return (
                <li key={s.id}>
                  {s.id === "zalo" ? (
                    <ChatLink
                      href={s.href}
                      channel="zalo"
                      placement="footer"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={className}
                    >
                      <SocialIcon id={s.id} />
                    </ChatLink>
                  ) : (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={className}
                    >
                      <SocialIcon id={s.id} />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <Column title="Khoá học">
            <ul>
              <li>
                <Link href={`/#${sectionIds.classes}`} className={linkClass}>
                  Lớp đang diễn ra
                </Link>
              </li>
              <li>
                <Link href={`/#${sectionIds.learningApp}`} className={linkClass}>
                  Ứng dụng học tập
                </Link>
              </li>
              {courses.map((c) => (
                <li key={c.id}>
                  <PrefillLink course={c.formValue} className={linkClass}>
                    {c.name}
                  </PrefillLink>
                </li>
              ))}
            </ul>
          </Column>
        </div>

        <div className="lg:col-span-2">
          <Column title="Lộ trình du học">
            <ul>
              <li>
                <Link href={`/#${sectionIds.university}`} className={linkClass}>
                  Du học đại học
                </Link>
              </li>
              <li>
                <Link href={`/#${sectionIds.vocational}`} className={linkClass}>
                  Du học nghề (Ausbildung)
                </Link>
              </li>
              <li>
                <Link href={`/#${sectionIds.processUniversity}`} className={linkClass}>
                  Lộ trình du học đại học
                </Link>
              </li>
              <li>
                <Link href={`/#${sectionIds.processVocational}`} className={linkClass}>
                  Lộ trình du học nghề
                </Link>
              </li>
              <li>
                <Link href={`/#${sectionIds.team}`} className={linkClass}>
                  Đội ngũ
                </Link>
              </li>
              <li>
                <Link href={careersHref} className={linkClass}>
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </Column>
        </div>

        <div className="md:col-span-2 lg:col-span-4">
          <Column title="Thông tin pháp lý & liên hệ">
            <p className="text-label-md text-white">{site.legalName}</p>
            <address className="mt-3 space-y-2 text-body-md not-italic">
              <p className="flex gap-2.5">
                <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-inverse-primary" />
                <span>
                  {site.address.street}, {site.address.city} {site.address.postalCode},{" "}
                  {site.address.country}
                </span>
              </p>
              <p className="flex gap-2.5">
                <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-inverse-primary" />
                <span>
                  {site.addressHanoi.street}, {site.addressHanoi.city}, {site.addressHanoi.country}
                </span>
              </p>
              <p>
                <ChatLink
                  href={site.phone.href}
                  channel="phone"
                  placement="footer"
                  className={`${linkClass} md:min-h-0`}
                >
                  <Phone aria-hidden className="size-4 shrink-0 text-inverse-primary" />
                  {site.phone.display}
                </ChatLink>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className={`${linkClass} md:min-h-0`}>
                  <Mail aria-hidden className="size-4 shrink-0 text-inverse-primary" />
                  {site.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <UserRound aria-hidden className="size-4 shrink-0 text-inverse-primary" />
                Giám đốc: {site.director}
              </p>
            </address>
            <div className="mt-5">
              <p className="text-label-sm text-white uppercase">Văn phòng</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {site.offices.map((o) => (
                  <li
                    key={o.city}
                    className="rounded-full bg-white/10 px-3 py-1 text-label-md text-white"
                  >
                    {o.city}
                  </li>
                ))}
              </ul>
            </div>
          </Column>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-body-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.fullName}. Bảo lưu mọi quyền.
          </p>
          <ul className="flex flex-wrap gap-x-5">
            <li>
              <Link href={privacyHref} className={`${linkClass} text-body-sm`}>
                Chính sách bảo mật
              </Link>
            </li>
            {isVisible(site.license) ? (
              <li className="inline-flex min-h-tap items-center md:min-h-9">
                <VerifyMark claim={site.license} />
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}
