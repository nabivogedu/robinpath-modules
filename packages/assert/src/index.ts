import type { ModuleAdapter } from "@wiredwp/robinpath";
import { AssertFunctions, AssertFunctionMetadata, AssertModuleMetadata } from "./assert.js";

const AssertModule: ModuleAdapter = {
  name: "assert",
  functions: AssertFunctions,
  functionMetadata: AssertFunctionMetadata,
  moduleMetadata: AssertModuleMetadata,
  global: false,
};

export default AssertModule;
export { AssertModule };
export { AssertFunctions, AssertFunctionMetadata, AssertModuleMetadata } from "./assert.js";
