"use client";

import type { ComponentProps } from "react";
import { trackChatClick, type ChatClick } from "@/lib/analytics";

/** Plain anchor that records which contact channel was tapped, and from where. */
export function ChatLink({
  channel,
  placement,
  onClick,
  ...props
}: ComponentProps<"a"> & ChatClick) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) trackChatClick({ channel, placement });
      }}
    />
  );
}
