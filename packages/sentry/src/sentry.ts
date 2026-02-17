import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Sentry: "${key}" not configured. Call sentry.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://sentry.io/api/0${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("authToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Sentry API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const authToken = args[0] as string;
  if (!authToken) throw new Error("sentry.setCredentials requires authToken.");
  config.set("authToken", authToken);
  return "Sentry credentials configured.";
};

const listProjects: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listProjects/${id}` : `/listProjects`);
};

const getProject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getProject/${id}` : `/getProject`);
};

const listIssues: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listIssues/${id}` : `/listIssues`);
};

const getIssue: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getIssue/${id}` : `/getIssue`);
};

const updateIssue: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("sentry.updateIssue requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateIssue/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteIssue: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("sentry.deleteIssue requires an ID.");
  return apiCall(`/deleteIssue/${id}`, "DELETE");
};

const listIssueEvents: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listIssueEvents/${id}` : `/listIssueEvents`);
};

const getLatestEvent: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getLatestEvent/${id}` : `/getLatestEvent`);
};

const listReleases: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listReleases/${id}` : `/listReleases`);
};

const createRelease: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createRelease`, "POST", typeof data === "object" ? data : { value: data });
};

const listAlertRules: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listAlertRules/${id}` : `/listAlertRules`);
};

const createAlertRule: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createAlertRule`, "POST", typeof data === "object" ? data : { value: data });
};

const resolveIssue: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("sentry.resolveIssue requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/resolveIssue/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const ignoreIssue: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("sentry.ignoreIssue requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/ignoreIssue/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const assignIssue: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/assignIssue`, "POST", typeof data === "object" ? data : { value: data });
};

const listTeams: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTeams/${id}` : `/listTeams`);
};

const getOrganization: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrganization/${id}` : `/getOrganization`);
};

const listProjectKeys: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listProjectKeys/${id}` : `/listProjectKeys`);
};

export const SentryFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listProjects, getProject, listIssues, getIssue, updateIssue, deleteIssue, listIssueEvents, getLatestEvent, listReleases, createRelease, listAlertRules, createAlertRule, resolveIssue, ignoreIssue, assignIssue, listTeams, getOrganization, listProjectKeys,
};

export const SentryFunctionMetadata = {
  setCredentials: { description: "Configure sentry credentials.", parameters: [{ name: "authToken", dataType: "string", description: "authToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listProjects: { description: "listProjects", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getProject: { description: "getProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listIssues: { description: "listIssues", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getIssue: { description: "getIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateIssue: { description: "updateIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteIssue: { description: "deleteIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listIssueEvents: { description: "listIssueEvents", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getLatestEvent: { description: "getLatestEvent", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listReleases: { description: "listReleases", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createRelease: { description: "createRelease", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listAlertRules: { description: "listAlertRules", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createAlertRule: { description: "createAlertRule", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  resolveIssue: { description: "resolveIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  ignoreIssue: { description: "ignoreIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  assignIssue: { description: "assignIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTeams: { description: "listTeams", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrganization: { description: "getOrganization", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listProjectKeys: { description: "listProjectKeys", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const SentryModuleMetadata = {
  description: "Sentry — issues, events, projects, releases, and alert rules.",
  methods: Object.keys(SentryFunctions),
  category: "monitoring",
};
