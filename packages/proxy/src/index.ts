import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ProxyFunctions, ProxyFunctionMetadata, ProxyModuleMetadata } from "./proxy.js";

const ProxyModule: ModuleAdapter = { name: "proxy", functions: ProxyFunctions, functionMetadata: ProxyFunctionMetadata, moduleMetadata: ProxyModuleMetadata, global: false };

export default ProxyModule;
export { ProxyModule };
export { ProxyFunctions, ProxyFunctionMetadata, ProxyModuleMetadata } from "./proxy.js";
