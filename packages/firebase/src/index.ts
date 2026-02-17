import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FirebaseFunctions, FirebaseFunctionMetadata, FirebaseModuleMetadata } from "./firebase.js";

const FirebaseModule: ModuleAdapter = {
  name: "firebase",
  functions: FirebaseFunctions,
  functionMetadata: FirebaseFunctionMetadata as any,
  moduleMetadata: FirebaseModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default FirebaseModule;
export { FirebaseModule };
export { FirebaseFunctions, FirebaseFunctionMetadata, FirebaseModuleMetadata } from "./firebase.js";
