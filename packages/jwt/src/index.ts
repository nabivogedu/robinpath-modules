import type { ModuleAdapter } from "@wiredwp/robinpath";
import { JwtFunctions, JwtFunctionMetadata, JwtModuleMetadata } from "./jwt.js";

const JwtModule: ModuleAdapter = {
  name: "jwt",
  functions: JwtFunctions,
  functionMetadata: JwtFunctionMetadata,
  moduleMetadata: JwtModuleMetadata,
  global: false,
};

export default JwtModule;
export { JwtModule };
export { JwtFunctions, JwtFunctionMetadata, JwtModuleMetadata } from "./jwt.js";
