import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ZipFunctions, ZipFunctionMetadata, ZipModuleMetadata } from "./zip.js";

const ZipModule: ModuleAdapter = {
  name: "zip",
  functions: ZipFunctions,
  functionMetadata: ZipFunctionMetadata,
  moduleMetadata: ZipModuleMetadata,
  global: false,
};

export default ZipModule;
export { ZipModule };
export { ZipFunctions, ZipFunctionMetadata, ZipModuleMetadata } from "./zip.js";
