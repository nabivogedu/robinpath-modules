import type { ModuleAdapter } from "@wiredwp/robinpath";
import { WorkflowFunctions, WorkflowFunctionMetadata, WorkflowModuleMetadata } from "./workflow.js";

const WorkflowModule: ModuleAdapter = {
  name: "workflow",
  functions: WorkflowFunctions,
  functionMetadata: WorkflowFunctionMetadata,
  moduleMetadata: WorkflowModuleMetadata,
  global: false,
};

export default WorkflowModule;
export { WorkflowModule };
export { WorkflowFunctions, WorkflowFunctionMetadata, WorkflowModuleMetadata } from "./workflow.js";
