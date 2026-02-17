import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TwitterFunctions, TwitterFunctionMetadata, TwitterModuleMetadata } from "./twitter.js";

const TwitterModule: ModuleAdapter = {
  name: "twitter",
  functions: TwitterFunctions,
  functionMetadata: TwitterFunctionMetadata as any,
  moduleMetadata: TwitterModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default TwitterModule;
export { TwitterModule };
export { TwitterFunctions, TwitterFunctionMetadata, TwitterModuleMetadata } from "./twitter.js";
