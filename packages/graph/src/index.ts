import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GraphFunctions, GraphFunctionMetadata, GraphModuleMetadata } from "./graph.js";
const GraphModule: ModuleAdapter = { name: "graph", functions: GraphFunctions, functionMetadata: GraphFunctionMetadata, moduleMetadata: GraphModuleMetadata, global: false };
export default GraphModule;
export { GraphModule };
export { GraphFunctions, GraphFunctionMetadata, GraphModuleMetadata } from "./graph.js";
