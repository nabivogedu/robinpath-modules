import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PaginationFunctions, PaginationFunctionMetadata, PaginationModuleMetadata } from "./pagination.js";
const PaginationModule: ModuleAdapter = { name: "pagination", functions: PaginationFunctions, functionMetadata: PaginationFunctionMetadata as any, moduleMetadata: PaginationModuleMetadata as any, global: false };
export default PaginationModule;
export { PaginationModule };
export { PaginationFunctions, PaginationFunctionMetadata, PaginationModuleMetadata } from "./pagination.js";
