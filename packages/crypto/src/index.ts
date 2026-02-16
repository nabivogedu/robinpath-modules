import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CryptoFunctions, CryptoFunctionMetadata, CryptoModuleMetadata } from "./crypto.js";

const CryptoModule: ModuleAdapter = {
  name: "crypto",
  functions: CryptoFunctions,
  functionMetadata: CryptoFunctionMetadata,
  moduleMetadata: CryptoModuleMetadata,
  global: false,
};

export default CryptoModule;
export { CryptoModule };
export { CryptoFunctions, CryptoFunctionMetadata, CryptoModuleMetadata } from "./crypto.js";
