import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ProcessFunctions, ProcessFunctionMetadata, ProcessModuleMetadata } from "./process.js";
const ProcessModule: ModuleAdapter = { name: "process", functions: ProcessFunctions, functionMetadata: ProcessFunctionMetadata, moduleMetadata: ProcessModuleMetadata, global: false };
export default ProcessModule;
export { ProcessModule };
export { ProcessFunctions, ProcessFunctionMetadata, ProcessModuleMetadata } from "./process.js";
