import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MathFunctions, MathFunctionMetadata, MathModuleMetadata } from "./math.js";

const MathModule: ModuleAdapter = {
  name: "math",
  functions: MathFunctions,
  functionMetadata: MathFunctionMetadata as any,
  moduleMetadata: MathModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default MathModule;
export { MathModule };
export { MathFunctions, MathFunctionMetadata, MathModuleMetadata } from "./math.js";
