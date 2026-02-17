import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SocketFunctions, SocketFunctionMetadata, SocketModuleMetadata } from "./socket.js";
const SocketModule: ModuleAdapter = { name: "socket", functions: SocketFunctions, functionMetadata: SocketFunctionMetadata as any, moduleMetadata: SocketModuleMetadata as any, global: false };
export default SocketModule;
export { SocketModule };
export { SocketFunctions, SocketFunctionMetadata, SocketModuleMetadata } from "./socket.js";
