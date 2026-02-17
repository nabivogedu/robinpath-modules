import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Clearbit: "${key}" not configured. Call clearbit.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://person-stream.clearbit.com${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("apiKey")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Clearbit API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiKey = args[0] as string;
  if (!apiKey) throw new Error("clearbit.setCredentials requires apiKey.");
  config.set("apiKey", apiKey);
  return "Clearbit credentials configured.";
};

const enrichPerson: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/enrichPerson/${id}` : `/enrichPerson`);
};

const enrichCompany: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/enrichCompany/${id}` : `/enrichCompany`);
};

const findPerson: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/findPerson/${id}` : `/findPerson`);
};

const findCompany: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/findCompany/${id}` : `/findCompany`);
};

const revealVisitor: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/revealVisitor${id ? `/${id}` : ""}`);
};

const lookupEmail: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/lookupEmail/${id}` : `/lookupEmail`);
};

const lookupDomain: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/lookupDomain/${id}` : `/lookupDomain`);
};

const autocompleteCompany: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/autocompleteCompany/${id}` : `/autocompleteCompany`);
};

const getPersonFlag: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPersonFlag/${id}` : `/getPersonFlag`);
};

const getCompanyFlag: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCompanyFlag/${id}` : `/getCompanyFlag`);
};

const prospectorSearch: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/prospectorSearch${id ? `/${id}` : ""}`);
};

const nameToEmail: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/nameToEmail${id ? `/${id}` : ""}`);
};

const listTags: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listTags/${id}` : `/listTags`);
};

const combined: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/combined${id ? `/${id}` : ""}`);
};

export const ClearbitFunctions: Record<string, BuiltinHandler> = {
  setCredentials, enrichPerson, enrichCompany, findPerson, findCompany, revealVisitor, lookupEmail, lookupDomain, autocompleteCompany, getPersonFlag, getCompanyFlag, prospectorSearch, nameToEmail, listTags, combined,
};

export const ClearbitFunctionMetadata = {
  setCredentials: { description: "Configure clearbit credentials.", parameters: [{ name: "apiKey", dataType: "string", description: "apiKey", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  enrichPerson: { description: "enrichPerson", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  enrichCompany: { description: "enrichCompany", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  findPerson: { description: "findPerson", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  findCompany: { description: "findCompany", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  revealVisitor: { description: "revealVisitor", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  lookupEmail: { description: "lookupEmail", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  lookupDomain: { description: "lookupDomain", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  autocompleteCompany: { description: "autocompleteCompany", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPersonFlag: { description: "getPersonFlag", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCompanyFlag: { description: "getCompanyFlag", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  prospectorSearch: { description: "prospectorSearch", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  nameToEmail: { description: "nameToEmail", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listTags: { description: "listTags", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  combined: { description: "combined", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const ClearbitModuleMetadata = {
  description: "Clearbit — person and company enrichment, prospecting, and reveal.",
  methods: Object.keys(ClearbitFunctions),
  category: "sales",
};
