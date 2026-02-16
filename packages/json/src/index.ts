import type { ModuleAdapter } from "@wiredwp/robinpath";
import { JsonFunctions, JsonFunctionMetadata, JsonModuleMetadata } from "./json.js";

const JsonModule: ModuleAdapter = {
  name: "json",
  functions: JsonFunctions,
  functionMetadata: JsonFunctionMetadata,
  moduleMetadata: JsonModuleMetadata,
  global: false,
};

export default JsonModule;
export { JsonModule };
export { JsonFunctions, JsonFunctionMetadata, JsonModuleMetadata } from "./json.js";
