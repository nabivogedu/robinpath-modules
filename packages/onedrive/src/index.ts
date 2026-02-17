import type { ModuleAdapter } from "@wiredwp/robinpath";
import { OnedriveFunctions, OnedriveFunctionMetadata, OnedriveModuleMetadata } from "./onedrive.js";

const OnedriveModule: ModuleAdapter = {
  name: "onedrive",
  functions: OnedriveFunctions,
  functionMetadata: OnedriveFunctionMetadata as any,
  moduleMetadata: OnedriveModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default OnedriveModule;
export { OnedriveModule };
export { OnedriveFunctions, OnedriveFunctionMetadata, OnedriveModuleMetadata } from "./onedrive.js";
