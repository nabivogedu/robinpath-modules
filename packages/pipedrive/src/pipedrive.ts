import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Pipedrive: "${key}" not configured. Call pipedrive.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.pipedrive.com/v1${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("apiToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Pipedrive API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const apiToken = args[0] as string;
  if (!apiToken) throw new Error("pipedrive.setCredentials requires apiToken.");
  config.set("apiToken", apiToken);
  return "Pipedrive credentials configured.";
};

const listDeals: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listDeals/${id}` : `/listDeals`);
};

const getDeal: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getDeal/${id}` : `/getDeal`);
};

const createDeal: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createDeal`, "POST", typeof data === "object" ? data : { value: data });
};

const updateDeal: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("pipedrive.updateDeal requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateDeal/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteDeal: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("pipedrive.deleteDeal requires an ID.");
  return apiCall(`/deleteDeal/${id}`, "DELETE");
};

const listPersons: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPersons/${id}` : `/listPersons`);
};

const getPerson: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getPerson/${id}` : `/getPerson`);
};

const createPerson: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createPerson`, "POST", typeof data === "object" ? data : { value: data });
};

const updatePerson: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("pipedrive.updatePerson requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updatePerson/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deletePerson: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("pipedrive.deletePerson requires an ID.");
  return apiCall(`/deletePerson/${id}`, "DELETE");
};

const listOrganizations: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listOrganizations/${id}` : `/listOrganizations`);
};

const getOrganization: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrganization/${id}` : `/getOrganization`);
};

const createOrganization: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createOrganization`, "POST", typeof data === "object" ? data : { value: data });
};

const updateOrganization: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("pipedrive.updateOrganization requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateOrganization/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listActivities: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listActivities/${id}` : `/listActivities`);
};

const createActivity: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createActivity`, "POST", typeof data === "object" ? data : { value: data });
};

const updateActivity: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("pipedrive.updateActivity requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateActivity/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listPipelines: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPipelines/${id}` : `/listPipelines`);
};

const listStages: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listStages/${id}` : `/listStages`);
};

const searchDeals: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchDeals/${id}` : `/searchDeals`);
};

export const PipedriveFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listDeals, getDeal, createDeal, updateDeal, deleteDeal, listPersons, getPerson, createPerson, updatePerson, deletePerson, listOrganizations, getOrganization, createOrganization, updateOrganization, listActivities, createActivity, updateActivity, listPipelines, listStages, searchDeals,
};

export const PipedriveFunctionMetadata = {
  setCredentials: { description: "Configure pipedrive credentials.", parameters: [{ name: "apiToken", dataType: "string", description: "apiToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listDeals: { description: "listDeals", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getDeal: { description: "getDeal", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createDeal: { description: "createDeal", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateDeal: { description: "updateDeal", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteDeal: { description: "deleteDeal", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPersons: { description: "listPersons", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getPerson: { description: "getPerson", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createPerson: { description: "createPerson", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updatePerson: { description: "updatePerson", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deletePerson: { description: "deletePerson", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listOrganizations: { description: "listOrganizations", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrganization: { description: "getOrganization", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createOrganization: { description: "createOrganization", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateOrganization: { description: "updateOrganization", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listActivities: { description: "listActivities", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createActivity: { description: "createActivity", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateActivity: { description: "updateActivity", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPipelines: { description: "listPipelines", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listStages: { description: "listStages", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchDeals: { description: "searchDeals", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const PipedriveModuleMetadata = {
  description: "Pipedrive CRM — deals, persons, organizations, activities, and pipelines.",
  methods: Object.keys(PipedriveFunctions),
  category: "crm",
};
