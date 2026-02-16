import type { ModuleAdapter } from "@wiredwp/robinpath";
import { StreamFunctions, StreamFunctionMetadata, StreamModuleMetadata } from "./stream.js";
const StreamModule: ModuleAdapter = { name: "stream", functions: StreamFunctions, functionMetadata: StreamFunctionMetadata, moduleMetadata: StreamModuleMetadata, global: false };
export default StreamModule;
export { StreamModule };
export { StreamFunctions, StreamFunctionMetadata, StreamModuleMetadata } from "./stream.js";
