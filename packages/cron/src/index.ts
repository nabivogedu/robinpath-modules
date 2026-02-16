import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CronFunctions, CronFunctionMetadata, CronModuleMetadata } from "./cron.js";

const CronModule: ModuleAdapter = {
  name: "cron",
  functions: CronFunctions,
  functionMetadata: CronFunctionMetadata,
  moduleMetadata: CronModuleMetadata,
  global: false,
};

export default CronModule;
export { CronModule };
export { CronFunctions, CronFunctionMetadata, CronModuleMetadata } from "./cron.js";
