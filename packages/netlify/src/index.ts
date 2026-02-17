import type { ModuleAdapter } from "@wiredwp/robinpath";
import { NetlifyFunctions, NetlifyFunctionMetadata, NetlifyModuleMetadata } from "./netlify.js";

const NetlifyModule: ModuleAdapter = {
  name: "netlify",
  functions: NetlifyFunctions,
  functionMetadata: NetlifyFunctionMetadata as any,
  moduleMetadata: NetlifyModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default NetlifyModule;
export { NetlifyModule };
export { NetlifyFunctions, NetlifyFunctionMetadata, NetlifyModuleMetadata } from "./netlify.js";
