import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GithubFunctions, GithubFunctionMetadata, GithubModuleMetadata } from "./github.js";

const GithubModule: ModuleAdapter = {
  name: "github",
  functions: GithubFunctions,
  functionMetadata: GithubFunctionMetadata as any,
  moduleMetadata: GithubModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default GithubModule;
export { GithubModule };
export { GithubFunctions, GithubFunctionMetadata, GithubModuleMetadata } from "./github.js";
