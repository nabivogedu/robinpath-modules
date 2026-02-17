import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Todoist: "${key}" not configured. Call todoist.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.todoist.com/rest/v2${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("apiToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Todoist API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiToken = args[0] as string;
  if (!apiToken) throw new Error("todoist.setCredentials requires apiToken.");
  config.set("apiToken", apiToken);
  return "Todoist credentials configured.";
};

const listProjects: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listProjects/${id}` : `/listProjects`);
};

const getProject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getProject/${id}` : `/getProject`);
};

const createProject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createProject`, "POST", typeof data === "object" ? data : { value: data });
};

const updateProject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("todoist.updateProject requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateProject/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteProject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("todoist.deleteProject requires an ID.");
  return apiCall(`/deleteProject/${id}`, "DELETE");
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
  if (!id) throw new Error("todoist.updateTask requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateTask/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const closeTask: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("todoist.closeTask requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/closeTask/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const reopenTask: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("todoist.reopenTask requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/reopenTask/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteTask: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("todoist.deleteTask requires an ID.");
  return apiCall(`/deleteTask/${id}`, "DELETE");
};

const listLabels: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listLabels/${id}` : `/listLabels`);
};

const createLabel: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createLabel`, "POST", typeof data === "object" ? data : { value: data });
};

const listComments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listComments/${id}` : `/listComments`);
};

const createComment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createComment`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteComment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("todoist.deleteComment requires an ID.");
  return apiCall(`/deleteComment/${id}`, "DELETE");
};

export const TodoistFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listProjects, getProject, createProject, updateProject, deleteProject, listTasks, getTask, createTask, updateTask, closeTask, reopenTask, deleteTask, listLabels, createLabel, listComments, createComment, deleteComment,
};

export const TodoistFunctionMetadata = {
  setCredentials: { description: "Configure todoist credentials.", parameters: [{ name: "apiToken", dataType: "string", description: "apiToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listProjects: { description: "listProjects", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getProject: { description: "getProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createProject: { description: "createProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateProject: { description: "updateProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteProject: { description: "deleteProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTasks: { description: "listTasks", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTask: { description: "getTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTask: { description: "createTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateTask: { description: "updateTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  closeTask: { description: "closeTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  reopenTask: { description: "reopenTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteTask: { description: "deleteTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listLabels: { description: "listLabels", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createLabel: { description: "createLabel", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listComments: { description: "listComments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createComment: { description: "createComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteComment: { description: "deleteComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const TodoistModuleMetadata = {
  description: "Todoist — tasks, projects, labels, comments, and filters.",
  methods: Object.keys(TodoistFunctions),
  category: "productivity",
};
