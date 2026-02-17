import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GraphFunctions, GraphFunctionMetadata, GraphModuleMetadata } from "./graph.js";
const GraphModule: ModuleAdapter = { name: "graph", functions: GraphFunctions, functionMetadata: GraphFunctionMetadata as any, moduleMetadata: GraphModuleMetadata as any, global: false };
export default GraphModule;
export { GraphModule };
export { GraphFunctions, GraphFunctionMetadata, GraphModuleMetadata } from "./graph.js";
