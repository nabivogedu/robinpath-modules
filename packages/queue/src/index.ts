import type { ModuleAdapter } from "@wiredwp/robinpath";
import { QueueFunctions, QueueFunctionMetadata, QueueModuleMetadata } from "./queue.js";

const QueueModule: ModuleAdapter = {
  name: "queue",
  functions: QueueFunctions,
  functionMetadata: QueueFunctionMetadata as any,
  moduleMetadata: QueueModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default QueueModule;
export { QueueModule };
export { QueueFunctions, QueueFunctionMetadata, QueueModuleMetadata } from "./queue.js";
