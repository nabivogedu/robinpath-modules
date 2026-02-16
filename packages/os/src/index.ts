import type { ModuleAdapter } from "@wiredwp/robinpath";
import { OsFunctions, OsFunctionMetadata, OsModuleMetadata } from "./os.js";

const OsModule: ModuleAdapter = {
  name: "os",
  functions: OsFunctions,
  functionMetadata: OsFunctionMetadata,
  moduleMetadata: OsModuleMetadata,
  global: false,
};

export default OsModule;
export { OsModule };
export { OsFunctions, OsFunctionMetadata, OsModuleMetadata } from "./os.js";
