import type { ModuleAdapter } from "@wiredwp/robinpath";
import { HubspotFunctions, HubspotFunctionMetadata, HubspotModuleMetadata } from "./hubspot.js";

const HubspotModule: ModuleAdapter = {
  name: "hubspot",
  functions: HubspotFunctions,
  functionMetadata: HubspotFunctionMetadata,
  moduleMetadata: HubspotModuleMetadata,
  global: false,
};

export default HubspotModule;
export { HubspotModule };
export { HubspotFunctions, HubspotFunctionMetadata, HubspotModuleMetadata } from "./hubspot.js";
