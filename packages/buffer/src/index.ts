import type { ModuleAdapter } from "@wiredwp/robinpath";
import { BufferFunctions, BufferFunctionMetadata, BufferModuleMetadata } from "./buffer.js";

const BufferModule: ModuleAdapter = {
  name: "buffer",
  functions: BufferFunctions,
  functionMetadata: BufferFunctionMetadata,
  moduleMetadata: BufferModuleMetadata,
  global: false,
};

export default BufferModule;
export { BufferModule };
export { BufferFunctions, BufferFunctionMetadata, BufferModuleMetadata } from "./buffer.js";
