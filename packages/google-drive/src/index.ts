import type { ModuleAdapter } from "@wiredwp/robinpath";
import { GoogleDriveFunctions, GoogleDriveFunctionMetadata, GoogleDriveModuleMetadata } from "./google-drive.js";

const GoogleDriveModule: ModuleAdapter = {
  name: "googleDrive",
  functions: GoogleDriveFunctions,
  functionMetadata: GoogleDriveFunctionMetadata,
  moduleMetadata: GoogleDriveModuleMetadata,
  global: false,
};

export default GoogleDriveModule;
export { GoogleDriveModule };
export { GoogleDriveFunctions, GoogleDriveFunctionMetadata, GoogleDriveModuleMetadata } from "./google-drive.js";
