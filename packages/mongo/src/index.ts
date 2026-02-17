import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MongoFunctions, MongoFunctionMetadata, MongoModuleMetadata } from "./mongo.js";
const MongoModule: ModuleAdapter = { name: "mongo", functions: MongoFunctions, functionMetadata: MongoFunctionMetadata as any, moduleMetadata: MongoModuleMetadata as any, global: false };
export default MongoModule;
export { MongoModule };
export { MongoFunctions, MongoFunctionMetadata, MongoModuleMetadata } from "./mongo.js";
