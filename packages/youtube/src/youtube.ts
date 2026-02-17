import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Youtube: "${key}" not configured. Call youtube.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://www.googleapis.com/youtube/v3${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Youtube API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("youtube.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Youtube credentials configured.";
};

const searchVideos: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchVideos/${id}` : `/searchVideos`);
};

const getVideo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getVideo/${id}` : `/getVideo`);
};

const listMyVideos: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listMyVideos/${id}` : `/listMyVideos`);
};

const updateVideo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("youtube.updateVideo requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateVideo/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteVideo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("youtube.deleteVideo requires an ID.");
  return apiCall(`/deleteVideo/${id}`, "DELETE");
};

const listChannels: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listChannels/${id}` : `/listChannels`);
};

const getChannelStats: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getChannelStats/${id}` : `/getChannelStats`);
};

const listPlaylists: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPlaylists/${id}` : `/listPlaylists`);
};

const getPlaylist: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPlaylist/${id}` : `/getPlaylist`);
};

const createPlaylist: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createPlaylist`, "POST", typeof data === "object" ? data : { value: data });
};

const deletePlaylist: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("youtube.deletePlaylist requires an ID.");
  return apiCall(`/deletePlaylist/${id}`, "DELETE");
};

const listPlaylistItems: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPlaylistItems/${id}` : `/listPlaylistItems`);
};

const addVideoToPlaylist: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/addVideoToPlaylist`, "POST", typeof data === "object" ? data : { value: data });
};

const removeFromPlaylist: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("youtube.removeFromPlaylist requires an ID.");
  return apiCall(`/removeFromPlaylist/${id}`, "DELETE");
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

const replyToComment: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/replyToComment`, "POST", typeof data === "object" ? data : { value: data });
};

const setThumbnail: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/setThumbnail`, "POST", typeof data === "object" ? data : { value: data });
};

const getVideoCategories: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getVideoCategories/${id}` : `/getVideoCategories`);
};

const listSubscriptions: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listSubscriptions/${id}` : `/listSubscriptions`);
};

export const YoutubeFunctions: Record<string, BuiltinHandler> = {
  setCredentials, searchVideos, getVideo, listMyVideos, updateVideo, deleteVideo, listChannels, getChannelStats, listPlaylists, getPlaylist, createPlaylist, deletePlaylist, listPlaylistItems, addVideoToPlaylist, removeFromPlaylist, listComments, addComment, replyToComment, setThumbnail, getVideoCategories, listSubscriptions,
};

export const YoutubeFunctionMetadata = {
  setCredentials: { description: "Configure youtube credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  searchVideos: { description: "searchVideos", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getVideo: { description: "getVideo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listMyVideos: { description: "listMyVideos", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateVideo: { description: "updateVideo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteVideo: { description: "deleteVideo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listChannels: { description: "listChannels", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getChannelStats: { description: "getChannelStats", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPlaylists: { description: "listPlaylists", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPlaylist: { description: "getPlaylist", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createPlaylist: { description: "createPlaylist", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deletePlaylist: { description: "deletePlaylist", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPlaylistItems: { description: "listPlaylistItems", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addVideoToPlaylist: { description: "addVideoToPlaylist", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  removeFromPlaylist: { description: "removeFromPlaylist", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listComments: { description: "listComments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  addComment: { description: "addComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  replyToComment: { description: "replyToComment", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  setThumbnail: { description: "setThumbnail", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getVideoCategories: { description: "getVideoCategories", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listSubscriptions: { description: "listSubscriptions", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const YoutubeModuleMetadata = {
  description: "YouTube Data API — videos, channels, playlists, comments, and search.",
  methods: Object.keys(YoutubeFunctions),
  category: "social",
};
