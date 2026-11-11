import Page, {
  generateMetadata as viMetadata,
  generateStaticParams,
} from "../../../../(vi)/dia-diem/[city]/page";
import { deMetadata, dePage } from "@/lib/i18n/de-page";
export const dynamicParams = false;
export { generateStaticParams };
export const generateMetadata = deMetadata(viMetadata);
export default dePage(Page);
