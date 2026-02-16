import type { ModuleAdapter } from "@wiredwp/robinpath";
import { RetryFunctions, RetryFunctionMetadata, RetryModuleMetadata } from "./retry.js";

const RetryModule: ModuleAdapter = {
  name: "retry",
  functions: RetryFunctions,
  functionMetadata: RetryFunctionMetadata,
  moduleMetadata: RetryModuleMetadata,
  global: false,
};

export default RetryModule;
export { RetryModule };
export { RetryFunctions, RetryFunctionMetadata, RetryModuleMetadata } from "./retry.js";
