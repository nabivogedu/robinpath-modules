import type { ModuleAdapter } from "@wiredwp/robinpath";
import { YamlFunctions, YamlFunctionMetadata, YamlModuleMetadata } from "./yaml.js";

const YamlModule: ModuleAdapter = {
  name: "yaml",
  functions: YamlFunctions,
  functionMetadata: YamlFunctionMetadata as any,
  moduleMetadata: YamlModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default YamlModule;
export { YamlModule };
export { YamlFunctions, YamlFunctionMetadata, YamlModuleMetadata } from "./yaml.js";
