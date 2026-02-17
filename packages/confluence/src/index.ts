import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ConfluenceFunctions, ConfluenceFunctionMetadata, ConfluenceModuleMetadata } from "./confluence.js";

const ConfluenceModule: ModuleAdapter = {
  name: "confluence",
  functions: ConfluenceFunctions,
  functionMetadata: ConfluenceFunctionMetadata as any,
  moduleMetadata: ConfluenceModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ConfluenceModule;
export { ConfluenceModule };
export { ConfluenceFunctions, ConfluenceFunctionMetadata, ConfluenceModuleMetadata } from "./confluence.js";
