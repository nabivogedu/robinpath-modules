import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FtpFunctions, FtpFunctionMetadata, FtpModuleMetadata } from "./ftp.js";
const FtpModule: ModuleAdapter = { name: "ftp", functions: FtpFunctions, functionMetadata: FtpFunctionMetadata, moduleMetadata: FtpModuleMetadata, global: false };
export default FtpModule;
export { FtpModule };
export { FtpFunctions, FtpFunctionMetadata, FtpModuleMetadata } from "./ftp.js";
