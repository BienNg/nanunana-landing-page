import { ausbildungGuide, ausbildungReviewed, ausbildungSources } from "@/content/ausbildung";
import type { Locale } from "@/lib/i18n/locale";
import { StudyGuide } from "./StudyGuide";

export function AusbildungGuide({ locale }: { locale: Locale }) {
  return (
    <StudyGuide
      locale={locale}
      copy={ausbildungGuide[locale]}
      reviewedDate={ausbildungReviewed}
      sources={ausbildungSources}
      prefix="ausbildung"
      goal="du-hoc-nghe"
      alternativePath="/du-hoc-duc"
      comparisonSources={["models"]}
    />
  );
}
