"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { m } from "motion/react";
import { pressMotion } from "@/components/ui/button-styles";
import { prefillHref, type CourseValue, type GoalValue } from "@/content/form-options";
import { setPrefill } from "@/lib/prefill-store";

/**
 * Link to the consultation form that pre-selects a course and/or goal.
 * Works without JS too: the URL carries ?khoa= / ?muc-tieu=.
 */
const MotionLink = m.create(Link);

export function PrefillLink({
  course,
  goal,
  onClick,
  press = false,
  ...props
}: Omit<
  ComponentProps<typeof Link>,
  "href" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
> & {
  course?: CourseValue;
  goal?: GoalValue;
  /** Button-style link: add press feedback. */
  press?: boolean;
}) {
  return (
    <MotionLink
      {...(press ? pressMotion : {})}
      href={prefillHref({ course, goal })}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        setPrefill({ course, goal });
      }}
      {...props}
    />
  );
}
