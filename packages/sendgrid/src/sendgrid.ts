import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ── Internal State ──────────────────────────────────────────────────

let apiKey = "";

const API_BASE = "https://api.sendgrid.com/v3";

// ── Helper ──────────────────────────────────────────────────────────

function ensureApiKey(): void {
  if (!apiKey) {
    throw new Error("SendGrid API key not set. Call sendgrid.setApiKey first.");
  }
}

async function sgFetch(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    queryParams?: Record<string, string>;
  } = {},
): Promise<Value> {
  ensureApiKey();

  const method = options.method ?? "GET";
  let url = `${API_BASE}${path}`;

  if (options.queryParams) {
    const params = new URLSearchParams(options.queryParams);
    url += `?${params.toString()}`;
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const fetchOptions: RequestInit = { method, headers };

  if (options.body !== undefined) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, fetchOptions);

  // Some SendGrid endpoints return 202 or 204 with no body
  if (response.status === 204 || response.status === 202) {
    const text = await response.text();
    if (!text) return { ok: true, statusCode: response.status };
    try {
      return JSON.parse(text);
    } catch {
      return { ok: true, statusCode: response.status };
    }
  }

  if (!response.ok) {
    let errorBody: string;
    try {
      errorBody = await response.text();
    } catch {
      errorBody = "unknown error";
    }
    throw new Error(`SendGrid API error (${response.status}): ${errorBody}`);
  }

  const text = await response.text();
  if (!text) return { ok: true, statusCode: response.status };

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

// ── Function Handlers ───────────────────────────────────────────────

const setApiKey: BuiltinHandler = (args) => {
  const key = String(args[0] ?? "");
  if (!key) throw new Error("API key is required");
  apiKey = key;
  return { ok: true };
};

const sendEmail: BuiltinHandler = async (args) => {
  const to = String(args[0] ?? "");
  const from = String(args[1] ?? "");
  const subject = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  if (!to) throw new Error("Recipient (to) is required");
  if (!from) throw new Error("Sender (from) is required");
  if (!subject) throw new Error("Subject is required");

  const personalizations: Record<string, unknown> = {
    to: [{ email: to }],
  };

  if (opts.cc) {
    const ccList = Array.isArray(opts.cc) ? opts.cc : [opts.cc];
    personalizations.cc = ccList.map((email: unknown) => ({ email: String(email) }));
  }

  if (opts.bcc) {
    const bccList = Array.isArray(opts.bcc) ? opts.bcc : [opts.bcc];
    personalizations.bcc = bccList.map((email: unknown) => ({ email: String(email) }));
  }

  const content: Array<{ type: string; value: string }> = [];

  if (opts.text) {
    content.push({ type: "text/plain", value: String(opts.text) });
  }
  if (opts.html) {
    content.push({ type: "text/html", value: String(opts.html) });
  }
  if (content.length === 0) {
    // Default to plain text with empty body
    content.push({ type: "text/plain", value: String(opts.body ?? "") });
  }

  const body: Record<string, unknown> = {
    personalizations: [personalizations],
    from: { email: from },
    subject,
    content,
  };

  if (opts.replyTo) {
    body.reply_to = { email: String(opts.replyTo) };
  }

  if (Array.isArray(opts.attachments)) {
    body.attachments = (opts.attachments as Record<string, unknown>[]).map((att: any) => ({
      content: att.content ? String(att.content) : undefined,
      filename: att.filename ? String(att.filename) : undefined,
      type: att.type ? String(att.type) : undefined,
      disposition: att.disposition ? String(att.disposition) : "attachment",
      content_id: att.contentId ? String(att.contentId) : undefined,
    }));
  }

  const result = await sgFetch("/mail/send", { method: "POST", body });
  return result;
};

const sendTemplate: BuiltinHandler = async (args) => {
  const to = String(args[0] ?? "");
  const from = String(args[1] ?? "");
  const templateId = String(args[2] ?? "");
  const dynamicData = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  const opts = (typeof args[4] === "object" && args[4] !== null ? args[4] : {}) as Record<string, unknown>;

  if (!to) throw new Error("Recipient (to) is required");
  if (!from) throw new Error("Sender (from) is required");
  if (!templateId) throw new Error("Template ID is required");

  const personalizations: Record<string, unknown> = {
    to: [{ email: to }],
    dynamic_template_data: dynamicData,
  };

  if (opts.cc) {
    const ccList = Array.isArray(opts.cc) ? opts.cc : [opts.cc];
    personalizations.cc = ccList.map((email: unknown) => ({ email: String(email) }));
  }

  if (opts.bcc) {
    const bccList = Array.isArray(opts.bcc) ? opts.bcc : [opts.bcc];
    personalizations.bcc = bccList.map((email: unknown) => ({ email: String(email) }));
  }

  const body: Record<string, unknown> = {
    personalizations: [personalizations],
    from: { email: from },
    template_id: templateId,
  };

  if (opts.subject) {
    body.subject = String(opts.subject);
  }

  if (opts.replyTo) {
    body.reply_to = { email: String(opts.replyTo) };
  }

  const result = await sgFetch("/mail/send", { method: "POST", body });
  return result;
};

const addContact: BuiltinHandler = async (args) => {
  const email = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!email) throw new Error("Email is required");

  const contact: Record<string, unknown> = { email };

  if (opts.firstName) contact.first_name = String(opts.firstName);
  if (opts.lastName) contact.last_name = String(opts.lastName);
  if (opts.city) contact.city = String(opts.city);
  if (opts.state) contact.state_province_region = String(opts.state);
  if (opts.country) contact.country = String(opts.country);
  if (opts.postalCode) contact.postal_code = String(opts.postalCode);

  if (typeof opts.customFields === "object" && opts.customFields !== null) {
    contact.custom_fields = opts.customFields;
  }

  const body: Record<string, unknown> = {
    contacts: [contact],
  };

  if (opts.listIds && Array.isArray(opts.listIds)) {
    body.list_ids = opts.listIds.map((id: unknown) => String(id));
  }

  const result = await sgFetch("/marketing/contacts", { method: "PUT", body });
  return result;
};

const addContacts: BuiltinHandler = async (args) => {
  const contacts = args[0];

  if (!Array.isArray(contacts) || contacts.length === 0) {
    throw new Error("Contacts array is required and must not be empty");
  }

  const mappedContacts = (contacts as Record<string, unknown>[]).map((c: any) => {
    const contact: Record<string, unknown> = { email: String(c.email ?? "") };
    if (c.firstName) contact.first_name = String(c.firstName);
    if (c.lastName) contact.last_name = String(c.lastName);
    if (c.city) contact.city = String(c.city);
    if (c.state) contact.state_province_region = String(c.state);
    if (c.country) contact.country = String(c.country);
    if (c.postalCode) contact.postal_code = String(c.postalCode);
    if (typeof c.customFields === "object" && c.customFields !== null) {
      contact.custom_fields = c.customFields;
    }
    return contact;
  });

  const result = await sgFetch("/marketing/contacts", {
    method: "PUT",
    body: { contacts: mappedContacts },
  });
  return result;
};

const removeContact: BuiltinHandler = async (args) => {
  const contactId = String(args[0] ?? "");
  if (!contactId) throw new Error("Contact ID is required");

  const result = await sgFetch(`/marketing/contacts`, {
    method: "DELETE",
    queryParams: { ids: contactId },
  });
  return result;
};

const searchContacts: BuiltinHandler = async (args) => {
  const query = String(args[0] ?? "");
  if (!query) throw new Error("Search query (SGQL) is required");

  const result = await sgFetch("/marketing/contacts/search", {
    method: "POST",
    body: { query },
  });
  return result;
};

const listContacts: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;

  const queryParams: Record<string, string> = {};

  if (opts.pageSize) queryParams.page_size = String(opts.pageSize);
  if (opts.pageToken) queryParams.page_token = String(opts.pageToken);

  const result = await sgFetch("/marketing/contacts", { queryParams });
  return result;
};

const createList: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "");
  if (!name) throw new Error("List name is required");

  const result = await sgFetch("/marketing/lists", {
    method: "POST",
    body: { name },
  });
  return result;
};

const listLists: BuiltinHandler = async () => {
  const result = await sgFetch("/marketing/lists");
  return result;
};

const deleteList: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  if (!listId) throw new Error("List ID is required");

  const result = await sgFetch(`/marketing/lists/${listId}`, {
    method: "DELETE",
  });
  return result;
};

const addToList: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  const contactIds = args[1];

  if (!listId) throw new Error("List ID is required");
  if (!Array.isArray(contactIds) || contactIds.length === 0) {
    throw new Error("Contact IDs array is required and must not be empty");
  }

  const result = await sgFetch(`/marketing/lists/${listId}/contacts`, {
    method: "PUT",
    body: { contact_ids: contactIds.map((id: unknown) => String(id)) },
  });
  return result;
};

const removeFromList: BuiltinHandler = async (args) => {
  const listId = String(args[0] ?? "");
  const contactIds = args[1];

  if (!listId) throw new Error("List ID is required");
  if (!Array.isArray(contactIds) || contactIds.length === 0) {
    throw new Error("Contact IDs array is required and must not be empty");
  }

  const ids = contactIds.map((id: unknown) => String(id)).join(",");
  const result = await sgFetch(`/marketing/lists/${listId}/contacts`, {
    method: "DELETE",
    queryParams: { contact_ids: ids },
  });
  return result;
};

const getSingleSend: BuiltinHandler = async (args) => {
  const singleSendId = String(args[0] ?? "");
  if (!singleSendId) throw new Error("Single Send ID is required");

  const result = await sgFetch(`/marketing/singlesends/${singleSendId}`);
  return result;
};

const listSingleSends: BuiltinHandler = async () => {
  const result = await sgFetch("/marketing/singlesends");
  return result;
};

const createSingleSend: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!name) throw new Error("Single Send name is required");

  const body: Record<string, unknown> = { name };

  if (opts.sendTo) {
    body.send_to = opts.sendTo;
  }

  if (opts.emailConfig) {
    body.email_config = opts.emailConfig;
  }

  if (opts.sendAt) {
    body.send_at = String(opts.sendAt);
  }

  const result = await sgFetch("/marketing/singlesends", {
    method: "POST",
    body,
  });
  return result;
};

const sendSingleSend: BuiltinHandler = async (args) => {
  const singleSendId = String(args[0] ?? "");
  if (!singleSendId) throw new Error("Single Send ID is required");

  const result = await sgFetch(`/marketing/singlesends/${singleSendId}/schedule`, {
    method: "PUT",
    body: { send_at: "now" },
  });
  return result;
};

const getStats: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;

  const queryParams: Record<string, string> = {};

  if (opts.startDate) queryParams.start_date = String(opts.startDate);
  if (opts.endDate) queryParams.end_date = String(opts.endDate);
  if (opts.aggregatedBy) queryParams.aggregated_by = String(opts.aggregatedBy);

  const result = await sgFetch("/stats", { queryParams });
  return result;
};

const getTemplates: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;

  const queryParams: Record<string, string> = {};

  if (opts.generations) queryParams.generations = String(opts.generations);
  if (opts.pageSize) queryParams.page_size = String(opts.pageSize);

  const result = await sgFetch("/templates", { queryParams });
  return result;
};

const getTemplate: BuiltinHandler = async (args) => {
  const templateId = String(args[0] ?? "");
  if (!templateId) throw new Error("Template ID is required");

  const result = await sgFetch(`/templates/${templateId}`);
  return result;
};

// ── Exports ─────────────────────────────────────────────────────────

export const SendgridFunctions: Record<string, BuiltinHandler> = {
  setApiKey,
  sendEmail,
  sendTemplate,
  addContact,
  addContacts,
  removeContact,
  searchContacts,
  listContacts,
  createList,
  listLists,
  deleteList,
  addToList,
  removeFromList,
  getSingleSend,
  listSingleSends,
  createSingleSend,
  sendSingleSend,
  getStats,
  getTemplates,
  getTemplate,
};

export const SendgridFunctionMetadata = {
  setApiKey: {
    description: "Store the SendGrid API key for authentication",
    parameters: [
      { name: "apiKey", dataType: "string", description: "SendGrid API key (SG.xxx)", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'sendgrid.setApiKey "SG.xxxxxxxxxxxxxxxxxxxxxxxx"',
  },
  sendEmail: {
    description: "Send an email with text/html content, cc, bcc, replyTo, and attachments",
    parameters: [
      { name: "to", dataType: "string", description: "Recipient email address", formInputType: "text", required: true },
      { name: "from", dataType: "string", description: "Sender email address (must be verified)", formInputType: "text", required: true },
      { name: "subject", dataType: "string", description: "Email subject line", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{text?, html?, body?, cc?, bcc?, replyTo?, attachments?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{ok: true, statusCode: 202}",
    example: 'sendgrid.sendEmail "bob@example.com" "noreply@myapp.com" "Welcome!" {"html": "<h1>Hello!</h1>"}',
  },
  sendTemplate: {
    description: "Send an email using a SendGrid dynamic template",
    parameters: [
      { name: "to", dataType: "string", description: "Recipient email address", formInputType: "text", required: true },
      { name: "from", dataType: "string", description: "Sender email address", formInputType: "text", required: true },
      { name: "templateId", dataType: "string", description: "Dynamic template ID (d-xxxx)", formInputType: "text", required: true },
      { name: "dynamicData", dataType: "object", description: "Dynamic template data (key-value pairs)", formInputType: "json", required: false },
      { name: "options", dataType: "object", description: "{subject?, cc?, bcc?, replyTo?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{ok: true, statusCode: 202}",
    example: 'sendgrid.sendTemplate "bob@example.com" "noreply@myapp.com" "d-abc123" {"name": "Bob", "orderId": "12345"}',
  },
  addContact: {
    description: "Add or update a single contact in SendGrid Marketing",
    parameters: [
      { name: "email", dataType: "string", description: "Contact email address", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{firstName?, lastName?, city?, state?, country?, postalCode?, customFields?, listIds?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{job_id: string}",
    example: 'sendgrid.addContact "bob@example.com" {"firstName": "Bob", "lastName": "Smith"}',
  },
  addContacts: {
    description: "Bulk add or update contacts in SendGrid Marketing",
    parameters: [
      { name: "contacts", dataType: "array", description: "Array of contact objects [{email, firstName?, lastName?, ...}]", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "{job_id: string}",
    example: 'sendgrid.addContacts [{"email": "a@b.com", "firstName": "Alice"}, {"email": "b@b.com", "firstName": "Bob"}]',
  },
  removeContact: {
    description: "Delete a contact by ID from SendGrid Marketing",
    parameters: [
      { name: "contactId", dataType: "string", description: "Contact ID to delete", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{job_id: string}",
    example: 'sendgrid.removeContact "abc-123-def-456"',
  },
  searchContacts: {
    description: "Search contacts using SendGrid Segmentation Query Language (SGQL)",
    parameters: [
      { name: "query", dataType: "string", description: "SGQL query (e.g. \"email LIKE '%example.com'\")", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{result: array of contacts, contact_count: number}",
    example: "sendgrid.searchContacts \"first_name = 'Bob'\"",
  },
  listContacts: {
    description: "List all contacts with optional pagination",
    parameters: [
      { name: "options", dataType: "object", description: "{pageSize?, pageToken?}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{result: array, contact_count: number, _metadata: {next?: string}}",
    example: 'sendgrid.listContacts {"pageSize": 50}',
  },
  createList: {
    description: "Create a new contact list in SendGrid Marketing",
    parameters: [
      { name: "name", dataType: "string", description: "Name of the contact list", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{id: string, name: string, contact_count: number}",
    example: 'sendgrid.createList "Newsletter Subscribers"',
  },
  listLists: {
    description: "List all contact lists in SendGrid Marketing",
    parameters: [],
    returnType: "object",
    returnDescription: "{result: array of lists}",
    example: "sendgrid.listLists",
  },
  deleteList: {
    description: "Delete a contact list by ID",
    parameters: [
      { name: "listId", dataType: "string", description: "List ID to delete", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{ok: true}",
    example: 'sendgrid.deleteList "abc-123"',
  },
  addToList: {
    description: "Add contacts to a contact list by their IDs",
    parameters: [
      { name: "listId", dataType: "string", description: "Contact list ID", formInputType: "text", required: true },
      { name: "contactIds", dataType: "array", description: "Array of contact IDs to add", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "{job_id: string}",
    example: 'sendgrid.addToList "list-123" ["contact-1", "contact-2"]',
  },
  removeFromList: {
    description: "Remove contacts from a contact list by their IDs",
    parameters: [
      { name: "listId", dataType: "string", description: "Contact list ID", formInputType: "text", required: true },
      { name: "contactIds", dataType: "array", description: "Array of contact IDs to remove", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "{job_id: string}",
    example: 'sendgrid.removeFromList "list-123" ["contact-1", "contact-2"]',
  },
  getSingleSend: {
    description: "Get details of a Single Send campaign by ID",
    parameters: [
      { name: "singleSendId", dataType: "string", description: "Single Send ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Single Send object with id, name, status, send_at, etc.",
    example: 'sendgrid.getSingleSend "abc-123"',
  },
  listSingleSends: {
    description: "List all Single Send campaigns",
    parameters: [],
    returnType: "object",
    returnDescription: "{result: array of Single Send objects}",
    example: "sendgrid.listSingleSends",
  },
  createSingleSend: {
    description: "Create a new Single Send campaign",
    parameters: [
      { name: "name", dataType: "string", description: "Campaign name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{sendTo?: {list_ids, all?}, emailConfig?: {subject, html_content, sender_id, ...}, sendAt?}", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "{id: string, name: string, status: string}",
    example: 'sendgrid.createSingleSend "February Newsletter" {"sendTo": {"list_ids": ["list-1"]}, "emailConfig": {"subject": "News", "sender_id": 123}}',
  },
  sendSingleSend: {
    description: "Send or schedule a Single Send campaign immediately",
    parameters: [
      { name: "singleSendId", dataType: "string", description: "Single Send ID to send", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "{status: string, send_at: string}",
    example: 'sendgrid.sendSingleSend "abc-123"',
  },
  getStats: {
    description: "Get global email statistics (requests, deliveries, opens, clicks, etc.)",
    parameters: [
      { name: "options", dataType: "object", description: "{startDate?: 'YYYY-MM-DD', endDate?: 'YYYY-MM-DD', aggregatedBy?: 'day'|'week'|'month'}", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of stats objects with date and metrics",
    example: 'sendgrid.getStats {"startDate": "2026-01-01", "endDate": "2026-01-31", "aggregatedBy": "day"}',
  },
  getTemplates: {
    description: "List all email templates with optional generation filter",
    parameters: [
      { name: "options", dataType: "object", description: "{generations?: 'legacy'|'dynamic', pageSize?: number}", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "{result: array of template objects}",
    example: 'sendgrid.getTemplates {"generations": "dynamic"}',
  },
  getTemplate: {
    description: "Get details of a specific email template by ID",
    parameters: [
      { name: "templateId", dataType: "string", description: "Template ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Template object with id, name, versions, etc.",
    example: 'sendgrid.getTemplate "d-abc123"',
  },
};

export const SendgridModuleMetadata = {
  description: "SendGrid v3 API client for transactional email, dynamic templates, contact management, marketing campaigns, and analytics",
  methods: Object.keys(SendgridFunctions),
  category: "email",
};
