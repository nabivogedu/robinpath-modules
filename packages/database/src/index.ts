import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DatabaseFunctions, DatabaseFunctionMetadata, DatabaseModuleMetadata } from "./database.js";

const DatabaseModule: ModuleAdapter = {
  name: "database",
  functions: DatabaseFunctions,
  functionMetadata: DatabaseFunctionMetadata,
  moduleMetadata: DatabaseModuleMetadata,
  global: false,
};

export default DatabaseModule;
export { DatabaseModule };
export { DatabaseFunctions, DatabaseFunctionMetadata, DatabaseModuleMetadata } from "./database.js";
