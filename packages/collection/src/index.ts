import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CollectionFunctions, CollectionFunctionMetadata, CollectionModuleMetadata } from "./collection.js";

const CollectionModule: ModuleAdapter = {
  name: "collection",
  functions: CollectionFunctions,
  functionMetadata: CollectionFunctionMetadata as any,
  moduleMetadata: CollectionModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default CollectionModule;
export { CollectionModule };
export { CollectionFunctions, CollectionFunctionMetadata, CollectionModuleMetadata } from "./collection.js";
