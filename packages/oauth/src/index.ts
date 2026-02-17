import type { ModuleAdapter } from "@wiredwp/robinpath";
import { OauthFunctions, OauthFunctionMetadata, OauthModuleMetadata } from "./oauth.js";

const OauthModule: ModuleAdapter = {
  name: "oauth",
  functions: OauthFunctions,
  functionMetadata: OauthFunctionMetadata as any,
  moduleMetadata: OauthModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default OauthModule;
export { OauthModule };
export { OauthFunctions, OauthFunctionMetadata, OauthModuleMetadata } from "./oauth.js";
