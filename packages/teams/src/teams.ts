import type { BuiltinHandler } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getToken(): string {
  const token = config.get("token");
  if (!token) throw new Error('Teams: token not configured. Call teams.setToken first.');
  return token;
}

async function graphApi(path: string, method = "GET", body?: unknown): Promise<unknown> {
  const token = getToken();
  const res = await fetch(`https://graph.microsoft.com/v1.0${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Microsoft Graph API error (${res.status}): ${text}`);
  }
  if (res.status === 204) return { success: true };
  return res.json();
}

const setToken: BuiltinHandler = (args) => {
  const token = args[0] as string;
  if (!token) throw new Error("teams.setToken requires a token.");
  config.set("token", token);
  return "Microsoft Teams token configured.";
};

const sendChannel: BuiltinHandler = async (args) => {
  const teamId = args[0] as string;
  const channelId = args[1] as string;
  const message = args[2] as string;
  if (!teamId || !channelId || !message) throw new Error("teams.sendChannel requires teamId, channelId, and message.");
  return graphApi(`/teams/${teamId}/channels/${channelId}/messages`, "POST", {
    body: { content: message, contentType: "html" },
  });
};

const sendChat: BuiltinHandler = async (args) => {
  const chatId = args[0] as string;
  const message = args[1] as string;
  if (!chatId || !message) throw new Error("teams.sendChat requires chatId and message.");
  return graphApi(`/chats/${chatId}/messages`, "POST", {
    body: { content: message, contentType: "html" },
  });
};

const replyToMessage: BuiltinHandler = async (args) => {
  const teamId = args[0] as string;
  const channelId = args[1] as string;
  const messageId = args[2] as string;
  const reply = args[3] as string;
  if (!teamId || !channelId || !messageId || !reply) throw new Error("teams.replyToMessage requires teamId, channelId, messageId, and reply.");
  return graphApi(`/teams/${teamId}/channels/${channelId}/messages/${messageId}/replies`, "POST", {
    body: { content: reply, contentType: "html" },
  });
};

const listTeams: BuiltinHandler = async () => {
  return graphApi("/me/joinedTeams");
};

const listChannels: BuiltinHandler = async (args) => {
  const teamId = args[0] as string;
  if (!teamId) throw new Error("teams.listChannels requires a teamId.");
  return graphApi(`/teams/${teamId}/channels`);
};

const getMessages: BuiltinHandler = async (args) => {
  const teamId = args[0] as string;
  const channelId = args[1] as string;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!teamId || !channelId) throw new Error("teams.getMessages requires teamId and channelId.");
  const top = opts.top ? `?$top=${opts.top}` : "";
  return graphApi(`/teams/${teamId}/channels/${channelId}/messages${top}`);
};

const createChannel: BuiltinHandler = async (args) => {
  const teamId = args[0] as string;
  const displayName = args[1] as string;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!teamId || !displayName) throw new Error("teams.createChannel requires teamId and displayName.");
  const payload: Record<string, unknown> = {
    displayName,
    membershipType: (opts.membershipType as string) ?? "standard",
  };
  if (opts.description) payload.description = opts.description;
  return graphApi(`/teams/${teamId}/channels`, "POST", payload);
};

const listChats: BuiltinHandler = async () => {
  return graphApi("/me/chats");
};

const sendWebhook: BuiltinHandler = async (args) => {
  const webhookUrl = args[0] as string;
  const message = args[1] as string;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!webhookUrl || !message) throw new Error("teams.sendWebhook requires webhookUrl and message.");
  const payload: Record<string, unknown> = { text: message };
  if (opts.title) payload.title = opts.title;
  if (opts.themeColor) payload.themeColor = opts.themeColor;
  if (opts.sections) payload.sections = opts.sections;
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Teams Webhook error (${res.status}): ${text}`);
  }
  return "Webhook message sent.";
};

export const TeamsFunctions: Record<string, BuiltinHandler> = {
  setToken,
  sendChannel,
  sendChat,
  replyToMessage,
  listTeams,
  listChannels,
  getMessages,
  createChannel,
  listChats,
  sendWebhook,
};

export const TeamsFunctionMetadata: Record<string, object> = {
  setToken: {
    description: "Set the Microsoft Graph API access token.",
    parameters: [
      { name: "token", dataType: "string", description: "OAuth2 access token with Teams permissions", formInputType: "password", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'teams.setToken "eyJ0xxx"',
  },
  sendChannel: {
    description: "Send a message to a Teams channel.",
    parameters: [
      { name: "teamId", dataType: "string", description: "Team ID", formInputType: "text", required: true },
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "message", dataType: "string", description: "Message content (supports HTML)", formInputType: "textarea", required: true },
    ],
    returnType: "object",
    returnDescription: "Created message object.",
    example: 'teams.sendChannel "team-id" "channel-id" "Hello team!"',
  },
  sendChat: {
    description: "Send a message in a 1:1 or group chat.",
    parameters: [
      { name: "chatId", dataType: "string", description: "Chat ID", formInputType: "text", required: true },
      { name: "message", dataType: "string", description: "Message content (supports HTML)", formInputType: "textarea", required: true },
    ],
    returnType: "object",
    returnDescription: "Created message object.",
    example: 'teams.sendChat "chat-id" "Hey there!"',
  },
  replyToMessage: {
    description: "Reply to a message in a channel.",
    parameters: [
      { name: "teamId", dataType: "string", description: "Team ID", formInputType: "text", required: true },
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "messageId", dataType: "string", description: "Message ID to reply to", formInputType: "text", required: true },
      { name: "reply", dataType: "string", description: "Reply content", formInputType: "textarea", required: true },
    ],
    returnType: "object",
    returnDescription: "Created reply message.",
    example: 'teams.replyToMessage "team-id" "channel-id" "msg-id" "Thanks!"',
  },
  listTeams: {
    description: "List all teams the user has joined.",
    parameters: [],
    returnType: "object",
    returnDescription: "Object with value array of teams.",
    example: "teams.listTeams",
  },
  listChannels: {
    description: "List channels in a team.",
    parameters: [
      { name: "teamId", dataType: "string", description: "Team ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Object with value array of channels.",
    example: 'teams.listChannels "team-id"',
  },
  getMessages: {
    description: "Get messages from a channel.",
    parameters: [
      { name: "teamId", dataType: "string", description: "Team ID", formInputType: "text", required: true },
      { name: "channelId", dataType: "string", description: "Channel ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: top (number of messages)", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Object with value array of messages.",
    example: 'teams.getMessages "team-id" "channel-id" {"top":20}',
  },
  createChannel: {
    description: "Create a new channel in a team.",
    parameters: [
      { name: "teamId", dataType: "string", description: "Team ID", formInputType: "text", required: true },
      { name: "displayName", dataType: "string", description: "Channel name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: description, membershipType (standard|private|shared)", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Created channel object.",
    example: 'teams.createChannel "team-id" "New Channel" {"description":"A new channel"}',
  },
  listChats: {
    description: "List all chats for the current user.",
    parameters: [],
    returnType: "object",
    returnDescription: "Object with value array of chats.",
    example: "teams.listChats",
  },
  sendWebhook: {
    description: "Send a message via an incoming webhook URL.",
    parameters: [
      { name: "webhookUrl", dataType: "string", description: "Incoming webhook URL", formInputType: "text", required: true },
      { name: "message", dataType: "string", description: "Message text", formInputType: "textarea", required: true },
      { name: "options", dataType: "object", description: "Options: title, themeColor, sections", formInputType: "json", required: false },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'teams.sendWebhook "https://outlook.office.com/webhook/xxx" "Alert: Build passed!"',
  },
};

export const TeamsModuleMetadata = {
  name: "teams",
  description: "Send messages, manage channels, and interact with Microsoft Teams via Microsoft Graph API.",
  icon: "message-square",
  category: "messaging",
};
