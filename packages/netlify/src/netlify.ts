import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Netlify: "${key}" not configured. Call netlify.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.netlify.com/api/v1${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Netlify API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("netlify.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Netlify credentials configured.";
};

const listSites: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSites/${id}` : `/listSites`);
};

const getSite: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSite/${id}` : `/getSite`);
};

const createSite: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createSite`, "POST", typeof data === "object" ? data : { value: data });
};

const updateSite: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("netlify.updateSite requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateSite/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteSite: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("netlify.deleteSite requires an ID.");
  return apiCall(`/deleteSite/${id}`, "DELETE");
};

const listDeploys: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDeploys/${id}` : `/listDeploys`);
};

const getDeploy: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getDeploy/${id}` : `/getDeploy`);
};

const lockDeploy: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("netlify.lockDeploy requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/lockDeploy/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const unlockDeploy: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("netlify.unlockDeploy requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/unlockDeploy/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const restoreDeploy: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("netlify.restoreDeploy requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/restoreDeploy/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const cancelDeploy: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("netlify.cancelDeploy requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/cancelDeploy/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listForms: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listForms/${id}` : `/listForms`);
};

const listFormSubmissions: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listFormSubmissions/${id}` : `/listFormSubmissions`);
};

const deleteFormSubmission: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("netlify.deleteFormSubmission requires an ID.");
  return apiCall(`/deleteFormSubmission/${id}`, "DELETE");
};

const listDnsZones: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDnsZones/${id}` : `/listDnsZones`);
};

const getDnsZone: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getDnsZone/${id}` : `/getDnsZone`);
};

const createDnsRecord: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createDnsRecord`, "POST", typeof data === "object" ? data : { value: data });
};

const listBuildHooks: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listBuildHooks/${id}` : `/listBuildHooks`);
};

const triggerBuild: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/triggerBuild`, "POST", typeof data === "object" ? data : { value: data });
};

const listSiteDomains: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSiteDomains/${id}` : `/listSiteDomains`);
};

export const NetlifyFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listSites, getSite, createSite, updateSite, deleteSite, listDeploys, getDeploy, lockDeploy, unlockDeploy, restoreDeploy, cancelDeploy, listForms, listFormSubmissions, deleteFormSubmission, listDnsZones, getDnsZone, createDnsRecord, listBuildHooks, triggerBuild, listSiteDomains,
};

export const NetlifyFunctionMetadata = {
  setCredentials: { description: "Configure netlify credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listSites: { description: "listSites", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSite: { description: "getSite", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createSite: { description: "createSite", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateSite: { description: "updateSite", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteSite: { description: "deleteSite", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDeploys: { description: "listDeploys", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getDeploy: { description: "getDeploy", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  lockDeploy: { description: "lockDeploy", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  unlockDeploy: { description: "unlockDeploy", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  restoreDeploy: { description: "restoreDeploy", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  cancelDeploy: { description: "cancelDeploy", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listForms: { description: "listForms", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listFormSubmissions: { description: "listFormSubmissions", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteFormSubmission: { description: "deleteFormSubmission", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDnsZones: { description: "listDnsZones", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getDnsZone: { description: "getDnsZone", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createDnsRecord: { description: "createDnsRecord", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listBuildHooks: { description: "listBuildHooks", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  triggerBuild: { description: "triggerBuild", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSiteDomains: { description: "listSiteDomains", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const NetlifyModuleMetadata = {
  description: "Netlify — sites, deploys, forms, DNS, and edge functions.",
  methods: Object.keys(NetlifyFunctions),
  category: "hosting",
};
