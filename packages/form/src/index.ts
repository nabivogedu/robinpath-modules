import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FormFunctions, FormFunctionMetadata, FormModuleMetadata } from "./form.js";
const FormModule: ModuleAdapter = { name: "form", functions: FormFunctions, functionMetadata: FormFunctionMetadata as any, moduleMetadata: FormModuleMetadata as any, global: false };
export default FormModule;
export { FormModule };
export { FormFunctions, FormFunctionMetadata, FormModuleMetadata } from "./form.js";
