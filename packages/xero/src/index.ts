import type { ModuleAdapter } from "@wiredwp/robinpath";
import { XeroFunctions, XeroFunctionMetadata, XeroModuleMetadata } from "./xero.js";

const XeroModule: ModuleAdapter = {
  name: "xero",
  functions: XeroFunctions,
  functionMetadata: XeroFunctionMetadata as any,
  moduleMetadata: XeroModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default XeroModule;
export { XeroModule };
export { XeroFunctions, XeroFunctionMetadata, XeroModuleMetadata } from "./xero.js";
