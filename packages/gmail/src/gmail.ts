import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Gmail: "${key}" not configured. Call gmail.setCredentials first.`);
  return val;
}

async function gmailApi(path: string, method = "GET", body?: unknown): Promise<Value> {
  const token = getConfig("accessToken");
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me${path}`, {
    method, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Gmail API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("gmail.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Gmail credentials configured.";
};

const listMessages: BuiltinHandler = async (args) => {
  const q = args[0] as string | undefined; const max = (args[1] as number) || 10; return gmailApi(`/messages?maxResults=${max}${q ? `&q=${encodeURIComponent(q)}` : ""}`);
};

const getMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string; if (!id) throw new Error("getMessage requires messageId"); return gmailApi(`/messages/${id}`);
};

const sendEmail: BuiltinHandler = async (args) => {
  const to = args[0] as string; const subject = args[1] as string; const body = args[2] as string; if (!to||!subject||!body) throw new Error("sendEmail requires to, subject, body"); const raw = btoa(`To: ${to}\r\nSubject: ${subject}\r\nContent-Type: text/plain; charset=utf-8\r\n\r\n${body}`).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""); return gmailApi("/messages/send","POST",{raw});
};

const trashMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string; if (!id) throw new Error("trashMessage requires messageId"); return gmailApi(`/messages/${id}/trash`,"POST");
};

const untrashMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string; if (!id) throw new Error("untrashMessage requires messageId"); return gmailApi(`/messages/${id}/untrash`,"POST");
};

const deleteMessage: BuiltinHandler = async (args) => {
  const id = args[0] as string; if (!id) throw new Error("deleteMessage requires messageId"); return gmailApi(`/messages/${id}`,"DELETE");
};

const modifyLabels: BuiltinHandler = async (args) => {
  const id = args[0] as string; const add = (args[1] || []) as string[]; const rem = (args[2] || []) as string[]; if (!id) throw new Error("modifyLabels requires messageId"); return gmailApi(`/messages/${id}/modify`,"POST",{addLabelIds:add,removeLabelIds:rem});
};

const markAsRead: BuiltinHandler = async (args) => {
  const id = args[0] as string; if (!id) throw new Error("markAsRead requires messageId"); return gmailApi(`/messages/${id}/modify`,"POST",{removeLabelIds:["UNREAD"]});
};

const markAsUnread: BuiltinHandler = async (args) => {
  const id = args[0] as string; if (!id) throw new Error("markAsUnread requires messageId"); return gmailApi(`/messages/${id}/modify`,"POST",{addLabelIds:["UNREAD"]});
};

const listLabels: BuiltinHandler = async (args) => {
  return gmailApi("/labels");
};

const createLabel: BuiltinHandler = async (args) => {
  const n = args[0] as string; if (!n) throw new Error("createLabel requires name"); return gmailApi("/labels","POST",{name:n});
};

const createDraft: BuiltinHandler = async (args) => {
  const to = args[0] as string; const subject = args[1] as string; const body = args[2] as string; if (!to||!subject||!body) throw new Error("createDraft requires to, subject, body"); const raw = btoa(`To: ${to}\r\nSubject: ${subject}\r\nContent-Type: text/plain; charset=utf-8\r\n\r\n${body}`).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,""); return gmailApi("/drafts","POST",{message:{raw}});
};

const listDrafts: BuiltinHandler = async (args) => {
  const max = (args[0] as number) || 10; return gmailApi(`/drafts?maxResults=${max}`);
};

const sendDraft: BuiltinHandler = async (args) => {
  const id = args[0] as string; if (!id) throw new Error("sendDraft requires draftId"); return gmailApi("/drafts/send","POST",{id});
};

const deleteDraft: BuiltinHandler = async (args) => {
  const id = args[0] as string; if (!id) throw new Error("deleteDraft requires draftId"); return gmailApi(`/drafts/${id}`,"DELETE");
};

const getProfile: BuiltinHandler = async (args) => {
  return gmailApi("/profile");
};

export const GmailFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listMessages, getMessage, sendEmail, trashMessage, untrashMessage, deleteMessage, modifyLabels, markAsRead, markAsUnread, listLabels, createLabel, createDraft, listDrafts, sendDraft, deleteDraft, getProfile,
};

export const GmailFunctionMetadata = {
  setCredentials: { description: "Configure Gmail OAuth2 credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "OAuth2 access token", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listMessages: { description: "List/search messages", parameters: [{ name: "query", dataType: "string", description: "Search query", formInputType: "text", required: false }, { name: "maxResults", dataType: "number", description: "Max results", formInputType: "number", required: false }], returnType: "object", returnDescription: "API response." },
  getMessage: { description: "Get message details", parameters: [{ name: "messageId", dataType: "string", description: "Message ID", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  sendEmail: { description: "Send a plain text email", parameters: [{ name: "to", dataType: "string", description: "Recipient", formInputType: "text", required: true }, { name: "subject", dataType: "string", description: "Subject", formInputType: "text", required: true }, { name: "body", dataType: "string", description: "Body", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  trashMessage: { description: "Move message to trash", parameters: [{ name: "messageId", dataType: "string", description: "Message ID", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  untrashMessage: { description: "Remove from trash", parameters: [{ name: "messageId", dataType: "string", description: "Message ID", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  deleteMessage: { description: "Permanently delete message", parameters: [{ name: "messageId", dataType: "string", description: "Message ID", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  modifyLabels: { description: "Add/remove labels", parameters: [{ name: "messageId", dataType: "string", description: "Message ID", formInputType: "text", required: true }, { name: "addLabels", dataType: "object", description: "Labels to add", formInputType: "json", required: false }, { name: "removeLabels", dataType: "object", description: "Labels to remove", formInputType: "json", required: false }], returnType: "object", returnDescription: "API response." },
  markAsRead: { description: "Mark as read", parameters: [{ name: "messageId", dataType: "string", description: "Message ID", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  markAsUnread: { description: "Mark as unread", parameters: [{ name: "messageId", dataType: "string", description: "Message ID", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listLabels: { description: "List all labels", parameters: [], returnType: "object", returnDescription: "API response." },
  createLabel: { description: "Create a label", parameters: [{ name: "name", dataType: "string", description: "Label name", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  createDraft: { description: "Create a draft", parameters: [{ name: "to", dataType: "string", description: "Recipient", formInputType: "text", required: true }, { name: "subject", dataType: "string", description: "Subject", formInputType: "text", required: true }, { name: "body", dataType: "string", description: "Body", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listDrafts: { description: "List drafts", parameters: [{ name: "maxResults", dataType: "number", description: "Max results", formInputType: "number", required: false }], returnType: "object", returnDescription: "API response." },
  sendDraft: { description: "Send a draft", parameters: [{ name: "draftId", dataType: "string", description: "Draft ID", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  deleteDraft: { description: "Delete a draft", parameters: [{ name: "draftId", dataType: "string", description: "Draft ID", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  getProfile: { description: "Get user profile", parameters: [], returnType: "object", returnDescription: "API response." },
};

export const GmailModuleMetadata = {
  description: "Read, send, label, search, and manage emails via the Gmail REST API.",
  methods: Object.keys(GmailFunctions),
  category: "email",
};