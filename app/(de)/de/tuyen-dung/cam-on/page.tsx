import Page, { generateMetadata as viMetadata } from "../../../../(vi)/tuyen-dung/cam-on/page";
import { deMetadata, dePage } from "@/lib/i18n/de-page";

export const generateMetadata = deMetadata(viMetadata);
export default dePage(Page);
