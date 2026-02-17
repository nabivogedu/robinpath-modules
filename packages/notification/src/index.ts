import type { ModuleAdapter } from "@wiredwp/robinpath";
import { NotificationFunctions, NotificationFunctionMetadata, NotificationModuleMetadata } from "./notification.js";

const NotificationModule: ModuleAdapter = {
  name: "notification",
  functions: NotificationFunctions,
  functionMetadata: NotificationFunctionMetadata as any,
  moduleMetadata: NotificationModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default NotificationModule;
export { NotificationModule };
export { NotificationFunctions, NotificationFunctionMetadata, NotificationModuleMetadata } from "./notification.js";
