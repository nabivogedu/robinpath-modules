import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TransformFunctions, TransformFunctionMetadata, TransformModuleMetadata } from "./transform.js";

const TransformModule: ModuleAdapter = {
  name: "transform",
  functions: TransformFunctions,
  functionMetadata: TransformFunctionMetadata,
  moduleMetadata: TransformModuleMetadata,
  global: false,
};

export default TransformModule;
export { TransformModule };
export { TransformFunctions, TransformFunctionMetadata, TransformModuleMetadata } from "./transform.js";
