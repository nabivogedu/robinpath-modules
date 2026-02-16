import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PathFunctions, PathFunctionMetadata, PathModuleMetadata } from "./path.js";

const PathModule: ModuleAdapter = {
  name: "path",
  functions: PathFunctions,
  functionMetadata: PathFunctionMetadata,
  moduleMetadata: PathModuleMetadata,
  global: false,
};

export default PathModule;
export { PathModule };
export { PathFunctions, PathFunctionMetadata, PathModuleMetadata } from "./path.js";
