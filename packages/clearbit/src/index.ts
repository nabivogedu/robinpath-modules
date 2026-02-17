import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ClearbitFunctions, ClearbitFunctionMetadata, ClearbitModuleMetadata } from "./clearbit.js";

const ClearbitModule: ModuleAdapter = {
  name: "clearbit",
  functions: ClearbitFunctions,
  functionMetadata: ClearbitFunctionMetadata as any,
  moduleMetadata: ClearbitModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ClearbitModule;
export { ClearbitModule };
export { ClearbitFunctions, ClearbitFunctionMetadata, ClearbitModuleMetadata } from "./clearbit.js";
