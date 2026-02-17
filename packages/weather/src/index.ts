import type { ModuleAdapter } from "@wiredwp/robinpath";
import { WeatherFunctions, WeatherFunctionMetadata, WeatherModuleMetadata } from "./weather.js";

const WeatherModule: ModuleAdapter = {
  name: "weather",
  functions: WeatherFunctions,
  functionMetadata: WeatherFunctionMetadata as any,
  moduleMetadata: WeatherModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default WeatherModule;
export { WeatherModule };
export { WeatherFunctions, WeatherFunctionMetadata, WeatherModuleMetadata } from "./weather.js";
