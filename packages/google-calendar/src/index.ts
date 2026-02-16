import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GoogleCalendarFunctions, GoogleCalendarFunctionMetadata, GoogleCalendarModuleMetadata } from "./google-calendar.js";

const GoogleCalendarModule: ModuleAdapter = {
  name: "googleCalendar",
  functions: GoogleCalendarFunctions,
  functionMetadata: GoogleCalendarFunctionMetadata,
  moduleMetadata: GoogleCalendarModuleMetadata,
  global: false,
};

export default GoogleCalendarModule;
export { GoogleCalendarModule };
export { GoogleCalendarFunctions, GoogleCalendarFunctionMetadata, GoogleCalendarModuleMetadata } from "./google-calendar.js";
