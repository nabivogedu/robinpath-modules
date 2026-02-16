import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ValidateFunctions, ValidateFunctionMetadata, ValidateModuleMetadata } from "./validate.js";

const ValidateModule: ModuleAdapter = {
  name: "validate",
  functions: ValidateFunctions,
  functionMetadata: ValidateFunctionMetadata,
  moduleMetadata: ValidateModuleMetadata,
  global: false,
};

export default ValidateModule;
export { ValidateModule };
export { ValidateFunctions, ValidateFunctionMetadata, ValidateModuleMetadata } from "./validate.js";
