import { ZaloIcon, zaloOnCoral } from "@/components/icons/brand";
import { AnchorButton } from "@/components/ui/Button";
import { site } from "@/content/site";
import type { ChatPlacement } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/** Zalo button placed after a section. */
export function ChatCtaPair({
  placement,
  primaryLabel,
  className,
}: {
  placement: ChatPlacement;
  primaryLabel: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-stretch justify-center gap-3 sm:flex-row", className)}>
      <AnchorButton
        href={site.channels.zalo}
        target="_blank"
        rel="noopener noreferrer"
        size="lg"
        track={{ channel: "zalo", placement }}
        className={zaloOnCoral}
      >
        <ZaloIcon /> {primaryLabel}
      </AnchorButton>
    </div>
  );
}
