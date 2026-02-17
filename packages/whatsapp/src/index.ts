import type { ModuleAdapter } from "@wiredwp/robinpath";
import { WhatsappFunctions, WhatsappFunctionMetadata, WhatsappModuleMetadata } from "./whatsapp.js";

const WhatsappModule: ModuleAdapter = {
  name: "whatsapp",
  functions: WhatsappFunctions,
  functionMetadata: WhatsappFunctionMetadata as any,
  moduleMetadata: WhatsappModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default WhatsappModule;
export { WhatsappModule };
export { WhatsappFunctions, WhatsappFunctionMetadata, WhatsappModuleMetadata } from "./whatsapp.js";
