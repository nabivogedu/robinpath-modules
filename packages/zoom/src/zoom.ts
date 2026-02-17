import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Zoom: "${key}" not configured. Call zoom.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.zoom.us/v2${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Zoom API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("zoom.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Zoom credentials configured.";
};

const listMeetings: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listMeetings/${id}` : `/listMeetings`);
};

const getMeeting: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getMeeting/${id}` : `/getMeeting`);
};

const createMeeting: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createMeeting`, "POST", typeof data === "object" ? data : { value: data });
};

const updateMeeting: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("zoom.updateMeeting requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateMeeting/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteMeeting: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("zoom.deleteMeeting requires an ID.");
  return apiCall(`/deleteMeeting/${id}`, "DELETE");
};

const endMeeting: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("zoom.endMeeting requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/endMeeting/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listMeetingRegistrants: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listMeetingRegistrants/${id}` : `/listMeetingRegistrants`);
};

const addMeetingRegistrant: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addMeetingRegistrant`, "POST", typeof data === "object" ? data : { value: data });
};

const listRecordings: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listRecordings/${id}` : `/listRecordings`);
};

const getRecording: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getRecording/${id}` : `/getRecording`);
};

const deleteRecording: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("zoom.deleteRecording requires an ID.");
  return apiCall(`/deleteRecording/${id}`, "DELETE");
};

const listUsers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listUsers/${id}` : `/listUsers`);
};

const getUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUser/${id}` : `/getUser`);
};

const listWebinars: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listWebinars/${id}` : `/listWebinars`);
};

const createWebinar: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createWebinar`, "POST", typeof data === "object" ? data : { value: data });
};

const getMeetingParticipants: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getMeetingParticipants/${id}` : `/getMeetingParticipants`);
};

const sendChatMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/sendChatMessage`, "POST", typeof data === "object" ? data : { value: data });
};

const listChannels: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listChannels/${id}` : `/listChannels`);
};

export const ZoomFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listMeetings, getMeeting, createMeeting, updateMeeting, deleteMeeting, endMeeting, listMeetingRegistrants, addMeetingRegistrant, listRecordings, getRecording, deleteRecording, listUsers, getUser, listWebinars, createWebinar, getMeetingParticipants, sendChatMessage, listChannels,
};

export const ZoomFunctionMetadata = {
  setCredentials: { description: "Configure zoom credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listMeetings: { description: "listMeetings", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getMeeting: { description: "getMeeting", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createMeeting: { description: "createMeeting", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateMeeting: { description: "updateMeeting", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteMeeting: { description: "deleteMeeting", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  endMeeting: { description: "endMeeting", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listMeetingRegistrants: { description: "listMeetingRegistrants", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addMeetingRegistrant: { description: "addMeetingRegistrant", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listRecordings: { description: "listRecordings", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getRecording: { description: "getRecording", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteRecording: { description: "deleteRecording", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listUsers: { description: "listUsers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUser: { description: "getUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listWebinars: { description: "listWebinars", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createWebinar: { description: "createWebinar", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getMeetingParticipants: { description: "getMeetingParticipants", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendChatMessage: { description: "sendChatMessage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listChannels: { description: "listChannels", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const ZoomModuleMetadata = {
  description: "Zoom — meetings, webinars, recordings, users, and chat.",
  methods: Object.keys(ZoomFunctions),
  category: "meetings",
};
