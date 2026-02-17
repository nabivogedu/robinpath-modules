import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ConfigFunctions, ConfigFunctionMetadata, ConfigModuleMetadata } from "./config.js";
const ConfigModule: ModuleAdapter = { name: "config", functions: ConfigFunctions, functionMetadata: ConfigFunctionMetadata as any, moduleMetadata: ConfigModuleMetadata as any, global: false };
export default ConfigModule;
export { ConfigModule };
export { ConfigFunctions, ConfigFunctionMetadata, ConfigModuleMetadata } from "./config.js";
