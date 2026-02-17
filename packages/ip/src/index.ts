import type { ModuleAdapter } from "@wiredwp/robinpath";
import { IpFunctions, IpFunctionMetadata, IpModuleMetadata } from "./ip.js";

const IpModule: ModuleAdapter = {
  name: "ip",
  functions: IpFunctions,
  functionMetadata: IpFunctionMetadata as any,
  moduleMetadata: IpModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default IpModule;
export { IpModule };
export { IpFunctions, IpFunctionMetadata, IpModuleMetadata } from "./ip.js";
