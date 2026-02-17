import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GoogleDriveFunctions, GoogleDriveFunctionMetadata, GoogleDriveModuleMetadata } from "./google-drive.js";

const GoogleDriveModule: ModuleAdapter = {
  name: "googleDrive",
  functions: GoogleDriveFunctions,
  functionMetadata: GoogleDriveFunctionMetadata as any,
  moduleMetadata: GoogleDriveModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default GoogleDriveModule;
export { GoogleDriveModule };
export { GoogleDriveFunctions, GoogleDriveFunctionMetadata, GoogleDriveModuleMetadata } from "./google-drive.js";
