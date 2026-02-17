import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Digitalocean: "${key}" not configured. Call digitalocean.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.digitalocean.com/v2${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Digitalocean API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("digitalocean.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Digitalocean credentials configured.";
};

const listDroplets: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDroplets/${id}` : `/listDroplets`);
};

const getDroplet: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getDroplet/${id}` : `/getDroplet`);
};

const createDroplet: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createDroplet`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteDroplet: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("digitalocean.deleteDroplet requires an ID.");
  return apiCall(`/deleteDroplet/${id}`, "DELETE");
};

const dropletAction: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/dropletAction${id ? `/${id}` : ""}`);
};

const listImages: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listImages/${id}` : `/listImages`);
};

const listRegions: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listRegions/${id}` : `/listRegions`);
};

const listSizes: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSizes/${id}` : `/listSizes`);
};

const listDomains: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDomains/${id}` : `/listDomains`);
};

const getDomain: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getDomain/${id}` : `/getDomain`);
};

const createDomain: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createDomain`, "POST", typeof data === "object" ? data : { value: data });
};

const listDomainRecords: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDomainRecords/${id}` : `/listDomainRecords`);
};

const createDomainRecord: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createDomainRecord`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteDomainRecord: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("digitalocean.deleteDomainRecord requires an ID.");
  return apiCall(`/deleteDomainRecord/${id}`, "DELETE");
};

const listDatabases: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDatabases/${id}` : `/listDatabases`);
};

const getDatabase: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getDatabase/${id}` : `/getDatabase`);
};

const listFirewalls: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listFirewalls/${id}` : `/listFirewalls`);
};

const createFirewall: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createFirewall`, "POST", typeof data === "object" ? data : { value: data });
};

const listLoadBalancers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listLoadBalancers/${id}` : `/listLoadBalancers`);
};

const listVolumes: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listVolumes/${id}` : `/listVolumes`);
};

const createVolume: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createVolume`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteVolume: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("digitalocean.deleteVolume requires an ID.");
  return apiCall(`/deleteVolume/${id}`, "DELETE");
};

const getAccount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAccount/${id}` : `/getAccount`);
};

const listSnapshots: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSnapshots/${id}` : `/listSnapshots`);
};

export const DigitaloceanFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listDroplets, getDroplet, createDroplet, deleteDroplet, dropletAction, listImages, listRegions, listSizes, listDomains, getDomain, createDomain, listDomainRecords, createDomainRecord, deleteDomainRecord, listDatabases, getDatabase, listFirewalls, createFirewall, listLoadBalancers, listVolumes, createVolume, deleteVolume, getAccount, listSnapshots,
};

export const DigitaloceanFunctionMetadata = {
  setCredentials: { description: "Configure digitalocean credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listDroplets: { description: "listDroplets", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getDroplet: { description: "getDroplet", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createDroplet: { description: "createDroplet", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteDroplet: { description: "deleteDroplet", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  dropletAction: { description: "dropletAction", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listImages: { description: "listImages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listRegions: { description: "listRegions", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSizes: { description: "listSizes", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDomains: { description: "listDomains", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getDomain: { description: "getDomain", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createDomain: { description: "createDomain", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDomainRecords: { description: "listDomainRecords", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createDomainRecord: { description: "createDomainRecord", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteDomainRecord: { description: "deleteDomainRecord", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDatabases: { description: "listDatabases", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getDatabase: { description: "getDatabase", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listFirewalls: { description: "listFirewalls", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createFirewall: { description: "createFirewall", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listLoadBalancers: { description: "listLoadBalancers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listVolumes: { description: "listVolumes", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createVolume: { description: "createVolume", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteVolume: { description: "deleteVolume", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAccount: { description: "getAccount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSnapshots: { description: "listSnapshots", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const DigitaloceanModuleMetadata = {
  description: "DigitalOcean — droplets, databases, spaces, domains, and firewalls.",
  methods: Object.keys(DigitaloceanFunctions),
  category: "cloud",
};
