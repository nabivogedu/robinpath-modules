import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ZoomFunctions, ZoomFunctionMetadata, ZoomModuleMetadata } from "./zoom.js";

const ZoomModule: ModuleAdapter = {
  name: "zoom",
  functions: ZoomFunctions,
  functionMetadata: ZoomFunctionMetadata as any,
  moduleMetadata: ZoomModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ZoomModule;
export { ZoomModule };
export { ZoomFunctions, ZoomFunctionMetadata, ZoomModuleMetadata } from "./zoom.js";
