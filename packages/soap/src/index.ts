import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SoapFunctions, SoapFunctionMetadata, SoapModuleMetadata } from "./soap.js";
const SoapModule: ModuleAdapter = { name: "soap", functions: SoapFunctions, functionMetadata: SoapFunctionMetadata as any, moduleMetadata: SoapModuleMetadata as any, global: false };
export default SoapModule;
export { SoapModule };
export { SoapFunctions, SoapFunctionMetadata, SoapModuleMetadata } from "./soap.js";
