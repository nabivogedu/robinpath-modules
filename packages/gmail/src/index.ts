import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GmailFunctions, GmailFunctionMetadata, GmailModuleMetadata } from "./gmail.js";

const GmailModule: ModuleAdapter = {
  name: "gmail",
  functions: GmailFunctions,
  functionMetadata: GmailFunctionMetadata as any,
  moduleMetadata: GmailModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default GmailModule;
export { GmailModule };
export { GmailFunctions, GmailFunctionMetadata, GmailModuleMetadata } from "./gmail.js";
