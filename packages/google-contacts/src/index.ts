import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GoogleContactsFunctions, GoogleContactsFunctionMetadata, GoogleContactsModuleMetadata } from "./google-contacts.js";

const GoogleContactsModule: ModuleAdapter = {
  name: "google-contacts",
  functions: GoogleContactsFunctions,
  functionMetadata: GoogleContactsFunctionMetadata as any,
  moduleMetadata: GoogleContactsModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default GoogleContactsModule;
export { GoogleContactsModule };
export { GoogleContactsFunctions, GoogleContactsFunctionMetadata, GoogleContactsModuleMetadata } from "./google-contacts.js";
