import type { ModuleAdapter } from "@wiredwp/robinpath";
import { BasecampFunctions, BasecampFunctionMetadata, BasecampModuleMetadata } from "./basecamp.js";

const BasecampModule: ModuleAdapter = {
  name: "basecamp",
  functions: BasecampFunctions,
  functionMetadata: BasecampFunctionMetadata as any,
  moduleMetadata: BasecampModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default BasecampModule;
export { BasecampModule };
export { BasecampFunctions, BasecampFunctionMetadata, BasecampModuleMetadata } from "./basecamp.js";
