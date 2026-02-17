import type { ModuleAdapter } from "@wiredwp/robinpath";
import { JwtFunctions, JwtFunctionMetadata, JwtModuleMetadata } from "./jwt.js";

const JwtModule: ModuleAdapter = {
  name: "jwt",
  functions: JwtFunctions,
  functionMetadata: JwtFunctionMetadata as any,
  moduleMetadata: JwtModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default JwtModule;
export { JwtModule };
export { JwtFunctions, JwtFunctionMetadata, JwtModuleMetadata } from "./jwt.js";
