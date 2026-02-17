import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TransformFunctions, TransformFunctionMetadata, TransformModuleMetadata } from "./transform.js";

const TransformModule: ModuleAdapter = {
  name: "transform",
  functions: TransformFunctions,
  functionMetadata: TransformFunctionMetadata as any,
  moduleMetadata: TransformModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default TransformModule;
export { TransformModule };
export { TransformFunctions, TransformFunctionMetadata, TransformModuleMetadata } from "./transform.js";
