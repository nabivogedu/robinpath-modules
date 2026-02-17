import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TomlFunctions, TomlFunctionMetadata, TomlModuleMetadata } from "./toml.js";

const TomlModule: ModuleAdapter = {
  name: "toml",
  functions: TomlFunctions,
  functionMetadata: TomlFunctionMetadata as any,
  moduleMetadata: TomlModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default TomlModule;
export { TomlModule };
export { TomlFunctions, TomlFunctionMetadata, TomlModuleMetadata } from "./toml.js";
