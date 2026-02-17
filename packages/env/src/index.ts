import type { ModuleAdapter } from "@wiredwp/robinpath";
import { EnvFunctions, EnvFunctionMetadata, EnvModuleMetadata } from "./env.js";

const EnvModule: ModuleAdapter = {
  name: "env",
  functions: EnvFunctions,
  functionMetadata: EnvFunctionMetadata as any,
  moduleMetadata: EnvModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default EnvModule;
export { EnvModule };
export { EnvFunctions, EnvFunctionMetadata, EnvModuleMetadata } from "./env.js";
