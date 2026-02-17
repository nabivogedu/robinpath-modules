import type { ModuleAdapter } from "@wiredwp/robinpath";
import { VercelFunctions, VercelFunctionMetadata, VercelModuleMetadata } from "./vercel.js";

const VercelModule: ModuleAdapter = {
  name: "vercel",
  functions: VercelFunctions,
  functionMetadata: VercelFunctionMetadata as any,
  moduleMetadata: VercelModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default VercelModule;
export { VercelModule };
export { VercelFunctions, VercelFunctionMetadata, VercelModuleMetadata } from "./vercel.js";
