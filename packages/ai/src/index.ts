import type { ModuleAdapter } from "@wiredwp/robinpath";
import { AiFunctions, AiFunctionMetadata, AiModuleMetadata } from "./ai.js";

const AiModule: ModuleAdapter = {
  name: "ai",
  functions: AiFunctions,
  functionMetadata: AiFunctionMetadata,
  moduleMetadata: AiModuleMetadata,
  global: false,
};

export default AiModule;
export { AiModule };
export { AiFunctions, AiFunctionMetadata, AiModuleMetadata } from "./ai.js";
