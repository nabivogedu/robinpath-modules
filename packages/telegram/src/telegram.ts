import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { readFileSync } from "node:fs";
import { basename } from "node:path";

type Value = string | number | boolean | null | object;

// ── State ────────────────────────────────────────────────────────────

const tokens = new Map<string, string>();

// ── Helper ───────────────────────────────────────────────────────────

function getToken(botId: string): string {
  const token = tokens.get(botId);
  if (!token) throw new Error(`Telegram bot token for "${botId}" not found. Call telegram.setToken first.`);
  return token;
}

async function callApi(botId: string, method: string, params: Record<string, unknown>): Promise<unknown> {
  const token = getToken(botId);
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const data = await response.json() as Record<string, unknown>;
  if (!data.ok) {
    throw new Error(`Telegram API error: ${data.description ?? JSON.stringify(data)}`);
  }
  return data.result;
}

async function callApiWithFile(
  botId: string,
  method: string,
  fileField: string,
  filePath: string,
  params: Record<string, unknown>,
): Promise<unknown> {
  const token = getToken(botId);
  const fileBuffer = readFileSync(filePath);
  const fileName = basename(filePath);

  const formData = new FormData();
  formData.append(fileField, new Blob([fileBuffer]), fileName);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json() as Record<string, unknown>;
  if (!data.ok) {
    throw new Error(`Telegram API error: ${data.description ?? JSON.stringify(data)}`);
  }
  return data.result;
}

// ── Functions ────────────────────────────────────────────────────────

const setToken: BuiltinHandler = (args) => {
  const botId = String(args[0] ?? "default");
  const token = String(args[1] ?? "");
  if (!token) throw new Error("Bot token is required.");
  tokens.set(botId, token);
  return { botId, set: true };
};

const getMe: BuiltinHandler = async (args) => {
  const botId = String(args[0] ?? "default");
  return await callApi(botId, "getMe", {});
};

const send: BuiltinHandler = async (args) => {
  const botId = String(args[0] ?? "default");
  const chatId = String(args[1] ?? "");
  const text = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!chatId) throw new Error("chatId is required.");
  if (!text) throw new Error("text is required.");

  const params: Record<string, unknown> = { chat_id: chatId, text };
  if (opts.parseMode) params.parse_mode = String(opts.parseMode);
  if (opts.disableNotification) params.disable_notification = true;
  if (opts.replyToMessageId) params.reply_to_message_id = Number(opts.replyToMessageId);

  return await callApi(botId, "sendMessage", params);
};

const sendPhoto: BuiltinHandler = async (args) => {
  const botId = String(args[0] ?? "default");
  const chatId = String(args[1] ?? "");
  const photoPath = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!chatId) throw new Error("chatId is required.");
  if (!photoPath) throw new Error("photoPath is required.");

  const params: Record<string, unknown> = { chat_id: chatId };
  if (opts.caption) params.caption = String(opts.caption);

  return await callApiWithFile(botId, "sendPhoto", "photo", photoPath, params);
};

const sendDocument: BuiltinHandler = async (args) => {
  const botId = String(args[0] ?? "default");
  const chatId = String(args[1] ?? "");
  const filePath = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!chatId) throw new Error("chatId is required.");
  if (!filePath) throw new Error("filePath is required.");

  const params: Record<string, unknown> = { chat_id: chatId };
  if (opts.caption) params.caption = String(opts.caption);

  return await callApiWithFile(botId, "sendDocument", "document", filePath, params);
};

const sendLocation: BuiltinHandler = async (args) => {
  const botId = String(args[0] ?? "default");
  const chatId = String(args[1] ?? "");
  const latitude = Number(args[2] ?? 0);
  const longitude = Number(args[3] ?? 0);

  if (!chatId) throw new Error("chatId is required.");

  return await callApi(botId, "sendLocation", { chat_id: chatId, latitude, longitude });
};

const sendPoll: BuiltinHandler = async (args) => {
  const botId = String(args[0] ?? "default");
  const chatId = String(args[1] ?? "");
  const question = String(args[2] ?? "");
  const options = Array.isArray(args[3]) ? (args[3] as Value[]).map(String) : [];

  if (!chatId) throw new Error("chatId is required.");
  if (!question) throw new Error("question is required.");
  if (options.length < 2) throw new Error("At least 2 poll options are required.");

  return await callApi(botId, "sendPoll", { chat_id: chatId, question, options });
};

const editMessage: BuiltinHandler = async (args) => {
  const botId = String(args[0] ?? "default");
  const chatId = String(args[1] ?? "");
  const messageId = Number(args[2] ?? 0);
  const text = String(args[3] ?? "");
  const opts = (typeof args[4] === "object" && args[4] !== null ? args[4] : {}) as Record<string, unknown>;

  if (!chatId) throw new Error("chatId is required.");
  if (!messageId) throw new Error("messageId is required.");
  if (!text) throw new Error("text is required.");

  const params: Record<string, unknown> = { chat_id: chatId, message_id: messageId, text };
  if (opts.parseMode) params.parse_mode = String(opts.parseMode);

  return await callApi(botId, "editMessageText", params);
};

const deleteMessage: BuiltinHandler = async (args) => {
  const botId = String(args[0] ?? "default");
  const chatId = String(args[1] ?? "");
  const messageId = Number(args[2] ?? 0);

  if (!chatId) throw new Error("chatId is required.");
  if (!messageId) throw new Error("messageId is required.");

  return await callApi(botId, "deleteMessage", { chat_id: chatId, message_id: messageId });
};

const getUpdates: BuiltinHandler = async (args) => {
  const botId = String(args[0] ?? "default");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const params: Record<string, unknown> = {};
  if (opts.offset !== undefined) params.offset = Number(opts.offset);
  if (opts.limit !== undefined) params.limit = Number(opts.limit);
  if (opts.timeout !== undefined) params.timeout = Number(opts.timeout);

  return await callApi(botId, "getUpdates", params);
};

const sendSticker: BuiltinHandler = async (args) => {
  const botId = String(args[0] ?? "default");
  const chatId = String(args[1] ?? "");
  const stickerId = String(args[2] ?? "");

  if (!chatId) throw new Error("chatId is required.");
  if (!stickerId) throw new Error("stickerId is required.");

  return await callApi(botId, "sendSticker", { chat_id: chatId, sticker: stickerId });
};

const getChat: BuiltinHandler = async (args) => {
  const botId = String(args[0] ?? "default");
  const chatId = String(args[1] ?? "");

  if (!chatId) throw new Error("chatId is required.");

  return await callApi(botId, "getChat", { chat_id: chatId });
};

// ── Exports ──────────────────────────────────────────────────────────

export const TelegramFunctions: Record<string, BuiltinHandler> = {
  setToken, getMe, send, sendPhoto, sendDocument, sendLocation, sendPoll,
  editMessage, deleteMessage, getUpdates, sendSticker, getChat,
};

export const TelegramFunctionMetadata: Record<string, FunctionMetadata> = {
  setToken: {
    description: "Store a Telegram bot token for subsequent API calls",
    parameters: [
      { name: "botId", dataType: "string", description: "Bot identifier (default: \"default\")", formInputType: "text", required: false },
      { name: "token", dataType: "string", description: "Telegram bot token from @BotFather", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{botId, set}",
    example: 'telegram.setToken "default" "123456:ABC-DEF..."',
  },
  getMe: {
    description: "Get info about the bot (id, first_name, username)",
    parameters: [
      { name: "botId", dataType: "string", description: "Bot identifier (default: \"default\")", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "{id, is_bot, first_name, username}",
    example: 'telegram.getMe "default"',
  },
  send: {
    description: "Send a text message to a chat",
    parameters: [
      { name: "botId", dataType: "string", description: "Bot identifier", formInputType: "text", required: true },
      { name: "chatId", dataType: "string", description: "Target chat ID or @username", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "Message text", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{parseMode?, disableNotification?, replyToMessageId?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Telegram Message object",
    example: 'telegram.send "default" "-100123456" "Hello from RobinPath!"',
  },
  sendPhoto: {
    description: "Send a photo from a local file to a chat",
    parameters: [
      { name: "botId", dataType: "string", description: "Bot identifier", formInputType: "text", required: true },
      { name: "chatId", dataType: "string", description: "Target chat ID or @username", formInputType: "text", required: true },
      { name: "photoPath", dataType: "string", description: "Absolute path to image file", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{caption?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Telegram Message object",
    example: 'telegram.sendPhoto "default" "-100123456" "/tmp/photo.jpg" {"caption": "Look at this!"}',
  },
  sendDocument: {
    description: "Send a document/file from a local path to a chat",
    parameters: [
      { name: "botId", dataType: "string", description: "Bot identifier", formInputType: "text", required: true },
      { name: "chatId", dataType: "string", description: "Target chat ID or @username", formInputType: "text", required: true },
      { name: "filePath", dataType: "string", description: "Absolute path to file", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{caption?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Telegram Message object",
    example: 'telegram.sendDocument "default" "-100123456" "/tmp/report.pdf" {"caption": "Monthly report"}',
  },
  sendLocation: {
    description: "Send a GPS location to a chat",
    parameters: [
      { name: "botId", dataType: "string", description: "Bot identifier", formInputType: "text", required: true },
      { name: "chatId", dataType: "string", description: "Target chat ID or @username", formInputType: "text", required: true },
      { name: "latitude", dataType: "number", description: "Latitude", formInputType: "text", required: true },
      { name: "longitude", dataType: "number", description: "Longitude", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Telegram Message object",
    example: 'telegram.sendLocation "default" "-100123456" 48.8566 2.3522',
  },
  sendPoll: {
    description: "Send a poll to a chat",
    parameters: [
      { name: "botId", dataType: "string", description: "Bot identifier", formInputType: "text", required: true },
      { name: "chatId", dataType: "string", description: "Target chat ID or @username", formInputType: "text", required: true },
      { name: "question", dataType: "string", description: "Poll question", formInputType: "text", required: true },
      { name: "options", dataType: "array", description: "Array of answer option strings", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Telegram Message object with poll",
    example: 'telegram.sendPoll "default" "-100123456" "Best language?" ["TypeScript", "Rust", "Go"]',
  },
  editMessage: {
    description: "Edit the text of an existing message",
    parameters: [
      { name: "botId", dataType: "string", description: "Bot identifier", formInputType: "text", required: true },
      { name: "chatId", dataType: "string", description: "Chat ID where the message is", formInputType: "text", required: true },
      { name: "messageId", dataType: "number", description: "ID of the message to edit", formInputType: "text", required: true },
      { name: "text", dataType: "string", description: "New message text", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{parseMode?}", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Edited Telegram Message object",
    example: 'telegram.editMessage "default" "-100123456" 42 "Updated text"',
  },
  deleteMessage: {
    description: "Delete a message from a chat",
    parameters: [
      { name: "botId", dataType: "string", description: "Bot identifier", formInputType: "text", required: true },
      { name: "chatId", dataType: "string", description: "Chat ID", formInputType: "text", required: true },
      { name: "messageId", dataType: "number", description: "ID of the message to delete", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "true on success",
    example: 'telegram.deleteMessage "default" "-100123456" 42',
  },
  getUpdates: {
    description: "Receive incoming updates via long polling",
    parameters: [
      { name: "botId", dataType: "string", description: "Bot identifier", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{offset?, limit?, timeout?}", formInputType: "text", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of Telegram Update objects",
    example: 'telegram.getUpdates "default" {"offset": 0, "limit": 10}',
  },
  sendSticker: {
    description: "Send a sticker by file_id to a chat",
    parameters: [
      { name: "botId", dataType: "string", description: "Bot identifier", formInputType: "text", required: true },
      { name: "chatId", dataType: "string", description: "Target chat ID or @username", formInputType: "text", required: true },
      { name: "stickerId", dataType: "string", description: "Sticker file_id", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Telegram Message object with sticker",
    example: 'telegram.sendSticker "default" "-100123456" "CAACAgIAAxk..."',
  },
  getChat: {
    description: "Get up-to-date information about a chat",
    parameters: [
      { name: "botId", dataType: "string", description: "Bot identifier", formInputType: "text", required: true },
      { name: "chatId", dataType: "string", description: "Chat ID or @username", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Telegram Chat object",
    example: 'telegram.getChat "default" "-100123456"',
  },
};

export const TelegramModuleMetadata: ModuleMetadata = {
  description: "Telegram Bot API client for sending messages, photos, documents, locations, polls, stickers, and managing chats",
  methods: [
    "setToken", "getMe", "send", "sendPhoto", "sendDocument", "sendLocation",
    "sendPoll", "editMessage", "deleteMessage", "getUpdates", "sendSticker", "getChat",
  ],
};
