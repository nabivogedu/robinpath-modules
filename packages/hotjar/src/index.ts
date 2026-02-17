import type { ModuleAdapter } from "@wiredwp/robinpath";
import { HotjarFunctions, HotjarFunctionMetadata, HotjarModuleMetadata } from "./hotjar.js";

const HotjarModule: ModuleAdapter = {
  name: "hotjar",
  functions: HotjarFunctions,
  functionMetadata: HotjarFunctionMetadata as any,
  moduleMetadata: HotjarModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default HotjarModule;
export { HotjarModule };
export { HotjarFunctions, HotjarFunctionMetadata, HotjarModuleMetadata } from "./hotjar.js";
