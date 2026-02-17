import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ActivecampaignFunctions, ActivecampaignFunctionMetadata, ActivecampaignModuleMetadata } from "./activecampaign.js";

const ActivecampaignModule: ModuleAdapter = {
  name: "activecampaign",
  functions: ActivecampaignFunctions,
  functionMetadata: ActivecampaignFunctionMetadata as any,
  moduleMetadata: ActivecampaignModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ActivecampaignModule;
export { ActivecampaignModule };
export { ActivecampaignFunctions, ActivecampaignFunctionMetadata, ActivecampaignModuleMetadata } from "./activecampaign.js";
