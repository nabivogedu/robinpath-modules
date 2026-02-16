import type { ModuleAdapter } from "@wiredwp/robinpath";
import { AgentFunctions, AgentFunctionMetadata, AgentModuleMetadata } from "./agent.js";

const AgentModule: ModuleAdapter = {
  name: "agent",
  functions: AgentFunctions,
  functionMetadata: AgentFunctionMetadata,
  moduleMetadata: AgentModuleMetadata,
  global: false,
};

export default AgentModule;
export { AgentModule };
export { AgentFunctions, AgentFunctionMetadata, AgentModuleMetadata } from "./agent.js";
