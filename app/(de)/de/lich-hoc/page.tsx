import Page, { generateMetadata as viMetadata } from "../../../(vi)/lich-hoc/page";
import { deMetadata, dePage } from "@/lib/i18n/de-page";
export const revalidate = 3600;
export const generateMetadata = deMetadata(viMetadata);
export default dePage(Page);
