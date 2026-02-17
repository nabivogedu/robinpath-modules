import type { ModuleAdapter } from "@wiredwp/robinpath";
import { StorageFunctions, StorageFunctionMetadata, StorageModuleMetadata } from "./storage.js";

const StorageModule: ModuleAdapter = {
  name: "storage",
  functions: StorageFunctions,
  functionMetadata: StorageFunctionMetadata as any,
  moduleMetadata: StorageModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default StorageModule;
export { StorageModule };
export { StorageFunctions, StorageFunctionMetadata, StorageModuleMetadata } from "./storage.js";
