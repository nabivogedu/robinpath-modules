import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ClickupFunctions, ClickupFunctionMetadata, ClickupModuleMetadata } from "./clickup.js";

const ClickupModule: ModuleAdapter = {
  name: "clickup",
  functions: ClickupFunctions,
  functionMetadata: ClickupFunctionMetadata as any,
  moduleMetadata: ClickupModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ClickupModule;
export { ClickupModule };
export { ClickupFunctions, ClickupFunctionMetadata, ClickupModuleMetadata } from "./clickup.js";
