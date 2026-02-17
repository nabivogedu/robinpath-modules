import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FacebookFunctions, FacebookFunctionMetadata, FacebookModuleMetadata } from "./facebook.js";

const FacebookModule: ModuleAdapter = {
  name: "facebook",
  functions: FacebookFunctions,
  functionMetadata: FacebookFunctionMetadata as any,
  moduleMetadata: FacebookModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default FacebookModule;
export { FacebookModule };
export { FacebookFunctions, FacebookFunctionMetadata, FacebookModuleMetadata } from "./facebook.js";
