import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FreshbooksFunctions, FreshbooksFunctionMetadata, FreshbooksModuleMetadata } from "./freshbooks.js";

const FreshbooksModule: ModuleAdapter = {
  name: "freshbooks",
  functions: FreshbooksFunctions,
  functionMetadata: FreshbooksFunctionMetadata as any,
  moduleMetadata: FreshbooksModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default FreshbooksModule;
export { FreshbooksModule };
export { FreshbooksFunctions, FreshbooksFunctionMetadata, FreshbooksModuleMetadata } from "./freshbooks.js";
