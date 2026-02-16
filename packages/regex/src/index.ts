import type { ModuleAdapter } from "@wiredwp/robinpath";
import { RegexFunctions, RegexFunctionMetadata, RegexModuleMetadata } from "./regex.js";

const RegexModule: ModuleAdapter = {
  name: "regex",
  functions: RegexFunctions,
  functionMetadata: RegexFunctionMetadata,
  moduleMetadata: RegexModuleMetadata,
  global: false,
};

export default RegexModule;
export { RegexModule };
export { RegexFunctions, RegexFunctionMetadata, RegexModuleMetadata } from "./regex.js";
