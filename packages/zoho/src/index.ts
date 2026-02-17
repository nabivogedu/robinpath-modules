import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ZohoFunctions, ZohoFunctionMetadata, ZohoModuleMetadata } from "./zoho.js";

const ZohoModule: ModuleAdapter = {
  name: "zoho",
  functions: ZohoFunctions,
  functionMetadata: ZohoFunctionMetadata as any,
  moduleMetadata: ZohoModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ZohoModule;
export { ZohoModule };
export { ZohoFunctions, ZohoFunctionMetadata, ZohoModuleMetadata } from "./zoho.js";
