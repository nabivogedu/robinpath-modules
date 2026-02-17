import type { ModuleAdapter } from "@wiredwp/robinpath";
import { EncodeFunctions, EncodeFunctionMetadata, EncodeModuleMetadata } from "./encode.js";
const EncodeModule: ModuleAdapter = { name: "encode", functions: EncodeFunctions, functionMetadata: EncodeFunctionMetadata as any, moduleMetadata: EncodeModuleMetadata as any, global: false };
export default EncodeModule;
export { EncodeModule };
export { EncodeFunctions, EncodeFunctionMetadata, EncodeModuleMetadata } from "./encode.js";
