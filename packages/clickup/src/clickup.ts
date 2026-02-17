import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Clickup: "${key}" not configured. Call clickup.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.clickup.com/api/v2${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("apiToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Clickup API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiToken = args[0] as string;
  if (!apiToken) throw new Error("clickup.setCredentials requires apiToken.");
  config.set("apiToken", apiToken);
  return "Clickup credentials configured.";
};

const listWorkspaces: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listWorkspaces/${id}` : `/listWorkspaces`);
};

const listSpaces: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSpaces/${id}` : `/listSpaces`);
};

const getSpace: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSpace/${id}` : `/getSpace`);
};

const createSpace: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createSpace`, "POST", typeof data === "object" ? data : { value: data });
};

const listFolders: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listFolders/${id}` : `/listFolders`);
};

const createFolder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createFolder`, "POST", typeof data === "object" ? data : { value: data });
};

const listLists: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listLists/${id}` : `/listLists`);
};

const createList: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createList`, "POST", typeof data === "object" ? data : { value: data });
};

const listTasks: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTasks/${id}` : `/listTasks`);
};

const getTask: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTask/${id}` : `/getTask`);
};

const createTask: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createTask`, "POST", typeof data === "object" ? data : { value: data });
};

const updateTask: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("clickup.updateTask requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateTask/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteTask: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("clickup.deleteTask requires an ID.");
  return apiCall(`/deleteTask/${id}`, "DELETE");
};

const addComment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addComment`, "POST", typeof data === "object" ? data : { value: data });
};

const listComments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listComments/${id}` : `/listComments`);
};

const listMembers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listMembers/${id}` : `/listMembers`);
};

const getTimeEntries: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTimeEntries/${id}` : `/getTimeEntries`);
};

const createTimeEntry: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createTimeEntry`, "POST", typeof data === "object" ? data : { value: data });
};

const listTags: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTags/${id}` : `/listTags`);
};

const addTagToTask: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addTagToTask`, "POST", typeof data === "object" ? data : { value: data });
};

const listGoals: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listGoals/${id}` : `/listGoals`);
};

const createGoal: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createGoal`, "POST", typeof data === "object" ? data : { value: data });
};

export const ClickupFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listWorkspaces, listSpaces, getSpace, createSpace, listFolders, createFolder, listLists, createList, listTasks, getTask, createTask, updateTask, deleteTask, addComment, listComments, listMembers, getTimeEntries, createTimeEntry, listTags, addTagToTask, listGoals, createGoal,
};

export const ClickupFunctionMetadata = {
  setCredentials: { description: "Configure clickup credentials.", parameters: [{ name: "apiToken", dataType: "string", description: "apiToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listWorkspaces: { description: "listWorkspaces", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSpaces: { description: "listSpaces", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSpace: { description: "getSpace", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createSpace: { description: "createSpace", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listFolders: { description: "listFolders", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createFolder: { description: "createFolder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listLists: { description: "listLists", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createList: { description: "createList", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTasks: { description: "listTasks", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTask: { description: "getTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTask: { description: "createTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateTask: { description: "updateTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteTask: { description: "deleteTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addComment: { description: "addComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listComments: { description: "listComments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listMembers: { description: "listMembers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTimeEntries: { description: "getTimeEntries", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTimeEntry: { description: "createTimeEntry", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTags: { description: "listTags", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addTagToTask: { description: "addTagToTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listGoals: { description: "listGoals", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createGoal: { description: "createGoal", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const ClickupModuleMetadata = {
  description: "ClickUp — tasks, lists, spaces, goals, time tracking, and docs.",
  methods: Object.keys(ClickupFunctions),
  category: "project-management",
};
