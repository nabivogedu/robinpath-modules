import type { BuiltinHandler } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`WhatsApp: "${key}" not configured. Call whatsapp.setCredentials first.`);
  return val;
}

async function whatsappApi(path: string, method = "GET", body?: unknown): Promise<unknown> {
  const token = getConfig("accessToken");
  const phoneNumberId = getConfig("phoneNumberId");
  const res = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WhatsApp API error (${res.status}): ${text}`);
  }
  return res.json();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  const phoneNumberId = args[1] as string;
  if (!accessToken || !phoneNumberId) throw new Error("whatsapp.setCredentials requires accessToken and phoneNumberId.");
  config.set("accessToken", accessToken);
  config.set("phoneNumberId", phoneNumberId);
  return "WhatsApp credentials configured.";
};

const sendText: BuiltinHandler = async (args) => {
  const to = args[0] as string;
  const message = args[1] as string;
  if (!to || !message) throw new Error("whatsapp.sendText requires to and message.");
  return whatsappApi("/messages", "POST", {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: message },
  });
};

const sendTemplate: BuiltinHandler = async (args) => {
  const to = args[0] as string;
  const templateName = args[1] as string;
  const languageCode = (args[2] as string) ?? "en_US";
  const components = args[3] as unknown[] | undefined;
  if (!to || !templateName) throw new Error("whatsapp.sendTemplate requires to and templateName.");
  const template: Record<string, unknown> = {
    name: templateName,
    language: { code: languageCode },
  };
  if (components) template.components = components;
  return whatsappApi("/messages", "POST", {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template,
  });
};

const sendImage: BuiltinHandler = async (args) => {
  const to = args[0] as string;
  const imageUrl = args[1] as string;
  const caption = args[2] as string | undefined;
  if (!to || !imageUrl) throw new Error("whatsapp.sendImage requires to and imageUrl.");
  const image: Record<string, unknown> = { link: imageUrl };
  if (caption) image.caption = caption;
  return whatsappApi("/messages", "POST", {
    messaging_product: "whatsapp",
    to,
    type: "image",
    image,
  });
};

const sendDocument: BuiltinHandler = async (args) => {
  const to = args[0] as string;
  const documentUrl = args[1] as string;
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!to || !documentUrl) throw new Error("whatsapp.sendDocument requires to and documentUrl.");
  const document: Record<string, unknown> = { link: documentUrl };
  if (opts.filename) document.filename = opts.filename;
  if (opts.caption) document.caption = opts.caption;
  return whatsappApi("/messages", "POST", {
    messaging_product: "whatsapp",
    to,
    type: "document",
    document,
  });
};

const sendLocation: BuiltinHandler = async (args) => {
  const to = args[0] as string;
  const latitude = args[1] as number;
  const longitude = args[2] as number;
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  if (!to || latitude === undefined || longitude === undefined) throw new Error("whatsapp.sendLocation requires to, latitude, and longitude.");
  const location: Record<string, unknown> = { latitude, longitude };
  if (opts.name) location.name = opts.name;
  if (opts.address) location.address = opts.address;
  return whatsappApi("/messages", "POST", {
    messaging_product: "whatsapp",
    to,
    type: "location",
    location,
  });
};

const sendContact: BuiltinHandler = async (args) => {
  const to = args[0] as string;
  const contacts = args[1] as unknown[];
  if (!to || !contacts) throw new Error("whatsapp.sendContact requires to and contacts array.");
  return whatsappApi("/messages", "POST", {
    messaging_product: "whatsapp",
    to,
    type: "contacts",
    contacts,
  });
};

const markRead: BuiltinHandler = async (args) => {
  const messageId = args[0] as string;
  if (!messageId) throw new Error("whatsapp.markRead requires a messageId.");
  return whatsappApi("/messages", "POST", {
    messaging_product: "whatsapp",
    status: "read",
    message_id: messageId,
  });
};

const getProfile: BuiltinHandler = async () => {
  return whatsappApi("/whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical");
};

const updateProfile: BuiltinHandler = async (args) => {
  const profile = args[0] as Record<string, unknown>;
  if (!profile) throw new Error("whatsapp.updateProfile requires a profile object.");
  return whatsappApi("/whatsapp_business_profile", "POST", {
    messaging_product: "whatsapp",
    ...profile,
  });
};

export const WhatsappFunctions: Record<string, BuiltinHandler> = {
  setCredentials,
  sendText,
  sendTemplate,
  sendImage,
  sendDocument,
  sendLocation,
  sendContact,
  markRead,
  getProfile,
  updateProfile,
};

export const WhatsappFunctionMetadata: Record<string, object> = {
  setCredentials: {
    description: "Set WhatsApp Cloud API credentials.",
    parameters: [
      { name: "accessToken", dataType: "string", description: "Permanent or temporary access token", formInputType: "password", required: true },
      { name: "phoneNumberId", dataType: "string", description: "WhatsApp Business phone number ID", formInputType: "text", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'whatsapp.setCredentials "EAABxxx" "1234567890"',
  },
  sendText: {
    description: "Send a text message.",
    parameters: [
      { name: "to", dataType: "string", description: "Recipient phone number (international format)", formInputType: "text", required: true },
      { name: "message", dataType: "string", description: "Message text", formInputType: "textarea", required: true },
    ],
    returnType: "object",
    returnDescription: "Message send response.",
    example: 'whatsapp.sendText "+1234567890" "Hello from RobinPath!"',
  },
  sendTemplate: {
    description: "Send a pre-approved template message.",
    parameters: [
      { name: "to", dataType: "string", description: "Recipient phone number", formInputType: "text", required: true },
      { name: "templateName", dataType: "string", description: "Template name", formInputType: "text", required: true },
      { name: "languageCode", dataType: "string", description: "Language code (default: en_US)", formInputType: "text", required: false },
      { name: "components", dataType: "array", description: "Template component parameters", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Message send response.",
    example: 'whatsapp.sendTemplate "+1234567890" "hello_world"',
  },
  sendImage: {
    description: "Send an image message.",
    parameters: [
      { name: "to", dataType: "string", description: "Recipient phone number", formInputType: "text", required: true },
      { name: "imageUrl", dataType: "string", description: "Public URL of the image", formInputType: "text", required: true },
      { name: "caption", dataType: "string", description: "Optional image caption", formInputType: "text", required: false },
    ],
    returnType: "object",
    returnDescription: "Message send response.",
    example: 'whatsapp.sendImage "+1234567890" "https://example.com/photo.jpg" "Check this out"',
  },
  sendDocument: {
    description: "Send a document message.",
    parameters: [
      { name: "to", dataType: "string", description: "Recipient phone number", formInputType: "text", required: true },
      { name: "documentUrl", dataType: "string", description: "Public URL of the document", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "Options: filename, caption", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Message send response.",
    example: 'whatsapp.sendDocument "+1234567890" "https://example.com/report.pdf" {"filename":"report.pdf"}',
  },
  sendLocation: {
    description: "Send a location message.",
    parameters: [
      { name: "to", dataType: "string", description: "Recipient phone number", formInputType: "text", required: true },
      { name: "latitude", dataType: "number", description: "Latitude", formInputType: "number", required: true },
      { name: "longitude", dataType: "number", description: "Longitude", formInputType: "number", required: true },
      { name: "options", dataType: "object", description: "Options: name, address", formInputType: "json", required: false },
    ],
    returnType: "object",
    returnDescription: "Message send response.",
    example: 'whatsapp.sendLocation "+1234567890" 37.7749 -122.4194 {"name":"San Francisco"}',
  },
  sendContact: {
    description: "Send contact card(s).",
    parameters: [
      { name: "to", dataType: "string", description: "Recipient phone number", formInputType: "text", required: true },
      { name: "contacts", dataType: "array", description: "Array of contact objects", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Message send response.",
    example: 'whatsapp.sendContact "+1234567890" [{"name":{"formatted_name":"John Doe"},"phones":[{"phone":"+0987654321"}]}]',
  },
  markRead: {
    description: "Mark a message as read.",
    parameters: [
      { name: "messageId", dataType: "string", description: "Message ID to mark as read", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Status response.",
    example: 'whatsapp.markRead "wamid.xxx"',
  },
  getProfile: {
    description: "Get the WhatsApp Business profile.",
    parameters: [],
    returnType: "object",
    returnDescription: "Business profile data.",
    example: "whatsapp.getProfile",
  },
  updateProfile: {
    description: "Update the WhatsApp Business profile.",
    parameters: [
      { name: "profile", dataType: "object", description: "Profile fields to update (about, address, description, email, websites, vertical)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Update response.",
    example: 'whatsapp.updateProfile {"about":"We are a business","description":"Our business description"}',
  },
};

export const WhatsappModuleMetadata = {
  name: "whatsapp",
  description: "Send messages, templates, media, and manage WhatsApp Business profiles via the WhatsApp Cloud API.",
  icon: "message-circle",
  category: "messaging",
};
