import type { ModuleAdapter } from "@wiredwp/robinpath";
import { AssertFunctions, AssertFunctionMetadata, AssertModuleMetadata } from "./assert.js";

const AssertModule: ModuleAdapter = {
  name: "assert",
  functions: AssertFunctions,
  functionMetadata: AssertFunctionMetadata as any,
  moduleMetadata: AssertModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default AssertModule;
export { AssertModule };
export { AssertFunctions, AssertFunctionMetadata, AssertModuleMetadata } from "./assert.js";
