import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isUnverified, isVisible, type Claim } from "@/content/verify";

/**
 * Renders a claim. Unverified claims get a dashed amber outline in dev and are
 * removed in production (see content/verify.ts). Pass `children` to customise
 * how the value is rendered.
 */
export function VerifyMark<T>({
  claim,
  children,
  className,
  as: Tag = "span",
}: {
  claim: Claim<T> | undefined;
  children?: (value: T) => ReactNode;
  className?: string;
  as?: "span" | "div";
}) {
  if (!isVisible(claim)) return null;
  const content = children ? children(claim.value) : String(claim.value);
  if (!isUnverified(claim)) return <>{content}</>;
  return (
    <Tag
      data-verify={claim.note}
      title={`VERIFY: ${claim.note}`}
      className={cn(
        "relative rounded-[4px] outline-2 outline-offset-2 outline-amber outline-dashed",
        className,
      )}
    >
      {content}
    </Tag>
  );
}
