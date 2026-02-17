import type { ModuleAdapter } from "@wiredwp/robinpath";
import { LogFunctions, LogFunctionMetadata, LogModuleMetadata } from "./log.js";

const LogModule: ModuleAdapter = {
  name: "log",
  functions: LogFunctions,
  functionMetadata: LogFunctionMetadata as any,
  moduleMetadata: LogModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default LogModule;
export { LogModule };
export { LogFunctions, LogFunctionMetadata, LogModuleMetadata } from "./log.js";
