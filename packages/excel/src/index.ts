import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ExcelFunctions, ExcelFunctionMetadata, ExcelModuleMetadata } from "./excel.js";

const ExcelModule: ModuleAdapter = {
  name: "excel",
  functions: ExcelFunctions,
  functionMetadata: ExcelFunctionMetadata as any,
  moduleMetadata: ExcelModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ExcelModule;
export { ExcelModule };
export { ExcelFunctions, ExcelFunctionMetadata, ExcelModuleMetadata } from "./excel.js";
