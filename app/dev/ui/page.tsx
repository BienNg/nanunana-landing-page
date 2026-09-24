import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Check, Phone, ShieldCheck } from "lucide-react";
import { AnchorButton, Button, LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CourseBadge, type CourseLevel } from "@/components/ui/CourseBadge";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Checkbox, Input, RadioGroup, Select, Textarea } from "@/components/ui/controls";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerifyMark } from "@/components/ui/VerifyMark";
import {
  FacebookIcon,
  InstagramIcon,
  MessengerIcon,
  TikTokIcon,
  WhatsAppIcon,
  YouTubeIcon,
  ZaloIcon,
} from "@/components/icons/brand";
import { ok, verify } from "@/content/verify";

export const metadata: Metadata = {
  title: "UI primitives",
  robots: { index: false, follow: false },
};

const levels: CourseLevel[] = ["A1", "A2", "B1", "B2", "C1", "GT"];

const swatches = [
  ["coral-fill", "bg-coral-fill"],
  ["accent-coral", "bg-accent-coral"],
  ["brand-teal-dark", "bg-brand-teal-dark"],
  ["teal", "bg-teal"],
  ["brand-teal-light", "bg-brand-teal-light"],
  ["primary", "bg-primary"],
  ["ink", "bg-ink"],
  ["inverse-surface", "bg-inverse-surface"],
  ["ink-muted", "bg-ink-muted"],
  ["surface-canvas", "bg-surface-canvas"],
  ["surface-card-subtle", "bg-surface-card-subtle"],
  ["border-subtle", "bg-border-subtle"],
  ["trust-emerald", "bg-trust-emerald"],
  ["surface-container-low", "bg-surface-container-low"],
] as const;

const typeScale = [
  ["display-hero", "text-display-hero"],
  ["display-hero-mobile", "text-display-hero-mobile"],
  ["headline-xl", "text-headline-xl"],
  ["headline-xl-mobile", "text-headline-xl-mobile"],
  ["headline-lg", "text-headline-lg"],
  ["headline-md", "text-headline-md"],
  ["headline-sm", "text-headline-sm"],
  ["body-lg", "text-body-lg"],
  ["body-md", "text-body-md"],
  ["body-sm", "text-body-sm"],
  ["label-lg", "text-label-lg"],
  ["label-md", "text-label-md"],
  ["label-sm", "text-label-sm uppercase"],
] as const;

const sample = "Du Học Đức — Nghề điều dưỡng, Zulassung & Goethe-Zertifikat: ä ö ü ß ỹ ự ặ ẫ";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border-subtle py-10">
      <h2 className="mb-6 text-headline-md">{title}</h2>
      {children}
    </section>
  );
}

export default function DevUiPage() {
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SHOW_DEV_UI !== "1") {
    notFound();
  }

  return (
    <main className="container-page py-12">
      <h1 className="text-display-hero-mobile md:text-display-hero">UI primitives</h1>
      <p className="mt-2 text-ink-muted">
        Internal page — tokens from <code>docs/DESIGN.md</code>. Hidden in production.
      </p>

      <Block title="Colors">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {swatches.map(([name, cls]) => (
            <div key={name} className="text-body-sm">
              <div className={`h-16 rounded-control border border-border-subtle ${cls}`} />
              <p className="mt-1.5">{name}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Typography (Plus Jakarta Sans — Vietnamese + umlauts)">
        <div className="space-y-5">
          {typeScale.map(([name, cls]) => (
            <div key={name}>
              <p className="text-label-sm text-ink-subtle uppercase">{name}</p>
              <p className={cls}>{sample}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button>
            Đăng Ký Tư Vấn Miễn Phí <ArrowRight />
          </Button>
          <Button variant="secondary">
            <BookOpen /> Khám Phá Các Khóa Học
          </Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <LinkButton href="#form-demo" variant="secondary">
            LinkButton
          </LinkButton>
          <AnchorButton href="tel:+84862934989" variant="outline">
            <Phone /> Gọi Hotline
          </AnchorButton>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 rounded-card bg-ink p-6">
          <Button>Primary on dark</Button>
          <Button variant="inverse">Inverse</Button>
        </div>
      </Block>

      <Block title="Badges">
        <div className="flex flex-wrap gap-3">
          {levels.map((l) => (
            <CourseBadge key={l} level={l} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Badge>Teal</Badge>
          <Badge tone="coral">Mục Tiêu Du Học</Badge>
          <Badge tone="emerald">
            <ShieldCheck aria-hidden /> Emerald
          </Badge>
          <Badge tone="neutral">Neutral</Badge>
          <span className="rounded-card bg-ink p-2">
            <Badge tone="inverse">Inverse</Badge>
          </span>
        </div>
      </Block>

      <Block title="Cards (elevation tiers)">
        <div className="grid gap-6 md:grid-cols-3">
          {([1, 2, 3] as const).map((t) => (
            <Card key={t} tier={t} interactive={t === 1}>
              <CourseBadge level="B1" />
              <h3 className="mt-3 text-headline-sm">Tier {t}</h3>
              <p className="mt-2 text-ink-muted">
                {t === 1
                  ? "Passive / interactive hover"
                  : t === 2
                    ? "Consultation modules"
                    : "Floating"}
              </p>
              <ul className="mt-3 space-y-1.5">
                <li className="flex gap-2">
                  <Check aria-hidden className="size-5 text-teal" /> Teal checkmark item
                </li>
              </ul>
            </Card>
          ))}
        </div>
      </Block>

      <Block title="Form controls">
        <form id="form-demo" className="grid max-w-2xl gap-5 md:grid-cols-2">
          <Field id="demo-name" label="Họ và tên" required>
            <Input id="demo-name" name="name" placeholder="Nguyễn Văn A" autoComplete="name" />
          </Field>
          <Field
            id="demo-phone"
            label="Số điện thoại / Zalo"
            required
            error="Vui lòng nhập số điện thoại hợp lệ, ví dụ 0988 123 456"
          >
            <Input
              id="demo-phone"
              type="tel"
              aria-invalid
              aria-describedby="demo-phone-error"
              defaultValue="12345"
            />
          </Field>
          <Field id="demo-email" label="Email" hint="Chúng tôi không gửi spam.">
            <Input id="demo-email" type="email" aria-describedby="demo-email-hint" />
          </Field>
          <Field id="demo-course" label="Khóa học / trình độ quan tâm" required>
            <Select id="demo-course" defaultValue="">
              <option value="" disabled>
                Chọn khóa học
              </option>
              {levels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </Select>
          </Field>
          <RadioGroup
            className="md:col-span-2"
            name="demo-channel"
            legend="Liên hệ qua"
            defaultValue="zalo"
            options={[
              { value: "zalo", label: "Zalo", icon: <ZaloIcon /> },
              { value: "phone", label: "Gọi điện", icon: <Phone /> },
              { value: "messenger", label: "Messenger", icon: <MessengerIcon /> },
              { value: "email", label: "Email" },
            ]}
          />
          <Field id="demo-msg" label="Mong muốn khác / câu hỏi" className="md:col-span-2">
            <Textarea id="demo-msg" maxLength={1000} />
          </Field>
          <Checkbox id="demo-consent" className="md:col-span-2">
            Tôi đồng ý để NaNu NaNa liên hệ và xử lý thông tin theo{" "}
            <a className="font-semibold text-brand-teal-dark underline" href="/chinh-sach-bao-mat">
              Chính sách bảo mật
            </a>
            .
          </Checkbox>
        </form>
      </Block>

      <Block title="Icons">
        <div className="flex flex-wrap items-center gap-5 text-[28px] text-brand-teal-dark">
          <ZaloIcon />
          <MessengerIcon />
          <WhatsAppIcon />
          <FacebookIcon />
          <TikTokIcon />
          <YouTubeIcon />
          <InstagramIcon />
        </div>
      </Block>

      <Block title="Section heading & VERIFY marker">
        <SectionHeading
          eyebrow="Chọn lựa tương lai"
          title="Hai con đường vững chắc tới nước Đức"
          intro="Intro text in body-lg, muted."
        />
        <p className="text-headline-lg">
          <VerifyMark claim={verify("1.000+", "Số học viên thực tế?")} /> học viên ·{" "}
          <VerifyMark claim={ok("11 năm")} /> ở Đức
        </p>
      </Block>
    </main>
  );
}
