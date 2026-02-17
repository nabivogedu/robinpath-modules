import type { ModuleAdapter } from "@wiredwp/robinpath";
import { LinkedinFunctions, LinkedinFunctionMetadata, LinkedinModuleMetadata } from "./linkedin.js";

const LinkedinModule: ModuleAdapter = {
  name: "linkedin",
  functions: LinkedinFunctions,
  functionMetadata: LinkedinFunctionMetadata as any,
  moduleMetadata: LinkedinModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default LinkedinModule;
export { LinkedinModule };
export { LinkedinFunctions, LinkedinFunctionMetadata, LinkedinModuleMetadata } from "./linkedin.js";
