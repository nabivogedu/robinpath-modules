import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Woocommerce: "${key}" not configured. Call woocommerce.setCredentials first.`);
  return val;
}

async function apiCall(path: string, method = "GET", body?: unknown): Promise<Value> {
  const res = await fetch(`${getConfig("siteUrl")}/wp-json/wc/v3${path}`, {
    method,
    headers: { "Authorization": "Basic " + btoa(`${getConfig("siteUrl")}:${getConfig("consumerKey")}`), "Content-Type": "application/json", Accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Woocommerce API error (${res.status}): ${t}`); }
  const ct = res.headers.get("content-type");
  return ct && ct.includes("application/json") ? res.json() : res.text();
}

const setCredentials: BuiltinHandler = (args) => {
  const siteUrl = args[0] as string;
  const consumerKey = args[1] as string;
  const consumerSecret = args[2] as string;
  if (!siteUrl || !consumerKey || !consumerSecret) throw new Error("woocommerce.setCredentials requires siteUrl, consumerKey, consumerSecret.");
  config.set("siteUrl", siteUrl);
  config.set("consumerKey", consumerKey);
  config.set("consumerSecret", consumerSecret);
  return "Woocommerce credentials configured.";
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
  if (!id) throw new Error("woocommerce.updateProduct requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateProduct/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteProduct: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("woocommerce.deleteProduct requires an ID.");
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

const createOrder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createOrder`, "POST", typeof data === "object" ? data : { value: data });
};

const updateOrder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("woocommerce.updateOrder requires an ID.");
  const data = args[1] ?? {};
  return apiCall(`/updateOrder/${id}`, "PUT", typeof data === "object" ? data : { value: data });
};

const deleteOrder: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  if (!id) throw new Error("woocommerce.deleteOrder requires an ID.");
  return apiCall(`/deleteOrder/${id}`, "DELETE");
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
  if (!id) throw new Error("woocommerce.updateCustomer requires an ID.");
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

const listCoupons: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listCoupons/${id}` : `/listCoupons`);
};

const createCoupon: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createCoupon`, "POST", typeof data === "object" ? data : { value: data });
};

const getOrderNotes: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getOrderNotes/${id}` : `/getOrderNotes`);
};

const createOrderNote: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  const data = args[1] ?? args[0];
  return apiCall(`/createOrderNote`, "POST", typeof data === "object" ? data : { value: data });
};

const getReport: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/getReport/${id}` : `/getReport`);
};

const listShipping: BuiltinHandler = async (args) => {
  const id = args[0] as string | undefined;
  return apiCall(id ? `/listShipping/${id}` : `/listShipping`);
};

export const WoocommerceFunctions: Record<string, BuiltinHandler> = {
  setCredentials, listProducts, getProduct, createProduct, updateProduct, deleteProduct, listOrders, getOrder, createOrder, updateOrder, deleteOrder, listCustomers, getCustomer, createCustomer, updateCustomer, listCategories, createCategory, listCoupons, createCoupon, getOrderNotes, createOrderNote, getReport, listShipping,
};

export const WoocommerceFunctionMetadata = {
  setCredentials: { description: "Configure woocommerce credentials.", parameters: [{ name: "siteUrl", dataType: "string", description: "siteUrl", formInputType: "text", required: true }, { name: "consumerKey", dataType: "string", description: "consumerKey", formInputType: "text", required: true }, { name: "consumerSecret", dataType: "string", description: "consumerSecret", formInputType: "text", required: true }], returnType: "object", returnDescription: "API response." },
  listProducts: { description: "listProducts", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getProduct: { description: "getProduct", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createProduct: { description: "createProduct", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateProduct: { description: "updateProduct", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteProduct: { description: "deleteProduct", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listOrders: { description: "listOrders", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrder: { description: "getOrder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createOrder: { description: "createOrder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateOrder: { description: "updateOrder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  deleteOrder: { description: "deleteOrder", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCustomers: { description: "listCustomers", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getCustomer: { description: "getCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createCustomer: { description: "createCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  updateCustomer: { description: "updateCustomer", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCategories: { description: "listCategories", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createCategory: { description: "createCategory", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listCoupons: { description: "listCoupons", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createCoupon: { description: "createCoupon", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getOrderNotes: { description: "getOrderNotes", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  createOrderNote: { description: "createOrderNote", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getReport: { description: "getReport", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  listShipping: { description: "listShipping", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const WoocommerceModuleMetadata = {
  description: "WooCommerce — products, orders, customers, coupons, and shipping.",
  methods: Object.keys(WoocommerceFunctions),
  category: "ecommerce",
};
