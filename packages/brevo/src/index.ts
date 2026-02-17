import type { ModuleAdapter } from "@wiredwp/robinpath";
import { BrevoFunctions, BrevoFunctionMetadata, BrevoModuleMetadata } from "./brevo.js";

const BrevoModule: ModuleAdapter = {
  name: "brevo",
  functions: BrevoFunctions,
  functionMetadata: BrevoFunctionMetadata as any,
  moduleMetadata: BrevoModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default BrevoModule;
export { BrevoModule };
export { BrevoFunctions, BrevoFunctionMetadata, BrevoModuleMetadata } from "./brevo.js";
