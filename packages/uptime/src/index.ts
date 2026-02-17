import type { ModuleAdapter } from "@wiredwp/robinpath";
import { UptimeFunctions, UptimeFunctionMetadata, UptimeModuleMetadata } from "./uptime.js";

const UptimeModule: ModuleAdapter = {
  name: "uptime",
  functions: UptimeFunctions,
  functionMetadata: UptimeFunctionMetadata as any,
  moduleMetadata: UptimeModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default UptimeModule;
export { UptimeModule };
export { UptimeFunctions, UptimeFunctionMetadata, UptimeModuleMetadata } from "./uptime.js";
