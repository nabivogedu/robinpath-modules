import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DeeplFunctions, DeeplFunctionMetadata, DeeplModuleMetadata } from "./deepl.js";

const DeeplModule: ModuleAdapter = {
  name: "deepl",
  functions: DeeplFunctions,
  functionMetadata: DeeplFunctionMetadata as any,
  moduleMetadata: DeeplModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default DeeplModule;
export { DeeplModule };
export { DeeplFunctions, DeeplFunctionMetadata, DeeplModuleMetadata } from "./deepl.js";
