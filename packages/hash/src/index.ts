import type { ModuleAdapter } from "@wiredwp/robinpath";
import { HashFunctions, HashFunctionMetadata, HashModuleMetadata } from "./hash.js";
const HashModule: ModuleAdapter = { name: "hash", functions: HashFunctions, functionMetadata: HashFunctionMetadata as any, moduleMetadata: HashModuleMetadata as any, global: false };
export default HashModule;
export { HashModule };
export { HashFunctions, HashFunctionMetadata, HashModuleMetadata } from "./hash.js";
