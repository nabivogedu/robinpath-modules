import type { ModuleAdapter } from "@wiredwp/robinpath";
import { RetryFunctions, RetryFunctionMetadata, RetryModuleMetadata } from "./retry.js";

const RetryModule: ModuleAdapter = {
  name: "retry",
  functions: RetryFunctions,
  functionMetadata: RetryFunctionMetadata as any,
  moduleMetadata: RetryModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default RetryModule;
export { RetryModule };
export { RetryFunctions, RetryFunctionMetadata, RetryModuleMetadata } from "./retry.js";
