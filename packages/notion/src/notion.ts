import type { BuiltinHandler, Value, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getToken(): string {
  const token = config.get("token");
  if (!token) throw new Error('Notion: token not configured. Call notion.setToken first.');
  return token;
}

async function notionApi(path: string, method = "GET", body?: unknown): Promise<Value> {
  const token = getToken();
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API error (${res.status}): ${text}`);
  }
  return res.json();
}

const setToken: BuiltinHandler = (args) => {
  const token = args[0] as string;
  if (!token) throw new Error("notion.setToken requires a token.");
  config.set("token", token);
  return "Notion token configured.";
};

const getPage: BuiltinHandler = async (args) => {
  const pageId = args[0] as string;
  if (!pageId) throw new Error("notion.getPage requires a pageId.");
  return notionApi(`/pages/${pageId}`);
};

const createPage: BuiltinHandler = async (args) => {
  const parentId = args[0] as string;
  const properties = args[1] as Record<string, unknown>;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!parentId || !properties) throw new Error("notion.createPage requires parentId and properties.");
  const parentType = (opts.parentType as string) ?? "database";
  const parent = parentType === "page" ? { page_id: parentId } : { database_id: parentId };
  const payload: Record<string, unknown> = { parent, properties };
  if (opts.children) payload.children = opts.children;
  return notionApi("/pages", "POST", payload);
};

const updatePage: BuiltinHandler = async (args) => {
  const pageId = args[0] as string;
  const properties = args[1] as Record<string, unknown>;
  if (!pageId || !properties) throw new Error("notion.updatePage requires pageId and properties.");
  return notionApi(`/pages/${pageId}`, "PATCH", { properties });
};

const archivePage: BuiltinHandler = async (args) => {
  const pageId = args[0] as string;
  if (!pageId) throw new Error("notion.archivePage requires a pageId.");
  return notionApi(`/pages/${pageId}`, "PATCH", { archived: true });
};

const queryDatabase: BuiltinHandler = async (args) => {
  const databaseId = args[0] as string;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!databaseId) throw new Error("notion.queryDatabase requires a databaseId.");
  return notionApi(`/databases/${databaseId}/query`, "POST", opts);
};

const getDatabase: BuiltinHandler = async (args) => {
  const databaseId = args[0] as string;
  if (!databaseId) throw new Error("notion.getDatabase requires a databaseId.");
  return notionApi(`/databases/${databaseId}`);
};

const getBlocks: BuiltinHandler = async (args) => {
  const blockId = args[0] as string;
  if (!blockId) throw new Error("notion.getBlocks requires a blockId.");
  return notionApi(`/blocks/${blockId}/children`);
};

const appendBlocks: BuiltinHandler = async (args) => {
  const blockId = args[0] as string;
  const children = args[1] as unknown[];
  if (!blockId || !children) throw new Error("notion.appendBlocks requires blockId and children.");
  return notionApi(`/blocks/${blockId}/children`, "PATCH", { children });
};

const deleteBlock: BuiltinHandler = async (args) => {
  const blockId = args[0] as string;
  if (!blockId) throw new Error("notion.deleteBlock requires a blockId.");
  return notionApi(`/blocks/${blockId}`, "DELETE");
};

const search: BuiltinHandler = async (args) => {
  const query = args[0] as string;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const payload: Record<string, unknown> = {};
  if (query) payload.query = query;
  if (opts.filter) payload.filter = opts.filter;
  if (opts.sort) payload.sort = opts.sort;
  if (opts.start_cursor) payload.start_cursor = opts.start_cursor;
  if (opts.page_size) payload.page_size = opts.page_size;
  return notionApi("/search", "POST", payload);
};

export const NotionFunctions: Record<string, BuiltinHandler> = {
  setToken,
  getPage,
  createPage,
  updatePage,
  archivePage,
  queryDatabase,
  getDatabase,
  getBlocks,
  appendBlocks,
  deleteBlock,
  search,
};

export const NotionFunctionMetadata = {
  setToken: {
    description: "Set the Notion integration token.",
    parameters: [
      { name: "token", dataType: "string", description: "Notion internal integration token", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'notion.setToken "ntn_xxx"',
  },
  getPage: {
    description: "Retrieve a Notion page by ID.",
    parameters: [
      { name: "pageId", dataType: "string", description: "The page ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Page object with properties.",
    example: 'notion.getPage "page-id-here"',
  },
  createPage: {
    description: "Create a new page in a database or as a child of another page.",
    parameters: [
      { name: "parentId", dataType: "string", description: "Parent database or page ID", formInputType: "text", required: true },
      { name: "properties", dataType: "object", description: "Page properties object", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "Options: parentType ('database'|'page'), children (block array)", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created page object.",
    example: 'notion.createPage "db-id" {"Name":{"title":[{"text":{"content":"New Page"}}]}}',
  },
  updatePage: {
    description: "Update properties of an existing page.",
    parameters: [
      { name: "pageId", dataType: "string", description: "The page ID", formInputType: "text", required: true },
      { name: "properties", dataType: "object", description: "Properties to update", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated page object.",
    example: 'notion.updatePage "page-id" {"Status":{"select":{"name":"Done"}}}',
  },
  archivePage: {
    description: "Archive (soft-delete) a Notion page.",
    parameters: [
      { name: "pageId", dataType: "string", description: "The page ID to archive", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Archived page object.",
    example: 'notion.archivePage "page-id"',
  },
  queryDatabase: {
    description: "Query a Notion database with optional filters and sorts.",
    parameters: [
      { name: "databaseId", dataType: "string", description: "The database ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Query options: filter, sorts, start_cursor, page_size", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Query results with results array.",
    example: 'notion.queryDatabase "db-id" {"filter":{"property":"Status","select":{"equals":"Active"}}}',
  },
  getDatabase: {
    description: "Retrieve a Notion database schema.",
    parameters: [
      { name: "databaseId", dataType: "string", description: "The database ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Database object with properties schema.",
    example: 'notion.getDatabase "db-id"',
  },
  getBlocks: {
    description: "Get child blocks of a page or block.",
    parameters: [
      { name: "blockId", dataType: "string", description: "Page or block ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "List of child block objects.",
    example: 'notion.getBlocks "page-id"',
  },
  appendBlocks: {
    description: "Append child blocks to a page or block.",
    parameters: [
      { name: "blockId", dataType: "string", description: "Page or block ID", formInputType: "text", required: true },
      { name: "children", dataType: "array", description: "Array of block objects to append", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Appended blocks response.",
    example: 'notion.appendBlocks "page-id" [{"type":"paragraph","paragraph":{"rich_text":[{"text":{"content":"Hello"}}]}}]',
  },
  deleteBlock: {
    description: "Delete a block by ID.",
    parameters: [
      { name: "blockId", dataType: "string", description: "The block ID to delete", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Deleted block object.",
    example: 'notion.deleteBlock "block-id"',
  },
  search: {
    description: "Search across all pages and databases the integration has access to.",
    parameters: [
      { name: "query", dataType: "string", description: "Search query text", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "Options: filter, sort, start_cursor, page_size", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Search results.",
    example: 'notion.search "meeting notes"',
  },
};

export const NotionModuleMetadata = {
  description: "Create, read, update, and query Notion pages and databases via the Notion API.",
  category: "productivity",
  methods: Object.keys(NotionFunctions),
};
