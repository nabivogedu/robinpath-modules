import type { ModuleAdapter } from "@wiredwp/robinpath";
import { NotificationFunctions, NotificationFunctionMetadata, NotificationModuleMetadata } from "./notification.js";

const NotificationModule: ModuleAdapter = {
  name: "notification",
  functions: NotificationFunctions,
  functionMetadata: NotificationFunctionMetadata,
  moduleMetadata: NotificationModuleMetadata,
  global: false,
};

export default NotificationModule;
export { NotificationModule };
export { NotificationFunctions, NotificationFunctionMetadata, NotificationModuleMetadata } from "./notification.js";
