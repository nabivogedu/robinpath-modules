import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Facebook: "${key}" not configured. Call facebook.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://graph.facebook.com/v18.0${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Facebook API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("facebook.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Facebook credentials configured.";
};

const getPageInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPageInfo/${id}` : `/getPageInfo`);
};

const listPagePosts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPagePosts/${id}` : `/listPagePosts`);
};

const createPagePost: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createPagePost`, "POST", typeof data === "object" ? data : { value: data });
};

const updatePost: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("facebook.updatePost requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updatePost/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deletePost: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("facebook.deletePost requires an ID.");
  return apiCall(`/deletePost/${id}`, "DELETE");
};

const getPost: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPost/${id}` : `/getPost`);
};

const getPostInsights: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPostInsights/${id}` : `/getPostInsights`);
};

const getPageInsights: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPageInsights/${id}` : `/getPageInsights`);
};

const listComments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listComments/${id}` : `/listComments`);
};

const replyToComment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/replyToComment`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteComment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("facebook.deleteComment requires an ID.");
  return apiCall(`/deleteComment/${id}`, "DELETE");
};

const hideComment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("facebook.hideComment requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/hideComment/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listPageEvents: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPageEvents/${id}` : `/listPageEvents`);
};

const createPageEvent: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createPageEvent`, "POST", typeof data === "object" ? data : { value: data });
};

const uploadPhoto: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/uploadPhoto`, "POST", typeof data === "object" ? data : { value: data });
};

const uploadVideo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/uploadVideo`, "POST", typeof data === "object" ? data : { value: data });
};

const getAdAccounts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAdAccounts/${id}` : `/getAdAccounts`);
};

const getCampaigns: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCampaigns/${id}` : `/getCampaigns`);
};

const getMe: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getMe/${id}` : `/getMe`);
};

const searchPages: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchPages/${id}` : `/searchPages`);
};

export const FacebookFunctions: Record<string, BuiltinHandler> = {
  setCredentials, getPageInfo, listPagePosts, createPagePost, updatePost, deletePost, getPost, getPostInsights, getPageInsights, listComments, replyToComment, deleteComment, hideComment, listPageEvents, createPageEvent, uploadPhoto, uploadVideo, getAdAccounts, getCampaigns, getMe, searchPages,
};

export const FacebookFunctionMetadata = {
  setCredentials: { description: "Configure facebook credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  getPageInfo: { description: "getPageInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPagePosts: { description: "listPagePosts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createPagePost: { description: "createPagePost", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updatePost: { description: "updatePost", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deletePost: { description: "deletePost", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPost: { description: "getPost", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPostInsights: { description: "getPostInsights", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPageInsights: { description: "getPageInsights", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listComments: { description: "listComments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  replyToComment: { description: "replyToComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteComment: { description: "deleteComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  hideComment: { description: "hideComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPageEvents: { description: "listPageEvents", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createPageEvent: { description: "createPageEvent", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  uploadPhoto: { description: "uploadPhoto", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  uploadVideo: { description: "uploadVideo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAdAccounts: { description: "getAdAccounts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCampaigns: { description: "getCampaigns", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getMe: { description: "getMe", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchPages: { description: "searchPages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const FacebookModuleMetadata = {
  description: "Facebook Pages and Marketing — posts, comments, insights, and ad campaigns.",
  methods: Object.keys(FacebookFunctions),
  category: "social",
};
