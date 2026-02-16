import type { ModuleAdapter } from "@wiredwp/robinpath";
import { AuthFunctions, AuthFunctionMetadata, AuthModuleMetadata } from "./auth.js";

const AuthModule: ModuleAdapter = {
  name: "auth",
  functions: AuthFunctions,
  functionMetadata: AuthFunctionMetadata,
  moduleMetadata: AuthModuleMetadata,
  global: false,
};

export default AuthModule;
export { AuthModule };
export { AuthFunctions, AuthFunctionMetadata, AuthModuleMetadata } from "./auth.js";
