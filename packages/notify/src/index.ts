import type { ModuleAdapter } from "@wiredwp/robinpath";
import { NotifyFunctions, NotifyFunctionMetadata, NotifyModuleMetadata } from "./notify.js";

const NotifyModule: ModuleAdapter = {
  name: "notify",
  functions: NotifyFunctions,
  functionMetadata: NotifyFunctionMetadata as any,
  moduleMetadata: NotifyModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default NotifyModule;
export { NotifyModule };
export { NotifyFunctions, NotifyFunctionMetadata, NotifyModuleMetadata } from "./notify.js";
