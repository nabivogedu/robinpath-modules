import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TranslateFunctions, TranslateFunctionMetadata, TranslateModuleMetadata } from "./translate.js";

const TranslateModule: ModuleAdapter = {
  name: "translate",
  functions: TranslateFunctions,
  functionMetadata: TranslateFunctionMetadata as any,
  moduleMetadata: TranslateModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default TranslateModule;
export { TranslateModule };
export { TranslateFunctions, TranslateFunctionMetadata, TranslateModuleMetadata } from "./translate.js";
