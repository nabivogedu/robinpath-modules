import type { ModuleAdapter } from "@wiredwp/robinpath";
import { AnthropicFunctions, AnthropicFunctionMetadata, AnthropicModuleMetadata } from "./anthropic.js";

const AnthropicModule: ModuleAdapter = {
  name: "anthropic",
  functions: AnthropicFunctions,
  functionMetadata: AnthropicFunctionMetadata as any,
  moduleMetadata: AnthropicModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default AnthropicModule;
export { AnthropicModule };
export { AnthropicFunctions, AnthropicFunctionMetadata, AnthropicModuleMetadata } from "./anthropic.js";
