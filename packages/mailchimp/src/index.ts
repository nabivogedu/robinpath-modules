import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MailchimpFunctions, MailchimpFunctionMetadata, MailchimpModuleMetadata } from "./mailchimp.js";

const MailchimpModule: ModuleAdapter = {
  name: "mailchimp",
  functions: MailchimpFunctions,
  functionMetadata: MailchimpFunctionMetadata as any,
  moduleMetadata: MailchimpModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default MailchimpModule;
export { MailchimpModule };
export { MailchimpFunctions, MailchimpFunctionMetadata, MailchimpModuleMetadata } from "./mailchimp.js";
