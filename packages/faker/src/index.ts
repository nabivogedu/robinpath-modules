import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FakerFunctions, FakerFunctionMetadata, FakerModuleMetadata } from "./faker.js";

const FakerModule: ModuleAdapter = { name: "faker", functions: FakerFunctions, functionMetadata: FakerFunctionMetadata as any, moduleMetadata: FakerModuleMetadata as any, global: false };

export default FakerModule;
export { FakerModule };
export { FakerFunctions, FakerFunctionMetadata, FakerModuleMetadata } from "./faker.js";
