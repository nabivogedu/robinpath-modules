import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GraphqlFunctions, GraphqlFunctionMetadata, GraphqlModuleMetadata } from "./graphql.js";

const GraphqlModule: ModuleAdapter = {
  name: "graphql",
  functions: GraphqlFunctions,
  functionMetadata: GraphqlFunctionMetadata as any,
  moduleMetadata: GraphqlModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default GraphqlModule;
export { GraphqlModule };
export { GraphqlFunctions, GraphqlFunctionMetadata, GraphqlModuleMetadata } from "./graphql.js";
