import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SanitizeFunctions, SanitizeFunctionMetadata, SanitizeModuleMetadata } from "./sanitize.js";
const SanitizeModule: ModuleAdapter = { name: "sanitize", functions: SanitizeFunctions, functionMetadata: SanitizeFunctionMetadata, moduleMetadata: SanitizeModuleMetadata, global: false };
export default SanitizeModule;
export { SanitizeModule };
export { SanitizeFunctions, SanitizeFunctionMetadata, SanitizeModuleMetadata } from "./sanitize.js";
