"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { m } from "motion/react";
import { pressMotion } from "@/components/ui/button-styles";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { prefillHref, type CourseValue, type GoalValue } from "@/content/form-options";
import { localePath } from "@/lib/i18n/locale";
import { setPrefill } from "@/lib/prefill-store";

/**
 * Link to the consultation form that pre-selects a course and/or goal,
 * and can prefill the message. Works without JS too: the URL carries
 * ?khoa= / ?muc-tieu= / ?loi-nhan=.
 */
const MotionLink = m.create(Link);

export function PrefillLink({
  course,
  goal,
  message,
  onClick,
  press = false,
  ...props
}: Omit<
  ComponentProps<typeof Link>,
  "href" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
> & {
  course?: CourseValue;
  goal?: GoalValue;
  /** Consultation message to drop in when this link is followed. */
  message?: string;
  /** Button-style link: add press feedback. */
  press?: boolean;
}) {
  const locale = useLocale();
  return (
    <MotionLink
      {...(press ? pressMotion : {})}
      href={localePath(locale, prefillHref({ course, goal, message }))}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        setPrefill({ course, goal, message });
      }}
      {...props}
    />
  );
}
