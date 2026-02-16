import type { ModuleAdapter } from "@wiredwp/robinpath";
import { WebhookFunctions, WebhookFunctionMetadata, WebhookModuleMetadata } from "./webhook.js";

const WebhookModule: ModuleAdapter = {
  name: "webhook",
  functions: WebhookFunctions,
  functionMetadata: WebhookFunctionMetadata,
  moduleMetadata: WebhookModuleMetadata,
  global: false,
};

export default WebhookModule;
export { WebhookModule };
export { WebhookFunctions, WebhookFunctionMetadata, WebhookModuleMetadata } from "./webhook.js";
