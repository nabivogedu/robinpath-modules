import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SanityFunctions, SanityFunctionMetadata, SanityModuleMetadata } from "./sanity.js";

const SanityModule: ModuleAdapter = {
  name: "sanity",
  functions: SanityFunctions,
  functionMetadata: SanityFunctionMetadata as any,
  moduleMetadata: SanityModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default SanityModule;
export { SanityModule };
export { SanityFunctions, SanityFunctionMetadata, SanityModuleMetadata } from "./sanity.js";
