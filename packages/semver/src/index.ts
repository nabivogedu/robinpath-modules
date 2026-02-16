import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SemverFunctions, SemverFunctionMetadata, SemverModuleMetadata } from "./semver.js";

const SemverModule: ModuleAdapter = {
  name: "semver",
  functions: SemverFunctions,
  functionMetadata: SemverFunctionMetadata,
  moduleMetadata: SemverModuleMetadata,
  global: false,
};

export default SemverModule;
export { SemverModule };
export { SemverFunctions, SemverFunctionMetadata, SemverModuleMetadata } from "./semver.js";
