import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ShopifyFunctions, ShopifyFunctionMetadata, ShopifyModuleMetadata } from "./shopify.js";

const ShopifyModule: ModuleAdapter = {
  name: "shopify",
  functions: ShopifyFunctions,
  functionMetadata: ShopifyFunctionMetadata as any,
  moduleMetadata: ShopifyModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ShopifyModule;
export { ShopifyModule };
export { ShopifyFunctions, ShopifyFunctionMetadata, ShopifyModuleMetadata } from "./shopify.js";
