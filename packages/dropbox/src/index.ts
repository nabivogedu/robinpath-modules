import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DropboxFunctions, DropboxFunctionMetadata, DropboxModuleMetadata } from "./dropbox.js";

const DropboxModule: ModuleAdapter = {
  name: "dropbox",
  functions: DropboxFunctions,
  functionMetadata: DropboxFunctionMetadata as any,
  moduleMetadata: DropboxModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default DropboxModule;
export { DropboxModule };
export { DropboxFunctions, DropboxFunctionMetadata, DropboxModuleMetadata } from "./dropbox.js";
