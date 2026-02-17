import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DiffFunctions, DiffFunctionMetadata, DiffModuleMetadata } from "./diff.js";

const DiffModule: ModuleAdapter = {
  name: "diff",
  functions: DiffFunctions,
  functionMetadata: DiffFunctionMetadata as any,
  moduleMetadata: DiffModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default DiffModule;
export { DiffModule };
export { DiffFunctions, DiffFunctionMetadata, DiffModuleMetadata } from "./diff.js";
