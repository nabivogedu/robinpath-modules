import type { ModuleAdapter } from "@wiredwp/robinpath";
import { AsanaFunctions, AsanaFunctionMetadata, AsanaModuleMetadata } from "./asana.js";

const AsanaModule: ModuleAdapter = {
  name: "asana",
  functions: AsanaFunctions,
  functionMetadata: AsanaFunctionMetadata as any,
  moduleMetadata: AsanaModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default AsanaModule;
export { AsanaModule };
export { AsanaFunctions, AsanaFunctionMetadata, AsanaModuleMetadata } from "./asana.js";
