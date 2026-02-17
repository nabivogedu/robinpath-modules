import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`GoogleAnalytics: "${key}" not configured. Call google-analytics.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`GoogleAnalytics API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  const propertyId = args[1] as string;
  if (!accessToken || !propertyId) throw new Error("google-analytics.setCredentials requires accessToken, propertyId.");
  config.set("accessToken", accessToken);
  config.set("propertyId", propertyId);
  return "GoogleAnalytics credentials configured.";
};

const runReport: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/runReport/${id}` : `/runReport`);
};

const runRealtimeReport: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/runRealtimeReport/${id}` : `/runRealtimeReport`);
};

const batchRunReports: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/batchRunReports/${id}` : `/batchRunReports`);
};

const runPivotReport: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/runPivotReport/${id}` : `/runPivotReport`);
};

const getMetadata: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getMetadata/${id}` : `/getMetadata`);
};

const listProperties: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listProperties/${id}` : `/listProperties`);
};

const getProperty: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getProperty/${id}` : `/getProperty`);
};

const listAccounts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listAccounts/${id}` : `/listAccounts`);
};

const getActiveUsers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getActiveUsers/${id}` : `/getActiveUsers`);
};

const getPageViews: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPageViews/${id}` : `/getPageViews`);
};

const getTopPages: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTopPages/${id}` : `/getTopPages`);
};

const getTrafficSources: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTrafficSources/${id}` : `/getTrafficSources`);
};

const getUserDemographics: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUserDemographics/${id}` : `/getUserDemographics`);
};

const getConversions: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getConversions/${id}` : `/getConversions`);
};

export const GoogleAnalyticsFunctions: Record<string, BuiltinHandler> = {
  setCredentials, runReport, runRealtimeReport, batchRunReports, runPivotReport, getMetadata, listProperties, getProperty, listAccounts, getActiveUsers, getPageViews, getTopPages, getTrafficSources, getUserDemographics, getConversions,
};

export const GoogleAnalyticsFunctionMetadata = {
  setCredentials: { description: "Configure google-analytics credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }, { name: "propertyId", dataType: "string", description: "propertyId", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  runReport: { description: "runReport", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  runRealtimeReport: { description: "runRealtimeReport", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  batchRunReports: { description: "batchRunReports", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  runPivotReport: { description: "runPivotReport", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getMetadata: { description: "getMetadata", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listProperties: { description: "listProperties", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getProperty: { description: "getProperty", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listAccounts: { description: "listAccounts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getActiveUsers: { description: "getActiveUsers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPageViews: { description: "getPageViews", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTopPages: { description: "getTopPages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTrafficSources: { description: "getTrafficSources", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUserDemographics: { description: "getUserDemographics", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getConversions: { description: "getConversions", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const GoogleAnalyticsModuleMetadata = {
  description: "Google Analytics GA4 — reports, dimensions, metrics, and real-time data.",
  methods: Object.keys(GoogleAnalyticsFunctions),
  category: "analytics",
};
