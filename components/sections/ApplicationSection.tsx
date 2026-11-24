import {
  APPLICATION_FORM_ID,
  applicationRoleOptions,
  applyHref,
  careersContent,
} from "@/content/careers";
import { ApplicationForm } from "@/components/form/ApplicationForm";
import { Card } from "@/components/ui/Card";
import { serverEnv } from "@/lib/env";
import type { Locale } from "@/lib/i18n/locale";

/** Application form card with the #ung-tuyen anchor that every "Ứng tuyển" button targets. */
export function ApplicationSection({
  locale,
  intro,
  defaultRole,
  heading,
}: {
  locale: Locale;
  intro: string;
  defaultRole?: string;
  heading?: string;
}) {
  const careers = careersContent(locale);
  const titleId = `${APPLICATION_FORM_ID}-title`;
  return (
    <section id={APPLICATION_FORM_ID} aria-labelledby={titleId}>
      <Card tier={2}>
        <h2 id={titleId} className="text-headline-md text-ink">
          {heading ?? careers.form.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-body-md text-ink-muted">{intro}</p>
        <div className="mt-6">
          <ApplicationForm
            roles={applicationRoleOptions(locale)}
            defaultRole={defaultRole}
            copy={careers.form}
            fallbackEmail={careers.applyEmail}
            fallbackHref={applyHref(locale)}
            turnstileSiteKey={serverEnv.turnstile()?.siteKey}
          />
        </div>
      </Card>
    </section>
  );
}
