import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MoneyFunctions, MoneyFunctionMetadata, MoneyModuleMetadata } from "./money.js";
const MoneyModule: ModuleAdapter = { name: "money", functions: MoneyFunctions, functionMetadata: MoneyFunctionMetadata as any, moduleMetadata: MoneyModuleMetadata as any, global: false };
export default MoneyModule;
export { MoneyModule };
export { MoneyFunctions, MoneyFunctionMetadata, MoneyModuleMetadata } from "./money.js";
