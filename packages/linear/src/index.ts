import type { ModuleAdapter } from "@wiredwp/robinpath";
import { LinearFunctions, LinearFunctionMetadata, LinearModuleMetadata } from "./linear.js";

const LinearModule: ModuleAdapter = {
  name: "linear",
  functions: LinearFunctions,
  functionMetadata: LinearFunctionMetadata as any,
  moduleMetadata: LinearModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default LinearModule;
export { LinearModule };
export { LinearFunctions, LinearFunctionMetadata, LinearModuleMetadata } from "./linear.js";
