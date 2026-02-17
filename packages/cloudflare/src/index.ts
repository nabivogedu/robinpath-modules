import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CloudflareFunctions, CloudflareFunctionMetadata, CloudflareModuleMetadata } from "./cloudflare.js";

const CloudflareModule: ModuleAdapter = {
  name: "cloudflare",
  functions: CloudflareFunctions,
  functionMetadata: CloudflareFunctionMetadata as any,
  moduleMetadata: CloudflareModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default CloudflareModule;
export { CloudflareModule };
export { CloudflareFunctions, CloudflareFunctionMetadata, CloudflareModuleMetadata } from "./cloudflare.js";
