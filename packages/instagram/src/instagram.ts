import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── Internal State ──────────────────────────────────────────────────

interface AccountConfig {
  accessToken: string;
  igBusinessAccountId: string;
}

const accounts = new Map<string, AccountConfig>();

const API_BASE = "https://graph.facebook.com/v22.0";

// ── Helper ──────────────────────────────────────────────────────────

function getConfig(accountId: string = "default"): AccountConfig {
  const config = accounts.get(accountId);
  if (!config) {
    throw new Error(
      `Instagram account "${accountId}" not configured. Call instagram.setToken or instagram.setBusinessAccount first.`,
    );
  }
  return config;
}

async function callApi(
  endpoint: string,
  accessToken: string,
  method: string = "GET",
  body?: Record<string, unknown>,
): Promise<Value> {
  const url = new URL(`${API_BASE}/${endpoint}`);

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
  };

  const fetchOptions: RequestInit = { method, headers };

  if (body && (method === "POST" || method === "DELETE")) {
    headers["Content-Type"] = "application/json";
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), fetchOptions);
  const result = (await response.json()) as Record<string, unknown>;

  if (result.error) {
    const err = result.error as Record<string, unknown>;
    throw new Error(
      `Instagram API error: ${String(err.message ?? err.type ?? "unknown_error")} (code ${err.code ?? "?"})`,
    );
  }

  return result;
}

async function callApiGet(
  endpoint: string,
  accessToken: string,
  params?: Record<string, string>,
): Promise<Value> {
  const url = new URL(`${API_BASE}/${endpoint}`);
  url.searchParams.set("access_token", accessToken);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  const response = await fetch(url.toString());
  const result = (await response.json()) as Record<string, unknown>;

  if (result.error) {
    const err = result.error as Record<string, unknown>;
    throw new Error(
      `Instagram API error: ${String(err.message ?? err.type ?? "unknown_error")} (code ${err.code ?? "?"})`,
    );
  }

  return result;
}

async function callApiPost(
  endpoint: string,
  accessToken: string,
  body: Record<string, unknown>,
): Promise<Value> {
  const url = new URL(`${API_BASE}/${endpoint}`);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = (await response.json()) as Record<string, unknown>;

  if (result.error) {
    const err = result.error as Record<string, unknown>;
    throw new Error(
      `Instagram API error: ${String(err.message ?? err.type ?? "unknown_error")} (code ${err.code ?? "?"})`,
    );
  }

  return result;
}

async function callApiDelete(
  endpoint: string,
  accessToken: string,
): Promise<Value> {
  const url = new URL(`${API_BASE}/${endpoint}`);

  const response = await fetch(url.toString(), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = (await response.json()) as Record<string, unknown>;

  if (result.error) {
    const err = result.error as Record<string, unknown>;
    throw new Error(
      `Instagram API error: ${String(err.message ?? err.type ?? "unknown_error")} (code ${err.code ?? "?"})`,
    );
  }

  return result;
}

// ── Function Handlers ───────────────────────────────────────────────

const setToken: BuiltinHandler = (args) => {
  const accessToken = String(args[0] ?? "");
  if (!accessToken) throw new Error("Access token is required.");

  accounts.set("default", {
    accessToken,
    igBusinessAccountId: "",
  });

  return { ok: true, accountId: "default" };
};

const setBusinessAccount: BuiltinHandler = (args) => {
  const accessToken = String(args[0] ?? "");
  const igBusinessAccountId = String(args[1] ?? "");

  if (!accessToken) throw new Error("Access token is required.");
  if (!igBusinessAccountId) throw new Error("IG Business Account ID is required.");

  accounts.set("default", {
    accessToken,
    igBusinessAccountId,
  });

  return { ok: true, accountId: "default", igBusinessAccountId };
};

const getProfile: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const fields = String(
    opts.fields ?? "id,name,username,biography,followers_count,follows_count,media_count,profile_picture_url,website",
  );

  const result = await callApiGet(`${config.igBusinessAccountId}`, config.accessToken, { fields });
  return result;
};

const getMedia: BuiltinHandler = async (args) => {
  const mediaId = String(args[0] ?? "");
  const fields = String(
    args[1] ?? "id,caption,media_type,media_url,timestamp,permalink,like_count,comments_count,thumbnail_url",
  );

  if (!mediaId) throw new Error("Media ID is required.");

  const config = getConfig("default");
  const result = await callApiGet(mediaId, config.accessToken, { fields });
  return result;
};

const listMedia: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const params: Record<string, string> = {
    fields: String(opts.fields ?? "id,caption,media_type,media_url,timestamp,permalink,like_count,comments_count"),
  };

  if (opts.limit) params.limit = String(opts.limit);
  if (opts.after) params.after = String(opts.after);
  if (opts.before) params.before = String(opts.before);

  const result = await callApiGet(`${config.igBusinessAccountId}/media`, config.accessToken, params);
  return result;
};

const createMediaContainer: BuiltinHandler = async (args) => {
  const imageUrl = String(args[0] ?? "");
  const caption = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!imageUrl) throw new Error("Image URL is required.");

  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const body: Record<string, unknown> = {
    image_url: imageUrl,
    access_token: config.accessToken,
  };

  if (caption) body.caption = caption;
  if (opts.locationId) body.location_id = String(opts.locationId);
  if (opts.userTags) body.user_tags = opts.userTags;
  if (opts.isCarouselItem) body.is_carousel_item = true;

  const result = await callApiPost(`${config.igBusinessAccountId}/media`, config.accessToken, body);
  return result;
};

const createVideoContainer: BuiltinHandler = async (args) => {
  const videoUrl = String(args[0] ?? "");
  const caption = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!videoUrl) throw new Error("Video URL is required.");

  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const mediaType = String(opts.mediaType ?? "REELS");

  const body: Record<string, unknown> = {
    video_url: videoUrl,
    media_type: mediaType,
    access_token: config.accessToken,
  };

  if (caption) body.caption = caption;
  if (opts.coverUrl) body.cover_url = String(opts.coverUrl);
  if (opts.thumbOffset) body.thumb_offset = Number(opts.thumbOffset);
  if (opts.locationId) body.location_id = String(opts.locationId);
  if (opts.isCarouselItem) body.is_carousel_item = true;
  if (opts.shareToFeed !== undefined) body.share_to_feed = Boolean(opts.shareToFeed);

  const result = await callApiPost(`${config.igBusinessAccountId}/media`, config.accessToken, body);
  return result;
};

const createCarouselContainer: BuiltinHandler = async (args) => {
  const children = Array.isArray(args[0]) ? (args[0] as unknown[]).map(String) : [];
  const caption = String(args[1] ?? "");

  if (children.length < 2) throw new Error("At least 2 child container IDs are required for a carousel.");

  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const body: Record<string, unknown> = {
    media_type: "CAROUSEL",
    children: children.join(","),
    access_token: config.accessToken,
  };

  if (caption) body.caption = caption;

  const result = await callApiPost(`${config.igBusinessAccountId}/media`, config.accessToken, body);
  return result;
};

const publishMedia: BuiltinHandler = async (args) => {
  const containerId = String(args[0] ?? "");

  if (!containerId) throw new Error("Container ID is required.");

  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const body: Record<string, unknown> = {
    creation_id: containerId,
    access_token: config.accessToken,
  };

  const result = await callApiPost(`${config.igBusinessAccountId}/media_publish`, config.accessToken, body);
  return result;
};

const getMediaInsights: BuiltinHandler = async (args) => {
  const mediaId = String(args[0] ?? "");
  const metrics = String(args[1] ?? "impressions,reach,engagement,saved");

  if (!mediaId) throw new Error("Media ID is required.");

  const config = getConfig("default");
  const result = await callApiGet(`${mediaId}/insights`, config.accessToken, { metric: metrics });
  return result;
};

const getAccountInsights: BuiltinHandler = async (args) => {
  const metrics = String(args[0] ?? "impressions,reach,follower_count");
  const period = String(args[1] ?? "day");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const params: Record<string, string> = {
    metric: metrics,
    period,
  };

  if (opts.since) params.since = String(opts.since);
  if (opts.until) params.until = String(opts.until);

  const result = await callApiGet(`${config.igBusinessAccountId}/insights`, config.accessToken, params);
  return result;
};

const getComments: BuiltinHandler = async (args) => {
  const mediaId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!mediaId) throw new Error("Media ID is required.");

  const config = getConfig("default");

  const params: Record<string, string> = {
    fields: String(opts.fields ?? "id,text,timestamp,username,like_count,replies"),
  };

  if (opts.limit) params.limit = String(opts.limit);
  if (opts.after) params.after = String(opts.after);

  const result = await callApiGet(`${mediaId}/comments`, config.accessToken, params);
  return result;
};

const replyToComment: BuiltinHandler = async (args) => {
  const commentId = String(args[0] ?? "");
  const message = String(args[1] ?? "");

  if (!commentId) throw new Error("Comment ID is required.");
  if (!message) throw new Error("Message is required.");

  const config = getConfig("default");

  const body: Record<string, unknown> = {
    message,
    access_token: config.accessToken,
  };

  const result = await callApiPost(`${commentId}/replies`, config.accessToken, body);
  return result;
};

const deleteComment: BuiltinHandler = async (args) => {
  const commentId = String(args[0] ?? "");

  if (!commentId) throw new Error("Comment ID is required.");

  const config = getConfig("default");
  await callApiDelete(commentId, config.accessToken);
  return { ok: true, commentId };
};

const getStories: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const params: Record<string, string> = {
    fields: String(opts.fields ?? "id,media_type,media_url,timestamp,permalink"),
  };

  const result = await callApiGet(`${config.igBusinessAccountId}/stories`, config.accessToken, params);
  return result;
};

const getHashtag: BuiltinHandler = async (args) => {
  const hashtagName = String(args[0] ?? "");

  if (!hashtagName) throw new Error("Hashtag name is required.");

  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const result = await callApiGet("ig_hashtag_search", config.accessToken, {
    q: hashtagName,
    user_id: config.igBusinessAccountId,
  });
  return result;
};

const getHashtagMedia: BuiltinHandler = async (args) => {
  const hashtagId = String(args[0] ?? "");
  const type = String(args[1] ?? "top_media");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!hashtagId) throw new Error("Hashtag ID is required.");

  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const edgeType = type === "recent_media" ? "recent_media" : "top_media";

  const params: Record<string, string> = {
    user_id: config.igBusinessAccountId,
    fields: String(opts.fields ?? "id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count"),
  };

  if (opts.limit) params.limit = String(opts.limit);
  if (opts.after) params.after = String(opts.after);

  const result = await callApiGet(`${hashtagId}/${edgeType}`, config.accessToken, params);
  return result;
};

const getMentions: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const params: Record<string, string> = {
    fields: String(opts.fields ?? "id,caption,media_type,media_url,permalink,timestamp"),
  };

  if (opts.limit) params.limit = String(opts.limit);
  if (opts.after) params.after = String(opts.after);

  const result = await callApiGet(`${config.igBusinessAccountId}/tags`, config.accessToken, params);
  return result;
};

const sendMessage: BuiltinHandler = async (args) => {
  const recipientId = String(args[0] ?? "");
  const message = String(args[1] ?? "");

  if (!recipientId) throw new Error("Recipient ID is required.");
  if (!message) throw new Error("Message is required.");

  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const body: Record<string, unknown> = {
    recipient: { id: recipientId },
    message: { text: message },
    access_token: config.accessToken,
  };

  const result = await callApiPost(`${config.igBusinessAccountId}/messages`, config.accessToken, body);
  return result;
};

const getConversations: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const config = getConfig("default");

  if (!config.igBusinessAccountId) {
    throw new Error("IG Business Account ID is required. Call instagram.setBusinessAccount first.");
  }

  const params: Record<string, string> = {
    platform: "instagram",
    fields: String(opts.fields ?? "id,updated_time,participants,messages"),
  };

  if (opts.limit) params.limit = String(opts.limit);
  if (opts.after) params.after = String(opts.after);

  const result = await callApiGet(`${config.igBusinessAccountId}/conversations`, config.accessToken, params);
  return result;
};

const getMessages: BuiltinHandler = async (args) => {
  const conversationId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!conversationId) throw new Error("Conversation ID is required.");

  const config = getConfig("default");

  const params: Record<string, string> = {
    fields: String(opts.fields ?? "id,message,from,to,created_time"),
  };

  if (opts.limit) params.limit = String(opts.limit);
  if (opts.after) params.after = String(opts.after);

  const result = await callApiGet(`${conversationId}/messages`, config.accessToken, params);
  return result;
};

// ── Exports ─────────────────────────────────────────────────────────

export const InstagramFunctions: Record<string, BuiltinHandler> = {
  setToken,
  setBusinessAccount,
  getProfile,
  getMedia,
  listMedia,
  createMediaContainer,
  createVideoContainer,
  createCarouselContainer,
  publishMedia,
  getMediaInsights,
  getAccountInsights,
  getComments,
  replyToComment,
  deleteComment,
  getStories,
  getHashtag,
  getHashtagMedia,
  getMentions,
  sendMessage,
  getConversations,
  getMessages,
};

export const InstagramFunctionMetadata = {
  setToken: {
    description: "Store a long-lived Instagram access token for API calls",
    parameters: [
      { name: "accessToken", dataType: "string", description: "Long-lived access token from Meta/Facebook", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok, accountId}",
    example: 'instagram.setToken "EAAG..."',
  },
  setBusinessAccount: {
    description: "Store access token and IG Business Account ID for full API access",
    parameters: [
      { name: "accessToken", dataType: "string", description: "Long-lived access token from Meta/Facebook", formInputType: "text", required: true },
      { name: "igBusinessAccountId", dataType: "string", description: "Instagram Business Account ID (numeric)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok, accountId, igBusinessAccountId}",
    example: 'instagram.setBusinessAccount "EAAG..." "17841400123456"',
  },
  getProfile: {
    description: "Get authenticated user's Instagram profile (id, username, biography, followers, media count, etc.)",
    parameters: [
      { name: "options", dataType: "object", description: "{fields?: string} - comma-separated fields to retrieve", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{id, name, username, biography, followers_count, follows_count, media_count, ...}",
    example: 'instagram.getProfile',
  },
  getMedia: {
    description: "Get details of a specific media item by ID",
    parameters: [
      { name: "mediaId", dataType: "string", description: "Media ID to retrieve", formInputType: "text", required: true },
      { name: "fields", dataType: "string", description: "Comma-separated fields (default: id,caption,media_type,media_url,timestamp,permalink,like_count,comments_count)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{id, caption, media_type, media_url, timestamp, permalink, like_count, comments_count, ...}",
    example: 'instagram.getMedia "17895695668004550"',
  },
  listMedia: {
    description: "List the authenticated user's media posts with pagination",
    parameters: [
      { name: "options", dataType: "object", description: "{limit?, after?, before?, fields?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [...media], paging: {cursors, next, previous}}",
    example: 'instagram.listMedia {"limit": 10}',
  },
  createMediaContainer: {
    description: "Create a media container for an image post (returns container ID for publishing)",
    parameters: [
      { name: "imageUrl", dataType: "string", description: "Public URL of the image to post", formInputType: "text", required: true },
      { name: "caption", dataType: "string", description: "Post caption text", formInputType: "textarea", required: false },
      { name: "options", dataType: "object", description: "{locationId?, userTags?, isCarouselItem?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{id} - container ID for use with publishMedia",
    example: 'instagram.createMediaContainer "https://example.com/photo.jpg" "Beautiful sunset! #nature"',
  },
  createVideoContainer: {
    description: "Create a media container for a video or Reel post",
    parameters: [
      { name: "videoUrl", dataType: "string", description: "Public URL of the video", formInputType: "text", required: true },
      { name: "caption", dataType: "string", description: "Post caption text", formInputType: "textarea", required: false },
      { name: "options", dataType: "object", description: "{mediaType?: 'REELS'|'VIDEO', coverUrl?, thumbOffset?, locationId?, isCarouselItem?, shareToFeed?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{id} - container ID for use with publishMedia",
    example: 'instagram.createVideoContainer "https://example.com/video.mp4" "Check this out!" {"mediaType": "REELS"}',
  },
  createCarouselContainer: {
    description: "Create a carousel container from multiple child container IDs",
    parameters: [
      { name: "children", dataType: "array", description: "Array of child container IDs (minimum 2)", formInputType: "json", required: true },
      { name: "caption", dataType: "string", description: "Carousel caption text", formInputType: "textarea", required: false },
    ],
    returnType: "object",
    returnDescription: "{id} - carousel container ID for use with publishMedia",
    example: 'instagram.createCarouselContainer ["17889615691123456", "17889615691123457"] "Photo dump!"',
  },
  publishMedia: {
    description: "Publish a previously created media container (image, video, or carousel)",
    parameters: [
      { name: "containerId", dataType: "string", description: "Container ID from createMediaContainer, createVideoContainer, or createCarouselContainer", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{id} - published media ID",
    example: 'instagram.publishMedia "17889615691123456"',
  },
  getMediaInsights: {
    description: "Get insights/analytics for a specific media item",
    parameters: [
      { name: "mediaId", dataType: "string", description: "Media ID to get insights for", formInputType: "text", required: true },
      { name: "metrics", dataType: "string", description: "Comma-separated metrics (default: impressions,reach,engagement,saved)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{name, period, values, title, description, id}]}",
    example: 'instagram.getMediaInsights "17895695668004550" "impressions,reach,engagement,saved"',
  },
  getAccountInsights: {
    description: "Get account-level insights (impressions, reach, follower_count, etc.)",
    parameters: [
      { name: "metrics", dataType: "string", description: "Comma-separated metrics (e.g. impressions,reach,follower_count)", formInputType: "text", required: true },
      { name: "period", dataType: "string", description: "Time period: day, week, days_28, month, lifetime", formInputType: "select", required: true },
      { name: "options", dataType: "object", description: "{since?: unix_timestamp, until?: unix_timestamp}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{name, period, values, title, description}]}",
    example: 'instagram.getAccountInsights "impressions,reach,follower_count" "day"',
  },
  getComments: {
    description: "List comments on a media post",
    parameters: [
      { name: "mediaId", dataType: "string", description: "Media ID to list comments for", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{limit?, after?, fields?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, text, timestamp, username, like_count}], paging}",
    example: 'instagram.getComments "17895695668004550" {"limit": 25}',
  },
  replyToComment: {
    description: "Reply to a specific comment on a media post",
    parameters: [
      { name: "commentId", dataType: "string", description: "Comment ID to reply to", formInputType: "text", required: true },
      { name: "message", dataType: "string", description: "Reply text", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{id} - reply comment ID",
    example: 'instagram.replyToComment "17858893269123456" "Thank you!"',
  },
  deleteComment: {
    description: "Delete or hide a comment by ID",
    parameters: [
      { name: "commentId", dataType: "string", description: "Comment ID to delete", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok, commentId}",
    example: 'instagram.deleteComment "17858893269123456"',
  },
  getStories: {
    description: "Get the authenticated user's currently active stories",
    parameters: [
      { name: "options", dataType: "object", description: "{fields?: string}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, media_type, media_url, timestamp, permalink}]}",
    example: 'instagram.getStories',
  },
  getHashtag: {
    description: "Search for a hashtag ID by name",
    parameters: [
      { name: "hashtagName", dataType: "string", description: "Hashtag name without # (e.g. 'travel')", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: [{id}]}",
    example: 'instagram.getHashtag "travel"',
  },
  getHashtagMedia: {
    description: "Get top or recent media for a hashtag",
    parameters: [
      { name: "hashtagId", dataType: "string", description: "Hashtag ID from getHashtag", formInputType: "text", required: true },
      { name: "type", dataType: "string", description: "'top_media' or 'recent_media' (default: top_media)", formInputType: "select", required: false },
      { name: "options", dataType: "object", description: "{limit?, after?, fields?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [...media], paging}",
    example: 'instagram.getHashtagMedia "17843853986012965" "top_media" {"limit": 20}',
  },
  getMentions: {
    description: "Get media posts where the authenticated user is tagged/mentioned",
    parameters: [
      { name: "options", dataType: "object", description: "{limit?, after?, fields?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [...media], paging}",
    example: 'instagram.getMentions {"limit": 10}',
  },
  sendMessage: {
    description: "Send a direct message to a user via Instagram Messaging API",
    parameters: [
      { name: "recipientId", dataType: "string", description: "Instagram-scoped ID of the recipient", formInputType: "text", required: true },
      { name: "message", dataType: "string", description: "Message text to send", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{recipient_id, message_id}",
    example: 'instagram.sendMessage "17841400123456" "Hello from RobinPath!"',
  },
  getConversations: {
    description: "List DM conversations for the authenticated account",
    parameters: [
      { name: "options", dataType: "object", description: "{limit?, after?, fields?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, updated_time, participants, messages}], paging}",
    example: 'instagram.getConversations {"limit": 10}',
  },
  getMessages: {
    description: "Get messages within a specific DM conversation",
    parameters: [
      { name: "conversationId", dataType: "string", description: "Conversation ID from getConversations", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{limit?, after?, fields?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, message, from, to, created_time}], paging}",
    example: 'instagram.getMessages "t_1234567890" {"limit": 20}',
  },
};

export const InstagramModuleMetadata = {
  description: "Instagram Graph API client for managing posts, stories, comments, insights, hashtags, mentions, and direct messages via Meta/Facebook platform",
  methods: Object.keys(InstagramFunctions),
  category: "social",
};
