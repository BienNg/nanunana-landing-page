import { Guide, guideMetadata } from "@/components/sections/Guide";
import { getLocale } from "@/lib/i18n/get-locale";

export async function generateMetadata() {
  return guideMetadata(await getLocale(), "chi-phi-du-hoc-duc");
}

export default async function GuidePage() {
  return <Guide locale={await getLocale()} slug="chi-phi-du-hoc-duc" />;
}
