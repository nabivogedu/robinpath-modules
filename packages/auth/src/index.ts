import type { ModuleAdapter } from "@wiredwp/robinpath";
import { AuthFunctions, AuthFunctionMetadata, AuthModuleMetadata } from "./auth.js";

const AuthModule: ModuleAdapter = {
  name: "auth",
  functions: AuthFunctions,
  functionMetadata: AuthFunctionMetadata as any,
  moduleMetadata: AuthModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default AuthModule;
export { AuthModule };
export { AuthFunctions, AuthFunctionMetadata, AuthModuleMetadata } from "./auth.js";
