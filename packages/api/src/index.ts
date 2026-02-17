import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ApiFunctions, ApiFunctionMetadata, ApiModuleMetadata } from "./api.js";

const ApiModule: ModuleAdapter = {
  name: "api",
  functions: ApiFunctions,
  functionMetadata: ApiFunctionMetadata as any,
  moduleMetadata: ApiModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ApiModule;
export { ApiModule };
export { ApiFunctions, ApiFunctionMetadata, ApiModuleMetadata } from "./api.js";
