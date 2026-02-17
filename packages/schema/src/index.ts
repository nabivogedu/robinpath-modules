import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SchemaFunctions, SchemaFunctionMetadata, SchemaModuleMetadata } from "./schema.js";

const SchemaModule: ModuleAdapter = {
  name: "schema",
  functions: SchemaFunctions,
  functionMetadata: SchemaFunctionMetadata as any,
  moduleMetadata: SchemaModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default SchemaModule;
export { SchemaModule };
export { SchemaFunctions, SchemaFunctionMetadata, SchemaModuleMetadata } from "./schema.js";
