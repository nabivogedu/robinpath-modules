import type { ModuleAdapter } from "@wiredwp/robinpath";
import { OauthFunctions, OauthFunctionMetadata, OauthModuleMetadata } from "./oauth.js";

const OauthModule: ModuleAdapter = {
  name: "oauth",
  functions: OauthFunctions,
  functionMetadata: OauthFunctionMetadata,
  moduleMetadata: OauthModuleMetadata,
  global: false,
};

export default OauthModule;
export { OauthModule };
export { OauthFunctions, OauthFunctionMetadata, OauthModuleMetadata } from "./oauth.js";
