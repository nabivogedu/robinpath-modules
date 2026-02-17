import type { ModuleAdapter } from "@wiredwp/robinpath";
import { HellosignFunctions, HellosignFunctionMetadata, HellosignModuleMetadata } from "./hellosign.js";

const HellosignModule: ModuleAdapter = {
  name: "hellosign",
  functions: HellosignFunctions,
  functionMetadata: HellosignFunctionMetadata as any,
  moduleMetadata: HellosignModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default HellosignModule;
export { HellosignModule };
export { HellosignFunctions, HellosignFunctionMetadata, HellosignModuleMetadata } from "./hellosign.js";
