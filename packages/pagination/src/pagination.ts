import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

const fetchAll: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const strategy = String(opts.strategy ?? "offset");
  const headers = (typeof opts.headers === "object" && opts.headers !== null ? opts.headers : {}) as Record<string, string>;
  const maxPages = Number(opts.maxPages ?? 100);
  const itemsKey = String(opts.itemsKey ?? "data");
  const allItems: unknown[] = [];

  if (strategy === "offset") {
    const limitParam = String(opts.limitParam ?? "limit");
    const offsetParam = String(opts.offsetParam ?? "offset");
    const pageSize = Number(opts.pageSize ?? 100);
    let offset = Number(opts.startOffset ?? 0);

    for (let page = 0; page < maxPages; page++) {
      const pageUrl = new URL(url);
      pageUrl.searchParams.set(limitParam, String(pageSize));
      pageUrl.searchParams.set(offsetParam, String(offset));

      const response = await fetch(pageUrl.toString(), { headers });
      const data = await response.json() as Record<string, unknown>;
      const items = (data[itemsKey] ?? data.results ?? data.items ?? []) as unknown[];
      allItems.push(...items);
      if (items.length < pageSize) break;
      offset += pageSize;
    }
  } else if (strategy === "cursor") {
    const cursorParam = String(opts.cursorParam ?? "cursor");
    const cursorKey = String(opts.cursorKey ?? "next_cursor");
    let cursor: string | null = opts.startCursor ? String(opts.startCursor) : null;

    for (let page = 0; page < maxPages; page++) {
      const pageUrl = new URL(url);
      if (cursor) pageUrl.searchParams.set(cursorParam, cursor);

      const response = await fetch(pageUrl.toString(), { headers });
      const data = await response.json() as Record<string, unknown>;
      const items = (data[itemsKey] ?? data.results ?? data.items ?? []) as unknown[];
      allItems.push(...items);
      cursor = data[cursorKey] ? String(data[cursorKey]) : null;
      if (!cursor || items.length === 0) break;
    }
  } else if (strategy === "page") {
    const pageParam = String(opts.pageParam ?? "page");
    const pageSize = Number(opts.pageSize ?? 100);
    let page = Number(opts.startPage ?? 1);

    for (let i = 0; i < maxPages; i++) {
      const pageUrl = new URL(url);
      pageUrl.searchParams.set(pageParam, String(page));
      if (opts.limitParam) pageUrl.searchParams.set(String(opts.limitParam), String(pageSize));

      const response = await fetch(pageUrl.toString(), { headers });
      const data = await response.json() as Record<string, unknown>;
      const items = (data[itemsKey] ?? data.results ?? data.items ?? []) as unknown[];
      allItems.push(...items);
      if (items.length === 0 || items.length < pageSize) break;
      page++;
    }
  } else if (strategy === "link") {
    let nextUrl: string | null = url;

    for (let page = 0; page < maxPages && nextUrl; page++) {
      const response = await fetch(nextUrl, { headers });
      const data = await response.json() as Record<string, unknown>;
      const items = (data[itemsKey] ?? data.results ?? data.items ?? []) as unknown[];
      allItems.push(...items);

      // Check Link header
      const linkHeader = response.headers.get("link");
      nextUrl = null;
      if (linkHeader) {
        const match = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
        if (match) nextUrl = match[1]!;
      }
      // Check response body for next link
      if (!nextUrl && data.next) nextUrl = String(data.next);
      if (items.length === 0) break;
    }
  }

  return { items: allItems, total: allItems.length };
};

const fetchPage: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const page = Number(args[1] ?? 1);
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const pageParam = String(opts.pageParam ?? "page");
  const limitParam = String(opts.limitParam ?? "limit");
  const pageSize = Number(opts.pageSize ?? 20);
  const headers = (typeof opts.headers === "object" && opts.headers !== null ? opts.headers : {}) as Record<string, string>;
  const itemsKey = String(opts.itemsKey ?? "data");

  const pageUrl = new URL(url);
  pageUrl.searchParams.set(pageParam, String(page));
  pageUrl.searchParams.set(limitParam, String(pageSize));

  const response = await fetch(pageUrl.toString(), { headers });
  const data = await response.json() as Record<string, unknown>;
  const items = (data[itemsKey] ?? data.results ?? data.items ?? []) as unknown[];

  return { items, page, pageSize, hasMore: items.length >= pageSize, total: data.total ?? data.count ?? null };
};

const parseLinkHeader: BuiltinHandler = (args) => {
  const header = String(args[0] ?? "");
  const links: Record<string, string> = {};
  const parts = header.split(",").map((s) => s.trim());
  for (const part of parts) {
    const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match) links[match[2]!] = match[1]!;
  }
  return links;
};

const buildPageUrl: BuiltinHandler = (args) => {
  const baseUrl = String(args[0] ?? "");
  const page = Number(args[1] ?? 1);
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const pageUrl = new URL(baseUrl);
  pageUrl.searchParams.set(String(opts.pageParam ?? "page"), String(page));
  if (opts.limit) pageUrl.searchParams.set(String(opts.limitParam ?? "limit"), String(opts.limit));
  return pageUrl.toString();
};

export const PaginationFunctions: Record<string, BuiltinHandler> = { fetchAll, fetchPage, parseLinkHeader, buildPageUrl };

export const PaginationFunctionMetadata: Record<string, FunctionMetadata> = {
  fetchAll: { description: "Auto-paginate an API and collect all items", parameters: [{ name: "url", dataType: "string", description: "API base URL", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{strategy: offset|cursor|page|link, headers, maxPages, pageSize, itemsKey, ...}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{items, total}", example: 'pagination.fetchAll "https://api.example.com/users" {"strategy": "offset", "pageSize": 100}' },
  fetchPage: { description: "Fetch a single page of results", parameters: [{ name: "url", dataType: "string", description: "API URL", formInputType: "text", required: true }, { name: "page", dataType: "number", description: "Page number", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{pageSize, headers, itemsKey}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{items, page, pageSize, hasMore, total}", example: 'pagination.fetchPage "https://api.example.com/users" 2 {"pageSize": 20}' },
  parseLinkHeader: { description: "Parse a Link header into rel-url pairs", parameters: [{ name: "header", dataType: "string", description: "Link header value", formInputType: "text", required: true }], returnType: "object", returnDescription: "{next, prev, first, last} URLs", example: 'pagination.parseLinkHeader $linkHeader' },
  buildPageUrl: { description: "Build a paginated URL with page/limit parameters", parameters: [{ name: "baseUrl", dataType: "string", description: "Base URL", formInputType: "text", required: true }, { name: "page", dataType: "number", description: "Page number", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{limit, pageParam, limitParam}", formInputType: "text", required: false }], returnType: "string", returnDescription: "Complete URL with pagination params", example: 'pagination.buildPageUrl "https://api.example.com/users" 3 {"limit": 50}' },
};

export const PaginationModuleMetadata: ModuleMetadata = {
  description: "Auto-paginate APIs with offset, cursor, page-number, and Link-header strategies",
  methods: ["fetchAll", "fetchPage", "parseLinkHeader", "buildPageUrl"],
};
