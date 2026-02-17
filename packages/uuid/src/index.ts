import type { ModuleAdapter } from "@wiredwp/robinpath";
import { UuidFunctions, UuidFunctionMetadata, UuidModuleMetadata } from "./uuid.js";

const UuidModule: ModuleAdapter = {
  name: "uuid",
  functions: UuidFunctions,
  functionMetadata: UuidFunctionMetadata as any,
  moduleMetadata: UuidModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default UuidModule;
export { UuidModule };
export { UuidFunctions, UuidFunctionMetadata, UuidModuleMetadata } from "./uuid.js";
