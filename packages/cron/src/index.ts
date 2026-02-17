import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CronFunctions, CronFunctionMetadata, CronModuleMetadata } from "./cron.js";

const CronModule: ModuleAdapter = {
  name: "cron",
  functions: CronFunctions,
  functionMetadata: CronFunctionMetadata as any,
  moduleMetadata: CronModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default CronModule;
export { CronModule };
export { CronFunctions, CronFunctionMetadata, CronModuleMetadata } from "./cron.js";
