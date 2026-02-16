import type { ModuleAdapter } from "@wiredwp/robinpath";
import { HttpFunctions, HttpFunctionMetadata, HttpModuleMetadata } from "./http.js";

const HttpModule: ModuleAdapter = {
  name: "http",
  functions: HttpFunctions,
  functionMetadata: HttpFunctionMetadata,
  moduleMetadata: HttpModuleMetadata,
  global: false,
};

export default HttpModule;
export { HttpModule };
export { HttpFunctions, HttpFunctionMetadata, HttpModuleMetadata } from "./http.js";
