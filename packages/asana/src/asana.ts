import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Asana: "${key}" not configured. Call asana.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://app.asana.com/api/1.0${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Asana API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("asana.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Asana credentials configured.";
};

const listWorkspaces: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listWorkspaces/${id}` : `/listWorkspaces`);
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
  if (!id) throw new Error("asana.updateProject requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateProject/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteProject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("asana.deleteProject requires an ID.");
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
  if (!id) throw new Error("asana.updateTask requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateTask/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteTask: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("asana.deleteTask requires an ID.");
  return apiCall(`/deleteTask/${id}`, "DELETE");
};

const addComment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addComment`, "POST", typeof data === "object" ? data : { value: data });
};

const listSections: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSections/${id}` : `/listSections`);
};

const createSection: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createSection`, "POST", typeof data === "object" ? data : { value: data });
};

const addTaskToSection: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addTaskToSection`, "POST", typeof data === "object" ? data : { value: data });
};

const listTags: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTags/${id}` : `/listTags`);
};

const createTag: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createTag`, "POST", typeof data === "object" ? data : { value: data });
};

const addTagToTask: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addTagToTask`, "POST", typeof data === "object" ? data : { value: data });
};

const getUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUser/${id}` : `/getUser`);
};

const listTeams: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTeams/${id}` : `/listTeams`);
};

const searchTasks: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchTasks/${id}` : `/searchTasks`);
};

const listSubtasks: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSubtasks/${id}` : `/listSubtasks`);
};

export const AsanaFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listWorkspaces, listProjects, getProject, createProject, updateProject, deleteProject, listTasks, getTask, createTask, updateTask, deleteTask, addComment, listSections, createSection, addTaskToSection, listTags, createTag, addTagToTask, getUser, listTeams, searchTasks, listSubtasks,
};

export const AsanaFunctionMetadata = {
  setCredentials: { description: "Configure asana credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listWorkspaces: { description: "listWorkspaces", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listProjects: { description: "listProjects", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getProject: { description: "getProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createProject: { description: "createProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateProject: { description: "updateProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteProject: { description: "deleteProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTasks: { description: "listTasks", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTask: { description: "getTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTask: { description: "createTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateTask: { description: "updateTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteTask: { description: "deleteTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addComment: { description: "addComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSections: { description: "listSections", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createSection: { description: "createSection", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addTaskToSection: { description: "addTaskToSection", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTags: { description: "listTags", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTag: { description: "createTag", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addTagToTask: { description: "addTagToTask", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUser: { description: "getUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTeams: { description: "listTeams", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchTasks: { description: "searchTasks", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSubtasks: { description: "listSubtasks", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const AsanaModuleMetadata = {
  description: "Asana — tasks, projects, sections, tags, teams, and workspaces.",
  methods: Object.keys(AsanaFunctions),
  category: "project-management",
};
