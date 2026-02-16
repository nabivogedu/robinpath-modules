import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CacheFunctions, CacheFunctionMetadata, CacheModuleMetadata } from "./cache.js";

const CacheModule: ModuleAdapter = {
  name: "cache",
  functions: CacheFunctions,
  functionMetadata: CacheFunctionMetadata,
  moduleMetadata: CacheModuleMetadata,
  global: false,
};

export default CacheModule;
export { CacheModule };
export { CacheFunctions, CacheFunctionMetadata, CacheModuleMetadata } from "./cache.js";
