import type { ModuleAdapter } from "@wiredwp/robinpath";
import { BoxFunctions, BoxFunctionMetadata, BoxModuleMetadata } from "./box.js";

const BoxModule: ModuleAdapter = {
  name: "box",
  functions: BoxFunctions,
  functionMetadata: BoxFunctionMetadata as any,
  moduleMetadata: BoxModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default BoxModule;
export { BoxModule };
export { BoxFunctions, BoxFunctionMetadata, BoxModuleMetadata } from "./box.js";
