import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Calendly: "${key}" not configured. Call calendly.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.calendly.com${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Calendly API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("calendly.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Calendly credentials configured.";
};

const getCurrentUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCurrentUser/${id}` : `/getCurrentUser`);
};

const listEventTypes: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listEventTypes/${id}` : `/listEventTypes`);
};

const getEventType: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getEventType/${id}` : `/getEventType`);
};

const listScheduledEvents: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listScheduledEvents/${id}` : `/listScheduledEvents`);
};

const getScheduledEvent: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getScheduledEvent/${id}` : `/getScheduledEvent`);
};

const listEventInvitees: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listEventInvitees/${id}` : `/listEventInvitees`);
};

const getEventInvitee: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getEventInvitee/${id}` : `/getEventInvitee`);
};

const cancelEvent: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("calendly.cancelEvent requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/cancelEvent/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listWebhooks: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listWebhooks/${id}` : `/listWebhooks`);
};

const createWebhook: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createWebhook`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteWebhook: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("calendly.deleteWebhook requires an ID.");
  return apiCall(`/deleteWebhook/${id}`, "DELETE");
};

const getOrganization: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrganization/${id}` : `/getOrganization`);
};

export const CalendlyFunctions: Record<string, BuiltinHandler> = {
  setCredentials, getCurrentUser, listEventTypes, getEventType, listScheduledEvents, getScheduledEvent, listEventInvitees, getEventInvitee, cancelEvent, listWebhooks, createWebhook, deleteWebhook, getOrganization,
};

export const CalendlyFunctionMetadata = {
  setCredentials: { description: "Configure calendly credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  getCurrentUser: { description: "getCurrentUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listEventTypes: { description: "listEventTypes", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getEventType: { description: "getEventType", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listScheduledEvents: { description: "listScheduledEvents", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getScheduledEvent: { description: "getScheduledEvent", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listEventInvitees: { description: "listEventInvitees", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getEventInvitee: { description: "getEventInvitee", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  cancelEvent: { description: "cancelEvent", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listWebhooks: { description: "listWebhooks", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createWebhook: { description: "createWebhook", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteWebhook: { description: "deleteWebhook", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrganization: { description: "getOrganization", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const CalendlyModuleMetadata = {
  description: "Calendly — events, scheduling links, invitees, and availability.",
  methods: Object.keys(CalendlyFunctions),
  category: "scheduling",
};
