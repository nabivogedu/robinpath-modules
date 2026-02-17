import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GoogleFormsFunctions, GoogleFormsFunctionMetadata, GoogleFormsModuleMetadata } from "./google-forms.js";

const GoogleFormsModule: ModuleAdapter = {
  name: "google-forms",
  functions: GoogleFormsFunctions,
  functionMetadata: GoogleFormsFunctionMetadata as any,
  moduleMetadata: GoogleFormsModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default GoogleFormsModule;
export { GoogleFormsModule };
export { GoogleFormsFunctions, GoogleFormsFunctionMetadata, GoogleFormsModuleMetadata } from "./google-forms.js";
