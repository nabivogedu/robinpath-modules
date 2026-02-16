import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GraphqlFunctions, GraphqlFunctionMetadata, GraphqlModuleMetadata } from "./graphql.js";

const GraphqlModule: ModuleAdapter = {
  name: "graphql",
  functions: GraphqlFunctions,
  functionMetadata: GraphqlFunctionMetadata,
  moduleMetadata: GraphqlModuleMetadata,
  global: false,
};

export default GraphqlModule;
export { GraphqlModule };
export { GraphqlFunctions, GraphqlFunctionMetadata, GraphqlModuleMetadata } from "./graphql.js";
