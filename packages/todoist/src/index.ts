import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TodoistFunctions, TodoistFunctionMetadata, TodoistModuleMetadata } from "./todoist.js";

const TodoistModule: ModuleAdapter = {
  name: "todoist",
  functions: TodoistFunctions,
  functionMetadata: TodoistFunctionMetadata as any,
  moduleMetadata: TodoistModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default TodoistModule;
export { TodoistModule };
export { TodoistFunctions, TodoistFunctionMetadata, TodoistModuleMetadata } from "./todoist.js";
