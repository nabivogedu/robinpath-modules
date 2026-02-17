import type { ModuleAdapter } from "@wiredwp/robinpath";
import { AiFunctions, AiFunctionMetadata, AiModuleMetadata } from "./ai.js";

const AiModule: ModuleAdapter = {
  name: "ai",
  functions: AiFunctions,
  functionMetadata: AiFunctionMetadata as any,
  moduleMetadata: AiModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default AiModule;
export { AiModule };
export { AiFunctions, AiFunctionMetadata, AiModuleMetadata } from "./ai.js";
