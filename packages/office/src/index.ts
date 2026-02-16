import type { ModuleAdapter } from "@wiredwp/robinpath";
import { OfficeFunctions, OfficeFunctionMetadata, OfficeModuleMetadata } from "./office.js";

const OfficeModule: ModuleAdapter = {
  name: "office",
  functions: OfficeFunctions,
  functionMetadata: OfficeFunctionMetadata,
  moduleMetadata: OfficeModuleMetadata,
  global: false,
};

export default OfficeModule;
export { OfficeModule };
export { OfficeFunctions, OfficeFunctionMetadata, OfficeModuleMetadata } from "./office.js";
