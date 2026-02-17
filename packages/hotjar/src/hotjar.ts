import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Hotjar: "${key}" not configured. Call hotjar.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.hotjar.com${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Hotjar API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  const siteId = args[1] as string;
  if (!accessToken || !siteId) throw new Error("hotjar.setCredentials requires accessToken, siteId.");
  config.set("accessToken", accessToken);
  config.set("siteId", siteId);
  return "Hotjar credentials configured.";
};

const listSurveys: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSurveys/${id}` : `/listSurveys`);
};

const getSurvey: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSurvey/${id}` : `/getSurvey`);
};

const getSurveyResponses: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSurveyResponses/${id}` : `/getSurveyResponses`);
};

const listFeedback: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listFeedback/${id}` : `/listFeedback`);
};

const getFeedbackItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getFeedbackItem/${id}` : `/getFeedbackItem`);
};

const listHeatmaps: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listHeatmaps/${id}` : `/listHeatmaps`);
};

const getHeatmap: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getHeatmap/${id}` : `/getHeatmap`);
};

const listRecordings: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listRecordings/${id}` : `/listRecordings`);
};

const getRecording: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getRecording/${id}` : `/getRecording`);
};

const getSiteInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSiteInfo/${id}` : `/getSiteInfo`);
};

const getUserInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUserInfo/${id}` : `/getUserInfo`);
};

const getSessionCount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSessionCount/${id}` : `/getSessionCount`);
};

export const HotjarFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listSurveys, getSurvey, getSurveyResponses, listFeedback, getFeedbackItem, listHeatmaps, getHeatmap, listRecordings, getRecording, getSiteInfo, getUserInfo, getSessionCount,
};

export const HotjarFunctionMetadata = {
  setCredentials: { description: "Configure hotjar credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }, { name: "siteId", dataType: "string", description: "siteId", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listSurveys: { description: "listSurveys", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSurvey: { description: "getSurvey", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSurveyResponses: { description: "getSurveyResponses", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listFeedback: { description: "listFeedback", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getFeedbackItem: { description: "getFeedbackItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listHeatmaps: { description: "listHeatmaps", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getHeatmap: { description: "getHeatmap", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listRecordings: { description: "listRecordings", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getRecording: { description: "getRecording", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSiteInfo: { description: "getSiteInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUserInfo: { description: "getUserInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSessionCount: { description: "getSessionCount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const HotjarModuleMetadata = {
  description: "Hotjar — heatmaps, recordings, surveys, and feedback widgets.",
  methods: Object.keys(HotjarFunctions),
  category: "analytics",
};
