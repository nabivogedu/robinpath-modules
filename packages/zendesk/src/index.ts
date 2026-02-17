import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ZendeskFunctions, ZendeskFunctionMetadata, ZendeskModuleMetadata } from "./zendesk.js";

const ZendeskModule: ModuleAdapter = {
  name: "zendesk",
  functions: ZendeskFunctions,
  functionMetadata: ZendeskFunctionMetadata as any,
  moduleMetadata: ZendeskModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ZendeskModule;
export { ZendeskModule };
export { ZendeskFunctions, ZendeskFunctionMetadata, ZendeskModuleMetadata } from "./zendesk.js";
