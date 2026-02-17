import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SendgridFunctions, SendgridFunctionMetadata, SendgridModuleMetadata } from "./sendgrid.js";

const SendgridModule: ModuleAdapter = {
  name: "sendgrid",
  functions: SendgridFunctions,
  functionMetadata: SendgridFunctionMetadata as any,
  moduleMetadata: SendgridModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default SendgridModule;
export { SendgridModule };
export { SendgridFunctions, SendgridFunctionMetadata, SendgridModuleMetadata } from "./sendgrid.js";
