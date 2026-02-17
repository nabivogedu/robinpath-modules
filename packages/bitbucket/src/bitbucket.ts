import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Bitbucket: "${key}" not configured. Call bitbucket.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.bitbucket.org/2.0${path}`, {
    method,
    headers: { "Authorization": "Basic " + btoa(`${getConfig("username")}:${getConfig("appPassword")}`), "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Bitbucket API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const username = args[0] as string;
  const appPassword = args[1] as string;
  if (!username || !appPassword) throw new Error("bitbucket.setCredentials requires username, appPassword.");
  config.set("username", username);
  config.set("appPassword", appPassword);
  return "Bitbucket credentials configured.";
};

const listRepositories: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listRepositories/${id}` : `/listRepositories`);
};

const getRepository: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getRepository/${id}` : `/getRepository`);
};

const createRepository: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createRepository`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteRepository: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("bitbucket.deleteRepository requires an ID.");
  return apiCall(`/deleteRepository/${id}`, "DELETE");
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
  if (!id) throw new Error("bitbucket.deleteBranch requires an ID.");
  return apiCall(`/deleteBranch/${id}`, "DELETE");
};

const listPullRequests: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPullRequests/${id}` : `/listPullRequests`);
};

const getPullRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPullRequest/${id}` : `/getPullRequest`);
};

const createPullRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createPullRequest`, "POST", typeof data === "object" ? data : { value: data });
};

const updatePullRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("bitbucket.updatePullRequest requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updatePullRequest/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const mergePullRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("bitbucket.mergePullRequest requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/mergePullRequest/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const declinePullRequest: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("bitbucket.declinePullRequest requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/declinePullRequest/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listCommits: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCommits/${id}` : `/listCommits`);
};

const listPipelines: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPipelines/${id}` : `/listPipelines`);
};

const getPipeline: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPipeline/${id}` : `/getPipeline`);
};

const triggerPipeline: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/triggerPipeline`, "POST", typeof data === "object" ? data : { value: data });
};

const listIssues: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listIssues/${id}` : `/listIssues`);
};

const createIssue: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createIssue`, "POST", typeof data === "object" ? data : { value: data });
};

const listWorkspaces: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listWorkspaces/${id}` : `/listWorkspaces`);
};

const getWorkspace: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getWorkspace/${id}` : `/getWorkspace`);
};

const listWebhooks: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listWebhooks/${id}` : `/listWebhooks`);
};

const getUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUser/${id}` : `/getUser`);
};

const listDeployments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDeployments/${id}` : `/listDeployments`);
};

export const BitbucketFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listRepositories, getRepository, createRepository, deleteRepository, listBranches, createBranch, deleteBranch, listPullRequests, getPullRequest, createPullRequest, updatePullRequest, mergePullRequest, declinePullRequest, listCommits, listPipelines, getPipeline, triggerPipeline, listIssues, createIssue, listWorkspaces, getWorkspace, listWebhooks, getUser, listDeployments,
};

export const BitbucketFunctionMetadata = {
  setCredentials: { description: "Configure bitbucket credentials.", parameters: [{ name: "username", dataType: "string", description: "username", formInputType: "text", required: true }, { name: "appPassword", dataType: "string", description: "appPassword", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listRepositories: { description: "listRepositories", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getRepository: { description: "getRepository", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createRepository: { description: "createRepository", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteRepository: { description: "deleteRepository", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listBranches: { description: "listBranches", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createBranch: { description: "createBranch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteBranch: { description: "deleteBranch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPullRequests: { description: "listPullRequests", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPullRequest: { description: "getPullRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createPullRequest: { description: "createPullRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updatePullRequest: { description: "updatePullRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  mergePullRequest: { description: "mergePullRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  declinePullRequest: { description: "declinePullRequest", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCommits: { description: "listCommits", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPipelines: { description: "listPipelines", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPipeline: { description: "getPipeline", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  triggerPipeline: { description: "triggerPipeline", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listIssues: { description: "listIssues", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createIssue: { description: "createIssue", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listWorkspaces: { description: "listWorkspaces", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getWorkspace: { description: "getWorkspace", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listWebhooks: { description: "listWebhooks", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUser: { description: "getUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDeployments: { description: "listDeployments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const BitbucketModuleMetadata = {
  description: "Bitbucket Cloud — repos, PRs, pipelines, branches, and deployments.",
  methods: Object.keys(BitbucketFunctions),
  category: "development",
};
