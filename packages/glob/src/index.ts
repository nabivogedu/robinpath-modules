import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GlobFunctions, GlobFunctionMetadata, GlobModuleMetadata } from "./glob.js";

const GlobModule: ModuleAdapter = {
  name: "glob",
  functions: GlobFunctions,
  functionMetadata: GlobFunctionMetadata,
  moduleMetadata: GlobModuleMetadata,
  global: false,
};

export default GlobModule;
export { GlobModule };
export { GlobFunctions, GlobFunctionMetadata, GlobModuleMetadata } from "./glob.js";
