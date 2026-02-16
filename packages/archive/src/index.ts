import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ArchiveFunctions, ArchiveFunctionMetadata, ArchiveModuleMetadata } from "./archive.js";
const ArchiveModule: ModuleAdapter = { name: "archive", functions: ArchiveFunctions, functionMetadata: ArchiveFunctionMetadata, moduleMetadata: ArchiveModuleMetadata, global: false };
export default ArchiveModule;
export { ArchiveModule };
export { ArchiveFunctions, ArchiveFunctionMetadata, ArchiveModuleMetadata } from "./archive.js";
