import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Monday: "${key}" not configured. Call monday.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.monday.com/v2${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("apiToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Monday API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiToken = args[0] as string;
  if (!apiToken) throw new Error("monday.setCredentials requires apiToken.");
  config.set("apiToken", apiToken);
  return "Monday credentials configured.";
};

const listBoards: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listBoards/${id}` : `/listBoards`);
};

const getBoard: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getBoard/${id}` : `/getBoard`);
};

const createBoard: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createBoard`, "POST", typeof data === "object" ? data : { value: data });
};

const listItems: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listItems/${id}` : `/listItems`);
};

const getItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getItem/${id}` : `/getItem`);
};

const createItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createItem`, "POST", typeof data === "object" ? data : { value: data });
};

const updateItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("monday.updateItem requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateItem/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("monday.deleteItem requires an ID.");
  return apiCall(`/deleteItem/${id}`, "DELETE");
};

const listGroups: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listGroups/${id}` : `/listGroups`);
};

const createGroup: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createGroup`, "POST", typeof data === "object" ? data : { value: data });
};

const listColumns: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listColumns/${id}` : `/listColumns`);
};

const createColumn: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createColumn`, "POST", typeof data === "object" ? data : { value: data });
};

const addUpdate: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addUpdate`, "POST", typeof data === "object" ? data : { value: data });
};

const listUpdates: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listUpdates/${id}` : `/listUpdates`);
};

const listWorkspaces: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listWorkspaces/${id}` : `/listWorkspaces`);
};

const createSubitem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createSubitem`, "POST", typeof data === "object" ? data : { value: data });
};

const moveItemToGroup: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("monday.moveItemToGroup requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/moveItemToGroup/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const archiveItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("monday.archiveItem requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/archiveItem/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

export const MondayFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listBoards, getBoard, createBoard, listItems, getItem, createItem, updateItem, deleteItem, listGroups, createGroup, listColumns, createColumn, addUpdate, listUpdates, listWorkspaces, createSubitem, moveItemToGroup, archiveItem,
};

export const MondayFunctionMetadata = {
  setCredentials: { description: "Configure monday credentials.", parameters: [{ name: "apiToken", dataType: "string", description: "apiToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listBoards: { description: "listBoards", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getBoard: { description: "getBoard", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createBoard: { description: "createBoard", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listItems: { description: "listItems", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getItem: { description: "getItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createItem: { description: "createItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateItem: { description: "updateItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteItem: { description: "deleteItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listGroups: { description: "listGroups", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createGroup: { description: "createGroup", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listColumns: { description: "listColumns", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createColumn: { description: "createColumn", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addUpdate: { description: "addUpdate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listUpdates: { description: "listUpdates", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listWorkspaces: { description: "listWorkspaces", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createSubitem: { description: "createSubitem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  moveItemToGroup: { description: "moveItemToGroup", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  archiveItem: { description: "archiveItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const MondayModuleMetadata = {
  description: "Monday.com — boards, items, columns, groups, updates, and workspaces via GraphQL.",
  methods: Object.keys(MondayFunctions),
  category: "project-management",
};
