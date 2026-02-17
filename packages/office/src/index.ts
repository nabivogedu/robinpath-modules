import type { ModuleAdapter } from "@wiredwp/robinpath";
import { OfficeFunctions, OfficeFunctionMetadata, OfficeModuleMetadata } from "./office.js";

const OfficeModule: ModuleAdapter = {
  name: "office",
  functions: OfficeFunctions,
  functionMetadata: OfficeFunctionMetadata as any,
  moduleMetadata: OfficeModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default OfficeModule;
export { OfficeModule };
export { OfficeFunctions, OfficeFunctionMetadata, OfficeModuleMetadata } from "./office.js";
