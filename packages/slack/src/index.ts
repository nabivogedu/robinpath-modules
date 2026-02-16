import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SlackFunctions, SlackFunctionMetadata, SlackModuleMetadata } from "./slack.js";

const SlackModule: ModuleAdapter = {
  name: "slack",
  functions: SlackFunctions,
  functionMetadata: SlackFunctionMetadata,
  moduleMetadata: SlackModuleMetadata,
  global: false,
};

export default SlackModule;
export { SlackModule };
export { SlackFunctions, SlackFunctionMetadata, SlackModuleMetadata } from "./slack.js";
