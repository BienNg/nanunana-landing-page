"use client";

import type { ReactNode } from "react";

/**
 * Photo grid that does not navigate, drag, or offer a save menu.
 * The pictures stay in the page for viewing; they are not links.
 */
export function GalleryGrid({ children }: { children: ReactNode }) {
  return (
    <ul
      className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-4"
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      {children}
    </ul>
  );
}
