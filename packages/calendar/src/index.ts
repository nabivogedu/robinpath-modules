import type { ModuleAdapter } from "@wiredwp/robinpath";
import { CalendarFunctions, CalendarFunctionMetadata, CalendarModuleMetadata } from "./calendar.js";
const CalendarModule: ModuleAdapter = { name: "calendar", functions: CalendarFunctions, functionMetadata: CalendarFunctionMetadata as any, moduleMetadata: CalendarModuleMetadata as any, global: false };
export default CalendarModule;
export { CalendarModule };
export { CalendarFunctions, CalendarFunctionMetadata, CalendarModuleMetadata } from "./calendar.js";
