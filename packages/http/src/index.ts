import type { ModuleAdapter } from "@wiredwp/robinpath";
import { HttpFunctions, HttpFunctionMetadata, HttpModuleMetadata } from "./http.js";

const HttpModule: ModuleAdapter = {
  name: "http",
  functions: HttpFunctions,
  functionMetadata: HttpFunctionMetadata as any,
  moduleMetadata: HttpModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default HttpModule;
export { HttpModule };
export { HttpFunctions, HttpFunctionMetadata, HttpModuleMetadata } from "./http.js";
