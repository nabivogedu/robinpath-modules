import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Twilio: "${key}" not configured. Call twilio.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.twilio.com/2010-04-01${path}`, {
    method,
    headers: { "Authorization": "Basic " + btoa(`${getConfig("accountSid")}:${getConfig("authToken")}`), "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Twilio API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accountSid = args[0] as string;
  const authToken = args[1] as string;
  if (!accountSid || !authToken) throw new Error("twilio.setCredentials requires accountSid, authToken.");
  config.set("accountSid", accountSid);
  config.set("authToken", authToken);
  return "Twilio credentials configured.";
};

const sendSms: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendSms`, "POST", typeof data === "object" ? data : { value: data });
};

const sendMms: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendMms`, "POST", typeof data === "object" ? data : { value: data });
};

const listMessages: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listMessages/${id}` : `/listMessages`);
};

const getMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getMessage/${id}` : `/getMessage`);
};

const makeCall: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/makeCall${id ? `/${id}` : ""}`);
};

const listCalls: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCalls/${id}` : `/listCalls`);
};

const getCall: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCall/${id}` : `/getCall`);
};

const listPhoneNumbers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPhoneNumbers/${id}` : `/listPhoneNumbers`);
};

const lookupPhoneNumber: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/lookupPhoneNumber/${id}` : `/lookupPhoneNumber`);
};

const createVerifyService: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createVerifyService`, "POST", typeof data === "object" ? data : { value: data });
};

const sendVerification: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendVerification`, "POST", typeof data === "object" ? data : { value: data });
};

const checkVerification: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/checkVerification/${id}` : `/checkVerification`);
};

const listConversations: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listConversations/${id}` : `/listConversations`);
};

const createConversation: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createConversation`, "POST", typeof data === "object" ? data : { value: data });
};

const addParticipant: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addParticipant`, "POST", typeof data === "object" ? data : { value: data });
};

const sendConversationMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendConversationMessage`, "POST", typeof data === "object" ? data : { value: data });
};

const getAccountInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAccountInfo/${id}` : `/getAccountInfo`);
};

const deleteMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("twilio.deleteMessage requires an ID.");
  return apiCall(`/deleteMessage/${id}`, "DELETE");
};

export const TwilioFunctions: Record<string, BuiltinHandler> = {
  setCredentials, sendSms, sendMms, listMessages, getMessage, makeCall, listCalls, getCall, listPhoneNumbers, lookupPhoneNumber, createVerifyService, sendVerification, checkVerification, listConversations, createConversation, addParticipant, sendConversationMessage, getAccountInfo, deleteMessage,
};

export const TwilioFunctionMetadata = {
  setCredentials: { description: "Configure twilio credentials.", parameters: [{ name: "accountSid", dataType: "string", description: "accountSid", formInputType: "text", required: true }, { name: "authToken", dataType: "string", description: "authToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  sendSms: { description: "sendSms", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendMms: { description: "sendMms", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listMessages: { description: "listMessages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getMessage: { description: "getMessage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  makeCall: { description: "makeCall", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCalls: { description: "listCalls", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCall: { description: "getCall", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPhoneNumbers: { description: "listPhoneNumbers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  lookupPhoneNumber: { description: "lookupPhoneNumber", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createVerifyService: { description: "createVerifyService", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendVerification: { description: "sendVerification", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  checkVerification: { description: "checkVerification", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listConversations: { description: "listConversations", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createConversation: { description: "createConversation", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addParticipant: { description: "addParticipant", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendConversationMessage: { description: "sendConversationMessage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAccountInfo: { description: "getAccountInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteMessage: { description: "deleteMessage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const TwilioModuleMetadata = {
  description: "Twilio — SMS, voice calls, verify, and phone lookups.",
  methods: Object.keys(TwilioFunctions),
  category: "communication",
};
