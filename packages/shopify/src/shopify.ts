import type { BuiltinHandler } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Shopify: "${key}" not configured. Call shopify.setCredentials first.`);
  return val;
}

async function shopifyApi(path: string, method = "GET", body?: unknown): Promise<unknown> {
  const shop = getConfig("shop");
  const token = getConfig("accessToken");
  const res = await fetch(`https://${shop}.myshopify.com/admin/api/2024-01${path}`, {
    method,
    headers: {
      "X-Shopify-Access-Token": token,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error (${res.status}): ${text}`);
  }
  if (res.status === 204) return { success: true };
  return res.json();
}

const setCredentials: BuiltinHandler = (args) => {
  const shop = args[0] as string;
  const accessToken = args[1] as string;
  if (!shop || !accessToken) throw new Error("shopify.setCredentials requires shop name and access token.");
  config.set("shop", shop);
  config.set("accessToken", accessToken);
  return "Shopify credentials configured.";
};

const listProducts: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const params = new URLSearchParams();
  if (opts.limit) params.set("limit", String(opts.limit));
  if (opts.page_info) params.set("page_info", String(opts.page_info));
  if (opts.collection_id) params.set("collection_id", String(opts.collection_id));
  if (opts.status) params.set("status", String(opts.status));
  const qs = params.toString();
  const result = (await shopifyApi(`/products.json${qs ? `?${qs}` : ""}`)) as { products: unknown[] };
  return result.products;
};

const getProduct: BuiltinHandler = async (args) => {
  const productId = args[0] as string;
  if (!productId) throw new Error("shopify.getProduct requires a productId.");
  const result = (await shopifyApi(`/products/${productId}.json`)) as { product: unknown };
  return result.product;
};

const createProduct: BuiltinHandler = async (args) => {
  const product = args[0] as Record<string, unknown>;
  if (!product) throw new Error("shopify.createProduct requires a product object.");
  const result = (await shopifyApi("/products.json", "POST", { product })) as { product: unknown };
  return result.product;
};

const updateProduct: BuiltinHandler = async (args) => {
  const productId = args[0] as string;
  const product = args[1] as Record<string, unknown>;
  if (!productId || !product) throw new Error("shopify.updateProduct requires productId and product object.");
  const result = (await shopifyApi(`/products/${productId}.json`, "PUT", { product })) as { product: unknown };
  return result.product;
};

const listOrders: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const params = new URLSearchParams();
  if (opts.limit) params.set("limit", String(opts.limit));
  if (opts.status) params.set("status", String(opts.status));
  if (opts.financial_status) params.set("financial_status", String(opts.financial_status));
  if (opts.fulfillment_status) params.set("fulfillment_status", String(opts.fulfillment_status));
  if (opts.since_id) params.set("since_id", String(opts.since_id));
  const qs = params.toString();
  const result = (await shopifyApi(`/orders.json${qs ? `?${qs}` : ""}`)) as { orders: unknown[] };
  return result.orders;
};

const getOrder: BuiltinHandler = async (args) => {
  const orderId = args[0] as string;
  if (!orderId) throw new Error("shopify.getOrder requires an orderId.");
  const result = (await shopifyApi(`/orders/${orderId}.json`)) as { order: unknown };
  return result.order;
};

const listCustomers: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const params = new URLSearchParams();
  if (opts.limit) params.set("limit", String(opts.limit));
  if (opts.since_id) params.set("since_id", String(opts.since_id));
  const qs = params.toString();
  const result = (await shopifyApi(`/customers.json${qs ? `?${qs}` : ""}`)) as { customers: unknown[] };
  return result.customers;
};

const getCustomer: BuiltinHandler = async (args) => {
  const customerId = args[0] as string;
  if (!customerId) throw new Error("shopify.getCustomer requires a customerId.");
  const result = (await shopifyApi(`/customers/${customerId}.json`)) as { customer: unknown };
  return result.customer;
};

const getInventory: BuiltinHandler = async (args) => {
  const inventoryItemId = args[0] as string;
  if (!inventoryItemId) throw new Error("shopify.getInventory requires an inventoryItemId.");
  const result = (await shopifyApi(`/inventory_levels.json?inventory_item_ids=${inventoryItemId}`)) as { inventory_levels: unknown[] };
  return result.inventory_levels;
};

const countProducts: BuiltinHandler = async () => {
  const result = (await shopifyApi("/products/count.json")) as { count: number };
  return result.count;
};

const countOrders: BuiltinHandler = async (args) => {
  const opts = (typeof args[0] === "object" && args[0] !== null ? args[0] : {}) as Record<string, unknown>;
  const params = new URLSearchParams();
  if (opts.status) params.set("status", String(opts.status));
  const qs = params.toString();
  const result = (await shopifyApi(`/orders/count.json${qs ? `?${qs}` : ""}`)) as { count: number };
  return result.count;
};

export const ShopifyFunctions: Record<string, BuiltinHandler> = {
  setCredentials,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  listOrders,
  getOrder,
  listCustomers,
  getCustomer,
  getInventory,
  countProducts,
  countOrders,
};

export const ShopifyFunctionMetadata: Record<string, object> = {
  setCredentials: {
    description: "Set Shopify store credentials.",
    parameters: [
      { name: "shop", dataType: "string", description: "Shopify store name (e.g. 'my-store' from my-store.myshopify.com)", formInputType: "text", required: true },
      { name: "accessToken", dataType: "string", description: "Admin API access token", formInputType: "password", required: true },
    ],
    returnType: "string",
    returnDescription: "Confirmation message.",
    example: 'shopify.setCredentials "my-store" "shpat_xxx"',
  },
  listProducts: {
    description: "List products in the store.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: limit, page_info, collection_id, status", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of product objects.",
    example: 'shopify.listProducts {"limit":10}',
  },
  getProduct: {
    description: "Get a product by ID.",
    parameters: [
      { name: "productId", dataType: "string", description: "Product ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Product object.",
    example: 'shopify.getProduct "123456789"',
  },
  createProduct: {
    description: "Create a new product.",
    parameters: [
      { name: "product", dataType: "object", description: "Product object (title, body_html, vendor, product_type, variants, etc.)", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Created product object.",
    example: 'shopify.createProduct {"title":"New Product","body_html":"<p>Description</p>","vendor":"My Brand"}',
  },
  updateProduct: {
    description: "Update an existing product.",
    parameters: [
      { name: "productId", dataType: "string", description: "Product ID", formInputType: "text", required: true },
      { name: "product", dataType: "object", description: "Fields to update", formInputType: "json", required: true },
    ],
    returnType: "object",
    returnDescription: "Updated product object.",
    example: 'shopify.updateProduct "123456789" {"title":"Updated Title"}',
  },
  listOrders: {
    description: "List orders with optional filters.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: limit, status, financial_status, fulfillment_status, since_id", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of order objects.",
    example: 'shopify.listOrders {"status":"open","limit":25}',
  },
  getOrder: {
    description: "Get an order by ID.",
    parameters: [
      { name: "orderId", dataType: "string", description: "Order ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Order object.",
    example: 'shopify.getOrder "987654321"',
  },
  listCustomers: {
    description: "List customers.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: limit, since_id", formInputType: "json", required: false },
    ],
    returnType: "array",
    returnDescription: "Array of customer objects.",
    example: 'shopify.listCustomers {"limit":10}',
  },
  getCustomer: {
    description: "Get a customer by ID.",
    parameters: [
      { name: "customerId", dataType: "string", description: "Customer ID", formInputType: "text", required: true },
    ],
    returnType: "object",
    returnDescription: "Customer object.",
    example: 'shopify.getCustomer "111222333"',
  },
  getInventory: {
    description: "Get inventory levels for an item.",
    parameters: [
      { name: "inventoryItemId", dataType: "string", description: "Inventory item ID", formInputType: "text", required: true },
    ],
    returnType: "array",
    returnDescription: "Array of inventory level objects.",
    example: 'shopify.getInventory "444555666"',
  },
  countProducts: {
    description: "Get total product count.",
    parameters: [],
    returnType: "number",
    returnDescription: "Number of products.",
    example: "shopify.countProducts",
  },
  countOrders: {
    description: "Get total order count with optional status filter.",
    parameters: [
      { name: "options", dataType: "object", description: "Options: status (open, closed, any)", formInputType: "json", required: false },
    ],
    returnType: "number",
    returnDescription: "Number of orders.",
    example: 'shopify.countOrders {"status":"open"}',
  },
};

export const ShopifyModuleMetadata = {
  name: "shopify",
  description: "Manage Shopify products, orders, customers, and inventory via the Shopify Admin REST API.",
  icon: "shopping-cart",
  category: "ecommerce",
};
