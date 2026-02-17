import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// --- Token storage ---

let apiToken: string | null = null;

function getToken(): string {
  if (!apiToken) throw new Error("Vercel API token not set. Call vercel.setToken first.");
  return apiToken;
}

// --- API helpers ---

const API_BASE = "https://api.vercel.com";

async function vercelRequest(path: string, options: RequestInit = {}): Promise<Value> {
  const token = getToken();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> ?? {}),
  };
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const response = await fetch(url, { ...options, headers });
  const text = await response.text();
  let body: unknown;
  try { body = JSON.parse(text); } catch { body = text; }
  if (!response.ok) {
    const errMsg = typeof body === "object" && body !== null && "error" in (body as Record<string, unknown>)
      ? JSON.stringify((body as Record<string, unknown>).error)
      : String(body);
    throw new Error(`Vercel API error (${response.status}): ${errMsg}`);
  }
  return body;
}

function buildQuery(params: Record<string, unknown>): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
  }
  const str = qs.toString();
  return str ? `?${str}` : "";
}

// --- Auth ---

const setToken: BuiltinHandler = (args) => {
  const token = String(args[0] ?? "");
  if (!token) throw new Error("token is required");
  apiToken = token;
  return { configured: true };
};

// --- Projects ---

const listProjects: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const query = buildQuery({ limit: opts.limit, from: opts.from, search: opts.search });
  const result = await vercelRequest(`/v9/projects${query}`) as Record<string, unknown>;
  return result;
};

const getProject: BuiltinHandler = async (args) => {
  const projectId = String(args[0] ?? "");
  if (!projectId) throw new Error("projectId is required");
  const result = await vercelRequest(`/v9/projects/${encodeURIComponent(projectId)}`);
  return result;
};

const createProject: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "");
  if (!name) throw new Error("name is required");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const payload: Record<string, unknown> = { name };
  if (opts.framework) payload.framework = opts.framework;
  if (opts.gitRepository) payload.gitRepository = opts.gitRepository;
  if (opts.buildCommand) payload.buildCommand = opts.buildCommand;
  if (opts.rootDirectory) payload.rootDirectory = opts.rootDirectory;
  const result = await vercelRequest("/v10/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result;
};

const updateProject: BuiltinHandler = async (args) => {
  const projectId = String(args[0] ?? "");
  if (!projectId) throw new Error("projectId is required");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const result = await vercelRequest(`/v9/projects/${encodeURIComponent(projectId)}`, {
    method: "PATCH",
    body: JSON.stringify(opts),
  });
  return result;
};

const deleteProject: BuiltinHandler = async (args) => {
  const projectId = String(args[0] ?? "");
  if (!projectId) throw new Error("projectId is required");
  await vercelRequest(`/v9/projects/${encodeURIComponent(projectId)}`, { method: "DELETE" });
  return { deleted: true, projectId };
};

// --- Deployments ---

const listDeployments: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const query = buildQuery({
    projectId: opts.projectId,
    limit: opts.limit,
    state: opts.state,
    target: opts.target,
  });
  const result = await vercelRequest(`/v6/deployments${query}`) as Record<string, unknown>;
  return result;
};

const getDeployment: BuiltinHandler = async (args) => {
  const deploymentId = String(args[0] ?? "");
  if (!deploymentId) throw new Error("deploymentId is required");
  const result = await vercelRequest(`/v13/deployments/${encodeURIComponent(deploymentId)}`);
  return result;
};

const createDeployment: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "");
  if (!name) throw new Error("name is required");
  const files = args[1];
  if (!Array.isArray(files)) throw new Error("files must be an array");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const payload: Record<string, unknown> = { name, files };
  if (opts.target) payload.target = opts.target;
  if (opts.gitSource) payload.gitSource = opts.gitSource;
  const result = await vercelRequest("/v13/deployments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result;
};

const cancelDeployment: BuiltinHandler = async (args) => {
  const deploymentId = String(args[0] ?? "");
  if (!deploymentId) throw new Error("deploymentId is required");
  const result = await vercelRequest(`/v12/deployments/${encodeURIComponent(deploymentId)}/cancel`, {
    method: "PATCH",
  });
  return result;
};

const deleteDeployment: BuiltinHandler = async (args) => {
  const deploymentId = String(args[0] ?? "");
  if (!deploymentId) throw new Error("deploymentId is required");
  await vercelRequest(`/v13/deployments/${encodeURIComponent(deploymentId)}`, { method: "DELETE" });
  return { deleted: true, deploymentId };
};

const redeployDeployment: BuiltinHandler = async (args) => {
  const deploymentId = String(args[0] ?? "");
  if (!deploymentId) throw new Error("deploymentId is required");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const payload: Record<string, unknown> = { deploymentId, ...opts };
  const result = await vercelRequest("/v13/deployments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result;
};

// --- Domains ---

const listDomains: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const query = buildQuery({ limit: opts.limit, since: opts.since, until: opts.until });
  const result = await vercelRequest(`/v5/domains${query}`) as Record<string, unknown>;
  return result;
};

const getDomain: BuiltinHandler = async (args) => {
  const domain = String(args[0] ?? "");
  if (!domain) throw new Error("domain is required");
  const result = await vercelRequest(`/v5/domains/${encodeURIComponent(domain)}`);
  return result;
};

const addDomain: BuiltinHandler = async (args) => {
  const domain = String(args[0] ?? "");
  if (!domain) throw new Error("domain is required");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const payload: Record<string, unknown> = { name: domain };
  if (opts.cdnEnabled !== undefined) payload.cdnEnabled = opts.cdnEnabled;
  const result = await vercelRequest("/v5/domains", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result;
};

const removeDomain: BuiltinHandler = async (args) => {
  const domain = String(args[0] ?? "");
  if (!domain) throw new Error("domain is required");
  await vercelRequest(`/v6/domains/${encodeURIComponent(domain)}`, { method: "DELETE" });
  return { deleted: true, domain };
};

const listProjectDomains: BuiltinHandler = async (args) => {
  const projectId = String(args[0] ?? "");
  if (!projectId) throw new Error("projectId is required");
  const result = await vercelRequest(`/v9/projects/${encodeURIComponent(projectId)}/domains`) as Record<string, unknown>;
  return result;
};

const addProjectDomain: BuiltinHandler = async (args) => {
  const projectId = String(args[0] ?? "");
  const domain = String(args[1] ?? "");
  if (!projectId) throw new Error("projectId is required");
  if (!domain) throw new Error("domain is required");
  const result = await vercelRequest(`/v10/projects/${encodeURIComponent(projectId)}/domains`, {
    method: "POST",
    body: JSON.stringify({ name: domain }),
  });
  return result;
};

const removeProjectDomain: BuiltinHandler = async (args) => {
  const projectId = String(args[0] ?? "");
  const domain = String(args[1] ?? "");
  if (!projectId) throw new Error("projectId is required");
  if (!domain) throw new Error("domain is required");
  await vercelRequest(`/v9/projects/${encodeURIComponent(projectId)}/domains/${encodeURIComponent(domain)}`, {
    method: "DELETE",
  });
  return { deleted: true, projectId, domain };
};

const getDomainConfig: BuiltinHandler = async (args) => {
  const domain = String(args[0] ?? "");
  if (!domain) throw new Error("domain is required");
  const result = await vercelRequest(`/v6/domains/${encodeURIComponent(domain)}/config`);
  return result;
};

const verifyDomain: BuiltinHandler = async (args) => {
  const projectId = String(args[0] ?? "");
  const domain = String(args[1] ?? "");
  if (!projectId) throw new Error("projectId is required");
  if (!domain) throw new Error("domain is required");
  const result = await vercelRequest(`/v9/projects/${encodeURIComponent(projectId)}/domains/${encodeURIComponent(domain)}/verify`, {
    method: "POST",
  });
  return result;
};

// --- Environment Variables ---

const listEnvVars: BuiltinHandler = async (args) => {
  const projectId = String(args[0] ?? "");
  if (!projectId) throw new Error("projectId is required");
  const result = await vercelRequest(`/v9/projects/${encodeURIComponent(projectId)}/env`) as Record<string, unknown>;
  return result;
};

const getEnvVar: BuiltinHandler = async (args) => {
  const projectId = String(args[0] ?? "");
  const envId = String(args[1] ?? "");
  if (!projectId) throw new Error("projectId is required");
  if (!envId) throw new Error("envId is required");
  const result = await vercelRequest(`/v9/projects/${encodeURIComponent(projectId)}/env/${encodeURIComponent(envId)}`);
  return result;
};

const createEnvVar: BuiltinHandler = async (args) => {
  const projectId = String(args[0] ?? "");
  const key = String(args[1] ?? "");
  const value = String(args[2] ?? "");
  const targets = args[3];
  if (!projectId) throw new Error("projectId is required");
  if (!key) throw new Error("key is required");
  if (!targets) throw new Error("targets is required (array of: production, preview, development)");
  const opts = (typeof args[4] === "object" && args[4] !== null ? args[4] : {}) as Record<string, unknown>;
  const payload: Record<string, unknown> = {
    key,
    value,
    target: Array.isArray(targets) ? targets : [targets],
    type: (opts.type as string) ?? "encrypted",
  };
  if (opts.gitBranch) payload.gitBranch = opts.gitBranch;
  const result = await vercelRequest(`/v10/projects/${encodeURIComponent(projectId)}/env`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result;
};

const updateEnvVar: BuiltinHandler = async (args) => {
  const projectId = String(args[0] ?? "");
  const envId = String(args[1] ?? "");
  const value = String(args[2] ?? "");
  if (!projectId) throw new Error("projectId is required");
  if (!envId) throw new Error("envId is required");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  const payload: Record<string, unknown> = { value };
  if (opts.target) payload.target = opts.target;
  if (opts.type) payload.type = opts.type;
  if (opts.gitBranch) payload.gitBranch = opts.gitBranch;
  const result = await vercelRequest(`/v9/projects/${encodeURIComponent(projectId)}/env/${encodeURIComponent(envId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return result;
};

const deleteEnvVar: BuiltinHandler = async (args) => {
  const projectId = String(args[0] ?? "");
  const envId = String(args[1] ?? "");
  if (!projectId) throw new Error("projectId is required");
  if (!envId) throw new Error("envId is required");
  await vercelRequest(`/v9/projects/${encodeURIComponent(projectId)}/env/${encodeURIComponent(envId)}`, {
    method: "DELETE",
  });
  return { deleted: true, projectId, envId };
};

// --- Teams / User ---

const getUser: BuiltinHandler = async () => {
  const result = await vercelRequest("/v2/user") as Record<string, unknown>;
  return result.user ?? result;
};

const listTeams: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const query = buildQuery({ limit: opts.limit, since: opts.since, until: opts.until });
  const result = await vercelRequest(`/v2/teams${query}`) as Record<string, unknown>;
  return result;
};

const getTeam: BuiltinHandler = async (args) => {
  const teamId = String(args[0] ?? "");
  if (!teamId) throw new Error("teamId is required");
  const result = await vercelRequest(`/v2/teams/${encodeURIComponent(teamId)}`);
  return result;
};

// --- Logs ---

const getDeploymentLogs: BuiltinHandler = async (args) => {
  const deploymentId = String(args[0] ?? "");
  if (!deploymentId) throw new Error("deploymentId is required");
  const result = await vercelRequest(`/v2/deployments/${encodeURIComponent(deploymentId)}/events`);
  return result;
};

// --- Exports ---

export const VercelFunctions: Record<string, BuiltinHandler> = {
  setToken,
  listProjects, getProject, createProject, updateProject, deleteProject,
  listDeployments, getDeployment, createDeployment, cancelDeployment, deleteDeployment, redeployDeployment,
  listDomains, getDomain, addDomain, removeDomain,
  listProjectDomains, addProjectDomain, removeProjectDomain, getDomainConfig, verifyDomain,
  listEnvVars, getEnvVar, createEnvVar, updateEnvVar, deleteEnvVar,
  getUser, listTeams, getTeam,
  getDeploymentLogs,
};

export const VercelFunctionMetadata = {
  setToken: {
    description: "Set the Vercel API bearer token for authentication",
    parameters: [
      { name: "token", dataType: "string", description: "Vercel API token", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{configured}",
    example: 'vercel.setToken "my-vercel-token"',
  },

  // --- Projects ---
  listProjects: {
    description: "List all projects in the authenticated account",
    parameters: [
      { name: "options", dataType: "object", description: "{limit, from, search}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "{projects[], pagination}",
    example: 'vercel.listProjects {"limit": 20, "search": "my-app"}',
  },
  getProject: {
    description: "Get details of a project by ID or name",
    parameters: [
      { name: "projectId", dataType: "string", description: "Project ID or name", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Project object with id, name, framework, targets, etc.",
    example: 'vercel.getProject "my-project"',
  },
  createProject: {
    description: "Create a new Vercel project",
    parameters: [
      { name: "name", dataType: "string", description: "Project name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{framework, gitRepository, buildCommand, rootDirectory}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Created project object",
    example: 'vercel.createProject "my-app" {"framework": "nextjs"}',
  },
  updateProject: {
    description: "Update settings of an existing project",
    parameters: [
      { name: "projectId", dataType: "string", description: "Project ID or name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Fields to update (name, framework, buildCommand, etc.)", formInputType: "json", required: true },
    ],
    returnType: "object", returnDescription: "Updated project object",
    example: 'vercel.updateProject "my-project" {"buildCommand": "npm run build"}',
  },
  deleteProject: {
    description: "Delete a Vercel project",
    parameters: [
      { name: "projectId", dataType: "string", description: "Project ID or name", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{deleted, projectId}",
    example: 'vercel.deleteProject "my-project"',
  },

  // --- Deployments ---
  listDeployments: {
    description: "List deployments, optionally filtered by project, state, or target",
    parameters: [
      { name: "options", dataType: "object", description: "{projectId, limit, state, target}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "{deployments[], pagination}",
    example: 'vercel.listDeployments {"projectId": "prj_abc123", "limit": 10}',
  },
  getDeployment: {
    description: "Get details of a specific deployment",
    parameters: [
      { name: "deploymentId", dataType: "string", description: "Deployment ID or URL", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Deployment object with id, url, state, meta, etc.",
    example: 'vercel.getDeployment "dpl_abc123"',
  },
  createDeployment: {
    description: "Create a new deployment with files",
    parameters: [
      { name: "name", dataType: "string", description: "Project name for the deployment", formInputType: "text", required: true },
      { name: "files", dataType: "array", description: "Array of file objects [{file, data}]", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{target, gitSource}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Created deployment object",
    example: 'vercel.createDeployment "my-app" [{"file": "index.html", "data": "<h1>Hello</h1>"}]',
  },
  cancelDeployment: {
    description: "Cancel an in-progress deployment",
    parameters: [
      { name: "deploymentId", dataType: "string", description: "Deployment ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Cancelled deployment object",
    example: 'vercel.cancelDeployment "dpl_abc123"',
  },
  deleteDeployment: {
    description: "Delete a deployment",
    parameters: [
      { name: "deploymentId", dataType: "string", description: "Deployment ID or URL", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{deleted, deploymentId}",
    example: 'vercel.deleteDeployment "dpl_abc123"',
  },
  redeployDeployment: {
    description: "Redeploy an existing deployment (create from existing)",
    parameters: [
      { name: "deploymentId", dataType: "string", description: "Source deployment ID to redeploy", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{target, name}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "New deployment object",
    example: 'vercel.redeployDeployment "dpl_abc123" {"target": "production"}',
  },

  // --- Domains ---
  listDomains: {
    description: "List all domains in the authenticated account",
    parameters: [
      { name: "options", dataType: "object", description: "{limit, since, until}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "{domains[], pagination}",
    example: "vercel.listDomains",
  },
  getDomain: {
    description: "Get information about a specific domain",
    parameters: [
      { name: "domain", dataType: "string", description: "Domain name", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Domain object with name, serviceType, verified, etc.",
    example: 'vercel.getDomain "example.com"',
  },
  addDomain: {
    description: "Register a new domain to the account",
    parameters: [
      { name: "domain", dataType: "string", description: "Domain name to add", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{cdnEnabled}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Created domain object",
    example: 'vercel.addDomain "example.com"',
  },
  removeDomain: {
    description: "Remove a domain from the account",
    parameters: [
      { name: "domain", dataType: "string", description: "Domain name to remove", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{deleted, domain}",
    example: 'vercel.removeDomain "example.com"',
  },
  listProjectDomains: {
    description: "List all domains assigned to a project",
    parameters: [
      { name: "projectId", dataType: "string", description: "Project ID or name", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{domains[]}",
    example: 'vercel.listProjectDomains "my-project"',
  },
  addProjectDomain: {
    description: "Add a domain to a project",
    parameters: [
      { name: "projectId", dataType: "string", description: "Project ID or name", formInputType: "text", required: true },
      { name: "domain", dataType: "string", description: "Domain name to add", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Domain configuration object",
    example: 'vercel.addProjectDomain "my-project" "example.com"',
  },
  removeProjectDomain: {
    description: "Remove a domain from a project",
    parameters: [
      { name: "projectId", dataType: "string", description: "Project ID or name", formInputType: "text", required: true },
      { name: "domain", dataType: "string", description: "Domain name to remove", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{deleted, projectId, domain}",
    example: 'vercel.removeProjectDomain "my-project" "example.com"',
  },
  getDomainConfig: {
    description: "Get DNS configuration for a domain",
    parameters: [
      { name: "domain", dataType: "string", description: "Domain name", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Domain DNS config with misconfigured, cnames, aValues, etc.",
    example: 'vercel.getDomainConfig "example.com"',
  },
  verifyDomain: {
    description: "Verify a domain attached to a project",
    parameters: [
      { name: "projectId", dataType: "string", description: "Project ID or name", formInputType: "text", required: true },
      { name: "domain", dataType: "string", description: "Domain name to verify", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Verification result object",
    example: 'vercel.verifyDomain "my-project" "example.com"',
  },

  // --- Environment Variables ---
  listEnvVars: {
    description: "List all environment variables for a project",
    parameters: [
      { name: "projectId", dataType: "string", description: "Project ID or name", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{envs[]} with key, value, target, type, id",
    example: 'vercel.listEnvVars "my-project"',
  },
  getEnvVar: {
    description: "Get details of a specific environment variable",
    parameters: [
      { name: "projectId", dataType: "string", description: "Project ID or name", formInputType: "text", required: true },
      { name: "envId", dataType: "string", description: "Environment variable ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Env var object with key, value, target, type",
    example: 'vercel.getEnvVar "my-project" "env_abc123"',
  },
  createEnvVar: {
    description: "Create a new environment variable for a project",
    parameters: [
      { name: "projectId", dataType: "string", description: "Project ID or name", formInputType: "text", required: true },
      { name: "key", dataType: "string", description: "Environment variable name", formInputType: "text", required: true },
      { name: "value", dataType: "string", description: "Environment variable value", formInputType: "text", required: true },
      { name: "targets", dataType: "array", description: "Deployment targets: production, preview, development", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{type, gitBranch} type: encrypted|plain|sensitive", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Created env var object",
    example: 'vercel.createEnvVar "my-project" "API_KEY" "secret123" ["production", "preview"]',
  },
  updateEnvVar: {
    description: "Update an existing environment variable",
    parameters: [
      { name: "projectId", dataType: "string", description: "Project ID or name", formInputType: "text", required: true },
      { name: "envId", dataType: "string", description: "Environment variable ID", formInputType: "text", required: true },
      { name: "value", dataType: "string", description: "New value", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{target, type, gitBranch}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Updated env var object",
    example: 'vercel.updateEnvVar "my-project" "env_abc123" "newValue"',
  },
  deleteEnvVar: {
    description: "Delete an environment variable from a project",
    parameters: [
      { name: "projectId", dataType: "string", description: "Project ID or name", formInputType: "text", required: true },
      { name: "envId", dataType: "string", description: "Environment variable ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{deleted, projectId, envId}",
    example: 'vercel.deleteEnvVar "my-project" "env_abc123"',
  },

  // --- Teams / User ---
  getUser: {
    description: "Get the authenticated user's profile",
    parameters: [],
    returnType: "object", returnDescription: "User object with id, email, name, username, etc.",
    example: "vercel.getUser",
  },
  listTeams: {
    description: "List all teams the authenticated user belongs to",
    parameters: [
      { name: "options", dataType: "object", description: "{limit, since, until}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "{teams[], pagination}",
    example: "vercel.listTeams",
  },
  getTeam: {
    description: "Get details of a specific team",
    parameters: [
      { name: "teamId", dataType: "string", description: "Team ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Team object with id, slug, name, etc.",
    example: 'vercel.getTeam "team_abc123"',
  },

  // --- Logs ---
  getDeploymentLogs: {
    description: "Get build logs for a deployment",
    parameters: [
      { name: "deploymentId", dataType: "string", description: "Deployment ID", formInputType: "text", required: true },
    ],
    returnType: "array", returnDescription: "Array of log event objects",
    example: 'vercel.getDeploymentLogs "dpl_abc123"',
  },
};

export const VercelModuleMetadata = {
  description: "Vercel REST API client for projects, deployments, domains, environment variables, teams, and logs",
  methods: Object.keys(VercelFunctions),
  category: "cloud",
};
