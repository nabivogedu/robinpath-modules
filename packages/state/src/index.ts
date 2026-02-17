import type { ModuleAdapter } from "@wiredwp/robinpath";
import { StateFunctions, StateFunctionMetadata, StateModuleMetadata } from "./state.js";
const StateModule: ModuleAdapter = { name: "state", functions: StateFunctions, functionMetadata: StateFunctionMetadata as any, moduleMetadata: StateModuleMetadata as any, global: false };
export default StateModule;
export { StateModule };
export { StateFunctions, StateFunctionMetadata, StateModuleMetadata } from "./state.js";
