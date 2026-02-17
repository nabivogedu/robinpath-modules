import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ValidateFunctions, ValidateFunctionMetadata, ValidateModuleMetadata } from "./validate.js";

const ValidateModule: ModuleAdapter = {
  name: "validate",
  functions: ValidateFunctions,
  functionMetadata: ValidateFunctionMetadata as any,
  moduleMetadata: ValidateModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ValidateModule;
export { ValidateModule };
export { ValidateFunctions, ValidateFunctionMetadata, ValidateModuleMetadata } from "./validate.js";
