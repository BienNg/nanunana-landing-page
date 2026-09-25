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
 */
const PROPS = {
  name: "Name",
  level: "Level",
  begin: "Begin",
  end: "End",
  status: "Class Status",
  archiv: "Archiv",
} as const;

export type RunningClass = {
  id: string;
  name: string;
  /** Page icon emoji, when the Notion row has one. */
  icon: string | null;
  level: string | null;
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

function toClass(page: PageObjectResponse) {
  const name = page.properties[PROPS.name];
  const level = page.properties[PROPS.level];
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
    level: level?.type === "select" ? (level.select?.name ?? null) : null,
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
    .map(toClass)
    .filter((row): row is RunningClass => row.name.length > 0 && row.end !== null)
    .sort((a, b) => {
      if (a.begin === b.begin) return a.name.localeCompare(b.name, "vi");
      if (!a.begin) return 1;
      if (!b.begin) return -1;
      return a.begin.localeCompare(b.begin);
    });
}

const getCachedClasses = unstable_cache(loadRunningClasses, ["notion-running-classes-v2"], {
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
