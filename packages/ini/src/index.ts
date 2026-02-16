import type { ModuleAdapter } from "@wiredwp/robinpath";
import { IniFunctions, IniFunctionMetadata, IniModuleMetadata } from "./ini.js";

const IniModule: ModuleAdapter = {
  name: "ini",
  functions: IniFunctions,
  functionMetadata: IniFunctionMetadata,
  moduleMetadata: IniModuleMetadata,
  global: false,
};

export default IniModule;
export { IniModule };
export { IniFunctions, IniFunctionMetadata, IniModuleMetadata } from "./ini.js";
