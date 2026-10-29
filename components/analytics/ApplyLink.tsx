"use client";

import type { ComponentProps } from "react";
import { trackApplyClick, type ApplyClick } from "@/lib/analytics";

/** Plain anchor (mailto) that records a "Gửi CV" tap, for which role and from where. */
export function ApplyLink({
  role,
  placement,
  onClick,
  ...props
}: ComponentProps<"a"> & ApplyClick) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) trackApplyClick({ role, placement });
      }}
    />
  );
}
