import type { ModuleAdapter } from "@wiredwp/robinpath";
import { UrlFunctions, UrlFunctionMetadata, UrlModuleMetadata } from "./url.js";

const UrlModule: ModuleAdapter = {
  name: "url",
  functions: UrlFunctions,
  functionMetadata: UrlFunctionMetadata,
  moduleMetadata: UrlModuleMetadata,
  global: false,
};

export default UrlModule;
export { UrlModule };
export { UrlFunctions, UrlFunctionMetadata, UrlModuleMetadata } from "./url.js";
