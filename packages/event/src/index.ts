import type { ModuleAdapter } from "@wiredwp/robinpath";
import { EventFunctions, EventFunctionMetadata, EventModuleMetadata } from "./event.js";

const EventModule: ModuleAdapter = {
  name: "event",
  functions: EventFunctions,
  functionMetadata: EventFunctionMetadata,
  moduleMetadata: EventModuleMetadata,
  global: false,
};

export default EventModule;
export { EventModule };
export { EventFunctions, EventFunctionMetadata, EventModuleMetadata } from "./event.js";
