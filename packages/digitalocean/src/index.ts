import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DigitaloceanFunctions, DigitaloceanFunctionMetadata, DigitaloceanModuleMetadata } from "./digitalocean.js";

const DigitaloceanModule: ModuleAdapter = {
  name: "digitalocean",
  functions: DigitaloceanFunctions,
  functionMetadata: DigitaloceanFunctionMetadata as any,
  moduleMetadata: DigitaloceanModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default DigitaloceanModule;
export { DigitaloceanModule };
export { DigitaloceanFunctions, DigitaloceanFunctionMetadata, DigitaloceanModuleMetadata } from "./digitalocean.js";
