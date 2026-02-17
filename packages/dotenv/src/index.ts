import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DotenvFunctions, DotenvFunctionMetadata, DotenvModuleMetadata } from "./dotenv.js";

const DotenvModule: ModuleAdapter = {
  name: "dotenv",
  functions: DotenvFunctions,
  functionMetadata: DotenvFunctionMetadata as any,
  moduleMetadata: DotenvModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default DotenvModule;
export { DotenvModule };
export { DotenvFunctions, DotenvFunctionMetadata, DotenvModuleMetadata } from "./dotenv.js";
