import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PostgresFunctions, PostgresFunctionMetadata, PostgresModuleMetadata } from "./postgres.js";
const PostgresModule: ModuleAdapter = { name: "postgres", functions: PostgresFunctions, functionMetadata: PostgresFunctionMetadata as any, moduleMetadata: PostgresModuleMetadata as any, global: false };
export default PostgresModule;
export { PostgresModule };
export { PostgresFunctions, PostgresFunctionMetadata, PostgresModuleMetadata } from "./postgres.js";
