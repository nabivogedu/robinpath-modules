import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PhoneFunctions, PhoneFunctionMetadata, PhoneModuleMetadata } from "./phone.js";
const PhoneModule: ModuleAdapter = { name: "phone", functions: PhoneFunctions, functionMetadata: PhoneFunctionMetadata, moduleMetadata: PhoneModuleMetadata, global: false };
export default PhoneModule;
export { PhoneModule };
export { PhoneFunctions, PhoneFunctionMetadata, PhoneModuleMetadata } from "./phone.js";
