import type { ModuleAdapter } from "@wiredwp/robinpath";
import { QuickbooksFunctions, QuickbooksFunctionMetadata, QuickbooksModuleMetadata } from "./quickbooks.js";

const QuickbooksModule: ModuleAdapter = {
  name: "quickbooks",
  functions: QuickbooksFunctions,
  functionMetadata: QuickbooksFunctionMetadata as any,
  moduleMetadata: QuickbooksModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default QuickbooksModule;
export { QuickbooksModule };
export { QuickbooksFunctions, QuickbooksFunctionMetadata, QuickbooksModuleMetadata } from "./quickbooks.js";
