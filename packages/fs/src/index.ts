import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FsFunctions, FsFunctionMetadata, FsModuleMetadata } from "./fs.js";

const FsModule: ModuleAdapter = {
  name: "fs",
  functions: FsFunctions,
  functionMetadata: FsFunctionMetadata,
  moduleMetadata: FsModuleMetadata,
  global: false,
};

export default FsModule;
export { FsModule };
export { FsFunctions, FsFunctionMetadata, FsModuleMetadata } from "./fs.js";
