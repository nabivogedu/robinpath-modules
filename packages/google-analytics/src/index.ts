import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GoogleAnalyticsFunctions, GoogleAnalyticsFunctionMetadata, GoogleAnalyticsModuleMetadata } from "./google-analytics.js";

const GoogleAnalyticsModule: ModuleAdapter = {
  name: "google-analytics",
  functions: GoogleAnalyticsFunctions,
  functionMetadata: GoogleAnalyticsFunctionMetadata as any,
  moduleMetadata: GoogleAnalyticsModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default GoogleAnalyticsModule;
export { GoogleAnalyticsModule };
export { GoogleAnalyticsFunctions, GoogleAnalyticsFunctionMetadata, GoogleAnalyticsModuleMetadata } from "./google-analytics.js";
