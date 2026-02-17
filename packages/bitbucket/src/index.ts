import type { ModuleAdapter } from "@wiredwp/robinpath";
import { BitbucketFunctions, BitbucketFunctionMetadata, BitbucketModuleMetadata } from "./bitbucket.js";

const BitbucketModule: ModuleAdapter = {
  name: "bitbucket",
  functions: BitbucketFunctions,
  functionMetadata: BitbucketFunctionMetadata as any,
  moduleMetadata: BitbucketModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default BitbucketModule;
export { BitbucketModule };
export { BitbucketFunctions, BitbucketFunctionMetadata, BitbucketModuleMetadata } from "./bitbucket.js";
