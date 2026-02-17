import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ChartFunctions, ChartFunctionMetadata, ChartModuleMetadata } from "./chart.js";

const ChartModule: ModuleAdapter = {
  name: "chart",
  functions: ChartFunctions,
  functionMetadata: ChartFunctionMetadata as any,
  moduleMetadata: ChartModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ChartModule;
export { ChartModule };
export { ChartFunctions, ChartFunctionMetadata, ChartModuleMetadata } from "./chart.js";
