import type { ModuleAdapter } from "@wiredwp/robinpath";
import { BrowserFunctions, BrowserFunctionMetadata, BrowserModuleMetadata } from "./browser.js";
const BrowserModule: ModuleAdapter = { name: "browser", functions: BrowserFunctions, functionMetadata: BrowserFunctionMetadata as any, moduleMetadata: BrowserModuleMetadata as any, global: false };
export default BrowserModule;
export { BrowserModule };
export { BrowserFunctions, BrowserFunctionMetadata, BrowserModuleMetadata } from "./browser.js";
