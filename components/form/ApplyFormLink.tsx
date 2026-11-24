"use client";

import type { ComponentProps } from "react";
import { AnchorButton } from "@/components/ui/Button";
import { APPLICATION_FORM_ID } from "@/content/application-form";
import type { ApplyClick } from "@/lib/analytics";
import { setApplyRole } from "@/lib/apply-role-store";

/** Button that jumps to the application form on this page and pre-selects the position. */
export function ApplyFormLink({
  apply,
  onClick,
  ...props
}: Omit<ComponentProps<typeof AnchorButton>, "href" | "apply" | "track"> & { apply: ApplyClick }) {
  return (
    <AnchorButton
      {...props}
      href={`#${APPLICATION_FORM_ID}`}
      apply={apply}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        setApplyRole(apply.role);
      }}
    />
  );
}
