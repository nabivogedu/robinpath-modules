import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SanitizeFunctions, SanitizeFunctionMetadata, SanitizeModuleMetadata } from "./sanitize.js";
const SanitizeModule: ModuleAdapter = { name: "sanitize", functions: SanitizeFunctions, functionMetadata: SanitizeFunctionMetadata as any, moduleMetadata: SanitizeModuleMetadata as any, global: false };
export default SanitizeModule;
export { SanitizeModule };
export { SanitizeFunctions, SanitizeFunctionMetadata, SanitizeModuleMetadata } from "./sanitize.js";
