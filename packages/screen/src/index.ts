import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ScreenFunctions, ScreenFunctionMetadata, ScreenModuleMetadata } from "./screen.js";

const ScreenModule: ModuleAdapter = {
  name: "screen",
  functions: ScreenFunctions,
  functionMetadata: ScreenFunctionMetadata,
  moduleMetadata: ScreenModuleMetadata,
  global: false,
};

export default ScreenModule;
export { ScreenModule };
export { ScreenFunctions, ScreenFunctionMetadata, ScreenModuleMetadata } from "./screen.js";
