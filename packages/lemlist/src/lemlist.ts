import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Lemlist: "${key}" not configured. Call lemlist.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.lemlist.com/api${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("apiKey")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Lemlist API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiKey = args[0] as string;
  if (!apiKey) throw new Error("lemlist.setCredentials requires apiKey.");
  config.set("apiKey", apiKey);
  return "Lemlist credentials configured.";
};

const listCampaigns: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCampaigns/${id}` : `/listCampaigns`);
};

const getCampaign: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCampaign/${id}` : `/getCampaign`);
};

const listCampaignLeads: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCampaignLeads/${id}` : `/listCampaignLeads`);
};

const addLeadToCampaign: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addLeadToCampaign`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteLeadFromCampaign: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("lemlist.deleteLeadFromCampaign requires an ID.");
  return apiCall(`/deleteLeadFromCampaign/${id}`, "DELETE");
};

const pauseLeadInCampaign: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("lemlist.pauseLeadInCampaign requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/pauseLeadInCampaign/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const resumeLeadInCampaign: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("lemlist.resumeLeadInCampaign requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/resumeLeadInCampaign/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const markLeadAsInterested: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/markLeadAsInterested`, "POST", typeof data === "object" ? data : { value: data });
};

const unsubscribeLead: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("lemlist.unsubscribeLead requires an ID.");
  return apiCall(`/unsubscribeLead/${id}`, "DELETE");
};

const listActivities: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listActivities/${id}` : `/listActivities`);
};

const getLeadByEmail: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getLeadByEmail/${id}` : `/getLeadByEmail`);
};

const listUnsubscribes: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listUnsubscribes/${id}` : `/listUnsubscribes`);
};

const exportCampaignStats: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/exportCampaignStats/${id}` : `/exportCampaignStats`);
};

const getCampaignStats: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCampaignStats/${id}` : `/getCampaignStats`);
};

export const LemlistFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listCampaigns, getCampaign, listCampaignLeads, addLeadToCampaign, deleteLeadFromCampaign, pauseLeadInCampaign, resumeLeadInCampaign, markLeadAsInterested, unsubscribeLead, listActivities, getLeadByEmail, listUnsubscribes, exportCampaignStats, getCampaignStats,
};

export const LemlistFunctionMetadata = {
  setCredentials: { description: "Configure lemlist credentials.", parameters: [{ name: "apiKey", dataType: "string", description: "apiKey", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listCampaigns: { description: "listCampaigns", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCampaign: { description: "getCampaign", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCampaignLeads: { description: "listCampaignLeads", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addLeadToCampaign: { description: "addLeadToCampaign", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteLeadFromCampaign: { description: "deleteLeadFromCampaign", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  pauseLeadInCampaign: { description: "pauseLeadInCampaign", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  resumeLeadInCampaign: { description: "resumeLeadInCampaign", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  markLeadAsInterested: { description: "markLeadAsInterested", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  unsubscribeLead: { description: "unsubscribeLead", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listActivities: { description: "listActivities", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getLeadByEmail: { description: "getLeadByEmail", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listUnsubscribes: { description: "listUnsubscribes", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  exportCampaignStats: { description: "exportCampaignStats", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCampaignStats: { description: "getCampaignStats", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const LemlistModuleMetadata = {
  description: "Lemlist — campaigns, leads, sequences, deliverability, and warmup.",
  methods: Object.keys(LemlistFunctions),
  category: "email-marketing",
};
