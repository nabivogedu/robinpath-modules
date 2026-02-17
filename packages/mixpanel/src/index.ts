import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MixpanelFunctions, MixpanelFunctionMetadata, MixpanelModuleMetadata } from "./mixpanel.js";

const MixpanelModule: ModuleAdapter = {
  name: "mixpanel",
  functions: MixpanelFunctions,
  functionMetadata: MixpanelFunctionMetadata as any,
  moduleMetadata: MixpanelModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default MixpanelModule;
export { MixpanelModule };
export { MixpanelFunctions, MixpanelFunctionMetadata, MixpanelModuleMetadata } from "./mixpanel.js";
