import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CurrencyFunctions, CurrencyFunctionMetadata, CurrencyModuleMetadata } from "./currency.js";

const CurrencyModule: ModuleAdapter = {
  name: "currency",
  functions: CurrencyFunctions,
  functionMetadata: CurrencyFunctionMetadata as any,
  moduleMetadata: CurrencyModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default CurrencyModule;
export { CurrencyModule };
export { CurrencyFunctions, CurrencyFunctionMetadata, CurrencyModuleMetadata } from "./currency.js";
