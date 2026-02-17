import type { ModuleAdapter } from "@wiredwp/robinpath";
import { BigcommerceFunctions, BigcommerceFunctionMetadata, BigcommerceModuleMetadata } from "./bigcommerce.js";

const BigcommerceModule: ModuleAdapter = {
  name: "bigcommerce",
  functions: BigcommerceFunctions,
  functionMetadata: BigcommerceFunctionMetadata as any,
  moduleMetadata: BigcommerceModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default BigcommerceModule;
export { BigcommerceModule };
export { BigcommerceFunctions, BigcommerceFunctionMetadata, BigcommerceModuleMetadata } from "./bigcommerce.js";
