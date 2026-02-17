import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CsvFunctions, CsvFunctionMetadata, CsvModuleMetadata } from "./csv.js";

const CsvModule: ModuleAdapter = {
  name: "csv",
  functions: CsvFunctions,
  functionMetadata: CsvFunctionMetadata as any,
  moduleMetadata: CsvModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default CsvModule;
export { CsvModule };
export { CsvFunctions, CsvFunctionMetadata, CsvModuleMetadata } from "./csv.js";
