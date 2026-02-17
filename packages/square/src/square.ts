import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Square: "${key}" not configured. Call square.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://connect.squareup.com/v2${path}`, {
    method,
    headers: { "Authorization": `Bearer ${getConfig("accessToken")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Square API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const accessToken = args[0] as string;
  if (!accessToken) throw new Error("square.setCredentials requires accessToken.");
  config.set("accessToken", accessToken);
  return "Square credentials configured.";
};

const listCatalogItems: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCatalogItems/${id}` : `/listCatalogItems`);
};

const getCatalogItem: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCatalogItem/${id}` : `/getCatalogItem`);
};

const upsertCatalogObject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/upsertCatalogObject`, "POST", typeof data === "object" ? data : { value: data });
};

const deleteCatalogObject: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("square.deleteCatalogObject requires an ID.");
  return apiCall(`/deleteCatalogObject/${id}`, "DELETE");
};

const searchCatalog: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/searchCatalog/${id}` : `/searchCatalog`);
};

const listCustomers: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCustomers/${id}` : `/listCustomers`);
};

const getCustomer: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getCustomer/${id}` : `/getCustomer`);
};

const createCustomer: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createCustomer`, "POST", typeof data === "object" ? data : { value: data });
};

const updateCustomer: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("square.updateCustomer requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateCustomer/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteCustomer: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("square.deleteCustomer requires an ID.");
  return apiCall(`/deleteCustomer/${id}`, "DELETE");
};

const listOrders: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listOrders/${id}` : `/listOrders`);
};

const getOrder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrder/${id}` : `/getOrder`);
};

const createOrder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createOrder`, "POST", typeof data === "object" ? data : { value: data });
};

const listLocations: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listLocations/${id}` : `/listLocations`);
};

const getLocation: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getLocation/${id}` : `/getLocation`);
};

const listInventory: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listInventory/${id}` : `/listInventory`);
};

const adjustInventory: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("square.adjustInventory requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/adjustInventory/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const retrieveInventoryCount: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(`/retrieveInventoryCount${id ? `/${id}` : ""}`);
};

const getMerchant: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getMerchant/${id}` : `/getMerchant`);
};

const listPayments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listPayments/${id}` : `/listPayments`);
};

export const SquareFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listCatalogItems, getCatalogItem, upsertCatalogObject, deleteCatalogObject, searchCatalog, listCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer, listOrders, getOrder, createOrder, listLocations, getLocation, listInventory, adjustInventory, retrieveInventoryCount, getMerchant, listPayments,
};

export const SquareFunctionMetadata = {
  setCredentials: { description: "Configure square credentials.", parameters: [{ name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listCatalogItems: { description: "listCatalogItems", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCatalogItem: { description: "getCatalogItem", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  upsertCatalogObject: { description: "upsertCatalogObject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteCatalogObject: { description: "deleteCatalogObject", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  searchCatalog: { description: "searchCatalog", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCustomers: { description: "listCustomers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCustomer: { description: "getCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createCustomer: { description: "createCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateCustomer: { description: "updateCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteCustomer: { description: "deleteCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listOrders: { description: "listOrders", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrder: { description: "getOrder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createOrder: { description: "createOrder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listLocations: { description: "listLocations", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getLocation: { description: "getLocation", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listInventory: { description: "listInventory", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  adjustInventory: { description: "adjustInventory", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  retrieveInventoryCount: { description: "retrieveInventoryCount", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getMerchant: { description: "getMerchant", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listPayments: { description: "listPayments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const SquareModuleMetadata = {
  description: "Square — catalog, orders, customers, inventory, and locations.",
  methods: Object.keys(SquareFunctions),
  category: "ecommerce",
};
