import type { ModuleAdapter } from "@wiredwp/robinpath";
import { BufferFunctions, BufferFunctionMetadata, BufferModuleMetadata } from "./buffer.js";

const BufferModule: ModuleAdapter = {
  name: "buffer",
  functions: BufferFunctions,
  functionMetadata: BufferFunctionMetadata as any,
  moduleMetadata: BufferModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default BufferModule;
export { BufferModule };
export { BufferFunctions, BufferFunctionMetadata, BufferModuleMetadata } from "./buffer.js";
