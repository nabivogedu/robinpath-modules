import type { ModuleAdapter } from "@wiredwp/robinpath";
import { PaginationFunctions, PaginationFunctionMetadata, PaginationModuleMetadata } from "./pagination.js";
const PaginationModule: ModuleAdapter = { name: "pagination", functions: PaginationFunctions, functionMetadata: PaginationFunctionMetadata, moduleMetadata: PaginationModuleMetadata, global: false };
export default PaginationModule;
export { PaginationModule };
export { PaginationFunctions, PaginationFunctionMetadata, PaginationModuleMetadata } from "./pagination.js";
