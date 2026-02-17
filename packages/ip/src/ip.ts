import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Ip: "${key}" not configured. Call ip.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://ip-api.com/json${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Ip API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const getMyIp: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/getMyIp${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const geolocate: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/geolocate${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const geolocateBatch: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/geolocateBatch${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const isPrivate: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/isPrivate${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const isValid: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/isValid${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const isIpv4: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/isIpv4${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const isIpv6: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/isIpv6${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const cidrContains: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/cidrContains${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const cidrRange: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/cidrRange${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const subnetInfo: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/subnetInfo${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const reverseDns: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/reverseDns${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const checkBlacklist: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/checkBlacklist${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

export const IpFunctions: Record<string, BuiltinHandler> = {
  getMyIp, geolocate, geolocateBatch, isPrivate, isValid, isIpv4, isIpv6, cidrContains, cidrRange, subnetInfo, reverseDns, checkBlacklist,
};

export const IpFunctionMetadata = {
  getMyIp: { description: "getMyIp", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  geolocate: { description: "geolocate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  geolocateBatch: { description: "geolocateBatch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  isPrivate: { description: "isPrivate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  isValid: { description: "isValid", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  isIpv4: { description: "isIpv4", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  isIpv6: { description: "isIpv6", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  cidrContains: { description: "cidrContains", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  cidrRange: { description: "cidrRange", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  subnetInfo: { description: "subnetInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  reverseDns: { description: "reverseDns", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  checkBlacklist: { description: "checkBlacklist", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const IpModuleMetadata = {
  description: "IP geolocation, ASN lookup, CIDR calculation, and blacklist checking.",
  methods: Object.keys(IpFunctions),
  category: "utility",
};
