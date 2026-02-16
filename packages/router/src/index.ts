import type { ModuleAdapter } from "@wiredwp/robinpath";
import { RouterFunctions, RouterFunctionMetadata, RouterModuleMetadata } from "./router.js";

const RouterModule: ModuleAdapter = { name: "router", functions: RouterFunctions, functionMetadata: RouterFunctionMetadata, moduleMetadata: RouterModuleMetadata, global: false };

export default RouterModule;
export { RouterModule };
export { RouterFunctions, RouterFunctionMetadata, RouterModuleMetadata } from "./router.js";
