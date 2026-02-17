import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── Internal State ──────────────────────────────────────────────────

let bearerToken = "";

// ── Helper ──────────────────────────────────────────────────────────

function getToken(): string {
  if (!bearerToken) {
    throw new Error("Bearer token not set. Call twitter.setToken first.");
  }
  return bearerToken;
}

async function callApi(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  body?: Record<string, unknown>,
  queryParams?: Record<string, string>,
): Promise<Value> {
  const token = getToken();
  let url = `https://api.twitter.com/2/${endpoint}`;

  if (queryParams) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value);
      }
    }
    const qs = params.toString();
    if (qs) url += `?${qs}`;
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const init: RequestInit = { method, headers };
  if (body && (method === "POST" || method === "PUT")) {
    init.body = JSON.stringify(body);
  }

  const response = await fetch(url, init);

  if (response.status === 204) {
    return { ok: true };
  }

  const result = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    const detail = result.detail ?? result.title ?? JSON.stringify(result.errors ?? result);
    throw new Error(`Twitter API ${method} ${endpoint} failed (${response.status}): ${String(detail)}`);
  }

  return result;
}

function buildQueryParams(opts: Record<string, unknown>): Record<string, string> {
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(opts)) {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        params[key] = value.join(",");
      } else {
        params[key] = String(value);
      }
    }
  }
  return params;
}

// ── Function Handlers ───────────────────────────────────────────────

const setToken: BuiltinHandler = (args) => {
  const token = String(args[0] ?? "");
  if (!token) throw new Error("Bearer token is required.");
  bearerToken = token;
  return { ok: true };
};

// ── Tweets ──────────────────────────────────────────────────────────

const createTweet: BuiltinHandler = async (args) => {
  const text = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!text) throw new Error("Tweet text is required.");

  const body: Record<string, unknown> = { text };

  if (opts.reply_settings) body.reply_settings = String(opts.reply_settings);
  if (opts.quote_tweet_id) body.quote_tweet_id = String(opts.quote_tweet_id);
  if (opts.reply) body.reply = opts.reply;
  if (opts.poll) body.poll = opts.poll;
  if (opts.media) body.media = opts.media;

  return await callApi("POST", "tweets", body);
};

const deleteTweet: BuiltinHandler = async (args) => {
  const tweetId = String(args[0] ?? "");
  if (!tweetId) throw new Error("Tweet ID is required.");
  return await callApi("DELETE", `tweets/${tweetId}`);
};

const getTweet: BuiltinHandler = async (args) => {
  const tweetId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!tweetId) throw new Error("Tweet ID is required.");

  const params: Record<string, string> = {};
  if (opts.expansions) params.expansions = Array.isArray(opts.expansions) ? opts.expansions.join(",") : String(opts.expansions);
  if (opts["tweet.fields"]) params["tweet.fields"] = Array.isArray(opts["tweet.fields"]) ? (opts["tweet.fields"] as string[]).join(",") : String(opts["tweet.fields"]);
  if (opts["user.fields"]) params["user.fields"] = Array.isArray(opts["user.fields"]) ? (opts["user.fields"] as string[]).join(",") : String(opts["user.fields"]);

  return await callApi("GET", `tweets/${tweetId}`, undefined, params);
};

const getTweets: BuiltinHandler = async (args) => {
  const tweetIds = args[0];
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  let ids: string;
  if (Array.isArray(tweetIds)) {
    ids = tweetIds.map(String).join(",");
  } else {
    ids = String(tweetIds ?? "");
  }
  if (!ids) throw new Error("Tweet IDs are required.");

  const params: Record<string, string> = { ids };
  if (opts.expansions) params.expansions = Array.isArray(opts.expansions) ? opts.expansions.join(",") : String(opts.expansions);
  if (opts["tweet.fields"]) params["tweet.fields"] = Array.isArray(opts["tweet.fields"]) ? (opts["tweet.fields"] as string[]).join(",") : String(opts["tweet.fields"]);
  if (opts["user.fields"]) params["user.fields"] = Array.isArray(opts["user.fields"]) ? (opts["user.fields"] as string[]).join(",") : String(opts["user.fields"]);

  return await callApi("GET", "tweets", undefined, params);
};

// ── Timelines ───────────────────────────────────────────────────────

const getUserTimeline: BuiltinHandler = async (args) => {
  const userId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!userId) throw new Error("User ID is required.");

  const params = buildQueryParams(opts);
  return await callApi("GET", `users/${userId}/tweets`, undefined, params);
};

const getMentions: BuiltinHandler = async (args) => {
  const userId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!userId) throw new Error("User ID is required.");

  const params = buildQueryParams(opts);
  return await callApi("GET", `users/${userId}/mentions`, undefined, params);
};

// ── Search ──────────────────────────────────────────────────────────

const searchRecent: BuiltinHandler = async (args) => {
  const query = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!query) throw new Error("Search query is required.");

  const params: Record<string, string> = { query };
  if (opts.max_results) params.max_results = String(opts.max_results);
  if (opts.start_time) params.start_time = String(opts.start_time);
  if (opts.end_time) params.end_time = String(opts.end_time);
  if (opts.next_token) params.next_token = String(opts.next_token);
  if (opts["tweet.fields"]) params["tweet.fields"] = Array.isArray(opts["tweet.fields"]) ? (opts["tweet.fields"] as string[]).join(",") : String(opts["tweet.fields"]);
  if (opts.expansions) params.expansions = Array.isArray(opts.expansions) ? opts.expansions.join(",") : String(opts.expansions);

  return await callApi("GET", "tweets/search/recent", undefined, params);
};

// ── Users ───────────────────────────────────────────────────────────

const getUser: BuiltinHandler = async (args) => {
  const username = String(args[0] ?? "");
  if (!username) throw new Error("Username is required.");

  const params: Record<string, string> = {};
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (opts["user.fields"]) params["user.fields"] = Array.isArray(opts["user.fields"]) ? (opts["user.fields"] as string[]).join(",") : String(opts["user.fields"]);

  return await callApi("GET", `users/by/username/${username}`, undefined, params);
};

const getUserById: BuiltinHandler = async (args) => {
  const userId = String(args[0] ?? "");
  if (!userId) throw new Error("User ID is required.");

  const params: Record<string, string> = {};
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (opts["user.fields"]) params["user.fields"] = Array.isArray(opts["user.fields"]) ? (opts["user.fields"] as string[]).join(",") : String(opts["user.fields"]);

  return await callApi("GET", `users/${userId}`, undefined, params);
};

const getMe: BuiltinHandler = async () => {
  return await callApi("GET", "users/me", undefined, { "user.fields": "id,name,username,description,profile_image_url,public_metrics" });
};

// ── Followers / Following ───────────────────────────────────────────

const getFollowers: BuiltinHandler = async (args) => {
  const userId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!userId) throw new Error("User ID is required.");

  const params = buildQueryParams(opts);
  return await callApi("GET", `users/${userId}/followers`, undefined, params);
};

const getFollowing: BuiltinHandler = async (args) => {
  const userId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!userId) throw new Error("User ID is required.");

  const params = buildQueryParams(opts);
  return await callApi("GET", `users/${userId}/following`, undefined, params);
};

const follow: BuiltinHandler = async (args) => {
  const targetUserId = String(args[0] ?? "");
  if (!targetUserId) throw new Error("Target user ID is required.");

  // Requires authenticated user ID - get it from /users/me
  const me = (await callApi("GET", "users/me")) as Record<string, unknown>;
  const data = me.data as Record<string, unknown>;
  const myId = String(data.id);

  return await callApi("POST", `users/${myId}/following`, { target_user_id: targetUserId });
};

const unfollow: BuiltinHandler = async (args) => {
  const sourceUserId = String(args[0] ?? "");
  const targetUserId = String(args[1] ?? "");

  if (!sourceUserId) throw new Error("Source user ID is required.");
  if (!targetUserId) throw new Error("Target user ID is required.");

  return await callApi("DELETE", `users/${sourceUserId}/following/${targetUserId}`);
};

// ── Likes ───────────────────────────────────────────────────────────

const like: BuiltinHandler = async (args) => {
  const tweetId = String(args[0] ?? "");
  if (!tweetId) throw new Error("Tweet ID is required.");

  const me = (await callApi("GET", "users/me")) as Record<string, unknown>;
  const data = me.data as Record<string, unknown>;
  const myId = String(data.id);

  return await callApi("POST", `users/${myId}/likes`, { tweet_id: tweetId });
};

const unlike: BuiltinHandler = async (args) => {
  const tweetId = String(args[0] ?? "");
  if (!tweetId) throw new Error("Tweet ID is required.");

  const me = (await callApi("GET", "users/me")) as Record<string, unknown>;
  const data = me.data as Record<string, unknown>;
  const myId = String(data.id);

  return await callApi("DELETE", `users/${myId}/likes/${tweetId}`);
};

const getLikedTweets: BuiltinHandler = async (args) => {
  const userId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!userId) throw new Error("User ID is required.");

  const params = buildQueryParams(opts);
  return await callApi("GET", `users/${userId}/liked_tweets`, undefined, params);
};

// ── Retweets ────────────────────────────────────────────────────────

const retweet: BuiltinHandler = async (args) => {
  const tweetId = String(args[0] ?? "");
  if (!tweetId) throw new Error("Tweet ID is required.");

  const me = (await callApi("GET", "users/me")) as Record<string, unknown>;
  const data = me.data as Record<string, unknown>;
  const myId = String(data.id);

  return await callApi("POST", `users/${myId}/retweets`, { tweet_id: tweetId });
};

const unretweet: BuiltinHandler = async (args) => {
  const tweetId = String(args[0] ?? "");
  if (!tweetId) throw new Error("Tweet ID is required.");

  const me = (await callApi("GET", "users/me")) as Record<string, unknown>;
  const data = me.data as Record<string, unknown>;
  const myId = String(data.id);

  return await callApi("DELETE", `users/${myId}/retweets/${tweetId}`);
};

const getRetweeters: BuiltinHandler = async (args) => {
  const tweetId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!tweetId) throw new Error("Tweet ID is required.");

  const params = buildQueryParams(opts);
  return await callApi("GET", `tweets/${tweetId}/retweeted_by`, undefined, params);
};

// ── Bookmarks ───────────────────────────────────────────────────────

const bookmark: BuiltinHandler = async (args) => {
  const tweetId = String(args[0] ?? "");
  if (!tweetId) throw new Error("Tweet ID is required.");

  const me = (await callApi("GET", "users/me")) as Record<string, unknown>;
  const data = me.data as Record<string, unknown>;
  const myId = String(data.id);

  return await callApi("POST", `users/${myId}/bookmarks`, { tweet_id: tweetId });
};

const removeBookmark: BuiltinHandler = async (args) => {
  const tweetId = String(args[0] ?? "");
  if (!tweetId) throw new Error("Tweet ID is required.");

  const me = (await callApi("GET", "users/me")) as Record<string, unknown>;
  const data = me.data as Record<string, unknown>;
  const myId = String(data.id);

  return await callApi("DELETE", `users/${myId}/bookmarks/${tweetId}`);
};

const getBookmarks: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;

  const me = (await callApi("GET", "users/me")) as Record<string, unknown>;
  const data = me.data as Record<string, unknown>;
  const myId = String(data.id);

  const params = buildQueryParams(opts);
  return await callApi("GET", `users/${myId}/bookmarks`, undefined, params);
};

// ── Lists ───────────────────────────────────────────────────────────

const createList: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "");
  const description = args[1] !== undefined && args[1] !== null ? String(args[1]) : undefined;
  const isPrivate = args[2] !== undefined && args[2] !== null ? Boolean(args[2]) : undefined;

  if (!name) throw new Error("List name is required.");

  const body: Record<string, unknown> = { name };
  if (description !== undefined) body.description = description;
  if (isPrivate !== undefined) body.private = isPrivate;

  return await callApi("POST", "lists", body);
};

const deleteList: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  if (!listId) throw new Error("List ID is required.");
  return await callApi("DELETE", `lists/${listId}`);
};

const addListMember: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  const userId = String(args[1] ?? "");

  if (!listId) throw new Error("List ID is required.");
  if (!userId) throw new Error("User ID is required.");

  return await callApi("POST", `lists/${listId}/members`, { user_id: userId });
};

const removeListMember: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  const userId = String(args[1] ?? "");

  if (!listId) throw new Error("List ID is required.");
  if (!userId) throw new Error("User ID is required.");

  return await callApi("DELETE", `lists/${listId}/members/${userId}`);
};

const getListTweets: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!listId) throw new Error("List ID is required.");

  const params = buildQueryParams(opts);
  return await callApi("GET", `lists/${listId}/tweets`, undefined, params);
};

// ── Direct Messages ─────────────────────────────────────────────────

const sendDm: BuiltinHandler = async (args) => {
  const participantId = String(args[0] ?? "");
  const text = String(args[1] ?? "");

  if (!participantId) throw new Error("Participant ID is required.");
  if (!text) throw new Error("Message text is required.");

  return await callApi("POST", "dm_conversations/with/" + participantId + "/messages", { text });
};

const getDmEvents: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;

  const params = buildQueryParams(opts);
  return await callApi("GET", "dm_events", undefined, params);
};

// ── Exports ─────────────────────────────────────────────────────────

export const TwitterFunctions: Record<string, BuiltinHandler> = {
  setToken,
  createTweet,
  deleteTweet,
  getTweet,
  getTweets,
  getUserTimeline,
  getMentions,
  searchRecent,
  getUser,
  getUserById,
  getMe,
  getFollowers,
  getFollowing,
  follow,
  unfollow,
  like,
  unlike,
  getLikedTweets,
  retweet,
  unretweet,
  getRetweeters,
  bookmark,
  removeBookmark,
  getBookmarks,
  createList,
  deleteList,
  addListMember,
  removeListMember,
  getListTweets,
  sendDm,
  getDmEvents,
};

export const TwitterFunctionMetadata = {
  setToken: {
    description: "Store a Bearer token for X/Twitter API v2 authentication",
    parameters: [
      { name: "bearerToken", dataType: "string", description: "Bearer token (app-only or OAuth 2.0 user token)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'twitter.setToken "AAAA...your-bearer-token"',
  },
  createTweet: {
    description: "Create a new tweet",
    parameters: [
      { name: "text", dataType: "string", description: "Tweet text (up to 280 characters)", formInputType: "textarea", required: true },
      { name: "options", dataType: "object", description: "{reply_settings?, quote_tweet_id?, reply?: {in_reply_to_tweet_id}, poll?: {options, duration_minutes}, media?: {media_ids}}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: {id, text}}",
    example: 'twitter.createTweet "Hello from RobinPath!"',
  },
  deleteTweet: {
    description: "Delete a tweet by ID",
    parameters: [
      { name: "tweetId", dataType: "string", description: "ID of the tweet to delete", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {deleted: true}}",
    example: 'twitter.deleteTweet "1234567890"',
  },
  getTweet: {
    description: "Get a single tweet by ID with optional expansions and fields",
    parameters: [
      { name: "tweetId", dataType: "string", description: "Tweet ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{expansions?, tweet.fields?, user.fields?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: {id, text, ...}, includes?: {...}}",
    example: 'twitter.getTweet "1234567890" {"tweet.fields": "created_at,public_metrics"}',
  },
  getTweets: {
    description: "Get multiple tweets by IDs",
    parameters: [
      { name: "tweetIds", dataType: "array", description: "Array of tweet IDs (or comma-separated string)", formInputType: "json", required: true },
      { name: "options", dataType: "object", description: "{expansions?, tweet.fields?, user.fields?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, text, ...}]}",
    example: 'twitter.getTweets ["1234567890", "0987654321"]',
  },
  getUserTimeline: {
    description: "Get tweets from a user's timeline",
    parameters: [
      { name: "userId", dataType: "string", description: "User ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{max_results?, pagination_token?, exclude?, tweet.fields?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, text}], meta: {next_token?, result_count}}",
    example: 'twitter.getUserTimeline "123456" {"max_results": 10}',
  },
  getMentions: {
    description: "Get tweets mentioning a user",
    parameters: [
      { name: "userId", dataType: "string", description: "User ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{max_results?, pagination_token?, start_time?, end_time?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, text}], meta: {next_token?, result_count}}",
    example: 'twitter.getMentions "123456" {"max_results": 5}',
  },
  searchRecent: {
    description: "Search recent tweets (last 7 days) with a query",
    parameters: [
      { name: "query", dataType: "string", description: "Search query (Twitter search syntax)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{max_results?, start_time?, end_time?, next_token?, tweet.fields?, expansions?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, text}], meta: {newest_id, oldest_id, result_count, next_token?}}",
    example: 'twitter.searchRecent "robinpath lang:en" {"max_results": 10}',
  },
  getUser: {
    description: "Get a user by username",
    parameters: [
      { name: "username", dataType: "string", description: "Twitter/X username (without @)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {id, name, username}}",
    example: 'twitter.getUser "elonmusk"',
  },
  getUserById: {
    description: "Get a user by their ID",
    parameters: [
      { name: "userId", dataType: "string", description: "User ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {id, name, username}}",
    example: 'twitter.getUserById "44196397"',
  },
  getMe: {
    description: "Get the authenticated user's profile",
    parameters: [],
    returnType: "object",
    returnDescription: "{data: {id, name, username, description, profile_image_url, public_metrics}}",
    example: "twitter.getMe",
  },
  getFollowers: {
    description: "Get followers of a user",
    parameters: [
      { name: "userId", dataType: "string", description: "User ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{max_results?, pagination_token?, user.fields?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, name, username}], meta: {next_token?, result_count}}",
    example: 'twitter.getFollowers "123456" {"max_results": 100}',
  },
  getFollowing: {
    description: "Get users that a user is following",
    parameters: [
      { name: "userId", dataType: "string", description: "User ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{max_results?, pagination_token?, user.fields?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, name, username}], meta: {next_token?, result_count}}",
    example: 'twitter.getFollowing "123456" {"max_results": 100}',
  },
  follow: {
    description: "Follow a user (uses authenticated user as source)",
    parameters: [
      { name: "targetUserId", dataType: "string", description: "ID of the user to follow", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {following: true, pending_follow: false}}",
    example: 'twitter.follow "44196397"',
  },
  unfollow: {
    description: "Unfollow a user",
    parameters: [
      { name: "sourceUserId", dataType: "string", description: "ID of the authenticated user", formInputType: "text", required: true },
      { name: "targetUserId", dataType: "string", description: "ID of the user to unfollow", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {following: false}}",
    example: 'twitter.unfollow "123456" "44196397"',
  },
  like: {
    description: "Like a tweet (uses authenticated user)",
    parameters: [
      { name: "tweetId", dataType: "string", description: "ID of the tweet to like", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {liked: true}}",
    example: 'twitter.like "1234567890"',
  },
  unlike: {
    description: "Unlike a tweet (uses authenticated user)",
    parameters: [
      { name: "tweetId", dataType: "string", description: "ID of the tweet to unlike", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {liked: false}}",
    example: 'twitter.unlike "1234567890"',
  },
  getLikedTweets: {
    description: "Get tweets liked by a user",
    parameters: [
      { name: "userId", dataType: "string", description: "User ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{max_results?, pagination_token?, tweet.fields?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, text}], meta: {next_token?, result_count}}",
    example: 'twitter.getLikedTweets "123456" {"max_results": 10}',
  },
  retweet: {
    description: "Retweet a tweet (uses authenticated user)",
    parameters: [
      { name: "tweetId", dataType: "string", description: "ID of the tweet to retweet", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {retweeted: true}}",
    example: 'twitter.retweet "1234567890"',
  },
  unretweet: {
    description: "Undo a retweet (uses authenticated user)",
    parameters: [
      { name: "tweetId", dataType: "string", description: "ID of the tweet to unretweet", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {retweeted: false}}",
    example: 'twitter.unretweet "1234567890"',
  },
  getRetweeters: {
    description: "Get users who retweeted a tweet",
    parameters: [
      { name: "tweetId", dataType: "string", description: "Tweet ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{max_results?, pagination_token?, user.fields?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, name, username}], meta: {next_token?, result_count}}",
    example: 'twitter.getRetweeters "1234567890" {"max_results": 100}',
  },
  bookmark: {
    description: "Bookmark a tweet (uses authenticated user)",
    parameters: [
      { name: "tweetId", dataType: "string", description: "ID of the tweet to bookmark", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {bookmarked: true}}",
    example: 'twitter.bookmark "1234567890"',
  },
  removeBookmark: {
    description: "Remove a bookmarked tweet (uses authenticated user)",
    parameters: [
      { name: "tweetId", dataType: "string", description: "ID of the tweet to remove from bookmarks", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {bookmarked: false}}",
    example: 'twitter.removeBookmark "1234567890"',
  },
  getBookmarks: {
    description: "Get the authenticated user's bookmarked tweets",
    parameters: [
      { name: "options", dataType: "object", description: "{max_results?, pagination_token?, tweet.fields?, expansions?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, text}], meta: {next_token?, result_count}}",
    example: 'twitter.getBookmarks {"max_results": 20}',
  },
  createList: {
    description: "Create a new list",
    parameters: [
      { name: "name", dataType: "string", description: "Name of the list", formInputType: "text", required: true },
      { name: "description", dataType: "string", description: "Description of the list", formInputType: "text", required: false },
      { name: "private", dataType: "boolean", description: "Whether the list is private (default: false)", formInputType: "checkbox", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: {id, name}}",
    example: 'twitter.createList "My List" "A curated list" true',
  },
  deleteList: {
    description: "Delete a list",
    parameters: [
      { name: "listId", dataType: "string", description: "List ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {deleted: true}}",
    example: 'twitter.deleteList "1234567890"',
  },
  addListMember: {
    description: "Add a user to a list",
    parameters: [
      { name: "listId", dataType: "string", description: "List ID", formInputType: "text", required: true },
      { name: "userId", dataType: "string", description: "User ID to add", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {is_member: true}}",
    example: 'twitter.addListMember "1234567890" "44196397"',
  },
  removeListMember: {
    description: "Remove a user from a list",
    parameters: [
      { name: "listId", dataType: "string", description: "List ID", formInputType: "text", required: true },
      { name: "userId", dataType: "string", description: "User ID to remove", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {is_member: false}}",
    example: 'twitter.removeListMember "1234567890" "44196397"',
  },
  getListTweets: {
    description: "Get tweets from a list",
    parameters: [
      { name: "listId", dataType: "string", description: "List ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{max_results?, pagination_token?, tweet.fields?, expansions?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, text}], meta: {next_token?, result_count}}",
    example: 'twitter.getListTweets "1234567890" {"max_results": 25}',
  },
  sendDm: {
    description: "Send a direct message to a user",
    parameters: [
      { name: "participantId", dataType: "string", description: "User ID of the recipient", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Message text", formInputType: "textarea", required: true },
    ],
    returnType: "object",
    returnDescription: "{data: {dm_conversation_id, dm_event_id}}",
    example: 'twitter.sendDm "44196397" "Hello from RobinPath!"',
  },
  getDmEvents: {
    description: "Get direct message events",
    parameters: [
      { name: "options", dataType: "object", description: "{max_results?, pagination_token?, dm_event.fields?, event_types?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{data: [{id, text, event_type, ...}], meta: {next_token?, result_count}}",
    example: 'twitter.getDmEvents {"max_results": 20}',
  },
};

export const TwitterModuleMetadata = {
  description: "X/Twitter API v2 client for tweets, users, followers, likes, retweets, bookmarks, lists, and direct messages",
  methods: Object.keys(TwitterFunctions),
  category: "social",
};
