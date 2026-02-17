import type { ModuleAdapter } from "@wiredwp/robinpath";
import { RegexFunctions, RegexFunctionMetadata, RegexModuleMetadata } from "./regex.js";

const RegexModule: ModuleAdapter = {
  name: "regex",
  functions: RegexFunctions,
  functionMetadata: RegexFunctionMetadata as any,
  moduleMetadata: RegexModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default RegexModule;
export { RegexModule };
export { RegexFunctions, RegexFunctionMetadata, RegexModuleMetadata } from "./regex.js";
