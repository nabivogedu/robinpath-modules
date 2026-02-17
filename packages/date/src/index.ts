import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DateFunctions, DateFunctionMetadata, DateModuleMetadata } from "./date.js";

const DateModule: ModuleAdapter = {
  name: "date",
  functions: DateFunctions,
  functionMetadata: DateFunctionMetadata as any,
  moduleMetadata: DateModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default DateModule;
export { DateModule };
export { DateFunctions, DateFunctionMetadata, DateModuleMetadata } from "./date.js";
