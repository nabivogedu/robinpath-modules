import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TomlFunctions, TomlFunctionMetadata, TomlModuleMetadata } from "./toml.js";

const TomlModule: ModuleAdapter = {
  name: "toml",
  functions: TomlFunctions,
  functionMetadata: TomlFunctionMetadata,
  moduleMetadata: TomlModuleMetadata,
  global: false,
};

export default TomlModule;
export { TomlModule };
export { TomlFunctions, TomlFunctionMetadata, TomlModuleMetadata } from "./toml.js";
