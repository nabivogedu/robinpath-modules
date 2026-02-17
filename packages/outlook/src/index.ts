import type { ModuleAdapter } from "@wiredwp/robinpath";
import { OutlookFunctions, OutlookFunctionMetadata, OutlookModuleMetadata } from "./outlook.js";

const OutlookModule: ModuleAdapter = {
  name: "outlook",
  functions: OutlookFunctions,
  functionMetadata: OutlookFunctionMetadata as any,
  moduleMetadata: OutlookModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default OutlookModule;
export { OutlookModule };
export { OutlookFunctions, OutlookFunctionMetadata, OutlookModuleMetadata } from "./outlook.js";
