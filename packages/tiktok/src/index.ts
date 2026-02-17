import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TiktokFunctions, TiktokFunctionMetadata, TiktokModuleMetadata } from "./tiktok.js";

const TiktokModule: ModuleAdapter = {
  name: "tiktok",
  functions: TiktokFunctions,
  functionMetadata: TiktokFunctionMetadata as any,
  moduleMetadata: TiktokModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default TiktokModule;
export { TiktokModule };
export { TiktokFunctions, TiktokFunctionMetadata, TiktokModuleMetadata } from "./tiktok.js";
