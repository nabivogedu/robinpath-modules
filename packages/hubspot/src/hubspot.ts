import type { BuiltinHandler, Value, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getToken(): string {
  const token = config.get("token");
  if (!token) throw new Error('HubSpot: token not configured. Call hubspot.setToken first.');
  return token;
}

async function hubspotApi(path: string, method = "GET", body?: unknown): Promise<Value> {
  const token = getToken();
  const res = await fetch(`https://api.hubapi.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HubSpot API error (${res.status}): ${text}`);
  }
  if (res.status === 204) return { success: true };
  return res.json();
}

const setToken: BuiltinHandler = (args) => {
  const token = args[0] as string;
  if (!token) throw new Error("hubspot.setToken requires a token.");
  config.set("token", token);
  return "HubSpot token configured.";
};

const createContact: BuiltinHandler = async (args) => {
  const properties = args[0] as Record<string, unknown>;
  if (!properties) throw new Error("hubspot.createContact requires properties.");
  return hubspotApi("/crm/v3/objects/contacts", "POST", { properties });
};

const getContact: BuiltinHandler = async (args) => {
  const contactId = args[0] as string;
  const properties = args[1] as string[] | undefined;
  if (!contactId) throw new Error("hubspot.getContact requires a contactId.");
  let path = `/crm/v3/objects/contacts/${contactId}`;
  if (properties?.length) path += `?properties=${properties.join(",")}`;
  return hubspotApi(path);
};

const updateContact: BuiltinHandler = async (args) => {
  const contactId = args[0] as string;
  const properties = args[1] as Record<string, unknown>;
  if (!contactId || !properties) throw new Error("hubspot.updateContact requires contactId and properties.");
  return hubspotApi(`/crm/v3/objects/contacts/${contactId}`, "PATCH", { properties });
};

const listContacts: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const params = new URLSearchParams();
  if (opts.limit) params.set("limit", String(opts.limit));
  if (opts.after) params.set("after", String(opts.after));
  if (opts.properties) params.set("properties", String(opts.properties));
  return hubspotApi(`/crm/v3/objects/contacts?${params.toString()}`);
};

const searchContacts: BuiltinHandler = async (args) => {
  const query = args[0] as string;
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  if (!query) throw new Error("hubspot.searchContacts requires a query.");
  const payload: Record<string, unknown> = {
    query,
    limit: opts.limit ?? 10,
  };
  if (opts.properties) payload.properties = opts.properties;
  if (opts.filterGroups) payload.filterGroups = opts.filterGroups;
  return hubspotApi("/crm/v3/objects/contacts/search", "POST", payload);
};

const createDeal: BuiltinHandler = async (args) => {
  const properties = args[0] as Record<string, unknown>;
  if (!properties) throw new Error("hubspot.createDeal requires properties.");
  return hubspotApi("/crm/v3/objects/deals", "POST", { properties });
};

const getDeal: BuiltinHandler = async (args) => {
  const dealId = args[0] as string;
  const properties = args[1] as string[] | undefined;
  if (!dealId) throw new Error("hubspot.getDeal requires a dealId.");
  let path = `/crm/v3/objects/deals/${dealId}`;
  if (properties?.length) path += `?properties=${properties.join(",")}`;
  return hubspotApi(path);
};

const updateDeal: BuiltinHandler = async (args) => {
  const dealId = args[0] as string;
  const properties = args[1] as Record<string, unknown>;
  if (!dealId || !properties) throw new Error("hubspot.updateDeal requires dealId and properties.");
  return hubspotApi(`/crm/v3/objects/deals/${dealId}`, "PATCH", { properties });
};

const listDeals: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const params = new URLSearchParams();
  if (opts.limit) params.set("limit", String(opts.limit));
  if (opts.after) params.set("after", String(opts.after));
  if (opts.properties) params.set("properties", String(opts.properties));
  return hubspotApi(`/crm/v3/objects/deals?${params.toString()}`);
};

const createCompany: BuiltinHandler = async (args) => {
  const properties = args[0] as Record<string, unknown>;
  if (!properties) throw new Error("hubspot.createCompany requires properties.");
  return hubspotApi("/crm/v3/objects/companies", "POST", { properties });
};

const getCompany: BuiltinHandler = async (args) => {
  const companyId = args[0] as string;
  const properties = args[1] as string[] | undefined;
  if (!companyId) throw new Error("hubspot.getCompany requires a companyId.");
  let path = `/crm/v3/objects/companies/${companyId}`;
  if (properties?.length) path += `?properties=${properties.join(",")}`;
  return hubspotApi(path);
};

export const HubspotFunctions: Record<string, BuiltinHandler> = {
  setToken,
  createContact,
  getContact,
  updateContact,
  listContacts,
  searchContacts,
  createDeal,
  getDeal,
  updateDeal,
  listDeals,
  createCompany,
  getCompany,
};

export const HubspotFunctionMetadata = {
  setToken: {
    description: "Set the HubSpot private app access token.",
    parameters: [
      { name: "token", dataType: "string", description: "HubSpot access token", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'hubspot.setToken "pat-xxx"',
  },
  createContact: {
    description: "Create a new contact in HubSpot.",
    parameters: [
      { name: "properties", dataType: "object", description: "Contact properties (email, firstname, lastname, etc.)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Created contact object.",
    example: 'hubspot.createContact {"email":"john@example.com","firstname":"John","lastname":"Doe"}',
  },
  getContact: {
    description: "Get a contact by ID.",
    parameters: [
      { name: "contactId", dataType: "string", description: "Contact ID", formInputType: "text", required: true },
      { name: "properties", dataType: "array", description: "Properties to return", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Contact object.",
    example: 'hubspot.getContact "123"',
  },
  updateContact: {
    description: "Update a contact's properties.",
    parameters: [
      { name: "contactId", dataType: "string", description: "Contact ID", formInputType: "text", required: true },
      { name: "properties", dataType: "object", description: "Properties to update", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated contact object.",
    example: 'hubspot.updateContact "123" {"phone":"+1234567890"}',
  },
  listContacts: {
    description: "List contacts with pagination.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: limit, after, properties", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Contacts list with paging.",
    example: 'hubspot.listContacts {"limit":10}',
  },
  searchContacts: {
    description: "Search contacts by query string.",
    parameters: [
      { name: "query", dataType: "string", description: "Search query", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: limit, properties, filterGroups", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Search results.",
    example: 'hubspot.searchContacts "john@example.com"',
  },
  createDeal: {
    description: "Create a new deal in HubSpot.",
    parameters: [
      { name: "properties", dataType: "object", description: "Deal properties (dealname, amount, dealstage, etc.)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Created deal object.",
    example: 'hubspot.createDeal {"dealname":"Big Deal","amount":"10000","dealstage":"appointmentscheduled"}',
  },
  getDeal: {
    description: "Get a deal by ID.",
    parameters: [
      { name: "dealId", dataType: "string", description: "Deal ID", formInputType: "text", required: true },
      { name: "properties", dataType: "array", description: "Properties to return", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Deal object.",
    example: 'hubspot.getDeal "456"',
  },
  updateDeal: {
    description: "Update a deal's properties.",
    parameters: [
      { name: "dealId", dataType: "string", description: "Deal ID", formInputType: "text", required: true },
      { name: "properties", dataType: "object", description: "Properties to update", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated deal object.",
    example: 'hubspot.updateDeal "456" {"amount":"20000"}',
  },
  listDeals: {
    description: "List deals with pagination.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: limit, after, properties", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Deals list with paging.",
    example: 'hubspot.listDeals {"limit":10}',
  },
  createCompany: {
    description: "Create a new company in HubSpot.",
    parameters: [
      { name: "properties", dataType: "object", description: "Company properties (name, domain, industry, etc.)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Created company object.",
    example: 'hubspot.createCompany {"name":"Acme Inc","domain":"acme.com"}',
  },
  getCompany: {
    description: "Get a company by ID.",
    parameters: [
      { name: "companyId", dataType: "string", description: "Company ID", formInputType: "text", required: true },
      { name: "properties", dataType: "array", description: "Properties to return", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Company object.",
    example: 'hubspot.getCompany "789"',
  },
};

export const HubspotModuleMetadata = {
  description: "Manage HubSpot contacts, deals, and companies via the HubSpot CRM API v3.",
  category: "crm",
  methods: Object.keys(HubspotFunctions),
};
