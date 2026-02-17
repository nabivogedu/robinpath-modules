import type { ModuleAdapter } from "@wiredwp/robinpath";
import { WorkflowFunctions, WorkflowFunctionMetadata, WorkflowModuleMetadata } from "./workflow.js";

const WorkflowModule: ModuleAdapter = {
  name: "workflow",
  functions: WorkflowFunctions,
  functionMetadata: WorkflowFunctionMetadata as any,
  moduleMetadata: WorkflowModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default WorkflowModule;
export { WorkflowModule };
export { WorkflowFunctions, WorkflowFunctionMetadata, WorkflowModuleMetadata } from "./workflow.js";
