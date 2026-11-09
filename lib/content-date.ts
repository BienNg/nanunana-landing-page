import { execFileSync } from "node:child_process";

/** Last commit date of the files that feed a page. Omitted when git cannot say. */
export function contentLastModified(files: readonly string[]): Date | undefined {
  if (files.length === 0) return undefined;
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (!iso) return undefined;
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
}
