import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GitFunctions, GitFunctionMetadata, GitModuleMetadata } from "./git.js";

const GitModule: ModuleAdapter = { name: "git", functions: GitFunctions, functionMetadata: GitFunctionMetadata, moduleMetadata: GitModuleMetadata, global: false };

export default GitModule;
export { GitModule };
export { GitFunctions, GitFunctionMetadata, GitModuleMetadata } from "./git.js";
