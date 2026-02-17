import type { ModuleAdapter } from "@wiredwp/robinpath";
import { StreamFunctions, StreamFunctionMetadata, StreamModuleMetadata } from "./stream.js";
const StreamModule: ModuleAdapter = { name: "stream", functions: StreamFunctions, functionMetadata: StreamFunctionMetadata as any, moduleMetadata: StreamModuleMetadata as any, global: false };
export default StreamModule;
export { StreamModule };
export { StreamFunctions, StreamFunctionMetadata, StreamModuleMetadata } from "./stream.js";
