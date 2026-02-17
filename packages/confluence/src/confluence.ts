import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Confluence: "${key}" not configured. Call confluence.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://${getConfig("domain")}${path}`, {
    method,
    headers: { "Authorization": "Basic " + btoa(`${getConfig("domain")}:${getConfig("email")}`), "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Confluence API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const domain = args[0] as string;
  const email = args[1] as string;
  const apiToken = args[2] as string;
  if (!domain || !email || !apiToken) throw new Error("confluence.setCredentials requires domain, email, apiToken.");
  config.set("domain", domain);
  config.set("email", email);
  config.set("apiToken", apiToken);
  return "Confluence credentials configured.";
};

const listSpaces: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSpaces/${id}` : `/listSpaces`);
};

const getSpace: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getSpace/${id}` : `/getSpace`);
};

const createSpace: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createSpace`, "POST", typeof data === "object" ? data : { value: data });
};

const listPages: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPages/${id}` : `/listPages`);
};

const getPage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPage/${id}` : `/getPage`);
};

const createPage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createPage`, "POST", typeof data === "object" ? data : { value: data });
};

const updatePage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("confluence.updatePage requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updatePage/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deletePage: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("confluence.deletePage requires an ID.");
  return apiCall(`/deletePage/${id}`, "DELETE");
};

const listPageChildren: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPageChildren/${id}` : `/listPageChildren`);
};

const getPageByTitle: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPageByTitle/${id}` : `/getPageByTitle`);
};

const searchContent: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchContent/${id}` : `/searchContent`);
};

const listComments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listComments/${id}` : `/listComments`);
};

const addComment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addComment`, "POST", typeof data === "object" ? data : { value: data });
};

const listAttachments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listAttachments/${id}` : `/listAttachments`);
};

const getLabels: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getLabels/${id}` : `/getLabels`);
};

const addLabel: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addLabel`, "POST", typeof data === "object" ? data : { value: data });
};

const removeLabel: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("confluence.removeLabel requires an ID.");
  return apiCall(`/removeLabel/${id}`, "DELETE");
};

const getPageHistory: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPageHistory/${id}` : `/getPageHistory`);
};

export const ConfluenceFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listSpaces, getSpace, createSpace, listPages, getPage, createPage, updatePage, deletePage, listPageChildren, getPageByTitle, searchContent, listComments, addComment, listAttachments, getLabels, addLabel, removeLabel, getPageHistory,
};

export const ConfluenceFunctionMetadata = {
  setCredentials: { description: "Configure confluence credentials.", parameters: [{ name: "domain", dataType: "string", description: "domain", formInputType: "text", required: true }, { name: "email", dataType: "string", description: "email", formInputType: "text", required: true }, { name: "apiToken", dataType: "string", description: "apiToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listSpaces: { description: "listSpaces", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSpace: { description: "getSpace", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createSpace: { description: "createSpace", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPages: { description: "listPages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPage: { description: "getPage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createPage: { description: "createPage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updatePage: { description: "updatePage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deletePage: { description: "deletePage", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPageChildren: { description: "listPageChildren", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPageByTitle: { description: "getPageByTitle", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchContent: { description: "searchContent", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listComments: { description: "listComments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addComment: { description: "addComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listAttachments: { description: "listAttachments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getLabels: { description: "getLabels", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addLabel: { description: "addLabel", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  removeLabel: { description: "removeLabel", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPageHistory: { description: "getPageHistory", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const ConfluenceModuleMetadata = {
  description: "Confluence — pages, spaces, comments, search, attachments, and labels.",
  methods: Object.keys(ConfluenceFunctions),
  category: "documentation",
};
