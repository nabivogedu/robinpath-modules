import type { ModuleAdapter } from "@wiredwp/robinpath";
import { WoocommerceFunctions, WoocommerceFunctionMetadata, WoocommerceModuleMetadata } from "./woocommerce.js";

const WoocommerceModule: ModuleAdapter = {
  name: "woocommerce",
  functions: WoocommerceFunctions,
  functionMetadata: WoocommerceFunctionMetadata as any,
  moduleMetadata: WoocommerceModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default WoocommerceModule;
export { WoocommerceModule };
export { WoocommerceFunctions, WoocommerceFunctionMetadata, WoocommerceModuleMetadata } from "./woocommerce.js";
