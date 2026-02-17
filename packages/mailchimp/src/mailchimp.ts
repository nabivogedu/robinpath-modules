import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── Internal State ──────────────────────────────────────────────────

let storedApiKey = "";
let storedServerPrefix = "";

function getBaseUrl(): string {
  if (!storedServerPrefix) throw new Error("Mailchimp server prefix not set. Call mailchimp.setCredentials first.");
  return `https://${storedServerPrefix}.api.mailchimp.com/3.0`;
}

function getAuthHeaders(): Record<string, string> {
  if (!storedApiKey) throw new Error("Mailchimp API key not set. Call mailchimp.setCredentials first.");
  const encoded = Buffer.from(`anystring:${storedApiKey}`).toString("base64");
  return {
    Authorization: `Basic ${encoded}`,
    "Content-Type": "application/json",
  };
}

async function mcFetch(path: string, options: RequestInit = {}): Promise<Value> {
  const url = `${getBaseUrl()}${path}`;
  const headers = getAuthHeaders();
  const res = await fetch(url, {
    ...options,
    headers: { ...headers, ...(options.headers as Record<string, string> ?? {}) },
  });
  const text = await res.text();
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  if (!res.ok) {
    const detail = typeof data === "object" && data !== null && "detail" in data ? (data as Record<string, unknown>).detail : text;
    throw new Error(`Mailchimp API error ${res.status}: ${detail}`);
  }
  return data;
}

function md5(input: string): string {
  // Simple MD5 implementation for email hashing
  const crypto = require("crypto") as typeof import("crypto");
  return crypto.createHash("md5").update(input).digest("hex");
}

function emailHash(email: string): string {
  return md5(email.toLowerCase().trim());
}

// ── Function Handlers ───────────────────────────────────────────────

const setCredentials: BuiltinHandler = (args) => {
  const apiKey = String(args[0] ?? "");
  const serverPrefix = String(args[1] ?? "");
  if (!apiKey) throw new Error("API key is required.");
  if (!serverPrefix) throw new Error("Server prefix is required (e.g. 'us21').");
  storedApiKey = apiKey;
  storedServerPrefix = serverPrefix;
  return { configured: true, serverPrefix };
};

const getLists: BuiltinHandler = async () => {
  const data = await mcFetch("/lists") as Record<string, unknown>;
  return data;
};

const getList: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  if (!listId) throw new Error("listId is required.");
  const data = await mcFetch(`/lists/${listId}`);
  return data;
};

const createList: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!name) throw new Error("List name is required.");

  const body: Record<string, unknown> = {
    name,
    permission_reminder: opts.permissionReminder ?? opts.permission_reminder ?? "You signed up for updates.",
    contact: opts.contact ?? {
      company: opts.company ?? "",
      address1: opts.address1 ?? "",
      city: opts.city ?? "",
      state: opts.state ?? "",
      zip: opts.zip ?? "",
      country: opts.country ?? "US",
    },
    campaign_defaults: opts.campaignDefaults ?? opts.campaign_defaults ?? {
      from_name: opts.fromName ?? opts.from_name ?? "",
      from_email: opts.fromEmail ?? opts.from_email ?? "",
      subject: opts.subject ?? "",
      language: opts.language ?? "en",
    },
    email_type_option: opts.emailTypeOption ?? opts.email_type_option ?? true,
  };

  const data = await mcFetch("/lists", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data;
};

const deleteList: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  if (!listId) throw new Error("listId is required.");
  await mcFetch(`/lists/${listId}`, { method: "DELETE" });
  return { deleted: true, listId };
};

const getMembers: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!listId) throw new Error("listId is required.");

  const params = new URLSearchParams();
  if (opts.status) params.set("status", String(opts.status));
  if (opts.count) params.set("count", String(opts.count));
  if (opts.offset) params.set("offset", String(opts.offset));

  const qs = params.toString();
  const data = await mcFetch(`/lists/${listId}/members${qs ? `?${qs}` : ""}`);
  return data;
};

const getMember: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  const email = String(args[1] ?? "");
  if (!listId) throw new Error("listId is required.");
  if (!email) throw new Error("email is required.");

  const hash = emailHash(email);
  const data = await mcFetch(`/lists/${listId}/members/${hash}`);
  return data;
};

const addMember: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  const email = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!listId) throw new Error("listId is required.");
  if (!email) throw new Error("email is required.");

  const body: Record<string, unknown> = {
    email_address: email,
    status: opts.status ?? "subscribed",
  };
  if (opts.mergeFields ?? opts.merge_fields) body.merge_fields = opts.mergeFields ?? opts.merge_fields;
  if (opts.tags) body.tags = opts.tags;
  if (opts.language) body.language = opts.language;
  if (opts.vip !== undefined) body.vip = opts.vip;

  const data = await mcFetch(`/lists/${listId}/members`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data;
};

const updateMember: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  const email = String(args[1] ?? "");
  const fields = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!listId) throw new Error("listId is required.");
  if (!email) throw new Error("email is required.");

  const hash = emailHash(email);
  const body: Record<string, unknown> = {};
  if (fields.status) body.status = fields.status;
  if (fields.mergeFields ?? fields.merge_fields) body.merge_fields = fields.mergeFields ?? fields.merge_fields;
  if (fields.language) body.language = fields.language;
  if (fields.vip !== undefined) body.vip = fields.vip;
  if (fields.emailAddress ?? fields.email_address) body.email_address = fields.emailAddress ?? fields.email_address;

  const data = await mcFetch(`/lists/${listId}/members/${hash}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  return data;
};

const removeMember: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  const email = String(args[1] ?? "");
  if (!listId) throw new Error("listId is required.");
  if (!email) throw new Error("email is required.");

  const hash = emailHash(email);
  await mcFetch(`/lists/${listId}/members/${hash}`, { method: "DELETE" });
  return { archived: true, email };
};

const addTag: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  const email = String(args[1] ?? "");
  const tags = args[2];
  if (!listId) throw new Error("listId is required.");
  if (!email) throw new Error("email is required.");
  if (!tags) throw new Error("tags are required.");

  const tagArray = Array.isArray(tags) ? tags : [tags];
  const body = {
    tags: tagArray.map((t: any) => ({ name: String(t), status: "active" })),
  };

  const hash = emailHash(email);
  const data = await mcFetch(`/lists/${listId}/members/${hash}/tags`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data ?? { tagged: true, email, tags: tagArray };
};

const removeTag: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  const email = String(args[1] ?? "");
  const tags = args[2];
  if (!listId) throw new Error("listId is required.");
  if (!email) throw new Error("email is required.");
  if (!tags) throw new Error("tags are required.");

  const tagArray = Array.isArray(tags) ? tags : [tags];
  const body = {
    tags: tagArray.map((t: any) => ({ name: String(t), status: "inactive" })),
  };

  const hash = emailHash(email);
  const data = await mcFetch(`/lists/${listId}/members/${hash}/tags`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data ?? { untagged: true, email, tags: tagArray };
};

const getCampaigns: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;

  const params = new URLSearchParams();
  if (opts.status) params.set("status", String(opts.status));
  if (opts.type) params.set("type", String(opts.type));
  if (opts.count) params.set("count", String(opts.count));
  if (opts.offset) params.set("offset", String(opts.offset));

  const qs = params.toString();
  const data = await mcFetch(`/campaigns${qs ? `?${qs}` : ""}`);
  return data;
};

const getCampaign: BuiltinHandler = async (args) => {
  const campaignId = String(args[0] ?? "");
  if (!campaignId) throw new Error("campaignId is required.");
  const data = await mcFetch(`/campaigns/${campaignId}`);
  return data;
};

const createCampaign: BuiltinHandler = async (args) => {
  const type = String(args[0] ?? "regular");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const body: Record<string, unknown> = { type };
  if (opts.recipients) body.recipients = opts.recipients;
  if (opts.settings) body.settings = opts.settings;
  if (opts.tracking) body.tracking = opts.tracking;

  const data = await mcFetch("/campaigns", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data;
};

const updateCampaign: BuiltinHandler = async (args) => {
  const campaignId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!campaignId) throw new Error("campaignId is required.");

  const body: Record<string, unknown> = {};
  if (opts.recipients) body.recipients = opts.recipients;
  if (opts.settings) body.settings = opts.settings;
  if (opts.tracking) body.tracking = opts.tracking;

  const data = await mcFetch(`/campaigns/${campaignId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  return data;
};

const deleteCampaign: BuiltinHandler = async (args) => {
  const campaignId = String(args[0] ?? "");
  if (!campaignId) throw new Error("campaignId is required.");
  await mcFetch(`/campaigns/${campaignId}`, { method: "DELETE" });
  return { deleted: true, campaignId };
};

const sendCampaign: BuiltinHandler = async (args) => {
  const campaignId = String(args[0] ?? "");
  if (!campaignId) throw new Error("campaignId is required.");
  await mcFetch(`/campaigns/${campaignId}/actions/send`, { method: "POST" });
  return { sent: true, campaignId };
};

const scheduleCampaign: BuiltinHandler = async (args) => {
  const campaignId = String(args[0] ?? "");
  const scheduleTime = String(args[1] ?? "");
  if (!campaignId) throw new Error("campaignId is required.");
  if (!scheduleTime) throw new Error("scheduleTime is required (ISO 8601 format).");

  await mcFetch(`/campaigns/${campaignId}/actions/schedule`, {
    method: "POST",
    body: JSON.stringify({ schedule_time: scheduleTime }),
  });
  return { scheduled: true, campaignId, scheduleTime };
};

const getCampaignContent: BuiltinHandler = async (args) => {
  const campaignId = String(args[0] ?? "");
  if (!campaignId) throw new Error("campaignId is required.");
  const data = await mcFetch(`/campaigns/${campaignId}/content`);
  return data;
};

const setCampaignContent: BuiltinHandler = async (args) => {
  const campaignId = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!campaignId) throw new Error("campaignId is required.");

  const body: Record<string, unknown> = {};
  if (opts.html) body.html = opts.html;
  if (opts.plain_text ?? opts.plainText) body.plain_text = opts.plain_text ?? opts.plainText;
  if (opts.template) body.template = opts.template;

  const data = await mcFetch(`/campaigns/${campaignId}/content`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return data;
};

const getTemplates: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;

  const params = new URLSearchParams();
  if (opts.count) params.set("count", String(opts.count));
  if (opts.offset) params.set("offset", String(opts.offset));
  if (opts.type) params.set("type", String(opts.type));

  const qs = params.toString();
  const data = await mcFetch(`/templates${qs ? `?${qs}` : ""}`);
  return data;
};

const getTemplate: BuiltinHandler = async (args) => {
  const templateId = String(args[0] ?? "");
  if (!templateId) throw new Error("templateId is required.");
  const data = await mcFetch(`/templates/${templateId}`);
  return data;
};

const searchMembers: BuiltinHandler = async (args) => {
  const query = String(args[0] ?? "");
  const listId = args[1] != null ? String(args[1]) : undefined;
  if (!query) throw new Error("query is required.");

  const params = new URLSearchParams();
  params.set("query", query);
  if (listId) params.set("list_id", listId);

  const data = await mcFetch(`/search-members?${params.toString()}`);
  return data;
};

const getListActivity: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  if (!listId) throw new Error("listId is required.");
  const data = await mcFetch(`/lists/${listId}/activity`);
  return data;
};

// ── Exports ─────────────────────────────────────────────────────────

export const MailchimpFunctions: Record<string, BuiltinHandler> = {
  setCredentials,
  getLists,
  getList,
  createList,
  deleteList,
  getMembers,
  getMember,
  addMember,
  updateMember,
  removeMember,
  addTag,
  removeTag,
  getCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  sendCampaign,
  scheduleCampaign,
  getCampaignContent,
  setCampaignContent,
  getTemplates,
  getTemplate,
  searchMembers,
  getListActivity,
};

export const MailchimpFunctionMetadata = {
  setCredentials: {
    description: "Store Mailchimp API key and server prefix for authentication",
    parameters: [
      { name: "apiKey", dataType: "string", description: "Mailchimp API key", formInputType: "text", required: true },
      { name: "serverPrefix", dataType: "string", description: "Server prefix (e.g. 'us21')", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{configured, serverPrefix}", example: 'mailchimp.setCredentials "abc123-us21" "us21"',
  },
  getLists: {
    description: "Get all audiences/lists in the account",
    parameters: [],
    returnType: "object", returnDescription: "Lists response with items and total count", example: "mailchimp.getLists",
  },
  getList: {
    description: "Get details for a specific audience/list",
    parameters: [
      { name: "listId", dataType: "string", description: "The list/audience ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "List details object", example: 'mailchimp.getList "abc123"',
  },
  createList: {
    description: "Create a new audience/list with contact info and campaign defaults",
    parameters: [
      { name: "name", dataType: "string", description: "List name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{contact, campaignDefaults, permissionReminder, emailTypeOption}", formInputType: "json", required: true },
    ],
    returnType: "object", returnDescription: "Created list object", example: 'mailchimp.createList "My Newsletter" {"company": "Acme", "fromEmail": "news@acme.com", "fromName": "Acme News"}',
  },
  deleteList: {
    description: "Delete an audience/list",
    parameters: [
      { name: "listId", dataType: "string", description: "The list/audience ID to delete", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{deleted, listId}", example: 'mailchimp.deleteList "abc123"',
  },
  getMembers: {
    description: "Get members of an audience/list with optional filtering",
    parameters: [
      { name: "listId", dataType: "string", description: "The list/audience ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{status, count, offset}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Members response with items and total count", example: 'mailchimp.getMembers "abc123" {"status": "subscribed", "count": 50}',
  },
  getMember: {
    description: "Get a specific member by email address",
    parameters: [
      { name: "listId", dataType: "string", description: "The list/audience ID", formInputType: "text", required: true },
      { name: "email", dataType: "string", description: "Member email address", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Member details object", example: 'mailchimp.getMember "abc123" "user@example.com"',
  },
  addMember: {
    description: "Add a new member to an audience/list",
    parameters: [
      { name: "listId", dataType: "string", description: "The list/audience ID", formInputType: "text", required: true },
      { name: "email", dataType: "string", description: "Member email address", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{status, mergeFields, tags, language, vip}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Created member object", example: 'mailchimp.addMember "abc123" "user@example.com" {"status": "subscribed", "mergeFields": {"FNAME": "John"}}',
  },
  updateMember: {
    description: "Update an existing member's information",
    parameters: [
      { name: "listId", dataType: "string", description: "The list/audience ID", formInputType: "text", required: true },
      { name: "email", dataType: "string", description: "Member email address", formInputType: "text", required: true },
      { name: "fields", dataType: "object", description: "{status, mergeFields, language, vip, emailAddress}", formInputType: "json", required: true },
    ],
    returnType: "object", returnDescription: "Updated member object", example: 'mailchimp.updateMember "abc123" "user@example.com" {"mergeFields": {"FNAME": "Jane"}}',
  },
  removeMember: {
    description: "Archive/remove a member from an audience/list",
    parameters: [
      { name: "listId", dataType: "string", description: "The list/audience ID", formInputType: "text", required: true },
      { name: "email", dataType: "string", description: "Member email address to remove", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{archived, email}", example: 'mailchimp.removeMember "abc123" "user@example.com"',
  },
  addTag: {
    description: "Add tags to a member in an audience/list",
    parameters: [
      { name: "listId", dataType: "string", description: "The list/audience ID", formInputType: "text", required: true },
      { name: "email", dataType: "string", description: "Member email address", formInputType: "text", required: true },
      { name: "tags", dataType: "array", description: "Tag names to add", formInputType: "json", required: true },
    ],
    returnType: "object", returnDescription: "{tagged, email, tags}", example: 'mailchimp.addTag "abc123" "user@example.com" ["vip", "newsletter"]',
  },
  removeTag: {
    description: "Remove tags from a member in an audience/list",
    parameters: [
      { name: "listId", dataType: "string", description: "The list/audience ID", formInputType: "text", required: true },
      { name: "email", dataType: "string", description: "Member email address", formInputType: "text", required: true },
      { name: "tags", dataType: "array", description: "Tag names to remove", formInputType: "json", required: true },
    ],
    returnType: "object", returnDescription: "{untagged, email, tags}", example: 'mailchimp.removeTag "abc123" "user@example.com" ["old-tag"]',
  },
  getCampaigns: {
    description: "List campaigns with optional filtering",
    parameters: [
      { name: "options", dataType: "object", description: "{status, type, count, offset}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Campaigns response with items and total count", example: 'mailchimp.getCampaigns {"status": "sent", "count": 20}',
  },
  getCampaign: {
    description: "Get details for a specific campaign",
    parameters: [
      { name: "campaignId", dataType: "string", description: "The campaign ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Campaign details object", example: 'mailchimp.getCampaign "cam123"',
  },
  createCampaign: {
    description: "Create a new campaign (regular, plaintext, or absplit)",
    parameters: [
      { name: "type", dataType: "string", description: "Campaign type: regular, plaintext, absplit", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{recipients, settings, tracking}", formInputType: "json", required: true },
    ],
    returnType: "object", returnDescription: "Created campaign object", example: 'mailchimp.createCampaign "regular" {"recipients": {"list_id": "abc123"}, "settings": {"subject_line": "Hello", "from_name": "Acme", "reply_to": "news@acme.com"}}',
  },
  updateCampaign: {
    description: "Update campaign settings",
    parameters: [
      { name: "campaignId", dataType: "string", description: "The campaign ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{recipients, settings, tracking}", formInputType: "json", required: true },
    ],
    returnType: "object", returnDescription: "Updated campaign object", example: 'mailchimp.updateCampaign "cam123" {"settings": {"subject_line": "Updated Subject"}}',
  },
  deleteCampaign: {
    description: "Delete a campaign",
    parameters: [
      { name: "campaignId", dataType: "string", description: "The campaign ID to delete", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{deleted, campaignId}", example: 'mailchimp.deleteCampaign "cam123"',
  },
  sendCampaign: {
    description: "Send a campaign immediately",
    parameters: [
      { name: "campaignId", dataType: "string", description: "The campaign ID to send", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{sent, campaignId}", example: 'mailchimp.sendCampaign "cam123"',
  },
  scheduleCampaign: {
    description: "Schedule a campaign for future delivery",
    parameters: [
      { name: "campaignId", dataType: "string", description: "The campaign ID to schedule", formInputType: "text", required: true },
      { name: "scheduleTime", dataType: "string", description: "ISO 8601 datetime for sending", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{scheduled, campaignId, scheduleTime}", example: 'mailchimp.scheduleCampaign "cam123" "2025-12-25T10:00:00Z"',
  },
  getCampaignContent: {
    description: "Get the content of a campaign",
    parameters: [
      { name: "campaignId", dataType: "string", description: "The campaign ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Campaign content with html and plain text", example: 'mailchimp.getCampaignContent "cam123"',
  },
  setCampaignContent: {
    description: "Set the content of a campaign with HTML or a template",
    parameters: [
      { name: "campaignId", dataType: "string", description: "The campaign ID", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{html, plainText, template}", formInputType: "json", required: true },
    ],
    returnType: "object", returnDescription: "Updated campaign content", example: 'mailchimp.setCampaignContent "cam123" {"html": "<h1>Hello</h1><p>Welcome!</p>"}',
  },
  getTemplates: {
    description: "List available email templates",
    parameters: [
      { name: "options", dataType: "object", description: "{count, offset, type}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Templates response with items and total count", example: 'mailchimp.getTemplates {"count": 20}',
  },
  getTemplate: {
    description: "Get details for a specific template",
    parameters: [
      { name: "templateId", dataType: "string", description: "The template ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Template details object", example: 'mailchimp.getTemplate "tmpl123"',
  },
  searchMembers: {
    description: "Search for members across all lists or a specific list",
    parameters: [
      { name: "query", dataType: "string", description: "Search query string", formInputType: "text", required: true },
      { name: "listId", dataType: "string", description: "Optional list ID to limit search", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "Search results with matching members", example: 'mailchimp.searchMembers "john@example.com"',
  },
  getListActivity: {
    description: "Get recent activity stats for an audience/list",
    parameters: [
      { name: "listId", dataType: "string", description: "The list/audience ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "List activity data with daily stats", example: 'mailchimp.getListActivity "abc123"',
  },
};

export const MailchimpModuleMetadata = {
  description: "Mailchimp Marketing API v3 - manage audiences, members, campaigns, templates, and tags",
  methods: Object.keys(MailchimpFunctions),
  category: "email",
};
