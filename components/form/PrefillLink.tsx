"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { prefillHref, type CourseValue, type GoalValue } from "@/content/form-options";
import { setPrefill } from "@/lib/prefill-store";

/**
 * Link to the consultation form that pre-selects a course and/or goal.
 * Works without JS too: the URL carries ?khoa= / ?muc-tieu=.
 */
export function PrefillLink({
  course,
  goal,
  onClick,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { course?: CourseValue; goal?: GoalValue }) {
  return (
    <Link
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
