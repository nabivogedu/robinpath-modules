import type { ModuleAdapter } from "@wiredwp/robinpath";
import { InstagramFunctions, InstagramFunctionMetadata, InstagramModuleMetadata } from "./instagram.js";

const InstagramModule: ModuleAdapter = {
  name: "instagram",
  functions: InstagramFunctions,
  functionMetadata: InstagramFunctionMetadata as any,
  moduleMetadata: InstagramModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default InstagramModule;
export { InstagramModule };
export { InstagramFunctions, InstagramFunctionMetadata, InstagramModuleMetadata } from "./instagram.js";
