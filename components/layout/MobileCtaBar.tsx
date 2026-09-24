"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { PenLine, Phone } from "lucide-react";
import { useAnyInView } from "@/lib/hooks/useInView";
import { contactHref, sectionIds } from "@/content/nav";
import { site } from "@/content/site";
import { ZaloIcon } from "@/components/icons/brand";

const itemClass =
  "flex min-h-13 flex-1 flex-col items-center justify-center gap-0.5 rounded-control text-label-sm transition-colors [&_svg]:size-5";

/**
 * Sticky bottom bar for phones (< 768px): Zalo · Hotline · Đăng ký.
 * Hidden while the contact section or the footer is on screen so it never
 * covers form fields or footer links.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const hide = useAnyInView([`#${sectionIds.contact}`, "#site-footer"], "0px", pathname);

  return (
    <AnimatePresence initial={false}>
      {!hide ? (
        <m.nav
          aria-label="Liên hệ nhanh"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-white/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-tier-3 backdrop-blur md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 420, damping: 40 }}
        >
          <ul className="flex gap-2">
            <li className="flex flex-1">
              <a
                href={site.channels.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className={`${itemClass} text-brand-teal-dark hover:bg-surface-container-low`}
              >
                <ZaloIcon />
                Zalo Chat
              </a>
            </li>
            <li className="flex flex-1">
              <a
                href={site.phone.href}
                className={`${itemClass} text-brand-teal-dark hover:bg-surface-container-low`}
              >
                <Phone aria-hidden />
                Gọi Hotline
              </a>
            </li>
            <li className="flex flex-1">
              <Link
                href={contactHref}
                className={`${itemClass} bg-coral-fill text-white hover:bg-coral-hover`}
              >
                <PenLine aria-hidden />
                Đăng Ký
              </Link>
            </li>
          </ul>
        </m.nav>
      ) : null}
    </AnimatePresence>
  );
}
