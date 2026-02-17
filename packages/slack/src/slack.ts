import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { readFileSync, statSync } from "node:fs";
import { basename } from "node:path";

type Value = string | number | boolean | null | object;

// ── Internal State ──────────────────────────────────────────────────

interface WorkspaceConfig {
  token: string;        // Bot User OAuth Token (xoxb-...)
  defaultChannel: string;
}

const workspaces = new Map<string, WorkspaceConfig>();

// ── Helper ──────────────────────────────────────────────────────────

async function callSlackApi(
  workspaceId: string,
  method: string,
  body: Record<string, unknown>,
): Promise<Value> {
  const config = workspaces.get(workspaceId);
  if (!config) {
    throw new Error(
      `Workspace "${workspaceId}" not configured. Call slack.setToken first.`,
    );
  }

  const response = await fetch(`https://slack.com/api/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = (await response.json()) as Record<string, unknown>;

  if (!result.ok) {
    throw new Error(
      `Slack API ${method} failed: ${String(result.error ?? "unknown_error")}`,
    );
  }

  return result;
}

// ── Function Handlers ───────────────────────────────────────────────

const setToken: BuiltinHandler = (args) => {
  const workspaceId = String(args[0] ?? "default");
  const token = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!token) throw new Error("Token is required");

  workspaces.set(workspaceId, {
    token,
    defaultChannel: String(opts.defaultChannel ?? "general"),
  });

  return { workspaceId, defaultChannel: opts.defaultChannel ?? "general" };
};

const send: BuiltinHandler = async (args) => {
  const workspaceId = String(args[0] ?? "default");
  const channel = String(args[1] ?? "");
  const text = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!channel) {
    const config = workspaces.get(workspaceId);
    if (!config) throw new Error("Channel is required");
  }

  const body: Record<string, unknown> = {
    channel: channel || workspaces.get(workspaceId)?.defaultChannel || "general",
    text,
  };

  if (opts.blocks) body.blocks = opts.blocks;
  if (opts.unfurlLinks !== undefined) body.unfurl_links = Boolean(opts.unfurlLinks);
  if (opts.threadTs) body.thread_ts = String(opts.threadTs);

  const result = (await callSlackApi(workspaceId, "chat.postMessage", body)) as Record<string, unknown>;

  return { ts: result.ts, channel: result.channel };
};

const sendWebhook: BuiltinHandler = async (args) => {
  const webhookUrl = String(args[0] ?? "");
  const text = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!webhookUrl) throw new Error("Webhook URL is required");

  const body: Record<string, unknown> = { text };

  if (opts.username) body.username = String(opts.username);
  if (opts.iconEmoji) body.icon_emoji = String(opts.iconEmoji);
  if (opts.blocks) body.blocks = opts.blocks;
  if (opts.attachments) body.attachments = opts.attachments;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Webhook request failed (${response.status}): ${errText}`);
  }

  return { ok: true, status: response.status };
};

const reply: BuiltinHandler = async (args) => {
  const workspaceId = String(args[0] ?? "default");
  const channel = String(args[1] ?? "");
  const threadTs = String(args[2] ?? "");
  const text = String(args[3] ?? "");
  const opts = (typeof args[4] === "object" && args[4] !== null ? args[4] : {}) as Record<string, unknown>;

  if (!channel) throw new Error("Channel is required");
  if (!threadTs) throw new Error("Thread timestamp (threadTs) is required");

  const body: Record<string, unknown> = {
    channel,
    text,
    thread_ts: threadTs,
  };

  if (opts.blocks) body.blocks = opts.blocks;
  if (opts.unfurlLinks !== undefined) body.unfurl_links = Boolean(opts.unfurlLinks);

  const result = (await callSlackApi(workspaceId, "chat.postMessage", body)) as Record<string, unknown>;

  return { ts: result.ts, channel: result.channel };
};

const react: BuiltinHandler = async (args) => {
  const workspaceId = String(args[0] ?? "default");
  const channel = String(args[1] ?? "");
  const timestamp = String(args[2] ?? "");
  const emoji = String(args[3] ?? "");

  if (!channel) throw new Error("Channel is required");
  if (!timestamp) throw new Error("Message timestamp is required");
  if (!emoji) throw new Error("Emoji name is required");

  // Strip colons if provided (e.g. ":thumbsup:" -> "thumbsup")
  const emojiName = emoji.replace(/^:|:$/g, "");

  await callSlackApi(workspaceId, "reactions.add", {
    channel,
    timestamp,
    name: emojiName,
  });

  return { ok: true, channel, timestamp, emoji: emojiName };
};

const upload: BuiltinHandler = async (args) => {
  const workspaceId = String(args[0] ?? "default");
  const channel = String(args[1] ?? "");
  const filePath = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!channel) throw new Error("Channel is required");
  if (!filePath) throw new Error("File path is required");

  const config = workspaces.get(workspaceId);
  if (!config) {
    throw new Error(
      `Workspace "${workspaceId}" not configured. Call slack.setToken first.`,
    );
  }

  // Read file
  const fileData = readFileSync(filePath);
  const fileName = opts.title ? String(opts.title) : basename(filePath);
  const fileSize = statSync(filePath).size;

  // Step 1: Get upload URL
  const uploadUrlResult = (await callSlackApi(workspaceId, "files.getUploadURLExternal", {
    filename: fileName,
    length: fileSize,
  })) as Record<string, unknown>;

  const uploadUrl = String(uploadUrlResult.upload_url);
  const fileId = String(uploadUrlResult.file_id);

  // Step 2: PUT file data to the upload URL
  const putResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/octet-stream" },
    body: fileData,
  });

  if (!putResponse.ok) {
    throw new Error(`File upload PUT failed (${putResponse.status}): ${await putResponse.text()}`);
  }

  // Step 3: Complete the upload
  const completeBody: Record<string, unknown> = {
    files: [{ id: fileId, title: fileName }],
    channel_id: channel,
  };

  if (opts.initialComment) {
    completeBody.initial_comment = String(opts.initialComment);
  }

  const completeResult = (await callSlackApi(
    workspaceId,
    "files.completeUploadExternal",
    completeBody,
  )) as Record<string, unknown>;

  return {
    ok: true,
    fileId,
    files: completeResult.files,
  };
};

const listChannels: BuiltinHandler = async (args) => {
  const workspaceId = String(args[0] ?? "default");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const body: Record<string, unknown> = {
    limit: Number(opts.limit ?? 200),
  };

  if (opts.types) body.types = String(opts.types); // e.g. "public_channel,private_channel"

  const result = (await callSlackApi(workspaceId, "conversations.list", body)) as Record<string, unknown>;

  const channels = (result.channels as Array<Record<string, unknown>>) ?? [];
  return channels.map((ch: any) => ({
    id: ch.id,
    name: ch.name,
    topic: (ch.topic as Record<string, unknown>)?.value ?? "",
  }));
};

const getHistory: BuiltinHandler = async (args) => {
  const workspaceId = String(args[0] ?? "default");
  const channel = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!channel) throw new Error("Channel is required");

  const body: Record<string, unknown> = {
    channel,
    limit: Number(opts.limit ?? 20),
  };

  if (opts.oldest) body.oldest = String(opts.oldest);
  if (opts.latest) body.latest = String(opts.latest);

  const result = (await callSlackApi(workspaceId, "conversations.history", body)) as Record<string, unknown>;

  return (result.messages as Value) ?? [];
};

const setStatus: BuiltinHandler = async (args) => {
  const workspaceId = String(args[0] ?? "default");
  const text = String(args[1] ?? "");
  const emoji = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  const profile: Record<string, unknown> = {
    status_text: text,
    status_emoji: emoji,
  };

  if (opts.expiration) {
    profile.status_expiration = Number(opts.expiration);
  }

  const result = (await callSlackApi(workspaceId, "users.profile.set", {
    profile,
  })) as Record<string, unknown>;

  return { ok: true, profile: result.profile };
};

const userInfo: BuiltinHandler = async (args) => {
  const workspaceId = String(args[0] ?? "default");
  const userId = String(args[1] ?? "");

  if (!userId) throw new Error("User ID is required");

  const result = (await callSlackApi(workspaceId, "users.info", {
    user: userId,
  })) as Record<string, unknown>;

  const user = result.user as Record<string, unknown>;
  const profile = (user.profile ?? {}) as Record<string, unknown>;

  return {
    id: user.id,
    name: user.name,
    real_name: user.real_name,
    email: profile.email ?? null,
    is_admin: user.is_admin ?? false,
  };
};

const createChannel: BuiltinHandler = async (args) => {
  const workspaceId = String(args[0] ?? "default");
  const name = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!name) throw new Error("Channel name is required");

  const body: Record<string, unknown> = {
    name,
  };

  if (opts.isPrivate) body.is_private = true;

  const result = (await callSlackApi(workspaceId, "conversations.create", body)) as Record<string, unknown>;

  const channel = result.channel as Record<string, unknown>;
  return {
    id: channel.id,
    name: channel.name,
    is_private: channel.is_private ?? false,
  };
};

const updateMessage: BuiltinHandler = async (args) => {
  const workspaceId = String(args[0] ?? "default");
  const channel = String(args[1] ?? "");
  const ts = String(args[2] ?? "");
  const text = String(args[3] ?? "");
  const opts = (typeof args[4] === "object" && args[4] !== null ? args[4] : {}) as Record<string, unknown>;

  if (!channel) throw new Error("Channel is required");
  if (!ts) throw new Error("Message timestamp (ts) is required");

  const body: Record<string, unknown> = {
    channel,
    ts,
    text,
  };

  if (opts.blocks) body.blocks = opts.blocks;

  const result = (await callSlackApi(workspaceId, "chat.update", body)) as Record<string, unknown>;

  return { ts: result.ts, channel: result.channel, text: result.text };
};

// ── Exports ─────────────────────────────────────────────────────────

export const SlackFunctions: Record<string, BuiltinHandler> = {
  setToken,
  send,
  sendWebhook,
  reply,
  react,
  upload,
  listChannels,
  getHistory,
  setStatus,
  userInfo,
  createChannel,
  updateMessage,
};

export const SlackFunctionMetadata = {
  setToken: {
    description: "Store a Slack Bot User OAuth Token for a workspace",
    parameters: [
      { name: "workspaceId", dataType: "string", description: "Workspace identifier (e.g. 'default')", formInputType: "text", required: true },
      { name: "token", dataType: "string", description: "Bot User OAuth Token (xoxb-...)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{defaultChannel?: string}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{workspaceId, defaultChannel}",
    example: 'slack.setToken "default" "xoxb-your-token" {"defaultChannel": "general"}',
  },
  send: {
    description: "Send a message to a Slack channel via chat.postMessage",
    parameters: [
      { name: "workspaceId", dataType: "string", description: "Workspace identifier", formInputType: "text", required: true },
      { name: "channel", dataType: "string", description: "Channel ID or name", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Message text", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{blocks?, unfurlLinks?, threadTs?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{ts, channel}",
    example: 'slack.send "default" "#general" "Hello from RobinPath!"',
  },
  sendWebhook: {
    description: "Send a message via a Slack Incoming Webhook URL (no token needed)",
    parameters: [
      { name: "webhookUrl", dataType: "string", description: "Incoming Webhook URL", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Message text", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{username?, iconEmoji?, blocks?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{ok, status}",
    example: 'slack.sendWebhook "https://hooks.slack.com/services/T.../B.../xxx" "Deploy complete!"',
  },
  reply: {
    description: "Reply to a message thread via chat.postMessage with thread_ts",
    parameters: [
      { name: "workspaceId", dataType: "string", description: "Workspace identifier", formInputType: "text", required: true },
      { name: "channel", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "threadTs", dataType: "string", description: "Parent message timestamp", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Reply text", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{blocks?, unfurlLinks?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{ts, channel}",
    example: 'slack.reply "default" "C01234" "1234567890.123456" "Got it, thanks!"',
  },
  react: {
    description: "Add an emoji reaction to a message via reactions.add",
    parameters: [
      { name: "workspaceId", dataType: "string", description: "Workspace identifier", formInputType: "text", required: true },
      { name: "channel", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "timestamp", dataType: "string", description: "Message timestamp", formInputType: "text", required: true },
      { name: "emoji", dataType: "string", description: "Emoji name (e.g. 'thumbsup' or ':thumbsup:')", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok, channel, timestamp, emoji}",
    example: 'slack.react "default" "C01234" "1234567890.123456" "thumbsup"',
  },
  upload: {
    description: "Upload a file to a Slack channel using the new file upload API",
    parameters: [
      { name: "workspaceId", dataType: "string", description: "Workspace identifier", formInputType: "text", required: true },
      { name: "channel", dataType: "string", description: "Channel ID to share the file in", formInputType: "text", required: true },
      { name: "filePath", dataType: "string", description: "Local path to the file", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{title?, initialComment?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{ok, fileId, files}",
    example: 'slack.upload "default" "C01234" "./report.pdf" {"title": "Report", "initialComment": "Here is the report"}',
  },
  listChannels: {
    description: "List Slack channels via conversations.list",
    parameters: [
      { name: "workspaceId", dataType: "string", description: "Workspace identifier", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{types?, limit?}. types: 'public_channel,private_channel'", formInputType: "text", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of {id, name, topic}",
    example: 'slack.listChannels "default" {"limit": 50}',
  },
  getHistory: {
    description: "Get message history for a channel via conversations.history",
    parameters: [
      { name: "workspaceId", dataType: "string", description: "Workspace identifier", formInputType: "text", required: true },
      { name: "channel", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{limit?, oldest?, latest?}", formInputType: "text", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of message objects",
    example: 'slack.getHistory "default" "C01234" {"limit": 10}',
  },
  setStatus: {
    description: "Set the authenticated user's status via users.profile.set",
    parameters: [
      { name: "workspaceId", dataType: "string", description: "Workspace identifier", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Status text", formInputType: "text", required: true },
      { name: "emoji", dataType: "string", description: "Status emoji (e.g. ':house_with_garden:')", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{expiration?: number} — Unix timestamp when status expires", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{ok, profile}",
    example: 'slack.setStatus "default" "Working from home" ":house_with_garden:"',
  },
  userInfo: {
    description: "Get user information via users.info",
    parameters: [
      { name: "workspaceId", dataType: "string", description: "Workspace identifier", formInputType: "text", required: true },
      { name: "userId", dataType: "string", description: "Slack user ID (e.g. 'U01234')", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{id, name, real_name, email, is_admin}",
    example: 'slack.userInfo "default" "U01234ABC"',
  },
  createChannel: {
    description: "Create a new Slack channel via conversations.create",
    parameters: [
      { name: "workspaceId", dataType: "string", description: "Workspace identifier", formInputType: "text", required: true },
      { name: "name", dataType: "string", description: "Channel name (lowercase, no spaces)", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{isPrivate?: boolean}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{id, name, is_private}",
    example: 'slack.createChannel "default" "project-updates" {"isPrivate": true}',
  },
  updateMessage: {
    description: "Update an existing message via chat.update",
    parameters: [
      { name: "workspaceId", dataType: "string", description: "Workspace identifier", formInputType: "text", required: true },
      { name: "channel", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "ts", dataType: "string", description: "Timestamp of the message to update", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "New message text", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{blocks?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{ts, channel, text}",
    example: 'slack.updateMessage "default" "C01234" "1234567890.123456" "Updated message text"',
  },
};

export const SlackModuleMetadata = {
  description: "Slack Web API and Incoming Webhooks client for messaging, channels, reactions, file uploads, and user management",
  methods: [
    "setToken",
    "send",
    "sendWebhook",
    "reply",
    "react",
    "upload",
    "listChannels",
    "getHistory",
    "setStatus",
    "userInfo",
    "createChannel",
    "updateMessage",
  ],
};
