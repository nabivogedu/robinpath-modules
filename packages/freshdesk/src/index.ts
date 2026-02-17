import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FreshdeskFunctions, FreshdeskFunctionMetadata, FreshdeskModuleMetadata } from "./freshdesk.js";

const FreshdeskModule: ModuleAdapter = {
  name: "freshdesk",
  functions: FreshdeskFunctions,
  functionMetadata: FreshdeskFunctionMetadata as any,
  moduleMetadata: FreshdeskModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default FreshdeskModule;
export { FreshdeskModule };
export { FreshdeskFunctions, FreshdeskFunctionMetadata, FreshdeskModuleMetadata } from "./freshdesk.js";
