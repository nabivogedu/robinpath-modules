import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CacheFunctions, CacheFunctionMetadata, CacheModuleMetadata } from "./cache.js";

const CacheModule: ModuleAdapter = {
  name: "cache",
  functions: CacheFunctions,
  functionMetadata: CacheFunctionMetadata as any,
  moduleMetadata: CacheModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default CacheModule;
export { CacheModule };
export { CacheFunctions, CacheFunctionMetadata, CacheModuleMetadata } from "./cache.js";
