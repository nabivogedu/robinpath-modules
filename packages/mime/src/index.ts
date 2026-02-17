import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MimeFunctions, MimeFunctionMetadata, MimeModuleMetadata } from "./mime.js";
const MimeModule: ModuleAdapter = { name: "mime", functions: MimeFunctions, functionMetadata: MimeFunctionMetadata as any, moduleMetadata: MimeModuleMetadata as any, global: false };
export default MimeModule;
export { MimeModule };
export { MimeFunctions, MimeFunctionMetadata, MimeModuleMetadata } from "./mime.js";
