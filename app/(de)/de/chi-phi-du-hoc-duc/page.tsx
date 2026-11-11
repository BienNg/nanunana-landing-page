import Page, { generateMetadata as viMetadata } from "../../../(vi)/chi-phi-du-hoc-duc/page";
import { deMetadata, dePage } from "@/lib/i18n/de-page";
export const generateMetadata = deMetadata(viMetadata);
export default dePage(Page);
