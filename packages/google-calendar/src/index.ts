import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GoogleCalendarFunctions, GoogleCalendarFunctionMetadata, GoogleCalendarModuleMetadata } from "./google-calendar.js";

const GoogleCalendarModule: ModuleAdapter = {
  name: "googleCalendar",
  functions: GoogleCalendarFunctions,
  functionMetadata: GoogleCalendarFunctionMetadata as any,
  moduleMetadata: GoogleCalendarModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default GoogleCalendarModule;
export { GoogleCalendarModule };
export { GoogleCalendarFunctions, GoogleCalendarFunctionMetadata, GoogleCalendarModuleMetadata } from "./google-calendar.js";
