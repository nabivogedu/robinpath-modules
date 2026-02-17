import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FtpFunctions, FtpFunctionMetadata, FtpModuleMetadata } from "./ftp.js";
const FtpModule: ModuleAdapter = { name: "ftp", functions: FtpFunctions, functionMetadata: FtpFunctionMetadata as any, moduleMetadata: FtpModuleMetadata as any, global: false };
export default FtpModule;
export { FtpModule };
export { FtpFunctions, FtpFunctionMetadata, FtpModuleMetadata } from "./ftp.js";
