import type { ModuleAdapter } from "@wiredwp/robinpath";
import { IniFunctions, IniFunctionMetadata, IniModuleMetadata } from "./ini.js";

const IniModule: ModuleAdapter = {
  name: "ini",
  functions: IniFunctions,
  functionMetadata: IniFunctionMetadata as any,
  moduleMetadata: IniModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default IniModule;
export { IniModule };
export { IniFunctions, IniFunctionMetadata, IniModuleMetadata } from "./ini.js";
