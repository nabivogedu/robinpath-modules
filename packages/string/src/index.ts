import type { ModuleAdapter } from "@wiredwp/robinpath";
import { StringFunctions, StringFunctionMetadata, StringModuleMetadata } from "./string.js";

const StringModule: ModuleAdapter = {
  name: "string",
  functions: StringFunctions,
  functionMetadata: StringFunctionMetadata as any,
  moduleMetadata: StringModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default StringModule;
export { StringModule };
export { StringFunctions, StringFunctionMetadata, StringModuleMetadata } from "./string.js";
