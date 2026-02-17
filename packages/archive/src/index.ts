import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ArchiveFunctions, ArchiveFunctionMetadata, ArchiveModuleMetadata } from "./archive.js";
const ArchiveModule: ModuleAdapter = { name: "archive", functions: ArchiveFunctions, functionMetadata: ArchiveFunctionMetadata as any, moduleMetadata: ArchiveModuleMetadata as any, global: false };
export default ArchiveModule;
export { ArchiveModule };
export { ArchiveFunctions, ArchiveFunctionMetadata, ArchiveModuleMetadata } from "./archive.js";
