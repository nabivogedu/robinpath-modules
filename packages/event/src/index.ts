import type { ModuleAdapter } from "@wiredwp/robinpath";
import { EventFunctions, EventFunctionMetadata, EventModuleMetadata } from "./event.js";

const EventModule: ModuleAdapter = {
  name: "event",
  functions: EventFunctions,
  functionMetadata: EventFunctionMetadata as any,
  moduleMetadata: EventModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default EventModule;
export { EventModule };
export { EventFunctions, EventFunctionMetadata, EventModuleMetadata } from "./event.js";
