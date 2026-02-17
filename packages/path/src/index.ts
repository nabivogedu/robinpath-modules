import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PathFunctions, PathFunctionMetadata, PathModuleMetadata } from "./path.js";

const PathModule: ModuleAdapter = {
  name: "path",
  functions: PathFunctions,
  functionMetadata: PathFunctionMetadata as any,
  moduleMetadata: PathModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default PathModule;
export { PathModule };
export { PathFunctions, PathFunctionMetadata, PathModuleMetadata } from "./path.js";
