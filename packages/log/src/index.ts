import type { ModuleAdapter } from "@wiredwp/robinpath";
import { LogFunctions, LogFunctionMetadata, LogModuleMetadata } from "./log.js";

const LogModule: ModuleAdapter = {
  name: "log",
  functions: LogFunctions,
  functionMetadata: LogFunctionMetadata,
  moduleMetadata: LogModuleMetadata,
  global: false,
};

export default LogModule;
export { LogModule };
export { LogFunctions, LogFunctionMetadata, LogModuleMetadata } from "./log.js";
