import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── Internal State ──────────────────────────────────────────────────

let botToken = "";

const API_BASE = "https://discord.com/api/v10";

// ── Helper ──────────────────────────────────────────────────────────

function requireToken(): string {
  if (!botToken) {
    throw new Error("Bot token not set. Call discord.setToken first.");
  }
  return botToken;
}

async function callApi(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  body?: Record<string, unknown>,
): Promise<Value> {
  const token = requireToken();

  const headers: Record<string, string> = {
    Authorization: `Bot ${token}`,
    "Content-Type": "application/json",
  };

  const options: RequestInit = { method, headers };
  if (body && method !== "GET" && method !== "DELETE") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${path}`, options);

  if (response.status === 204) {
    return { ok: true };
  }

  const data = await response.json() as Record<string, unknown>;

  if (!response.ok) {
    const msg = data.message ?? JSON.stringify(data);
    throw new Error(`Discord API error (${response.status}): ${msg}`);
  }

  return data;
}

// ── Function Handlers ───────────────────────────────────────────────

const setToken: BuiltinHandler = (args) => {
  const token = String(args[0] ?? "");
  if (!token) throw new Error("Bot token is required.");
  botToken = token;
  return { ok: true };
};

const sendWebhook: BuiltinHandler = async (args) => {
  const webhookUrl = String(args[0] ?? "");
  const content = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!webhookUrl) throw new Error("Webhook URL is required.");

  const body: Record<string, unknown> = {};
  if (content) body.content = content;
  if (opts.embeds) body.embeds = opts.embeds;
  if (opts.username) body.username = String(opts.username);
  if (opts.avatarUrl) body.avatar_url = String(opts.avatarUrl);

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Discord webhook failed (${response.status}): ${errText}`);
  }

  if (response.status === 204) {
    return { ok: true };
  }

  return await response.json();
};

const sendMessage: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  const content = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!channelId) throw new Error("channelId is required.");

  const body: Record<string, unknown> = {};
  if (content) body.content = content;
  if (opts.embeds) body.embeds = opts.embeds;
  if (opts.components) body.components = opts.components;

  return await callApi("POST", `/channels/${channelId}/messages`, body);
};

const editMessage: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  const messageId = String(args[1] ?? "");
  const content = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!channelId) throw new Error("channelId is required.");
  if (!messageId) throw new Error("messageId is required.");

  const body: Record<string, unknown> = {};
  if (content) body.content = content;
  if (opts.embeds) body.embeds = opts.embeds;
  if (opts.components) body.components = opts.components;

  return await callApi("PATCH", `/channels/${channelId}/messages/${messageId}`, body);
};

const deleteMessage: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  const messageId = String(args[1] ?? "");

  if (!channelId) throw new Error("channelId is required.");
  if (!messageId) throw new Error("messageId is required.");

  return await callApi("DELETE", `/channels/${channelId}/messages/${messageId}`);
};

const getChannel: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  if (!channelId) throw new Error("channelId is required.");

  return await callApi("GET", `/channels/${channelId}`);
};

const listChannels: BuiltinHandler = async (args) => {
  const guildId = String(args[0] ?? "");
  if (!guildId) throw new Error("guildId is required.");

  return await callApi("GET", `/guilds/${guildId}/channels`);
};

const createChannel: BuiltinHandler = async (args) => {
  const guildId = String(args[0] ?? "");
  const name = String(args[1] ?? "");
  const type = args[2] !== undefined && args[2] !== null ? Number(args[2]) : 0;
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!guildId) throw new Error("guildId is required.");
  if (!name) throw new Error("Channel name is required.");

  const body: Record<string, unknown> = { name, type };
  if (opts.topic) body.topic = String(opts.topic);
  if (opts.parentId) body.parent_id = String(opts.parentId);
  if (opts.nsfw !== undefined) body.nsfw = Boolean(opts.nsfw);
  if (opts.rateLimitPerUser !== undefined) body.rate_limit_per_user = Number(opts.rateLimitPerUser);
  if (opts.bitrate !== undefined) body.bitrate = Number(opts.bitrate);
  if (opts.userLimit !== undefined) body.user_limit = Number(opts.userLimit);

  return await callApi("POST", `/guilds/${guildId}/channels`, body);
};

const deleteChannel: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  if (!channelId) throw new Error("channelId is required.");

  return await callApi("DELETE", `/channels/${channelId}`);
};

const addReaction: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  const messageId = String(args[1] ?? "");
  const emoji = String(args[2] ?? "");

  if (!channelId) throw new Error("channelId is required.");
  if (!messageId) throw new Error("messageId is required.");
  if (!emoji) throw new Error("emoji is required.");

  const encodedEmoji = encodeURIComponent(emoji);
  return await callApi("PUT", `/channels/${channelId}/messages/${messageId}/reactions/${encodedEmoji}/@me`);
};

const removeReaction: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  const messageId = String(args[1] ?? "");
  const emoji = String(args[2] ?? "");

  if (!channelId) throw new Error("channelId is required.");
  if (!messageId) throw new Error("messageId is required.");
  if (!emoji) throw new Error("emoji is required.");

  const encodedEmoji = encodeURIComponent(emoji);
  return await callApi("DELETE", `/channels/${channelId}/messages/${messageId}/reactions/${encodedEmoji}/@me`);
};

const pinMessage: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  const messageId = String(args[1] ?? "");

  if (!channelId) throw new Error("channelId is required.");
  if (!messageId) throw new Error("messageId is required.");

  return await callApi("PUT", `/channels/${channelId}/pins/${messageId}`);
};

const unpinMessage: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  const messageId = String(args[1] ?? "");

  if (!channelId) throw new Error("channelId is required.");
  if (!messageId) throw new Error("messageId is required.");

  return await callApi("DELETE", `/channels/${channelId}/pins/${messageId}`);
};

const getGuild: BuiltinHandler = async (args) => {
  const guildId = String(args[0] ?? "");
  if (!guildId) throw new Error("guildId is required.");

  return await callApi("GET", `/guilds/${guildId}`);
};

const listGuildMembers: BuiltinHandler = async (args) => {
  const guildId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!guildId) throw new Error("guildId is required.");

  const params = new URLSearchParams();
  if (opts.limit !== undefined) params.set("limit", String(Number(opts.limit)));
  if (opts.after) params.set("after", String(opts.after));

  const query = params.toString();
  const path = `/guilds/${guildId}/members${query ? `?${query}` : ""}`;

  return await callApi("GET", path);
};

const getGuildMember: BuiltinHandler = async (args) => {
  const guildId = String(args[0] ?? "");
  const userId = String(args[1] ?? "");

  if (!guildId) throw new Error("guildId is required.");
  if (!userId) throw new Error("userId is required.");

  return await callApi("GET", `/guilds/${guildId}/members/${userId}`);
};

const addRole: BuiltinHandler = async (args) => {
  const guildId = String(args[0] ?? "");
  const userId = String(args[1] ?? "");
  const roleId = String(args[2] ?? "");

  if (!guildId) throw new Error("guildId is required.");
  if (!userId) throw new Error("userId is required.");
  if (!roleId) throw new Error("roleId is required.");

  return await callApi("PUT", `/guilds/${guildId}/members/${userId}/roles/${roleId}`);
};

const removeRole: BuiltinHandler = async (args) => {
  const guildId = String(args[0] ?? "");
  const userId = String(args[1] ?? "");
  const roleId = String(args[2] ?? "");

  if (!guildId) throw new Error("guildId is required.");
  if (!userId) throw new Error("userId is required.");
  if (!roleId) throw new Error("roleId is required.");

  return await callApi("DELETE", `/guilds/${guildId}/members/${userId}/roles/${roleId}`);
};

const listRoles: BuiltinHandler = async (args) => {
  const guildId = String(args[0] ?? "");
  if (!guildId) throw new Error("guildId is required.");

  return await callApi("GET", `/guilds/${guildId}/roles`);
};

const createRole: BuiltinHandler = async (args) => {
  const guildId = String(args[0] ?? "");
  const name = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!guildId) throw new Error("guildId is required.");
  if (!name) throw new Error("Role name is required.");

  const body: Record<string, unknown> = { name };
  if (opts.color !== undefined) body.color = Number(opts.color);
  if (opts.permissions !== undefined) body.permissions = String(opts.permissions);
  if (opts.hoist !== undefined) body.hoist = Boolean(opts.hoist);
  if (opts.mentionable !== undefined) body.mentionable = Boolean(opts.mentionable);

  return await callApi("POST", `/guilds/${guildId}/roles`, body);
};

const banMember: BuiltinHandler = async (args) => {
  const guildId = String(args[0] ?? "");
  const userId = String(args[1] ?? "");
  const reason = args[2] !== undefined && args[2] !== null ? String(args[2]) : undefined;

  if (!guildId) throw new Error("guildId is required.");
  if (!userId) throw new Error("userId is required.");

  const token = requireToken();

  const headers: Record<string, string> = {
    Authorization: `Bot ${token}`,
    "Content-Type": "application/json",
  };
  if (reason) headers["X-Audit-Log-Reason"] = reason;

  const response = await fetch(`${API_BASE}/guilds/${guildId}/bans/${userId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({}),
  });

  if (response.status === 204) return { ok: true };

  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(`Discord API error (${response.status}): ${data.message ?? JSON.stringify(data)}`);
  }
  return data;
};

const unbanMember: BuiltinHandler = async (args) => {
  const guildId = String(args[0] ?? "");
  const userId = String(args[1] ?? "");

  if (!guildId) throw new Error("guildId is required.");
  if (!userId) throw new Error("userId is required.");

  return await callApi("DELETE", `/guilds/${guildId}/bans/${userId}`);
};

const kickMember: BuiltinHandler = async (args) => {
  const guildId = String(args[0] ?? "");
  const userId = String(args[1] ?? "");
  const reason = args[2] !== undefined && args[2] !== null ? String(args[2]) : undefined;

  if (!guildId) throw new Error("guildId is required.");
  if (!userId) throw new Error("userId is required.");

  const token = requireToken();

  const headers: Record<string, string> = {
    Authorization: `Bot ${token}`,
    "Content-Type": "application/json",
  };
  if (reason) headers["X-Audit-Log-Reason"] = reason;

  const response = await fetch(`${API_BASE}/guilds/${guildId}/members/${userId}`, {
    method: "DELETE",
    headers,
  });

  if (response.status === 204) return { ok: true };

  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(`Discord API error (${response.status}): ${data.message ?? JSON.stringify(data)}`);
  }
  return data;
};

const createThread: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  const name = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!channelId) throw new Error("channelId is required.");
  if (!name) throw new Error("Thread name is required.");

  const body: Record<string, unknown> = {
    name,
    type: 11, // PUBLIC_THREAD
  };

  if (opts.autoArchiveDuration !== undefined) body.auto_archive_duration = Number(opts.autoArchiveDuration);
  if (opts.messageId) {
    // Create thread from existing message
    return await callApi("POST", `/channels/${channelId}/messages/${String(opts.messageId)}/threads`, { name, auto_archive_duration: body.auto_archive_duration });
  }
  if (opts.type !== undefined) body.type = Number(opts.type);
  if (opts.invitable !== undefined) body.invitable = Boolean(opts.invitable);

  return await callApi("POST", `/channels/${channelId}/threads`, body);
};

const sendEmbed: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  const embed = (typeof args[1] === "object" && args[1] !== null ? args[1] : null) as Record<string, unknown> | null;

  if (!channelId) throw new Error("channelId is required.");
  if (!embed) throw new Error("embed object is required.");

  return await callApi("POST", `/channels/${channelId}/messages`, {
    embeds: [embed],
  });
};

const getUser: BuiltinHandler = async (args) => {
  const userId = String(args[0] ?? "");
  if (!userId) throw new Error("userId is required.");

  return await callApi("GET", `/users/${userId}`);
};

const listMessages: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!channelId) throw new Error("channelId is required.");

  const params = new URLSearchParams();
  if (opts.limit !== undefined) params.set("limit", String(Number(opts.limit)));
  if (opts.before) params.set("before", String(opts.before));
  if (opts.after) params.set("after", String(opts.after));
  if (opts.around) params.set("around", String(opts.around));

  const query = params.toString();
  const path = `/channels/${channelId}/messages${query ? `?${query}` : ""}`;

  return await callApi("GET", path);
};

const createInvite: BuiltinHandler = async (args) => {
  const channelId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!channelId) throw new Error("channelId is required.");

  const body: Record<string, unknown> = {};
  if (opts.maxAge !== undefined) body.max_age = Number(opts.maxAge);
  if (opts.maxUses !== undefined) body.max_uses = Number(opts.maxUses);
  if (opts.temporary !== undefined) body.temporary = Boolean(opts.temporary);
  if (opts.unique !== undefined) body.unique = Boolean(opts.unique);

  return await callApi("POST", `/channels/${channelId}/invites`, body);
};

// ── Exports ─────────────────────────────────────────────────────────

export const DiscordFunctions: Record<string, BuiltinHandler> = {
  setToken,
  sendWebhook,
  sendMessage,
  editMessage,
  deleteMessage,
  getChannel,
  listChannels,
  createChannel,
  deleteChannel,
  addReaction,
  removeReaction,
  pinMessage,
  unpinMessage,
  getGuild,
  listGuildMembers,
  getGuildMember,
  addRole,
  removeRole,
  listRoles,
  createRole,
  banMember,
  unbanMember,
  kickMember,
  createThread,
  sendEmbed,
  getUser,
  listMessages,
  createInvite,
};

export const DiscordFunctionMetadata = {
  setToken: {
    description: "Store a Discord bot token for subsequent API calls",
    parameters: [
      { name: "botToken", dataType: "string", description: "Discord bot token", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'discord.setToken "your-bot-token"',
  },
  sendWebhook: {
    description: "Send a message via a Discord webhook URL (no bot token needed)",
    parameters: [
      { name: "webhookUrl", dataType: "string", description: "Discord webhook URL", formInputType: "text", required: true },
      { name: "content", dataType: "string", description: "Message text content", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "{embeds?, username?, avatarUrl?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Webhook response or {ok: true}",
    example: 'discord.sendWebhook "https://discord.com/api/webhooks/..." "Hello!" {"username": "MyBot"}',
  },
  sendMessage: {
    description: "Send a message to a Discord channel",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "content", dataType: "string", description: "Message text content", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "{embeds?, components?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Discord Message object",
    example: 'discord.sendMessage "123456789" "Hello from RobinPath!"',
  },
  editMessage: {
    description: "Edit an existing message in a channel",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "messageId", dataType: "string", description: "Message ID to edit", formInputType: "text", required: true },
      { name: "content", dataType: "string", description: "New message text content", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "{embeds?, components?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Updated Discord Message object",
    example: 'discord.editMessage "123456789" "987654321" "Updated text"',
  },
  deleteMessage: {
    description: "Delete a message from a channel",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "messageId", dataType: "string", description: "Message ID to delete", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'discord.deleteMessage "123456789" "987654321"',
  },
  getChannel: {
    description: "Get information about a channel",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Discord Channel object",
    example: 'discord.getChannel "123456789"',
  },
  listChannels: {
    description: "List all channels in a guild/server",
    parameters: [
      { name: "guildId", dataType: "string", description: "Guild/server ID", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of Discord Channel objects",
    example: 'discord.listChannels "123456789"',
  },
  createChannel: {
    description: "Create a new channel in a guild (0=text, 2=voice, 4=category, 13=stage, 15=forum)",
    parameters: [
      { name: "guildId", dataType: "string", description: "Guild/server ID", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Channel name", formInputType: "text", required: true },
      { name: "type", dataType: "number", description: "Channel type (0=text, 2=voice). Default: 0", formInputType: "number", required: false },
      { name: "options", dataType: "object", description: "{topic?, parentId?, nsfw?, rateLimitPerUser?, bitrate?, userLimit?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created Discord Channel object",
    example: 'discord.createChannel "123456789" "general-chat" 0 {"topic": "General discussion"}',
  },
  deleteChannel: {
    description: "Delete a channel",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID to delete", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Deleted Channel object",
    example: 'discord.deleteChannel "123456789"',
  },
  addReaction: {
    description: "Add a reaction emoji to a message",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "messageId", dataType: "string", description: "Message ID", formInputType: "text", required: true },
      { name: "emoji", dataType: "string", description: "Emoji (Unicode or custom format name:id)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'discord.addReaction "123456789" "987654321" "\u{1f44d}"',
  },
  removeReaction: {
    description: "Remove own reaction from a message",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "messageId", dataType: "string", description: "Message ID", formInputType: "text", required: true },
      { name: "emoji", dataType: "string", description: "Emoji (Unicode or custom format name:id)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'discord.removeReaction "123456789" "987654321" "\u{1f44d}"',
  },
  pinMessage: {
    description: "Pin a message in a channel",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "messageId", dataType: "string", description: "Message ID to pin", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'discord.pinMessage "123456789" "987654321"',
  },
  unpinMessage: {
    description: "Unpin a message from a channel",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "messageId", dataType: "string", description: "Message ID to unpin", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'discord.unpinMessage "123456789" "987654321"',
  },
  getGuild: {
    description: "Get information about a guild/server",
    parameters: [
      { name: "guildId", dataType: "string", description: "Guild/server ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Discord Guild object",
    example: 'discord.getGuild "123456789"',
  },
  listGuildMembers: {
    description: "List members of a guild/server",
    parameters: [
      { name: "guildId", dataType: "string", description: "Guild/server ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{limit?, after?}", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of Guild Member objects",
    example: 'discord.listGuildMembers "123456789" {"limit": 100}',
  },
  getGuildMember: {
    description: "Get a specific member of a guild",
    parameters: [
      { name: "guildId", dataType: "string", description: "Guild/server ID", formInputType: "text", required: true },
      { name: "userId", dataType: "string", description: "User ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Guild Member object",
    example: 'discord.getGuildMember "123456789" "987654321"',
  },
  addRole: {
    description: "Add a role to a guild member",
    parameters: [
      { name: "guildId", dataType: "string", description: "Guild/server ID", formInputType: "text", required: true },
      { name: "userId", dataType: "string", description: "User ID", formInputType: "text", required: true },
      { name: "roleId", dataType: "string", description: "Role ID to add", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'discord.addRole "123456789" "987654321" "111222333"',
  },
  removeRole: {
    description: "Remove a role from a guild member",
    parameters: [
      { name: "guildId", dataType: "string", description: "Guild/server ID", formInputType: "text", required: true },
      { name: "userId", dataType: "string", description: "User ID", formInputType: "text", required: true },
      { name: "roleId", dataType: "string", description: "Role ID to remove", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'discord.removeRole "123456789" "987654321" "111222333"',
  },
  listRoles: {
    description: "List all roles in a guild/server",
    parameters: [
      { name: "guildId", dataType: "string", description: "Guild/server ID", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of Role objects",
    example: 'discord.listRoles "123456789"',
  },
  createRole: {
    description: "Create a new role in a guild/server",
    parameters: [
      { name: "guildId", dataType: "string", description: "Guild/server ID", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Role name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{color?, permissions?, hoist?, mentionable?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created Role object",
    example: 'discord.createRole "123456789" "Moderator" {"color": 3447003, "hoist": true}',
  },
  banMember: {
    description: "Ban a member from a guild/server",
    parameters: [
      { name: "guildId", dataType: "string", description: "Guild/server ID", formInputType: "text", required: true },
      { name: "userId", dataType: "string", description: "User ID to ban", formInputType: "text", required: true },
      { name: "reason", dataType: "string", description: "Reason for the ban (appears in audit log)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'discord.banMember "123456789" "987654321" "Spam"',
  },
  unbanMember: {
    description: "Remove a ban for a user from a guild/server",
    parameters: [
      { name: "guildId", dataType: "string", description: "Guild/server ID", formInputType: "text", required: true },
      { name: "userId", dataType: "string", description: "User ID to unban", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'discord.unbanMember "123456789" "987654321"',
  },
  kickMember: {
    description: "Kick a member from a guild/server",
    parameters: [
      { name: "guildId", dataType: "string", description: "Guild/server ID", formInputType: "text", required: true },
      { name: "userId", dataType: "string", description: "User ID to kick", formInputType: "text", required: true },
      { name: "reason", dataType: "string", description: "Reason for the kick (appears in audit log)", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'discord.kickMember "123456789" "987654321" "Inactive"',
  },
  createThread: {
    description: "Create a new thread in a channel",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Thread name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{autoArchiveDuration?, messageId?, type?, invitable?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created Thread Channel object",
    example: 'discord.createThread "123456789" "Discussion" {"autoArchiveDuration": 1440}',
  },
  sendEmbed: {
    description: "Send a rich embed message to a channel",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "embed", dataType: "object", description: "Embed object with title, description, color, fields, footer, etc.", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Discord Message object with embed",
    example: 'discord.sendEmbed "123456789" {"title": "Status", "description": "All systems operational", "color": 5763719}',
  },
  getUser: {
    description: "Get information about a Discord user",
    parameters: [
      { name: "userId", dataType: "string", description: "User ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Discord User object",
    example: 'discord.getUser "987654321"',
  },
  listMessages: {
    description: "List messages in a channel",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{limit?, before?, after?, around?}", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of Discord Message objects",
    example: 'discord.listMessages "123456789" {"limit": 50}',
  },
  createInvite: {
    description: "Create an invite for a channel",
    parameters: [
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{maxAge?, maxUses?, temporary?, unique?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Discord Invite object with code",
    example: 'discord.createInvite "123456789" {"maxAge": 86400, "maxUses": 10}',
  },
};

export const DiscordModuleMetadata = {
  description: "Discord Bot API v10 client for messaging, channels, guilds, roles, members, threads, embeds, reactions, and moderation",
  methods: Object.keys(DiscordFunctions),
  category: "messaging",
};
