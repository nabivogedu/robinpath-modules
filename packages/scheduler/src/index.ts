import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SchedulerFunctions, SchedulerFunctionMetadata, SchedulerModuleMetadata } from "./scheduler.js";

const SchedulerModule: ModuleAdapter = {
  name: "scheduler",
  functions: SchedulerFunctions,
  functionMetadata: SchedulerFunctionMetadata,
  moduleMetadata: SchedulerModuleMetadata,
  global: false,
};

export default SchedulerModule;
export { SchedulerModule };
export { SchedulerFunctions, SchedulerFunctionMetadata, SchedulerModuleMetadata } from "./scheduler.js";
