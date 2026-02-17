import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DebugFunctions, DebugFunctionMetadata, DebugModuleMetadata } from "./debug.js";
const DebugModule: ModuleAdapter = { name: "debug", functions: DebugFunctions, functionMetadata: DebugFunctionMetadata as any, moduleMetadata: DebugModuleMetadata as any, global: false };
export default DebugModule;
export { DebugModule };
export { DebugFunctions, DebugFunctionMetadata, DebugModuleMetadata } from "./debug.js";
