import Page, { generateMetadata as viMetadata } from "../../../(vi)/thi-goethe/page";
import { deMetadata, dePage } from "@/lib/i18n/de-page";
export const generateMetadata = deMetadata(viMetadata);
export default dePage(Page);
