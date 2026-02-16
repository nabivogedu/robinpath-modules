import type { ModuleAdapter } from "@wiredwp/robinpath";
import { RatelimitFunctions, RatelimitFunctionMetadata, RatelimitModuleMetadata } from "./ratelimit.js";

const RatelimitModule: ModuleAdapter = {
  name: "ratelimit",
  functions: RatelimitFunctions,
  functionMetadata: RatelimitFunctionMetadata,
  moduleMetadata: RatelimitModuleMetadata,
  global: false,
};

export default RatelimitModule;
export { RatelimitModule };
export { RatelimitFunctions, RatelimitFunctionMetadata, RatelimitModuleMetadata } from "./ratelimit.js";
