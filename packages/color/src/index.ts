import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ColorFunctions, ColorFunctionMetadata, ColorModuleMetadata } from "./color.js";

const ColorModule: ModuleAdapter = {
  name: "color",
  functions: ColorFunctions,
  functionMetadata: ColorFunctionMetadata as any,
  moduleMetadata: ColorModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ColorModule;
export { ColorModule };
export { ColorFunctions, ColorFunctionMetadata, ColorModuleMetadata } from "./color.js";
