import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Webflow: "${key}" not configured. Call webflow.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.webflow.com/v2${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Webflow API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("webflow.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Webflow credentials configured.";
};

const listSites: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSites/${id}` : `/listSites`);
};

const getSite: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSite/${id}` : `/getSite`);
};

const publishSite: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("webflow.publishSite requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/publishSite/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listCollections: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCollections/${id}` : `/listCollections`);
};

const getCollection: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCollection/${id}` : `/getCollection`);
};

const listCollectionItems: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCollectionItems/${id}` : `/listCollectionItems`);
};

const getCollectionItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCollectionItem/${id}` : `/getCollectionItem`);
};

const createCollectionItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createCollectionItem`, "POST", typeof data === "object" ? data : { value: data });
};

const updateCollectionItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("webflow.updateCollectionItem requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateCollectionItem/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteCollectionItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("webflow.deleteCollectionItem requires an ID.");
  return apiCall(`/deleteCollectionItem/${id}`, "DELETE");
};

const publishCollectionItems: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("webflow.publishCollectionItems requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/publishCollectionItems/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listFormSubmissions: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listFormSubmissions/${id}` : `/listFormSubmissions`);
};

const listDomains: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDomains/${id}` : `/listDomains`);
};

const getUser: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUser/${id}` : `/getUser`);
};

const listUsers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listUsers/${id}` : `/listUsers`);
};

const listOrders: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listOrders/${id}` : `/listOrders`);
};

const getOrder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrder/${id}` : `/getOrder`);
};

const updateOrder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("webflow.updateOrder requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateOrder/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

export const WebflowFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listSites, getSite, publishSite, listCollections, getCollection, listCollectionItems, getCollectionItem, createCollectionItem, updateCollectionItem, deleteCollectionItem, publishCollectionItems, listFormSubmissions, listDomains, getUser, listUsers, listOrders, getOrder, updateOrder,
};

export const WebflowFunctionMetadata = {
  setCredentials: { description: "Configure webflow credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listSites: { description: "listSites", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSite: { description: "getSite", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  publishSite: { description: "publishSite", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCollections: { description: "listCollections", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCollection: { description: "getCollection", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCollectionItems: { description: "listCollectionItems", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCollectionItem: { description: "getCollectionItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createCollectionItem: { description: "createCollectionItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateCollectionItem: { description: "updateCollectionItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteCollectionItem: { description: "deleteCollectionItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  publishCollectionItems: { description: "publishCollectionItems", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listFormSubmissions: { description: "listFormSubmissions", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listDomains: { description: "listDomains", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUser: { description: "getUser", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listUsers: { description: "listUsers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listOrders: { description: "listOrders", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrder: { description: "getOrder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateOrder: { description: "updateOrder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const WebflowModuleMetadata = {
  description: "Webflow — sites, CMS collections, items, forms, and ecommerce.",
  methods: Object.keys(WebflowFunctions),
  category: "cms",
};
