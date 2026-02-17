import type { ModuleAdapter } from "@wiredwp/robinpath";
import { EncryptFunctions, EncryptFunctionMetadata, EncryptModuleMetadata } from "./encrypt.js";

const EncryptModule: ModuleAdapter = {
  name: "encrypt",
  functions: EncryptFunctions,
  functionMetadata: EncryptFunctionMetadata as any,
  moduleMetadata: EncryptModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default EncryptModule;
export { EncryptModule };
export { EncryptFunctions, EncryptFunctionMetadata, EncryptModuleMetadata } from "./encrypt.js";
