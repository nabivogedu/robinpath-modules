import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SemverFunctions, SemverFunctionMetadata, SemverModuleMetadata } from "./semver.js";

const SemverModule: ModuleAdapter = {
  name: "semver",
  functions: SemverFunctions,
  functionMetadata: SemverFunctionMetadata as any,
  moduleMetadata: SemverModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default SemverModule;
export { SemverModule };
export { SemverFunctions, SemverFunctionMetadata, SemverModuleMetadata } from "./semver.js";
