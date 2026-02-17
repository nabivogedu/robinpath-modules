import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Gitlab: "${key}" not configured. Call gitlab.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://gitlab.com/api/v4${path}`, {
    method,
    headers: { "PRIVATE-TOKEN": getConfig("privateToken"), "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Gitlab API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const host = args[0] as string;
  const privateToken = args[1] as string;
  if (!host || !privateToken) throw new Error("gitlab.setCredentials requires host, privateToken.");
  config.set("host", host);
  config.set("privateToken", privateToken);
  return "Gitlab credentials configured.";
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

const deleteProject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("gitlab.deleteProject requires an ID.");
  return apiCall(`/deleteProject/${id}`, "DELETE");
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
  if (!id) throw new Error("gitlab.updateIssue requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateIssue/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listMergeRequests: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listMergeRequests/${id}` : `/listMergeRequests`);
};

const getMergeRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getMergeRequest/${id}` : `/getMergeRequest`);
};

const createMergeRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createMergeRequest`, "POST", typeof data === "object" ? data : { value: data });
};

const updateMergeRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("gitlab.updateMergeRequest requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateMergeRequest/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const mergeMergeRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("gitlab.mergeMergeRequest requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/mergeMergeRequest/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listBranches: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listBranches/${id}` : `/listBranches`);
};

const createBranch: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createBranch`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteBranch: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("gitlab.deleteBranch requires an ID.");
  return apiCall(`/deleteBranch/${id}`, "DELETE");
};

const listPipelines: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPipelines/${id}` : `/listPipelines`);
};

const getPipeline: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPipeline/${id}` : `/getPipeline`);
};

const retryPipeline: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("gitlab.retryPipeline requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/retryPipeline/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const cancelPipeline: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("gitlab.cancelPipeline requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/cancelPipeline/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listCommits: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCommits/${id}` : `/listCommits`);
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

const listMembers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listMembers/${id}` : `/listMembers`);
};

const addMember: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addMember`, "POST", typeof data === "object" ? data : { value: data });
};

const getUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUser/${id}` : `/getUser`);
};

const searchProjects: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchProjects/${id}` : `/searchProjects`);
};

const listEnvironments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listEnvironments/${id}` : `/listEnvironments`);
};

export const GitlabFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listProjects, getProject, createProject, deleteProject, listIssues, getIssue, createIssue, updateIssue, listMergeRequests, getMergeRequest, createMergeRequest, updateMergeRequest, mergeMergeRequest, listBranches, createBranch, deleteBranch, listPipelines, getPipeline, retryPipeline, cancelPipeline, listCommits, listTags, createTag, listMembers, addMember, getUser, searchProjects, listEnvironments,
};

export const GitlabFunctionMetadata = {
  setCredentials: { description: "Configure gitlab credentials.", parameters: [{ name: "host", dataType: "string", description: "host", formInputType: "text", required: true }, { name: "privateToken", dataType: "string", description: "privateToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listProjects: { description: "listProjects", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getProject: { description: "getProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createProject: { description: "createProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteProject: { description: "deleteProject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listIssues: { description: "listIssues", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getIssue: { description: "getIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createIssue: { description: "createIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateIssue: { description: "updateIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listMergeRequests: { description: "listMergeRequests", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getMergeRequest: { description: "getMergeRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createMergeRequest: { description: "createMergeRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateMergeRequest: { description: "updateMergeRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  mergeMergeRequest: { description: "mergeMergeRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listBranches: { description: "listBranches", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createBranch: { description: "createBranch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteBranch: { description: "deleteBranch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPipelines: { description: "listPipelines", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPipeline: { description: "getPipeline", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  retryPipeline: { description: "retryPipeline", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  cancelPipeline: { description: "cancelPipeline", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCommits: { description: "listCommits", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTags: { description: "listTags", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTag: { description: "createTag", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listMembers: { description: "listMembers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addMember: { description: "addMember", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUser: { description: "getUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchProjects: { description: "searchProjects", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listEnvironments: { description: "listEnvironments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const GitlabModuleMetadata = {
  description: "GitLab — projects, merge requests, pipelines, issues, wiki, and registries.",
  methods: Object.keys(GitlabFunctions),
  category: "development",
};
