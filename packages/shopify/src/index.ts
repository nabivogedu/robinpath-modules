import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ShopifyFunctions, ShopifyFunctionMetadata, ShopifyModuleMetadata } from "./shopify.js";

const ShopifyModule: ModuleAdapter = {
  name: "shopify",
  functions: ShopifyFunctions,
  functionMetadata: ShopifyFunctionMetadata,
  moduleMetadata: ShopifyModuleMetadata,
  global: false,
};

export default ShopifyModule;
export { ShopifyModule };
export { ShopifyFunctions, ShopifyFunctionMetadata, ShopifyModuleMetadata } from "./shopify.js";
