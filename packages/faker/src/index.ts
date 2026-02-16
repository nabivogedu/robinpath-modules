import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FakerFunctions, FakerFunctionMetadata, FakerModuleMetadata } from "./faker.js";

const FakerModule: ModuleAdapter = { name: "faker", functions: FakerFunctions, functionMetadata: FakerFunctionMetadata, moduleMetadata: FakerModuleMetadata, global: false };

export default FakerModule;
export { FakerModule };
export { FakerFunctions, FakerFunctionMetadata, FakerModuleMetadata } from "./faker.js";
