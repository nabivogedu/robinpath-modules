import type { ModuleAdapter } from "@wiredwp/robinpath";
import { OpenaiFunctions, OpenaiFunctionMetadata, OpenaiModuleMetadata } from "./openai.js";

const OpenaiModule: ModuleAdapter = {
  name: "openai",
  functions: OpenaiFunctions,
  functionMetadata: OpenaiFunctionMetadata as any,
  moduleMetadata: OpenaiModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default OpenaiModule;
export { OpenaiModule };
export { OpenaiFunctions, OpenaiFunctionMetadata, OpenaiModuleMetadata } from "./openai.js";
