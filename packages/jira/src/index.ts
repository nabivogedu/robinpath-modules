import type { ModuleAdapter } from "@wiredwp/robinpath";
import { JiraFunctions, JiraFunctionMetadata, JiraModuleMetadata } from "./jira.js";

const JiraModule: ModuleAdapter = {
  name: "jira",
  functions: JiraFunctions,
  functionMetadata: JiraFunctionMetadata as any,
  moduleMetadata: JiraModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default JiraModule;
export { JiraModule };
export { JiraFunctions, JiraFunctionMetadata, JiraModuleMetadata } from "./jira.js";
