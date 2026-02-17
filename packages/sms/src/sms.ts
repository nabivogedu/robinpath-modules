import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const configs = new Map<string, { provider: string; accountSid?: string; authToken?: string; apiKey?: string; apiSecret?: string; from?: string }>();

const GSM_CHARS = new Set("@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞ ÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà");
const GSM_EXTENDED = new Set("^{}\\[~]|€");

function isGsmEncoding(text: string): boolean {
  for (const ch of text) { if (!GSM_CHARS.has(ch) && !GSM_EXTENDED.has(ch)) return false; }
  return true;
}

function countSegments(text: string): number {
  if (!text) return 0;
  if (isGsmEncoding(text)) {
    let len = 0;
    for (const ch of text) len += GSM_EXTENDED.has(ch) ? 2 : 1;
    return len <= 160 ? 1 : Math.ceil(len / 153);
  }
  return text.length <= 70 ? 1 : Math.ceil(text.length / 67);
}

const configure: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "default");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const provider = String(opts.provider ?? "twilio").toLowerCase();
  if (provider !== "twilio" && provider !== "vonage") throw new Error(`Unsupported provider: "${provider}". Use "twilio" or "vonage".`);
  configs.set(id, { provider, accountSid: opts.accountSid ? String(opts.accountSid) : undefined, authToken: opts.authToken ? String(opts.authToken) : undefined, apiKey: opts.apiKey ? String(opts.apiKey) : undefined, apiSecret: opts.apiSecret ? String(opts.apiSecret) : undefined, from: opts.from ? String(opts.from) : undefined });
  return { id, provider };
};

const send: BuiltinHandler = async (args) => {
  const configId = String(args[0] ?? "default");
  const to = String(args[1] ?? "");
  const body = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  const cfg = configs.get(configId);
  if (!cfg) throw new Error(`SMS config "${configId}" not found. Call sms.configure first.`);
  const from = opts.from ? String(opts.from) : cfg.from;
  if (!to) throw new Error("Recipient phone number is required.");
  if (!body) throw new Error("Message body is required.");

  if (cfg.provider === "twilio") {
    if (!cfg.accountSid || !cfg.authToken) throw new Error("Twilio requires accountSid and authToken.");
    if (!from) throw new Error("Sender (from) is required for Twilio.");
    const params = new URLSearchParams();
    params.set("To", to); params.set("From", from); params.set("Body", body);
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${cfg.accountSid}/Messages.json`, {
      method: "POST",
      headers: { "Authorization": "Basic " + btoa(`${cfg.accountSid}:${cfg.authToken}`), "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = await response.json() as Record<string, unknown>;
    if (!response.ok) throw new Error(`Twilio error ${response.status}: ${data.message ?? JSON.stringify(data)}`);
    return { success: true, messageId: data.sid, provider: "twilio" };
  }

  // Vonage
  if (!cfg.apiKey || !cfg.apiSecret) throw new Error("Vonage requires apiKey and apiSecret.");
  if (!from) throw new Error("Sender (from) is required for Vonage.");
  const response = await fetch("https://rest.nexmo.com/sms/json", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: cfg.apiKey, api_secret: cfg.apiSecret, to, from, text: body }),
  });
  const data = await response.json() as Record<string, unknown>;
  const messages = data.messages as Record<string, unknown>[] | undefined;
  const first = messages?.[0];
  if (!first || String(first.status) !== "0") throw new Error(`Vonage error: ${first?.["error-text"] ?? JSON.stringify(data)}`);
  return { success: true, messageId: first["message-id"], provider: "vonage" };
};

const sendBulk: BuiltinHandler = async (args) => {
  const configId = String(args[0] ?? "default");
  const recipients = Array.isArray(args[1]) ? (args[1] as unknown[]).map(String) : [];
  const body = String(args[2] ?? "");
  const results: { to: string; success: boolean; messageId?: unknown; error?: string }[] = [];
  for (const to of recipients) {
    try {
      const result = await send([configId, to, body]) as { success: boolean; messageId: unknown };
      results.push({ to, success: true, messageId: result.messageId });
    } catch (err: unknown) {
      results.push({ to, success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }
  return results;
};

const validate: BuiltinHandler = (args) => /^\+[1-9]\d{1,14}$/.test(String(args[0] ?? ""));

const format: BuiltinHandler = (args) => {
  const phone = String(args[0] ?? "");
  const countryCode = String(args[1] ?? "1");
  if (phone.startsWith("+")) return phone;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith(countryCode) && digits.length > countryCode.length + 4) return `+${digits}`;
  return `+${countryCode}${digits}`;
};

const lookup: BuiltinHandler = async (args) => {
  const configId = String(args[0] ?? "default");
  const phone = String(args[1] ?? "");
  const cfg = configs.get(configId);
  if (!cfg) throw new Error(`SMS config "${configId}" not found.`);
  if (cfg.provider !== "twilio") throw new Error("Lookup is only supported with Twilio.");
  if (!cfg.accountSid || !cfg.authToken) throw new Error("Twilio requires accountSid and authToken.");
  const response = await fetch(`https://lookups.twilio.com/v1/PhoneNumbers/${encodeURIComponent(phone)}?Type=carrier`, { headers: { "Authorization": "Basic " + btoa(`${cfg.accountSid}:${cfg.authToken}`) } });
  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) throw new Error(`Twilio Lookup error: ${data.message ?? JSON.stringify(data)}`);
  const carrier = data.carrier as Record<string, unknown> | undefined;
  return { valid: true, countryCode: data.country_code, carrier: carrier?.name ?? null, type: carrier?.type ?? null };
};

const status: BuiltinHandler = async (args) => {
  const configId = String(args[0] ?? "default");
  const messageId = String(args[1] ?? "");
  const cfg = configs.get(configId);
  if (!cfg) throw new Error(`SMS config "${configId}" not found.`);
  if (cfg.provider !== "twilio") throw new Error("Status check only supported with Twilio.");
  if (!cfg.accountSid || !cfg.authToken) throw new Error("Twilio requires accountSid and authToken.");
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${cfg.accountSid}/Messages/${messageId}.json`, { headers: { "Authorization": "Basic " + btoa(`${cfg.accountSid}:${cfg.authToken}`) } });
  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) throw new Error(`Twilio error: ${data.message ?? JSON.stringify(data)}`);
  return { status: data.status, errorCode: data.error_code ?? null, errorMessage: data.error_message ?? null };
};

const estimateCost: BuiltinHandler = (args) => {
  const body = String(args[0] ?? "");
  const segments = countSegments(body);
  return { segments, estimatedCost: Math.round(segments * 0.0075 * 10000) / 10000 };
};

const isGsm: BuiltinHandler = (args) => isGsmEncoding(String(args[0] ?? ""));
const segmentCount: BuiltinHandler = (args) => countSegments(String(args[0] ?? ""));

export const SmsFunctions: Record<string, BuiltinHandler> = { configure, send, sendBulk, validate, format, lookup, status, estimateCost, isGsm, segmentCount };

export const SmsFunctionMetadata = {
  configure: { description: "Configure SMS provider (Twilio or Vonage)", parameters: [{ name: "id", dataType: "string", description: "Config name", formInputType: "text", required: false }, { name: "options", dataType: "object", description: "{provider, accountSid, authToken, apiKey, apiSecret, from}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{id, provider}", example: 'sms.configure "main" {"provider": "twilio", "accountSid": "AC...", "authToken": "..."}' },
  send: { description: "Send an SMS message", parameters: [{ name: "configId", dataType: "string", description: "Config name", formInputType: "text", required: true }, { name: "to", dataType: "string", description: "Recipient phone (E.164)", formInputType: "text", required: true }, { name: "body", dataType: "string", description: "Message text", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{from}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{success, messageId, provider}", example: 'sms.send "main" "+15559876543" "Your code is 1234"' },
  sendBulk: { description: "Send SMS to multiple recipients", parameters: [{ name: "configId", dataType: "string", description: "Config name", formInputType: "text", required: true }, { name: "recipients", dataType: "array", description: "Phone numbers", formInputType: "text", required: true }, { name: "body", dataType: "string", description: "Message text", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of results", example: 'sms.sendBulk "main" ["+155511111", "+155522222"] "Hello!"' },
  validate: { description: "Validate E.164 phone format", parameters: [{ name: "phone", dataType: "string", description: "Phone number", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if valid E.164", example: 'sms.validate "+15551234567"' },
  format: { description: "Format phone to E.164", parameters: [{ name: "phone", dataType: "string", description: "Phone number", formInputType: "text", required: true }, { name: "countryCode", dataType: "string", description: "Country code (default 1)", formInputType: "text", required: false }], returnType: "string", returnDescription: "E.164 formatted", example: 'sms.format "(555) 123-4567"' },
  lookup: { description: "Lookup phone info via Twilio", parameters: [{ name: "configId", dataType: "string", description: "Config name", formInputType: "text", required: true }, { name: "phone", dataType: "string", description: "Phone number", formInputType: "text", required: true }], returnType: "object", returnDescription: "{valid, countryCode, carrier, type}", example: 'sms.lookup "main" "+15551234567"' },
  status: { description: "Check message delivery status", parameters: [{ name: "configId", dataType: "string", description: "Config name", formInputType: "text", required: true }, { name: "messageId", dataType: "string", description: "Message SID", formInputType: "text", required: true }], returnType: "object", returnDescription: "{status, errorCode, errorMessage}", example: 'sms.status "main" "SM123..."' },
  estimateCost: { description: "Estimate SMS cost", parameters: [{ name: "body", dataType: "string", description: "Message text", formInputType: "text", required: true }], returnType: "object", returnDescription: "{segments, estimatedCost}", example: 'sms.estimateCost "Hello world"' },
  isGsm: { description: "Check if message uses GSM-7 encoding", parameters: [{ name: "body", dataType: "string", description: "Message text", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if GSM-7", example: 'sms.isGsm "Hello"' },
  segmentCount: { description: "Count SMS segments", parameters: [{ name: "body", dataType: "string", description: "Message text", formInputType: "text", required: true }], returnType: "number", returnDescription: "Segment count", example: 'sms.segmentCount "Hello world"' },
};

export const SmsModuleMetadata = {
  description: "SMS sending via Twilio and Vonage with validation, formatting, lookup, and cost estimation",
  methods: ["configure", "send", "sendBulk", "validate", "format", "lookup", "status", "estimateCost", "isGsm", "segmentCount"],
};
