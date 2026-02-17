import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DatabaseFunctions, DatabaseFunctionMetadata, DatabaseModuleMetadata } from "./database.js";

const DatabaseModule: ModuleAdapter = {
  name: "database",
  functions: DatabaseFunctions,
  functionMetadata: DatabaseFunctionMetadata as any,
  moduleMetadata: DatabaseModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default DatabaseModule;
export { DatabaseModule };
export { DatabaseFunctions, DatabaseFunctionMetadata, DatabaseModuleMetadata } from "./database.js";
