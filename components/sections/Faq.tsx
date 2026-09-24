import { faqs, faqSection } from "@/content/faq";
import { sectionIds } from "@/content/nav";
import { isVisible } from "@/content/verify";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqList } from "./FaqList";

/** Hidden until at least one answer is confirmed. JSON-LD only includes confirmed answers. */
export function Faq() {
  const visible = faqs.filter((f) => isVisible(f.answer));
  if (visible.length === 0) return null;
  const confirmed = faqs.filter((f) => f.answer.status === "ok");

  return (
    <Section id={sectionIds.faq} tone="white">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          id={`${sectionIds.faq}-title`}
          eyebrow={faqSection.eyebrow}
          title={faqSection.title}
          intro={faqSection.intro}
        />
        <FaqList
          items={visible.map((f) => ({
            id: f.id,
            question: f.question,
            answer: f.answer.value,
            verifyNote: f.answer.status === "verify" ? f.answer.note : undefined,
          }))}
        />
        {confirmed.length > 0 ? (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: confirmed.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer.value },
              })),
            }}
          />
        ) : null}
      </div>
    </Section>
  );
}
