import type { ModuleAdapter } from "@wiredwp/robinpath";
import { StringFunctions, StringFunctionMetadata, StringModuleMetadata } from "./string.js";

const StringModule: ModuleAdapter = {
  name: "string",
  functions: StringFunctions,
  functionMetadata: StringFunctionMetadata,
  moduleMetadata: StringModuleMetadata,
  global: false,
};

export default StringModule;
export { StringModule };
export { StringFunctions, StringFunctionMetadata, StringModuleMetadata } from "./string.js";
