import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MoneyFunctions, MoneyFunctionMetadata, MoneyModuleMetadata } from "./money.js";
const MoneyModule: ModuleAdapter = { name: "money", functions: MoneyFunctions, functionMetadata: MoneyFunctionMetadata, moduleMetadata: MoneyModuleMetadata, global: false };
export default MoneyModule;
export { MoneyModule };
export { MoneyFunctions, MoneyFunctionMetadata, MoneyModuleMetadata } from "./money.js";
