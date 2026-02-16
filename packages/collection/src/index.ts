import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CollectionFunctions, CollectionFunctionMetadata, CollectionModuleMetadata } from "./collection.js";

const CollectionModule: ModuleAdapter = {
  name: "collection",
  functions: CollectionFunctions,
  functionMetadata: CollectionFunctionMetadata,
  moduleMetadata: CollectionModuleMetadata,
  global: false,
};

export default CollectionModule;
export { CollectionModule };
export { CollectionFunctions, CollectionFunctionMetadata, CollectionModuleMetadata } from "./collection.js";
