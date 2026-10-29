"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { m } from "motion/react";
import { trackApplyClick, trackChatClick, type ApplyClick, type ChatClick } from "@/lib/analytics";
import { buttonClasses, pressMotion, type ButtonSize, type ButtonVariant } from "./button-styles";

export { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize; fullWidth?: boolean };

// Only pass through props that don't collide with Motion's own event typings.
type Safe<T> = Omit<T, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart">;

const MotionLink = m.create(Link);

export function Button({
  variant,
  size,
  fullWidth,
  className,
  type = "button",
  ...props
}: Safe<ComponentProps<"button">> & StyleProps) {
  return (
    <m.button
      type={type}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...pressMotion}
      {...props}
    />
  );
}

/** Internal links (anchors to sections, routes). */
export function LinkButton({
  variant,
  size,
  fullWidth,
  className,
  ...props
}: Safe<ComponentProps<typeof Link>> & StyleProps) {
  return (
    <MotionLink
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...pressMotion}
      {...props}
    />
  );
}

/**
 * External links (Zalo, Messenger, tel:, mailto:). `track` records a chat_click,
 * `apply` an apply_click (Gửi CV), before navigation.
 */
export function AnchorButton({
  variant,
  size,
  fullWidth,
  className,
  track,
  apply,
  onClick,
  ...props
}: Safe<ComponentProps<"a">> & StyleProps & { track?: ChatClick; apply?: ApplyClick }) {
  return (
    <m.a
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...pressMotion}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (track) trackChatClick(track);
        if (apply) trackApplyClick(apply);
      }}
    />
  );
}
