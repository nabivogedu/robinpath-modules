import type { ModuleAdapter } from "@wiredwp/robinpath";
import { WebhookFunctions, WebhookFunctionMetadata, WebhookModuleMetadata } from "./webhook.js";

const WebhookModule: ModuleAdapter = {
  name: "webhook",
  functions: WebhookFunctions,
  functionMetadata: WebhookFunctionMetadata as any,
  moduleMetadata: WebhookModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default WebhookModule;
export { WebhookModule };
export { WebhookFunctions, WebhookFunctionMetadata, WebhookModuleMetadata } from "./webhook.js";
