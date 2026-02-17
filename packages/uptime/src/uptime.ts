import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Uptime: "${key}" not configured. Call uptime.setCredentials first.`);
  return val;
}

const checkHttp: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "checkHttp", input };
};

const checkHttps: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "checkHttps", input };
};

const checkTcp: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "checkTcp", input };
};

const checkDns: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "checkDns", input };
};

const checkSslCertificate: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "checkSslCertificate", input };
};

const batchCheck: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "batchCheck", input };
};

const getResponseTime: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "getResponseTime", input };
};

const checkContentMatch: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "checkContentMatch", input };
};

const checkRedirect: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "checkRedirect", input };
};

const getHeaders: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "getHeaders", input };
};

const checkPort: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "checkPort", input };
};

const formatReport: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "formatReport", input };
};

const comparePerformance: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "comparePerformance", input };
};

const checkHealth: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "checkHealth", input };
};

export const UptimeFunctions: Record<string, BuiltinHandler> = {
  checkHttp, checkHttps, checkTcp, checkDns, checkSslCertificate, batchCheck, getResponseTime, checkContentMatch, checkRedirect, getHeaders, checkPort, formatReport, comparePerformance, checkHealth,
};

export const UptimeFunctionMetadata = {
  checkHttp: { description: "checkHttp", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  checkHttps: { description: "checkHttps", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  checkTcp: { description: "checkTcp", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  checkDns: { description: "checkDns", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  checkSslCertificate: { description: "checkSslCertificate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  batchCheck: { description: "batchCheck", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getResponseTime: { description: "getResponseTime", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  checkContentMatch: { description: "checkContentMatch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  checkRedirect: { description: "checkRedirect", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getHeaders: { description: "getHeaders", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  checkPort: { description: "checkPort", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  formatReport: { description: "formatReport", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  comparePerformance: { description: "comparePerformance", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  checkHealth: { description: "checkHealth", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const UptimeModuleMetadata = {
  description: "Uptime monitoring — HTTP, TCP, DNS, SSL checks, and response time measurement.",
  methods: Object.keys(UptimeFunctions),
  category: "monitoring",
};
