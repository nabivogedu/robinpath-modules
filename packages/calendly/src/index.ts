import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CalendlyFunctions, CalendlyFunctionMetadata, CalendlyModuleMetadata } from "./calendly.js";

const CalendlyModule: ModuleAdapter = {
  name: "calendly",
  functions: CalendlyFunctions,
  functionMetadata: CalendlyFunctionMetadata as any,
  moduleMetadata: CalendlyModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default CalendlyModule;
export { CalendlyModule };
export { CalendlyFunctions, CalendlyFunctionMetadata, CalendlyModuleMetadata } from "./calendly.js";
