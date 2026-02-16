import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DotenvFunctions, DotenvFunctionMetadata, DotenvModuleMetadata } from "./dotenv.js";

const DotenvModule: ModuleAdapter = {
  name: "dotenv",
  functions: DotenvFunctions,
  functionMetadata: DotenvFunctionMetadata,
  moduleMetadata: DotenvModuleMetadata,
  global: false,
};

export default DotenvModule;
export { DotenvModule };
export { DotenvFunctions, DotenvFunctionMetadata, DotenvModuleMetadata } from "./dotenv.js";
