import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TwilioFunctions, TwilioFunctionMetadata, TwilioModuleMetadata } from "./twilio.js";

const TwilioModule: ModuleAdapter = {
  name: "twilio",
  functions: TwilioFunctions,
  functionMetadata: TwilioFunctionMetadata as any,
  moduleMetadata: TwilioModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default TwilioModule;
export { TwilioModule };
export { TwilioFunctions, TwilioFunctionMetadata, TwilioModuleMetadata } from "./twilio.js";
