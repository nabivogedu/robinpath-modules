import type { ModuleAdapter } from "@wiredwp/robinpath";
import { JotformFunctions, JotformFunctionMetadata, JotformModuleMetadata } from "./jotform.js";

const JotformModule: ModuleAdapter = {
  name: "jotform",
  functions: JotformFunctions,
  functionMetadata: JotformFunctionMetadata as any,
  moduleMetadata: JotformModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default JotformModule;
export { JotformModule };
export { JotformFunctions, JotformFunctionMetadata, JotformModuleMetadata } from "./jotform.js";
