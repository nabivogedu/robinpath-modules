import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GitlabFunctions, GitlabFunctionMetadata, GitlabModuleMetadata } from "./gitlab.js";

const GitlabModule: ModuleAdapter = {
  name: "gitlab",
  functions: GitlabFunctions,
  functionMetadata: GitlabFunctionMetadata as any,
  moduleMetadata: GitlabModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default GitlabModule;
export { GitlabModule };
export { GitlabFunctions, GitlabFunctionMetadata, GitlabModuleMetadata } from "./gitlab.js";
