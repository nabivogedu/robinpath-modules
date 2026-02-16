import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CookieFunctions, CookieFunctionMetadata, CookieModuleMetadata } from "./cookie.js";
const CookieModule: ModuleAdapter = { name: "cookie", functions: CookieFunctions, functionMetadata: CookieFunctionMetadata, moduleMetadata: CookieModuleMetadata, global: false };
export default CookieModule;
export { CookieModule };
export { CookieFunctions, CookieFunctionMetadata, CookieModuleMetadata } from "./cookie.js";
