"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { Phone } from "lucide-react";
import { useAnyInView } from "@/lib/hooks/useInView";
import { sectionIds } from "@/content/nav";
import { site } from "@/content/site";
import { MessengerIcon, ZaloIcon, zaloOnCoral } from "@/components/icons/brand";
import { AnchorButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Sticky bottom bar for phones (< 768px): Zalo (primary) · Messenger · call.
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
          <ul className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_2.75rem] items-center gap-2">
            <li className="min-w-0">
              <AnchorButton
                href={site.channels.zalo}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                fullWidth
                track={{ channel: "zalo", placement: "mobile_bar" }}
                className={cn("min-w-0 px-2", zaloOnCoral)}
              >
                <ZaloIcon /> Nhắn Zalo
              </AnchorButton>
            </li>
            <li className="min-w-0">
              <AnchorButton
                href={site.channels.messenger}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                fullWidth
                track={{ channel: "messenger", placement: "mobile_bar" }}
                aria-label="Nhắn tin Messenger"
                className="min-w-0 px-2"
              >
                <MessengerIcon /> Chat
              </AnchorButton>
            </li>
            <li>
              <AnchorButton
                href={site.phone.href}
                variant="ghost"
                size="sm"
                track={{ channel: "phone", placement: "mobile_bar" }}
                aria-label={`Gọi hotline ${site.phone.display}`}
                className="size-11 px-0"
              >
                <Phone aria-hidden />
              </AnchorButton>
            </li>
          </ul>
        </m.nav>
      ) : null}
    </AnimatePresence>
  );
}
