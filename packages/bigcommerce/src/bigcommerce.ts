import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Bigcommerce: "${key}" not configured. Call bigcommerce.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`https://api.bigcommerce.com/stores${path}`, {
    method,
    headers: { "X-Auth-Token": `Bearer ${getConfig("storeHash")}`, "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Bigcommerce API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const storeHash = args[0] as string;
  const accessToken = args[1] as string;
  if (!storeHash || !accessToken) throw new Error("bigcommerce.setCredentials requires storeHash, accessToken.");
  config.set("storeHash", storeHash);
  config.set("accessToken", accessToken);
  return "Bigcommerce credentials configured.";
};

const listProducts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listProducts/${id}` : `/listProducts`);
};

const getProduct: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getProduct/${id}` : `/getProduct`);
};

const createProduct: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createProduct`, "POST", typeof data === "object" ? data : { value: data });
};

const updateProduct: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("bigcommerce.updateProduct requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateProduct/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteProduct: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("bigcommerce.deleteProduct requires an ID.");
  return apiCall(`/deleteProduct/${id}`, "DELETE");
};

const listOrders: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listOrders/${id}` : `/listOrders`);
};

const getOrder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrder/${id}` : `/getOrder`);
};

const updateOrder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("bigcommerce.updateOrder requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateOrder/${id}`, "PUT", typeof data === "object" ? data : { value: data });
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
  if (!id) throw new Error("bigcommerce.updateCustomer requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateCustomer/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const listCategories: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCategories/${id}` : `/listCategories`);
};

const createCategory: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createCategory`, "POST", typeof data === "object" ? data : { value: data });
};

const listBrands: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listBrands/${id}` : `/listBrands`);
};

const createBrand: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createBrand`, "POST", typeof data === "object" ? data : { value: data });
};

const getOrderProducts: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrderProducts/${id}` : `/getOrderProducts`);
};

const getStoreInfo: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getStoreInfo/${id}` : `/getStoreInfo`);
};

const listChannels: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listChannels/${id}` : `/listChannels`);
};

const getOrderShipments: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrderShipments/${id}` : `/getOrderShipments`);
};

export const BigcommerceFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listProducts, getProduct, createProduct, updateProduct, deleteProduct, listOrders, getOrder, updateOrder, listCustomers, getCustomer, createCustomer, updateCustomer, listCategories, createCategory, listBrands, createBrand, getOrderProducts, getStoreInfo, listChannels, getOrderShipments,
};

export const BigcommerceFunctionMetadata = {
  setCredentials: { description: "Configure bigcommerce credentials.", parameters: [{ name: "storeHash", dataType: "string", description: "storeHash", formInputType: "text", required: true }, { name: "accessToken", dataType: "string", description: "accessToken", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listProducts: { description: "listProducts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getProduct: { description: "getProduct", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createProduct: { description: "createProduct", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateProduct: { description: "updateProduct", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteProduct: { description: "deleteProduct", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listOrders: { description: "listOrders", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrder: { description: "getOrder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateOrder: { description: "updateOrder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCustomers: { description: "listCustomers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCustomer: { description: "getCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createCustomer: { description: "createCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateCustomer: { description: "updateCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCategories: { description: "listCategories", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createCategory: { description: "createCategory", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listBrands: { description: "listBrands", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createBrand: { description: "createBrand", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrderProducts: { description: "getOrderProducts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getStoreInfo: { description: "getStoreInfo", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listChannels: { description: "listChannels", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrderShipments: { description: "getOrderShipments", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const BigcommerceModuleMetadata = {
  description: "BigCommerce — products, orders, customers, categories, and brands.",
  methods: Object.keys(BigcommerceFunctions),
  category: "ecommerce",
};
