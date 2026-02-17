import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ZipFunctions, ZipFunctionMetadata, ZipModuleMetadata } from "./zip.js";

const ZipModule: ModuleAdapter = {
  name: "zip",
  functions: ZipFunctions,
  functionMetadata: ZipFunctionMetadata as any,
  moduleMetadata: ZipModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ZipModule;
export { ZipModule };
export { ZipFunctions, ZipFunctionMetadata, ZipModuleMetadata } from "./zip.js";
