import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SchemaFunctions, SchemaFunctionMetadata, SchemaModuleMetadata } from "./schema.js";

const SchemaModule: ModuleAdapter = {
  name: "schema",
  functions: SchemaFunctions,
  functionMetadata: SchemaFunctionMetadata,
  moduleMetadata: SchemaModuleMetadata,
  global: false,
};

export default SchemaModule;
export { SchemaModule };
export { SchemaFunctions, SchemaFunctionMetadata, SchemaModuleMetadata } from "./schema.js";
