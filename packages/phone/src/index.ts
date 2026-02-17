import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PhoneFunctions, PhoneFunctionMetadata, PhoneModuleMetadata } from "./phone.js";
const PhoneModule: ModuleAdapter = { name: "phone", functions: PhoneFunctions, functionMetadata: PhoneFunctionMetadata as any, moduleMetadata: PhoneModuleMetadata as any, global: false };
export default PhoneModule;
export { PhoneModule };
export { PhoneFunctions, PhoneFunctionMetadata, PhoneModuleMetadata } from "./phone.js";
