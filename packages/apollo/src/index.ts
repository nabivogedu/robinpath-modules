import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ApolloFunctions, ApolloFunctionMetadata, ApolloModuleMetadata } from "./apollo.js";

const ApolloModule: ModuleAdapter = {
  name: "apollo",
  functions: ApolloFunctions,
  functionMetadata: ApolloFunctionMetadata as any,
  moduleMetadata: ApolloModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ApolloModule;
export { ApolloModule };
export { ApolloFunctions, ApolloFunctionMetadata, ApolloModuleMetadata } from "./apollo.js";
