import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PinterestFunctions, PinterestFunctionMetadata, PinterestModuleMetadata } from "./pinterest.js";

const PinterestModule: ModuleAdapter = {
  name: "pinterest",
  functions: PinterestFunctions,
  functionMetadata: PinterestFunctionMetadata as any,
  moduleMetadata: PinterestModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default PinterestModule;
export { PinterestModule };
export { PinterestFunctions, PinterestFunctionMetadata, PinterestModuleMetadata } from "./pinterest.js";
