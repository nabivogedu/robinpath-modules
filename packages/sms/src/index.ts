import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SmsFunctions, SmsFunctionMetadata, SmsModuleMetadata } from "./sms.js";
const SmsModule: ModuleAdapter = { name: "sms", functions: SmsFunctions, functionMetadata: SmsFunctionMetadata, moduleMetadata: SmsModuleMetadata, global: false };
export default SmsModule;
export { SmsModule };
export { SmsFunctions, SmsFunctionMetadata, SmsModuleMetadata } from "./sms.js";
