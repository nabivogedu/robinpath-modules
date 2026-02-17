import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── Function Handlers ───────────────────────────────────────────────

const slack: BuiltinHandler = async (args) => {
  const webhookUrl = String(args[0] ?? "");
  const message = args[1];
  if (!webhookUrl) throw new Error("Slack webhook URL is required");

  let body: Record<string, unknown>;
  if (typeof message === "string") {
    body = { text: message };
  } else if (typeof message === "object" && message !== null) {
    body = message as Record<string, unknown>;
  } else {
    body = { text: String(message) };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { ok: response.ok, status: response.status };
};

const slackRich: BuiltinHandler = async (args) => {
  const webhookUrl = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const blocks: unknown[] = [];
  if (opts.title) {
    blocks.push({ type: "header", text: { type: "plain_text", text: String(opts.title) } });
  }
  if (opts.text) {
    blocks.push({ type: "section", text: { type: "mrkdwn", text: String(opts.text) } });
  }
  if (opts.fields && Array.isArray(opts.fields)) {
    blocks.push({ type: "section", fields: (opts.fields as { label: string; value: string }[]).map((f: any) => ({ type: "mrkdwn", text: `*${f.label}*\n${f.value}` })) });
  }
  if (opts.imageUrl) {
    blocks.push({ type: "image", image_url: String(opts.imageUrl), alt_text: String(opts.imageAlt ?? "Image") });
  }
  if (opts.divider) blocks.push({ type: "divider" });

  const body: Record<string, unknown> = { blocks };
  if (opts.channel) body.channel = String(opts.channel);
  if (opts.username) body.username = String(opts.username);
  if (opts.iconEmoji) body.icon_emoji = String(opts.iconEmoji);

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { ok: response.ok, status: response.status };
};

const discord: BuiltinHandler = async (args) => {
  const webhookUrl = String(args[0] ?? "");
  const message = args[1];
  if (!webhookUrl) throw new Error("Discord webhook URL is required");

  let body: Record<string, unknown>;
  if (typeof message === "string") {
    body = { content: message };
  } else if (typeof message === "object" && message !== null) {
    body = message as Record<string, unknown>;
  } else {
    body = { content: String(message) };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { ok: response.ok, status: response.status };
};

const discordEmbed: BuiltinHandler = async (args) => {
  const webhookUrl = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const embed: Record<string, unknown> = {};
  if (opts.title) embed.title = String(opts.title);
  if (opts.description) embed.description = String(opts.description);
  if (opts.color) embed.color = typeof opts.color === "number" ? opts.color : parseInt(String(opts.color).replace("#", ""), 16);
  if (opts.url) embed.url = String(opts.url);
  if (opts.thumbnail) embed.thumbnail = { url: String(opts.thumbnail) };
  if (opts.image) embed.image = { url: String(opts.image) };
  if (opts.footer) embed.footer = { text: String(opts.footer) };
  if (opts.timestamp) embed.timestamp = String(opts.timestamp === true ? new Date().toISOString() : opts.timestamp);
  if (opts.fields && Array.isArray(opts.fields)) {
    embed.fields = (opts.fields as { name: string; value: string; inline?: boolean }[]).map((f: any) => ({
      name: f.name, value: f.value, inline: f.inline ?? false,
    }));
  }

  const body: Record<string, unknown> = { embeds: [embed] };
  if (opts.content) body.content = String(opts.content);
  if (opts.username) body.username = String(opts.username);
  if (opts.avatarUrl) body.avatar_url = String(opts.avatarUrl);

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { ok: response.ok, status: response.status };
};

const telegram: BuiltinHandler = async (args) => {
  const botToken = String(args[0] ?? "");
  const chatId = String(args[1] ?? "");
  const message = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!botToken || !chatId) throw new Error("Bot token and chat ID are required");

  const body: Record<string, unknown> = {
    chat_id: chatId,
    text: message,
    parse_mode: String(opts.parseMode ?? "HTML"),
  };
  if (opts.disablePreview) body.disable_web_page_preview = true;
  if (opts.silent) body.disable_notification = true;

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json() as Record<string, unknown>;
  return { ok: data.ok, messageId: (data.result as Record<string, unknown>)?.message_id };
};

const teams: BuiltinHandler = async (args) => {
  const webhookUrl = String(args[0] ?? "");
  const message = args[1];
  if (!webhookUrl) throw new Error("Teams webhook URL is required");

  let body: Record<string, unknown>;
  if (typeof message === "string") {
    body = { text: message };
  } else if (typeof message === "object" && message !== null) {
    body = message as Record<string, unknown>;
  } else {
    body = { text: String(message) };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { ok: response.ok, status: response.status };
};

const teamsCard: BuiltinHandler = async (args) => {
  const webhookUrl = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const card: Record<string, unknown> = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    summary: String(opts.title ?? "Notification"),
    themeColor: String(opts.color ?? "0076D7"),
    title: String(opts.title ?? ""),
    text: String(opts.text ?? ""),
  };

  if (opts.sections && Array.isArray(opts.sections)) {
    card.sections = opts.sections;
  }
  if (opts.actions && Array.isArray(opts.actions)) {
    card.potentialAction = (opts.actions as { name: string; url: string }[]).map((a: any) => ({
      "@type": "OpenUri", name: a.name, targets: [{ os: "default", uri: a.url }],
    }));
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  });
  return { ok: response.ok, status: response.status };
};

const sendAll: BuiltinHandler = async (args) => {
  const channels = Array.isArray(args[0]) ? args[0] : [];
  const message = String(args[1] ?? "");

  const results: { channel: string; ok: boolean; error?: string }[] = [];
  for (const ch of channels) {
    const c = ch as Record<string, unknown>;
    const type = String(c.type ?? "");
    try {
      switch (type) {
        case "slack": await slack([c.url, message]); results.push({ channel: "slack", ok: true }); break;
        case "discord": await discord([c.url, message]); results.push({ channel: "discord", ok: true }); break;
        case "telegram": await telegram([c.token, c.chatId, message]); results.push({ channel: "telegram", ok: true }); break;
        case "teams": await teams([c.url, message]); results.push({ channel: "teams", ok: true }); break;
        default: results.push({ channel: type, ok: false, error: `Unknown channel type: ${type}` });
      }
    } catch (err: unknown) {
      results.push({ channel: type, ok: false, error: err instanceof Error ? err.message : String(err) });
    }
  }
  return results;
};

// ── Exports ─────────────────────────────────────────────────────────

export const NotificationFunctions: Record<string, BuiltinHandler> = {
  slack, slackRich, discord, discordEmbed, telegram, teams, teamsCard, sendAll,
};

export const NotificationFunctionMetadata = {
  slack: { description: "Send a message to Slack via webhook", parameters: [{ name: "webhookUrl", dataType: "string", description: "Slack incoming webhook URL", formInputType: "text", required: true }, { name: "message", dataType: "any", description: "String or Slack message object", formInputType: "text", required: true }], returnType: "object", returnDescription: "{ok, status}", example: 'notification.slack $webhookUrl "Deploy complete!"' },
  slackRich: { description: "Send a rich Slack message with blocks (title, fields, images)", parameters: [{ name: "webhookUrl", dataType: "string", description: "Slack webhook URL", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{title, text, fields, imageUrl, channel, username, iconEmoji}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{ok, status}", example: 'notification.slackRich $url {"title": "Deploy", "text": "v1.2.3 deployed"}' },
  discord: { description: "Send a message to Discord via webhook", parameters: [{ name: "webhookUrl", dataType: "string", description: "Discord webhook URL", formInputType: "text", required: true }, { name: "message", dataType: "any", description: "String or Discord message object", formInputType: "text", required: true }], returnType: "object", returnDescription: "{ok, status}", example: 'notification.discord $webhookUrl "Build passed!"' },
  discordEmbed: { description: "Send a rich Discord embed message", parameters: [{ name: "webhookUrl", dataType: "string", description: "Discord webhook URL", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{title, description, color, fields, thumbnail, image, footer, timestamp}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{ok, status}", example: 'notification.discordEmbed $url {"title": "Alert", "description": "CPU > 90%", "color": "#FF0000"}' },
  telegram: { description: "Send a message via Telegram Bot API", parameters: [{ name: "botToken", dataType: "string", description: "Telegram bot token", formInputType: "text", required: true }, { name: "chatId", dataType: "string", description: "Chat/group ID", formInputType: "text", required: true }, { name: "message", dataType: "string", description: "Message text (HTML or Markdown)", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{parseMode, disablePreview, silent}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{ok, messageId}", example: 'notification.telegram $token $chatId "<b>Alert:</b> Server down"' },
  teams: { description: "Send a message to Microsoft Teams via webhook", parameters: [{ name: "webhookUrl", dataType: "string", description: "Teams webhook URL", formInputType: "text", required: true }, { name: "message", dataType: "any", description: "String or Teams message object", formInputType: "text", required: true }], returnType: "object", returnDescription: "{ok, status}", example: 'notification.teams $webhookUrl "Task completed"' },
  teamsCard: { description: "Send a rich MessageCard to Microsoft Teams", parameters: [{ name: "webhookUrl", dataType: "string", description: "Teams webhook URL", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{title, text, color, sections, actions}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{ok, status}", example: 'notification.teamsCard $url {"title": "Release", "text": "v2.0 deployed", "color": "00FF00"}' },
  sendAll: { description: "Send a message to multiple channels at once", parameters: [{ name: "channels", dataType: "array", description: "Array of {type, url/token, chatId}", formInputType: "text", required: true }, { name: "message", dataType: "string", description: "Message text", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of {channel, ok, error?}", example: 'notification.sendAll $channels "System alert: disk 90%"' },
};

export const NotificationModuleMetadata = {
  description: "Unified notifications to Slack, Discord, Telegram, and Microsoft Teams via webhooks",
  methods: ["slack", "slackRich", "discord", "discordEmbed", "telegram", "teams", "teamsCard", "sendAll"],
};
