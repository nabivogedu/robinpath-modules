import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Qr: "${key}" not configured. Call qr.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.qrserver.com/v1${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Qr API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const generateQrUrl: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/generateQrUrl${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const generateQrDataUrl: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/generateQrDataUrl${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const generateWifiQr: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/generateWifiQr${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const generateVCardQr: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/generateVCardQr${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const generateEmailQr: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/generateEmailQr${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const generateSmsQr: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/generateSmsQr${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const generateUrlQr: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/generateUrlQr${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const generateTextQr: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/generateTextQr${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

export const QrFunctions: Record<string, BuiltinHandler> = {
  generateQrUrl, generateQrDataUrl, generateWifiQr, generateVCardQr, generateEmailQr, generateSmsQr, generateUrlQr, generateTextQr,
};

export const QrFunctionMetadata = {
  generateQrUrl: { description: "generateQrUrl", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  generateQrDataUrl: { description: "generateQrDataUrl", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  generateWifiQr: { description: "generateWifiQr", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  generateVCardQr: { description: "generateVCardQr", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  generateEmailQr: { description: "generateEmailQr", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  generateSmsQr: { description: "generateSmsQr", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  generateUrlQr: { description: "generateUrlQr", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  generateTextQr: { description: "generateTextQr", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const QrModuleMetadata = {
  description: "QR code generation — URLs, WiFi, vCards, email, SMS, and custom data.",
  methods: Object.keys(QrFunctions),
  category: "utility",
};
