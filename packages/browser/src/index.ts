import type { ModuleAdapter } from "@wiredwp/robinpath";
import { BrowserFunctions, BrowserFunctionMetadata, BrowserModuleMetadata } from "./browser.js";
const BrowserModule: ModuleAdapter = { name: "browser", functions: BrowserFunctions, functionMetadata: BrowserFunctionMetadata, moduleMetadata: BrowserModuleMetadata, global: false };
export default BrowserModule;
export { BrowserModule };
export { BrowserFunctions, BrowserFunctionMetadata, BrowserModuleMetadata } from "./browser.js";
