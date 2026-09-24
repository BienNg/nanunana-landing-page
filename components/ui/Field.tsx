import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

export function fieldIds(id: string) {
  return { hint: `${id}-hint`, error: `${id}-error` };
}

/** aria-describedby value for a control, based on which helper texts exist. */
export function describedBy(id: string, opts: { hint?: boolean; error?: boolean }) {
  const ids = fieldIds(id);
  return [opts.hint && ids.hint, opts.error && ids.error].filter(Boolean).join(" ") || undefined;
}

export function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={fieldIds(id).error} className="mt-1.5 flex items-start gap-1.5 text-body-sm text-error">
      <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/** Label + control + hint + error, wired together for screen readers. */
export function Field({
  id,
  label,
  required,
  optionalLabel = "(không bắt buộc)",
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: ReactNode;
  required?: boolean;
  optionalLabel?: string;
  hint?: ReactNode;
  error?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="mb-1.5 text-label-md text-ink">
        {label}
        {required ? (
          <span aria-hidden className="ml-0.5 text-error">
            *
          </span>
        ) : (
          <span className="ml-1 font-normal text-ink-subtle">{optionalLabel}</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p id={fieldIds(id).hint} className="mt-1.5 text-body-sm text-ink-subtle">
          {hint}
        </p>
      ) : null}
      <FieldError id={id}>{error}</FieldError>
    </div>
  );
}
