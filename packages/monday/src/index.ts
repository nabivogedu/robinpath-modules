import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MondayFunctions, MondayFunctionMetadata, MondayModuleMetadata } from "./monday.js";

const MondayModule: ModuleAdapter = {
  name: "monday",
  functions: MondayFunctions,
  functionMetadata: MondayFunctionMetadata as any,
  moduleMetadata: MondayModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default MondayModule;
export { MondayModule };
export { MondayFunctions, MondayFunctionMetadata, MondayModuleMetadata } from "./monday.js";
