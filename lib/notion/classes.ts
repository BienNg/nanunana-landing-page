import "server-only";
import { Client, extractDatabaseId, isFullPage, isNotionClientError } from "@notionhq/client";
import type { PageObjectResponse, QueryDataSourceResponse } from "@notionhq/client";
import { unstable_cache } from "next/cache";
import { serverEnv } from "@/lib/env";

/**
 * Klassen Datenbank columns shown on the site.
 * "Class Status" is a Notion formula: Upcoming when Begin is empty or still
 * in the future, Completed when End is before today, otherwise Active.
 * Rows with an empty End are left out, even when that formula still says Active.
 * Checked `1-1` or `Archiv` rows are private and stay off the landing page.
 */
const PROPS = {
  name: "Name",
  level: "Level",
  begin: "Begin",
  end: "End",
  format: "On|Off",
  location: "Location",
  media: "Files & media",
  status: "Class Status",
  oneToOne: "1-1",
  archiv: "Archiv",
} as const;

export type ClassMedia = {
  name: string;
  url: string;
};

export type RunningClass = {
  id: string;
  name: string;
  /** Page icon emoji, when the Notion row has one. */
  icon: string | null;
  level: string | null;
  /** Notion select `On|Off`: Online or Offline. */
  format: string | null;
  /** Notion select `Location`, such as Hanoi or Online VN. */
  location: string | null;
  /**
   * Images from `Files & media`. Notion file URLs expire after about an hour,
   * and this list is refreshed every few minutes, so the links stay valid.
   * Thumbnails and the lightbox both use a resized WebP from `/api/class-photo`.
   */
  media: ClassMedia[];
  /** Date-only ISO `YYYY-MM-DD`, or null when Begin is empty. */
  begin: string | null;
  /** Date-only ISO `YYYY-MM-DD`. Rows with no End are not returned. */
  end: string;
};

async function resolveDataSourceId(notion: Client, urlOrId: string) {
  const databaseId = extractDatabaseId(urlOrId) ?? urlOrId;
  try {
    const db = await notion.databases.retrieve({ database_id: databaseId });
    if ("data_sources" in db && db.data_sources[0]) return db.data_sources[0].id;
  } catch {
    // Already a data source id.
  }
  return databaseId;
}

function dateOnly(page: PageObjectResponse, name: string) {
  const prop = page.properties[name];
  if (prop?.type !== "date" || !prop.date?.start) return null;
  return prop.date.start.slice(0, 10);
}

function isChecked(page: PageObjectResponse, name: string) {
  const prop = page.properties[name];
  return prop?.type === "checkbox" && prop.checkbox;
}

function selectName(page: PageObjectResponse, name: string) {
  const prop = page.properties[name];
  if (prop?.type !== "select") return null;
  return prop.select?.name ?? null;
}

function mediaOf(page: PageObjectResponse): ClassMedia[] {
  const prop = page.properties[PROPS.media];
  if (prop?.type !== "files") return [];
  return prop.files.flatMap((file) => {
    const url =
      file.type === "file" ? file.file.url : file.type === "external" ? file.external.url : null;
    if (!url || !/\.(png|jpe?g|webp|gif)$/i.test(file.name)) return [];
    return [{ name: file.name, url }];
  });
}

/**
 * A1.1, then A1.2, A2.1, and so on. Exam-prep labels such as "ôn thi B1"
 * follow that level's sub-levels. Unrecognized and empty levels sort last.
 */
function levelSortKey(level: string | null): number {
  if (!level) return 10_000;
  const match = level.match(/([abc])\s*(\d)(?:[.\s](\d+))?/i);
  if (!match) return 9_000;
  const letter = match[1].toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
  const major = Number(match[2]);
  const minor = match[3] ? Number(match[3]) : 0;
  const exam = /ôn thi|on thi/i.test(level) ? 5 : 0;
  return letter * 100 + major * 10 + minor + exam;
}

function compareRunningClasses(a: RunningClass, b: RunningClass) {
  const levelDiff = levelSortKey(a.level) - levelSortKey(b.level);
  if (levelDiff !== 0) return levelDiff;
  if (levelSortKey(a.level) >= 9_000) {
    const byLabel = (a.level ?? "").localeCompare(b.level ?? "", "vi");
    if (byLabel !== 0) return byLabel;
  }
  if (a.begin === b.begin) return a.name.localeCompare(b.name, "vi");
  if (!a.begin) return 1;
  if (!b.begin) return -1;
  return a.begin.localeCompare(b.begin);
}

function toClass(page: PageObjectResponse) {
  const name = page.properties[PROPS.name];
  return {
    id: page.id,
    name:
      name?.type === "title"
        ? name.title
            .map((part) => part.plain_text)
            .join("")
            .trim()
        : "",
    icon: page.icon?.type === "emoji" ? page.icon.emoji : null,
    level: selectName(page, PROPS.level),
    format: selectName(page, PROPS.format),
    location: selectName(page, PROPS.location),
    media: mediaOf(page),
    begin: dateOnly(page, PROPS.begin),
    end: dateOnly(page, PROPS.end),
  };
}

async function loadRunningClasses(databaseId: string): Promise<RunningClass[]> {
  const token = serverEnv.classes()?.token;
  if (!token) return [];

  const notion = new Client({ auth: token, timeoutMs: 12000 });
  const dataSourceId = await resolveDataSourceId(notion, databaseId);
  const pages: QueryDataSourceResponse["results"] = [];
  let cursor: string | null = null;

  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          { property: PROPS.status, formula: { string: { equals: "Active" } } },
          { property: PROPS.oneToOne, checkbox: { equals: false } },
          { property: PROPS.archiv, checkbox: { equals: false } },
          { property: PROPS.end, date: { is_not_empty: true } },
        ],
      },
      sorts: [
        { property: PROPS.begin, direction: "ascending" },
        { property: PROPS.name, direction: "ascending" },
      ],
      page_size: 100,
      start_cursor: cursor ?? undefined,
    });
    pages.push(...response.results);
    cursor = response.has_more ? response.next_cursor : null;
  } while (cursor);

  return pages
    .filter(isFullPage)
    .filter((page) => !isChecked(page, PROPS.oneToOne) && !isChecked(page, PROPS.archiv))
    .map(toClass)
    .filter((row): row is RunningClass => row.name.length > 0 && row.end !== null)
    .sort(compareRunningClasses);
}

const getCachedClasses = unstable_cache(loadRunningClasses, ["notion-running-classes-v6"], {
  revalidate: 300,
});

/** Running classes from Klassen Datenbank. Empty when Notion is unset or unreachable. */
export async function getRunningClasses(): Promise<RunningClass[]> {
  const cfg = serverEnv.classes();
  if (!cfg) return [];
  try {
    return await getCachedClasses(cfg.databaseId);
  } catch (error) {
    const detail = isNotionClientError(error)
      ? `${error.code} ${error.message}`
      : error instanceof Error
        ? error.message
        : "unknown error";
    console.error("[notion:classes]", detail);
    return [];
  }
}
