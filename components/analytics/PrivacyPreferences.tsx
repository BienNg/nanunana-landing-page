"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { buttonClasses } from "@/components/ui/button-styles";
import { useConsent } from "@/lib/hooks/useConsent";
import { localePath } from "@/lib/i18n/locale";
import { PREFERENCES_EVENT, saveConsent, type Consent } from "@/lib/consent";

const copy = {
  vi: {
    title: "Quyền riêng tư của bạn",
    settings: "Cài đặt quyền riêng tư",
    intro:
      "Bạn chọn có cho phép thống kê và tiếp thị hay không. Bạn vẫn có thể xem trang, nhắn tin và gửi yêu cầu tư vấn khi từ chối. Có thể đổi lựa chọn ở cuối trang bất cứ lúc nào.",
    analytics: "Thống kê",
    analyticsInfo:
      "Đo lượt xem, nút bấm và tốc độ trang bằng thống kê của NaNu NaNa, Vercel và Google Analytics (khi được cấu hình).",
    marketing: "Tiếp thị",
    marketingInfo:
      "Cho phép Meta Pixel đo hiệu quả quảng cáo và lưu nguồn chiến dịch cho yêu cầu tư vấn.",
    accept: "Cho phép tất cả",
    reject: "Từ chối tất cả",
    save: "Lưu lựa chọn",
    close: "Đóng",
    privacy: "Chính sách bảo mật",
    necessary:
      "Lựa chọn này được lưu trên trình duyệt trong 180 ngày. Các chức năng cần thiết luôn hoạt động.",
  },
  de: {
    title: "Ihre Privatsphäre",
    settings: "Datenschutzeinstellungen",
    intro:
      "Sie entscheiden über Statistik und Marketing. Auch ohne Zustimmung können Sie die Website nutzen, Nachrichten senden und Beratung anfragen. Ihre Auswahl können Sie jederzeit unten auf der Seite ändern.",
    analytics: "Statistik",
    analyticsInfo:
      "Misst Aufrufe, Klicks und Ladezeiten mit der NaNu-NaNa-Statistik, Vercel und Google Analytics (sofern eingerichtet).",
    marketing: "Marketing",
    marketingInfo:
      "Erlaubt dem Meta-Pixel die Messung von Werbung und speichert die Kampagnenquelle für Beratungsanfragen.",
    accept: "Alle erlauben",
    reject: "Alle ablehnen",
    save: "Auswahl speichern",
    close: "Schließen",
    privacy: "Datenschutz",
    necessary:
      "Diese Auswahl wird 180 Tage im Browser gespeichert. Notwendige Funktionen bleiben aktiv.",
  },
};

export function PrivacySettingsButton({ className }: { className?: string }) {
  const locale = useLocale();
  return (
    <button
      type="button"
      className={className}
      data-stats-ignore
      onClick={() => window.dispatchEvent(new Event(PREFERENCES_EVENT))}
    >
      {copy[locale].settings}
    </button>
  );
}

export function PrivacyPreferences() {
  const locale = useLocale();
  const text = copy[locale];
  const consent = useConsent();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Consent>({ analytics: false, marketing: false });
  const heading = useRef<HTMLHeadingElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const open = () => {
      returnFocus.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setDraft(consent ?? { analytics: false, marketing: false });
      setEditing(true);
    };
    window.addEventListener(PREFERENCES_EVENT, open);
    return () => window.removeEventListener(PREFERENCES_EVENT, open);
  }, [consent]);

  useEffect(() => {
    if (editing) heading.current?.focus();
  }, [editing]);
  const close = () => {
    setEditing(false);
    returnFocus.current?.focus();
  };
  const choose = (value: Consent) => {
    saveConsent(value);
    close();
  };
  // Rendered on the server too, so the banner is in the first paint (it is the
  // LCP element for new visitors). Returning visitors never see it: the head
  // script hides it via data-consent before paint, and it unmounts on hydration.
  if (consent && !editing) return null;

  return (
    <section
      aria-labelledby="privacy-preferences-title"
      data-stats-ignore
      data-consent-banner={editing ? undefined : ""}
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-h-[85dvh] max-w-2xl overflow-y-auto rounded-card border border-border-subtle bg-white p-5 text-ink shadow-tier-3 sm:p-6"
      onKeyDown={(event) => {
        if (event.key === "Escape" && consent) close();
      }}
    >
      <h2 ref={heading} tabIndex={-1} id="privacy-preferences-title" className="text-headline-sm">
        {text.title}
      </h2>
      <p className="mt-2 text-body-sm text-ink-muted">{text.intro}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {(["analytics", "marketing"] as const).map((category) => (
          <label
            key={category}
            className="flex cursor-pointer items-start gap-3 rounded-control border border-border-subtle p-3"
          >
            <input
              type="checkbox"
              className="mt-1 size-5 shrink-0 accent-brand-teal-dark"
              checked={draft[category]}
              onChange={(event) => setDraft({ ...draft, [category]: event.target.checked })}
            />
            <span>
              <span className="block text-label-md font-semibold">{text[category]}</span>
              <span className="mt-1 block text-body-sm text-ink-muted">
                {text[`${category}Info`]}
              </span>
            </span>
          </label>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={buttonClasses({ variant: "outline", size: "sm" })}
          onClick={() => choose({ analytics: false, marketing: false })}
        >
          {text.reject}
        </button>
        <button
          type="button"
          className={buttonClasses({ variant: "outline", size: "sm" })}
          onClick={() => choose({ analytics: true, marketing: true })}
        >
          {text.accept}
        </button>
        <button
          type="button"
          className={buttonClasses({ variant: "secondary", size: "sm" })}
          onClick={() => choose(draft)}
        >
          {text.save}
        </button>
        {consent && (
          <button
            type="button"
            className={buttonClasses({ variant: "ghost", size: "sm" })}
            onClick={close}
          >
            {text.close}
          </button>
        )}
      </div>
      <p className="mt-3 text-body-sm text-ink-muted">
        {text.necessary}{" "}
        <Link
          href={localePath(locale, "/chinh-sach-bao-mat")}
          className="text-brand-teal-dark underline"
        >
          {text.privacy}
        </Link>
      </p>
    </section>
  );
}
