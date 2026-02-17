import type { ModuleAdapter } from "@wiredwp/robinpath";
import { EmailFunctions, EmailFunctionMetadata, EmailModuleMetadata } from "./email.js";

const EmailModule: ModuleAdapter = {
  name: "email",
  functions: EmailFunctions,
  functionMetadata: EmailFunctionMetadata as any,
  moduleMetadata: EmailModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default EmailModule;
export { EmailModule };
export { EmailFunctions, EmailFunctionMetadata, EmailModuleMetadata } from "./email.js";
