import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ColorFunctions, ColorFunctionMetadata, ColorModuleMetadata } from "./color.js";

const ColorModule: ModuleAdapter = {
  name: "color",
  functions: ColorFunctions,
  functionMetadata: ColorFunctionMetadata,
  moduleMetadata: ColorModuleMetadata,
  global: false,
};

export default ColorModule;
export { ColorModule };
export { ColorFunctions, ColorFunctionMetadata, ColorModuleMetadata } from "./color.js";
