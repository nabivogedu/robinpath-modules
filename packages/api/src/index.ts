import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ApiFunctions, ApiFunctionMetadata, ApiModuleMetadata } from "./api.js";

const ApiModule: ModuleAdapter = {
  name: "api",
  functions: ApiFunctions,
  functionMetadata: ApiFunctionMetadata,
  moduleMetadata: ApiModuleMetadata,
  global: false,
};

export default ApiModule;
export { ApiModule };
export { ApiFunctions, ApiFunctionMetadata, ApiModuleMetadata } from "./api.js";
