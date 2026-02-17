import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TypeformFunctions, TypeformFunctionMetadata, TypeformModuleMetadata } from "./typeform.js";

const TypeformModule: ModuleAdapter = {
  name: "typeform",
  functions: TypeformFunctions,
  functionMetadata: TypeformFunctionMetadata as any,
  moduleMetadata: TypeformModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default TypeformModule;
export { TypeformModule };
export { TypeformFunctions, TypeformFunctionMetadata, TypeformModuleMetadata } from "./typeform.js";
