import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Currency: "${key}" not configured. Call currency.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://open.er-api.com/v6${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Currency API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const getLatestRates: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/getLatestRates${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const convert: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/convert${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const convertBatch: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/convertBatch${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const getHistoricalRates: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/getHistoricalRates${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const listCurrencies: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/listCurrencies${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const getRate: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/getRate${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const getSupportedCodes: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/getSupportedCodes${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const getTimeSeriesRates: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/getTimeSeriesRates${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const formatCurrency: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/formatCurrency${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

const getPopularRates: BuiltinHandler = async (args) => {
  const param = args[0] as string | undefined;
  return apiCall(`/getPopularRates${param ? `?q=${encodeURIComponent(param)}` : ""}`);
};

export const CurrencyFunctions: Record<string, BuiltinHandler> = {
  getLatestRates, convert, convertBatch, getHistoricalRates, listCurrencies, getRate, getSupportedCodes, getTimeSeriesRates, formatCurrency, getPopularRates,
};

export const CurrencyFunctionMetadata = {
  getLatestRates: { description: "getLatestRates", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  convert: { description: "convert", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  convertBatch: { description: "convertBatch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getHistoricalRates: { description: "getHistoricalRates", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCurrencies: { description: "listCurrencies", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getRate: { description: "getRate", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getSupportedCodes: { description: "getSupportedCodes", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getTimeSeriesRates: { description: "getTimeSeriesRates", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  formatCurrency: { description: "formatCurrency", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPopularRates: { description: "getPopularRates", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const CurrencyModuleMetadata = {
  description: "Currency exchange rates, conversion, and historical data.",
  methods: Object.keys(CurrencyFunctions),
  category: "utility",
};
