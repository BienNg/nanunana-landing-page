"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { motion } from "motion/react";
import { buttonClasses, pressMotion, type ButtonSize, type ButtonVariant } from "./button-styles";

export { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize; fullWidth?: boolean };

// Only pass through props that don't collide with Motion's own event typings.
type Safe<T> = Omit<T, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart">;

const MotionLink = motion.create(Link);

export function Button({
  variant,
  size,
  fullWidth,
  className,
  type = "button",
  ...props
}: Safe<ComponentProps<"button">> & StyleProps) {
  return (
    <motion.button
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

/** External links (Zalo, Messenger, tel:). */
export function AnchorButton({
  variant,
  size,
  fullWidth,
  className,
  ...props
}: Safe<ComponentProps<"a">> & StyleProps) {
  return (
    <motion.a
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...pressMotion}
      {...props}
    />
  );
}
