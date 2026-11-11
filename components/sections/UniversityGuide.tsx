import { universityGuide, universityReviewed, universitySources } from "@/content/university";
import type { Locale } from "@/lib/i18n/locale";
import { StudyGuide } from "./StudyGuide";

export function UniversityGuide({ locale }: { locale: Locale }) {
  return (
    <StudyGuide
      locale={locale}
      copy={universityGuide[locale]}
      reviewedDate={universityReviewed}
      sources={universitySources}
      prefix="studium"
      goal="du-hoc-dai-hoc"
      alternativePath="/du-hoc-nghe"
      comparisonSources={["programme", "training"]}
    />
  );
}
