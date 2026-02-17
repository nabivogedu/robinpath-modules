import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Mixpanel: "${key}" not configured. Call mixpanel.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.mixpanel.com${path}`, {
    method,
    headers: { "Authorization": "Basic " + btoa(`${getConfig("projectToken")}:${getConfig("apiSecret")}`), "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Mixpanel API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const projectToken = args[0] as string;
  const apiSecret = args[1] as string;
  if (!projectToken || !apiSecret) throw new Error("mixpanel.setCredentials requires projectToken, apiSecret.");
  config.set("projectToken", projectToken);
  config.set("apiSecret", apiSecret);
  return "Mixpanel credentials configured.";
};

const trackEvent: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/trackEvent`, "POST", typeof data === "object" ? data : { value: data });
};

const trackBatch: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/trackBatch`, "POST", typeof data === "object" ? data : { value: data });
};

const identifyUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/identifyUser`, "POST", typeof data === "object" ? data : { value: data });
};

const setUserProfile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/setUserProfile`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteUserProfile: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("mixpanel.deleteUserProfile requires an ID.");
  return apiCall(`/deleteUserProfile/${id}`, "DELETE");
};

const exportEvents: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/exportEvents/${id}` : `/exportEvents`);
};

const getTopEvents: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTopEvents/${id}` : `/getTopEvents`);
};

const getEventStats: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getEventStats/${id}` : `/getEventStats`);
};

const getFunnelReport: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getFunnelReport/${id}` : `/getFunnelReport`);
};

const getRetention: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getRetention/${id}` : `/getRetention`);
};

const getSegmentation: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSegmentation/${id}` : `/getSegmentation`);
};

const listCohorts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCohorts/${id}` : `/listCohorts`);
};

const getInsights: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getInsights/${id}` : `/getInsights`);
};

const queryJql: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/queryJql/${id}` : `/queryJql`);
};

export const MixpanelFunctions: Record<string, BuiltinHandler> = {
  setCredentials, trackEvent, trackBatch, identifyUser, setUserProfile, deleteUserProfile, exportEvents, getTopEvents, getEventStats, getFunnelReport, getRetention, getSegmentation, listCohorts, getInsights, queryJql,
};

export const MixpanelFunctionMetadata = {
  setCredentials: { description: "Configure mixpanel credentials.", parameters: [{ name: "projectToken", dataType: "string", description: "projectToken", formInputType: "text", required: true }, { name: "apiSecret", dataType: "string", description: "apiSecret", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  trackEvent: { description: "trackEvent", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  trackBatch: { description: "trackBatch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  identifyUser: { description: "identifyUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  setUserProfile: { description: "setUserProfile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteUserProfile: { description: "deleteUserProfile", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  exportEvents: { description: "exportEvents", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTopEvents: { description: "getTopEvents", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getEventStats: { description: "getEventStats", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getFunnelReport: { description: "getFunnelReport", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getRetention: { description: "getRetention", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSegmentation: { description: "getSegmentation", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCohorts: { description: "listCohorts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getInsights: { description: "getInsights", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  queryJql: { description: "queryJql", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const MixpanelModuleMetadata = {
  description: "Mixpanel — event tracking, funnels, cohorts, retention, and user profiles.",
  methods: Object.keys(MixpanelFunctions),
  category: "analytics",
};
