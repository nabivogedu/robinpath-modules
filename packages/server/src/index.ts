import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ServerFunctions, ServerFunctionMetadata, ServerModuleMetadata } from "./server.js";

const ServerModule: ModuleAdapter = { name: "server", functions: ServerFunctions, functionMetadata: ServerFunctionMetadata, moduleMetadata: ServerModuleMetadata, global: false };

export default ServerModule;
export { ServerModule };
export { ServerFunctions, ServerFunctionMetadata, ServerModuleMetadata } from "./server.js";
