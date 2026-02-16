import type { ModuleAdapter } from "@wiredwp/robinpath";
import { UuidFunctions, UuidFunctionMetadata, UuidModuleMetadata } from "./uuid.js";

const UuidModule: ModuleAdapter = {
  name: "uuid",
  functions: UuidFunctions,
  functionMetadata: UuidFunctionMetadata,
  moduleMetadata: UuidModuleMetadata,
  global: false,
};

export default UuidModule;
export { UuidModule };
export { UuidFunctions, UuidFunctionMetadata, UuidModuleMetadata } from "./uuid.js";
