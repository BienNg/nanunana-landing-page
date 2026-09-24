import { cn } from "@/lib/cn";

export type CourseLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "GT";

const styles: Record<CourseLevel, string> = {
  A1: "bg-badge-a1 text-badge-a1-text",
  A2: "bg-badge-a2 text-badge-a2-text",
  B1: "bg-badge-b1 text-badge-b1-text",
  B2: "bg-badge-b2 text-badge-b2-text",
  C1: "bg-badge-c1 text-badge-c1-text",
  GT: "bg-badge-comm text-badge-comm-text",
};

const defaultLabels: Record<CourseLevel, string> = {
  A1: "A1",
  A2: "A2",
  B1: "B1",
  B2: "B2",
  C1: "C1",
  GT: "Giao Tiếp",
};

/** CEFR level pill using the DESIGN.md badge palette. */
export function CourseBadge({
  level,
  label,
  className,
}: {
  level: CourseLevel;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-label-sm uppercase",
        styles[level],
        className,
      )}
    >
      {label ?? defaultLabels[level]}
    </span>
  );
}
