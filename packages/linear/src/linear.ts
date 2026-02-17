import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Linear: "${key}" not configured. Call linear.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.linear.app/graphql${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("apiKey")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Linear API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiKey = args[0] as string;
  if (!apiKey) throw new Error("linear.setCredentials requires apiKey.");
  config.set("apiKey", apiKey);
  return "Linear credentials configured.";
};

const listIssues: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listIssues/${id}` : `/listIssues`);
};

const getIssue: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getIssue/${id}` : `/getIssue`);
};

const createIssue: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createIssue`, "POST", typeof data === "object" ? data : { value: data });
};

const updateIssue: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("linear.updateIssue requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateIssue/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteIssue: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("linear.deleteIssue requires an ID.");
  return apiCall(`/deleteIssue/${id}`, "DELETE");
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
  if (!id) throw new Error("linear.updateProject requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateProject/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listTeams: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTeams/${id}` : `/listTeams`);
};

const getTeam: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTeam/${id}` : `/getTeam`);
};

const listCycles: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCycles/${id}` : `/listCycles`);
};

const getCycle: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCycle/${id}` : `/getCycle`);
};

const addIssueToCycle: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addIssueToCycle`, "POST", typeof data === "object" ? data : { value: data });
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

const searchIssues: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchIssues/${id}` : `/searchIssues`);
};

const listUsers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listUsers/${id}` : `/listUsers`);
};

export const LinearFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listIssues, getIssue, createIssue, updateIssue, deleteIssue, listProjects, getProject, createProject, updateProject, listTeams, getTeam, listCycles, getCycle, addIssueToCycle, listLabels, createLabel, listComments, createComment, searchIssues, listUsers,
};

export const LinearFunctionMetadata = {
  setCredentials: { description: "Configure linear credentials.", parameters: [{ name: "apiKey", dataType: "string", description: "apiKey", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listIssues: { description: "listIssues", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getIssue: { description: "getIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createIssue: { description: "createIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateIssue: { description: "updateIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteIssue: { description: "deleteIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listProjects: { description: "listProjects", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getProject: { description: "getProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createProject: { description: "createProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateProject: { description: "updateProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTeams: { description: "listTeams", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTeam: { description: "getTeam", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCycles: { description: "listCycles", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCycle: { description: "getCycle", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addIssueToCycle: { description: "addIssueToCycle", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listLabels: { description: "listLabels", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createLabel: { description: "createLabel", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listComments: { description: "listComments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createComment: { description: "createComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchIssues: { description: "searchIssues", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listUsers: { description: "listUsers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const LinearModuleMetadata = {
  description: "Linear — issues, projects, cycles, teams, labels, and roadmaps via GraphQL.",
  methods: Object.keys(LinearFunctions),
  category: "project-management",
};
