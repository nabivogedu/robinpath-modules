import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MysqlFunctions, MysqlFunctionMetadata, MysqlModuleMetadata } from "./mysql.js";
const MysqlModule: ModuleAdapter = { name: "mysql", functions: MysqlFunctions, functionMetadata: MysqlFunctionMetadata, moduleMetadata: MysqlModuleMetadata, global: false };
export default MysqlModule;
export { MysqlModule };
export { MysqlFunctions, MysqlFunctionMetadata, MysqlModuleMetadata } from "./mysql.js";
