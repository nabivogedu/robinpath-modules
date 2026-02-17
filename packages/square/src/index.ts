import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SquareFunctions, SquareFunctionMetadata, SquareModuleMetadata } from "./square.js";

const SquareModule: ModuleAdapter = {
  name: "square",
  functions: SquareFunctions,
  functionMetadata: SquareFunctionMetadata as any,
  moduleMetadata: SquareModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default SquareModule;
export { SquareModule };
export { SquareFunctions, SquareFunctionMetadata, SquareModuleMetadata } from "./square.js";
