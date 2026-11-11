import Page, { generateMetadata as viMetadata } from "../../../(vi)/hoc-tieng-duc-online/page";
import { deMetadata, dePage } from "@/lib/i18n/de-page";
export const generateMetadata = deMetadata(viMetadata);
export default dePage(Page);
