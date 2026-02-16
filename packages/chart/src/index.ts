import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ChartFunctions, ChartFunctionMetadata, ChartModuleMetadata } from "./chart.js";

const ChartModule: ModuleAdapter = {
  name: "chart",
  functions: ChartFunctions,
  functionMetadata: ChartFunctionMetadata,
  moduleMetadata: ChartModuleMetadata,
  global: false,
};

export default ChartModule;
export { ChartModule };
export { ChartFunctions, ChartFunctionMetadata, ChartModuleMetadata } from "./chart.js";
