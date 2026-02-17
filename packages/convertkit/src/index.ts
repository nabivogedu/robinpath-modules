import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ConvertkitFunctions, ConvertkitFunctionMetadata, ConvertkitModuleMetadata } from "./convertkit.js";

const ConvertkitModule: ModuleAdapter = {
  name: "convertkit",
  functions: ConvertkitFunctions,
  functionMetadata: ConvertkitFunctionMetadata as any,
  moduleMetadata: ConvertkitModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ConvertkitModule;
export { ConvertkitModule };
export { ConvertkitFunctions, ConvertkitFunctionMetadata, ConvertkitModuleMetadata } from "./convertkit.js";
