import type { ModuleAdapter } from "@wiredwp/robinpath";
import { WebflowFunctions, WebflowFunctionMetadata, WebflowModuleMetadata } from "./webflow.js";

const WebflowModule: ModuleAdapter = {
  name: "webflow",
  functions: WebflowFunctions,
  functionMetadata: WebflowFunctionMetadata as any,
  moduleMetadata: WebflowModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default WebflowModule;
export { WebflowModule };
export { WebflowFunctions, WebflowFunctionMetadata, WebflowModuleMetadata } from "./webflow.js";
