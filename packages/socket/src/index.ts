import type { ModuleAdapter } from "@wiredwp/robinpath";
import { SocketFunctions, SocketFunctionMetadata, SocketModuleMetadata } from "./socket.js";
const SocketModule: ModuleAdapter = { name: "socket", functions: SocketFunctions, functionMetadata: SocketFunctionMetadata, moduleMetadata: SocketModuleMetadata, global: false };
export default SocketModule;
export { SocketModule };
export { SocketFunctions, SocketFunctionMetadata, SocketModuleMetadata } from "./socket.js";
