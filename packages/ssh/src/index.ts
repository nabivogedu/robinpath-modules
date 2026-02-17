import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SshFunctions, SshFunctionMetadata, SshModuleMetadata } from "./ssh.js";
const SshModule: ModuleAdapter = { name: "ssh", functions: SshFunctions, functionMetadata: SshFunctionMetadata as any, moduleMetadata: SshModuleMetadata as any, global: false };
export default SshModule;
export { SshModule };
export { SshFunctions, SshFunctionMetadata, SshModuleMetadata } from "./ssh.js";
