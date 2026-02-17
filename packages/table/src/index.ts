import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TableFunctions, TableFunctionMetadata, TableModuleMetadata } from "./table.js";
const TableModule: ModuleAdapter = { name: "table", functions: TableFunctions, functionMetadata: TableFunctionMetadata as any, moduleMetadata: TableModuleMetadata as any, global: false };
export default TableModule;
export { TableModule };
export { TableFunctions, TableFunctionMetadata, TableModuleMetadata } from "./table.js";
