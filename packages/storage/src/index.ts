import type { ModuleAdapter } from "@wiredwp/robinpath";
import { StorageFunctions, StorageFunctionMetadata, StorageModuleMetadata } from "./storage.js";

const StorageModule: ModuleAdapter = {
  name: "storage",
  functions: StorageFunctions,
  functionMetadata: StorageFunctionMetadata,
  moduleMetadata: StorageModuleMetadata,
  global: false,
};

export default StorageModule;
export { StorageModule };
export { StorageFunctions, StorageFunctionMetadata, StorageModuleMetadata } from "./storage.js";
