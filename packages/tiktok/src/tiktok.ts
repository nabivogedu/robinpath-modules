import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Tiktok: "${key}" not configured. Call tiktok.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://open.tiktokapis.com/v2${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Tiktok API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("tiktok.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Tiktok credentials configured.";
};

const getUserInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUserInfo/${id}` : `/getUserInfo`);
};

const listVideos: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listVideos/${id}` : `/listVideos`);
};

const getVideoById: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getVideoById/${id}` : `/getVideoById`);
};

const initVideoPublish: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/initVideoPublish`, "POST", typeof data === "object" ? data : { value: data });
};

const queryCreatorInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/queryCreatorInfo/${id}` : `/queryCreatorInfo`);
};

const getVideoComments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getVideoComments/${id}` : `/getVideoComments`);
};

const replyToComment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/replyToComment`, "POST", typeof data === "object" ? data : { value: data });
};

const getVideoInsights: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getVideoInsights/${id}` : `/getVideoInsights`);
};

const searchVideos: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchVideos/${id}` : `/searchVideos`);
};

const getTrendingHashtags: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getTrendingHashtags/${id}` : `/getTrendingHashtags`);
};

const getHashtagInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getHashtagInfo/${id}` : `/getHashtagInfo`);
};

const getUserFollowers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUserFollowers/${id}` : `/getUserFollowers`);
};

const getUserFollowing: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getUserFollowing/${id}` : `/getUserFollowing`);
};

const likeVideo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/likeVideo${id ? `/${id}` : ""}`);
};

const unlikeVideo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("tiktok.unlikeVideo requires an ID.");
  return apiCall(`/unlikeVideo/${id}`, "DELETE");
};

const getAccountStats: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getAccountStats/${id}` : `/getAccountStats`);
};

export const TiktokFunctions: Record<string, BuiltinHandler> = {
  setCredentials, getUserInfo, listVideos, getVideoById, initVideoPublish, queryCreatorInfo, getVideoComments, replyToComment, getVideoInsights, searchVideos, getTrendingHashtags, getHashtagInfo, getUserFollowers, getUserFollowing, likeVideo, unlikeVideo, getAccountStats,
};

export const TiktokFunctionMetadata = {
  setCredentials: { description: "Configure tiktok credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  getUserInfo: { description: "getUserInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listVideos: { description: "listVideos", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getVideoById: { description: "getVideoById", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  initVideoPublish: { description: "initVideoPublish", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  queryCreatorInfo: { description: "queryCreatorInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getVideoComments: { description: "getVideoComments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  replyToComment: { description: "replyToComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getVideoInsights: { description: "getVideoInsights", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchVideos: { description: "searchVideos", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTrendingHashtags: { description: "getTrendingHashtags", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getHashtagInfo: { description: "getHashtagInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUserFollowers: { description: "getUserFollowers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getUserFollowing: { description: "getUserFollowing", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  likeVideo: { description: "likeVideo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  unlikeVideo: { description: "unlikeVideo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getAccountStats: { description: "getAccountStats", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const TiktokModuleMetadata = {
  description: "TikTok Business API — video publishing, analytics, comments, and research.",
  methods: Object.keys(TiktokFunctions),
  category: "social",
};
