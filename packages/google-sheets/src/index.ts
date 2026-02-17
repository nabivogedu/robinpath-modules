import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GoogleSheetsFunctions, GoogleSheetsFunctionMetadata, GoogleSheetsModuleMetadata } from "./google-sheets.js";

const GoogleSheetsModule: ModuleAdapter = {
  name: "googleSheets",
  functions: GoogleSheetsFunctions,
  functionMetadata: GoogleSheetsFunctionMetadata as any,
  moduleMetadata: GoogleSheetsModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default GoogleSheetsModule;
export { GoogleSheetsModule };
export { GoogleSheetsFunctions, GoogleSheetsFunctionMetadata, GoogleSheetsModuleMetadata } from "./google-sheets.js";
