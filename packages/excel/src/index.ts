import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ExcelFunctions, ExcelFunctionMetadata, ExcelModuleMetadata } from "./excel.js";

const ExcelModule: ModuleAdapter = {
  name: "excel",
  functions: ExcelFunctions,
  functionMetadata: ExcelFunctionMetadata,
  moduleMetadata: ExcelModuleMetadata,
  global: false,
};

export default ExcelModule;
export { ExcelModule };
export { ExcelFunctions, ExcelFunctionMetadata, ExcelModuleMetadata } from "./excel.js";
