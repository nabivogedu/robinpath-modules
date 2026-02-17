import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Convertkit: "${key}" not configured. Call convertkit.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.convertkit.com/v3${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("apiSecret")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Convertkit API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiSecret = args[0] as string;
  if (!apiSecret) throw new Error("convertkit.setCredentials requires apiSecret.");
  config.set("apiSecret", apiSecret);
  return "Convertkit credentials configured.";
};

const listSubscribers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSubscribers/${id}` : `/listSubscribers`);
};

const getSubscriber: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSubscriber/${id}` : `/getSubscriber`);
};

const createSubscriber: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createSubscriber`, "POST", typeof data === "object" ? data : { value: data });
};

const updateSubscriber: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("convertkit.updateSubscriber requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateSubscriber/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const unsubscribeSubscriber: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("convertkit.unsubscribeSubscriber requires an ID.");
  return apiCall(`/unsubscribeSubscriber/${id}`, "DELETE");
};

const listTags: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTags/${id}` : `/listTags`);
};

const createTag: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createTag`, "POST", typeof data === "object" ? data : { value: data });
};

const tagSubscriber: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/tagSubscriber`, "POST", typeof data === "object" ? data : { value: data });
};

const removeTagFromSubscriber: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("convertkit.removeTagFromSubscriber requires an ID.");
  return apiCall(`/removeTagFromSubscriber/${id}`, "DELETE");
};

const listSequences: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSequences/${id}` : `/listSequences`);
};

const addSubscriberToSequence: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addSubscriberToSequence`, "POST", typeof data === "object" ? data : { value: data });
};

const listForms: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listForms/${id}` : `/listForms`);
};

const listBroadcasts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listBroadcasts/${id}` : `/listBroadcasts`);
};

const createBroadcast: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createBroadcast`, "POST", typeof data === "object" ? data : { value: data });
};

const getAccount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAccount/${id}` : `/getAccount`);
};

const listPurchases: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPurchases/${id}` : `/listPurchases`);
};

export const ConvertkitFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listSubscribers, getSubscriber, createSubscriber, updateSubscriber, unsubscribeSubscriber, listTags, createTag, tagSubscriber, removeTagFromSubscriber, listSequences, addSubscriberToSequence, listForms, listBroadcasts, createBroadcast, getAccount, listPurchases,
};

export const ConvertkitFunctionMetadata = {
  setCredentials: { description: "Configure convertkit credentials.", parameters: [{ name: "apiSecret", dataType: "string", description: "apiSecret", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listSubscribers: { description: "listSubscribers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSubscriber: { description: "getSubscriber", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createSubscriber: { description: "createSubscriber", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateSubscriber: { description: "updateSubscriber", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  unsubscribeSubscriber: { description: "unsubscribeSubscriber", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTags: { description: "listTags", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createTag: { description: "createTag", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  tagSubscriber: { description: "tagSubscriber", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  removeTagFromSubscriber: { description: "removeTagFromSubscriber", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSequences: { description: "listSequences", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addSubscriberToSequence: { description: "addSubscriberToSequence", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listForms: { description: "listForms", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listBroadcasts: { description: "listBroadcasts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createBroadcast: { description: "createBroadcast", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAccount: { description: "getAccount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPurchases: { description: "listPurchases", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const ConvertkitModuleMetadata = {
  description: "ConvertKit (Kit) — subscribers, sequences, broadcasts, forms, and tags.",
  methods: Object.keys(ConvertkitFunctions),
  category: "email-marketing",
};
