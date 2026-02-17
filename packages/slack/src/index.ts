import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SlackFunctions, SlackFunctionMetadata, SlackModuleMetadata } from "./slack.js";

const SlackModule: ModuleAdapter = {
  name: "slack",
  functions: SlackFunctions,
  functionMetadata: SlackFunctionMetadata as any,
  moduleMetadata: SlackModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default SlackModule;
export { SlackModule };
export { SlackFunctions, SlackFunctionMetadata, SlackModuleMetadata } from "./slack.js";
