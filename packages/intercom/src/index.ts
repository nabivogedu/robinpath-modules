import type { ModuleAdapter } from "@wiredwp/robinpath";
import { IntercomFunctions, IntercomFunctionMetadata, IntercomModuleMetadata } from "./intercom.js";

const IntercomModule: ModuleAdapter = {
  name: "intercom",
  functions: IntercomFunctions,
  functionMetadata: IntercomFunctionMetadata as any,
  moduleMetadata: IntercomModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default IntercomModule;
export { IntercomModule };
export { IntercomFunctions, IntercomFunctionMetadata, IntercomModuleMetadata } from "./intercom.js";
