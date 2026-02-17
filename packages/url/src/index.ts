import type { ModuleAdapter } from "@wiredwp/robinpath";
import { UrlFunctions, UrlFunctionMetadata, UrlModuleMetadata } from "./url.js";

const UrlModule: ModuleAdapter = {
  name: "url",
  functions: UrlFunctions,
  functionMetadata: UrlFunctionMetadata as any,
  moduleMetadata: UrlModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default UrlModule;
export { UrlModule };
export { UrlFunctions, UrlFunctionMetadata, UrlModuleMetadata } from "./url.js";
