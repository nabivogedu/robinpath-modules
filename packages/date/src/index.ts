import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DateFunctions, DateFunctionMetadata, DateModuleMetadata } from "./date.js";

const DateModule: ModuleAdapter = {
  name: "date",
  functions: DateFunctions,
  functionMetadata: DateFunctionMetadata,
  moduleMetadata: DateModuleMetadata,
  global: false,
};

export default DateModule;
export { DateModule };
export { DateFunctions, DateFunctionMetadata, DateModuleMetadata } from "./date.js";
