"use client";

import { useEffect, useRef } from "react";
import { m } from "motion/react";
import { CircleCheck } from "lucide-react";
import { site } from "@/content/site";
import { AnchorButton } from "@/components/ui/Button";
import { ZaloIcon } from "@/components/icons/brand";

export function FormSuccess({ onReset }: { onReset?: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const h = headingRef.current;
    if (!h) return;
    h.focus({ preventScroll: true });
    // The panel is shorter than the form — keep it in view.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    h.parentElement?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  }, []);

  return (
    <div className="flex flex-col items-center py-6 text-center md:py-10">
      <m.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
        className="grid size-16 place-items-center rounded-full bg-badge-comm text-trust-emerald-text"
      >
        <CircleCheck aria-hidden className="size-9" />
      </m.span>
      <h4 ref={headingRef} tabIndex={-1} className="mt-5 text-headline-md text-ink outline-none">
        Cảm ơn bạn đã quan tâm đến NaNu NaNa!
      </h4>
      <p className="mt-2 max-w-md text-body-md text-ink-muted">
        Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
      </p>
      <p className="mt-1 max-w-md text-body-sm text-ink-subtle">
        Cần trao đổi ngay? Nhắn Zalo hoặc gọi {site.phone.display}.
      </p>
      <AnchorButton
        href={site.channels.zalo}
        target="_blank"
        rel="noopener noreferrer"
        size="lg"
        className="mt-6"
      >
        <ZaloIcon /> Nhắn Zalo ngay
      </AnchorButton>
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-3 min-h-tap px-3 text-label-md text-brand-teal-dark underline underline-offset-2"
        >
          Gửi thêm một yêu cầu khác
        </button>
      ) : null}
    </div>
  );
}
