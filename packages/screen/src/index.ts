import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ScreenFunctions, ScreenFunctionMetadata, ScreenModuleMetadata } from "./screen.js";

const ScreenModule: ModuleAdapter = {
  name: "screen",
  functions: ScreenFunctions,
  functionMetadata: ScreenFunctionMetadata as any,
  moduleMetadata: ScreenModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ScreenModule;
export { ScreenModule };
export { ScreenFunctions, ScreenFunctionMetadata, ScreenModuleMetadata } from "./screen.js";
