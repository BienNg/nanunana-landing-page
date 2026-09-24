import type { ComponentProps, ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/** Shared look for text-like controls (teal focus ring). Inputs/selects add the 48px min height. */
export const controlBase =
  "w-full rounded-control border border-border-control bg-white px-4 text-body-md text-ink placeholder:text-ink-subtle transition-[border-color,box-shadow] duration-150 outline-none focus-visible:outline-none focus:border-teal focus:ring-[3px] focus:ring-teal/15 disabled:cursor-not-allowed disabled:bg-surface-card-subtle aria-invalid:border-error aria-invalid:focus:ring-error/15";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlBase, "min-h-control py-3", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlBase, "min-h-32 resize-y py-3", className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: ComponentProps<"select"> & { children: ReactNode }) {
  return (
    <div className="relative">
      <select
        className={cn(controlBase, "min-h-control appearance-none py-3 pr-11", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-ink-subtle"
      />
    </div>
  );
}

/** Checkbox with a custom box; the native input stays in the a11y tree. */
export function Checkbox({
  className,
  children,
  id,
  ...props
}: Omit<ComponentProps<"input">, "type"> & { children: ReactNode }) {
  return (
    <label
      htmlFor={id}
      className={cn("group flex min-h-tap cursor-pointer items-start gap-3 py-1", className)}
    >
      <span className="relative mt-0.5 inline-flex size-5 shrink-0">
        <input
          id={id}
          type="checkbox"
          className="peer size-5 cursor-pointer appearance-none rounded-[5px] border border-border-control bg-white transition-colors checked:border-brand-teal-dark checked:bg-brand-teal-dark focus-visible:ring-[3px] focus-visible:ring-teal/25 focus-visible:outline-none aria-invalid:border-error"
          {...props}
        />
        <Check
          aria-hidden
          strokeWidth={3}
          className="pointer-events-none absolute inset-0.5 size-4 text-white opacity-0 peer-checked:opacity-100"
        />
      </span>
      <span className="text-body-sm text-ink-muted">{children}</span>
    </label>
  );
}

export type RadioOption = { value: string; label: string; icon?: ReactNode };

/** Segmented radio chips (DESIGN.md filter chips). */
export function RadioGroup({
  name,
  legend,
  options,
  value,
  defaultValue,
  onChange,
  className,
  inputProps,
}: {
  name: string;
  legend: ReactNode;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  inputProps?: Omit<ComponentProps<"input">, "type" | "value">;
}) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="mb-1.5 text-label-md text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt.value}
              className="peer sr-only"
              {...(value !== undefined
                ? { checked: value === opt.value, onChange: () => onChange?.(opt.value) }
                : { defaultChecked: defaultValue === opt.value })}
              {...inputProps}
            />
            <span className="inline-flex min-h-tap items-center gap-2 rounded-control border border-border-subtle bg-surface-card-subtle px-4 text-label-md text-ink-muted transition-colors peer-checked:border-brand-teal-dark peer-checked:bg-brand-teal-dark peer-checked:text-white peer-focus-visible:ring-[3px] peer-focus-visible:ring-teal/30 hover:border-border-control [&_svg]:size-4">
              {opt.icon}
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
