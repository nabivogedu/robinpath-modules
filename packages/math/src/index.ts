import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MathFunctions, MathFunctionMetadata, MathModuleMetadata } from "./math.js";

const MathModule: ModuleAdapter = {
  name: "math",
  functions: MathFunctions,
  functionMetadata: MathFunctionMetadata,
  moduleMetadata: MathModuleMetadata,
  global: false,
};

export default MathModule;
export { MathModule };
export { MathFunctions, MathFunctionMetadata, MathModuleMetadata } from "./math.js";
