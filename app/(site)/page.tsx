import { sectionIds } from "@/content/nav";
import { cn } from "@/lib/cn";

/*
 * Phase 3: section anchors only. Each stub is replaced by its real section
 * component in Phase 4.
 */
function Stub({
  id,
  title,
  tone = "light",
  className,
}: {
  id: string;
  title: string;
  tone?: "light" | "alt" | "dark";
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "section-y",
        tone === "alt" && "bg-white",
        tone === "dark" && "bg-inverse-surface text-white",
        className,
      )}
    >
      <div className="container-page">
        <h2 id={`${id}-title`} className="text-headline-xl-mobile md:text-headline-xl">
          {title}
        </h2>
        <p className={cn("mt-2", tone === "dark" ? "text-inverse-on-surface" : "text-ink-muted")}>
          #{id} — nội dung sẽ được xây dựng ở Phase 4.
        </p>
        <div className="mt-6 h-64 rounded-card border border-dashed border-border-control" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <section id={sectionIds.hero} aria-labelledby="hero-title" className="section-y">
        <div className="container-page">
          <h1
            id="hero-title"
            className="text-display-hero-mobile text-brand-teal-dark md:text-display-hero"
          >
            NANU NANA
            <br />
            <span className="text-ink">DU HỌC ĐỨC</span>
          </h1>
          <p className="mt-4 max-w-xl text-body-lg text-ink-muted">
            Nhắc đến du học Đức là nhắc đến NaNu NaNa — Chất lượng và sự tử tế
          </p>
          <div className="mt-6 h-72 rounded-media border border-dashed border-border-control" />
        </div>
      </section>

      <div id={sectionIds.about}>
        <Stub id="thanh-tich" title="Stats" tone="alt" className="!py-10" />
        <Stub id={sectionIds.founder} title="Phương — Người sáng lập" />
      </div>
      <Stub id={sectionIds.courses} title="Khoá Học" tone="alt" />
      <div id={sectionIds.pathways}>
        <Stub id={sectionIds.university} title="Du Học Đại Học" />
        <Stub id={sectionIds.vocational} title="Du Học Nghề (Ausbildung)" />
      </div>
      <Stub id={sectionIds.process} title="Lộ trình cùng NaNu NaNa" tone="alt" />
      <Stub id={sectionIds.team} title="Unser Team" />
      <Stub id={sectionIds.testimonials} title="Cảm nhận học viên" tone="alt" />
      <Stub id={sectionIds.gallery} title="Hành Trình Chinh Phục Giấc Mơ Đức" />
      <Stub id={sectionIds.faq} title="Câu hỏi thường gặp" tone="alt" />
      <Stub id={sectionIds.contact} title="Liên hệ ngay" tone="dark" />
    </>
  );
}
