import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SentryFunctions, SentryFunctionMetadata, SentryModuleMetadata } from "./sentry.js";

const SentryModule: ModuleAdapter = {
  name: "sentry",
  functions: SentryFunctions,
  functionMetadata: SentryFunctionMetadata as any,
  moduleMetadata: SentryModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default SentryModule;
export { SentryModule };
export { SentryFunctions, SentryFunctionMetadata, SentryModuleMetadata } from "./sentry.js";
