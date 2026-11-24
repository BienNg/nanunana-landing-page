import { aboutSummary } from "@/content/about-summary";
import { getLocale } from "@/lib/i18n/get-locale";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "What is NaNu NaNa": short definition on the left, company facts on the right. */
export async function AboutSummary() {
  const locale = await getLocale();
  const copy = aboutSummary[locale];
  return (
    <Section id="nanu-nana-la-gi">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-gutter">
        <div className="lg:col-span-5">
          <SectionHeading
            id="nanu-nana-la-gi-title"
            align="left"
            eyebrow={copy.eyebrow}
            title={copy.title}
            className="mb-0"
            intro={<p>{copy.body}</p>}
          />
        </div>
        <dl className="divide-y divide-border-subtle rounded-card bg-white px-6 shadow-tier-2 lg:col-span-7">
          {copy.facts.map((f) => (
            <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-4">
              <dt className="text-label-md text-brand-teal-dark">{f.label}</dt>
              <dd className="text-body-md text-ink sm:col-span-2">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
