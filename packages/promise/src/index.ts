import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PromiseFunctions, PromiseFunctionMetadata, PromiseModuleMetadata } from "./promise.js";
const PromiseModule: ModuleAdapter = { name: "promise", functions: PromiseFunctions, functionMetadata: PromiseFunctionMetadata, moduleMetadata: PromiseModuleMetadata, global: false };
export default PromiseModule;
export { PromiseModule };
export { PromiseFunctions, PromiseFunctionMetadata, PromiseModuleMetadata } from "./promise.js";
