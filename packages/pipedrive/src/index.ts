import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PipedriveFunctions, PipedriveFunctionMetadata, PipedriveModuleMetadata } from "./pipedrive.js";

const PipedriveModule: ModuleAdapter = {
  name: "pipedrive",
  functions: PipedriveFunctions,
  functionMetadata: PipedriveFunctionMetadata as any,
  moduleMetadata: PipedriveModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default PipedriveModule;
export { PipedriveModule };
export { PipedriveFunctions, PipedriveFunctionMetadata, PipedriveModuleMetadata } from "./pipedrive.js";
