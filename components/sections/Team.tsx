import { supportTeam, team, teamSection, type TeamMember } from "@/content/team";
import { sectionIds } from "@/content/nav";
import { Avatar } from "@/components/ui/Avatar";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Bio({ lines }: { lines: string[] }) {
  return (
    <ul className="space-y-1.5 text-left text-body-sm text-ink-muted">
      {lines.map((l) => (
        <li key={l} className="flex gap-2">
          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-teal" />
          {l}
        </li>
      ))}
    </ul>
  );
}

function MemberCard({ m }: { m: TeamMember }) {
  return (
    <article className="flex h-full flex-col items-center rounded-card border border-border-subtle bg-white p-space-lg text-center shadow-tier-1">
      <Avatar name={m.name} photo={m.photo} alt={m.alt} size={88} />
      <h3 className="mt-4 text-headline-sm text-ink">{m.name}</h3>
      <p className="mt-1 rounded-full bg-surface-container-low px-3 py-0.5 text-label-md text-brand-teal-dark">
        {m.role}
      </p>
      {m.location ? (
        <p lang="de" className="mt-2 text-label-sm text-ink-subtle">
          {m.location}
        </p>
      ) : null}
      {m.quote ? (
        <blockquote className="mt-3 w-full space-y-1 text-left text-body-sm text-ink-muted italic">
          {m.quote.map((line) => (
            <p key={line.text} lang={line.lang}>
              {line.text}
            </p>
          ))}
        </blockquote>
      ) : null}
      <div className="mt-4 w-full">
        <Bio lines={m.bio} />
      </div>
    </article>
  );
}

export function Team() {
  return (
    <Section id={sectionIds.team}>
      <SectionHeading
        id={`${sectionIds.team}-title`}
        eyebrow={teamSection.eyebrow}
        title={<span lang="de">{teamSection.title}</span>}
        intro={teamSection.intro}
      />
      <ul className="grid gap-gutter-mobile sm:grid-cols-2 md:gap-gutter lg:grid-cols-3 xl:grid-cols-5">
        {team.map((m) => (
          <li key={m.id}>
            <MemberCard m={m} />
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <h3 className="text-center text-label-sm text-ink-subtle uppercase">
          {teamSection.supportTitle}
        </h3>
        <ul className="mt-5 grid gap-gutter-mobile sm:grid-cols-2 md:gap-gutter">
          {supportTeam.map((m) => (
            <li
              key={m.id}
              className="flex gap-4 rounded-card border border-border-subtle bg-white p-5 shadow-tier-1"
            >
              <Avatar name={m.name} photo={m.photo} alt={m.alt} size={56} />
              <div className="min-w-0">
                <p className="text-headline-sm text-ink">{m.name}</p>
                <p className="mb-2 text-label-md text-brand-teal-dark">{m.role}</p>
                <Bio lines={m.bio} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
