import { ui } from "@/content/ui";
import { getLocale } from "@/lib/i18n/get-locale";

export async function SkipLink() {
  const copy = ui[await getLocale()];
  return (
    <a
      href="#noi-dung"
      className="fixed top-2 left-2 z-[100] -translate-y-24 rounded-control bg-ink px-4 py-3 text-label-lg text-white transition-transform focus:translate-y-0"
    >
      {copy.skip}
    </a>
  );
}
