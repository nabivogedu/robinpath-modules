import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ShellFunctions, ShellFunctionMetadata, ShellModuleMetadata } from "./shell.js";

const ShellModule: ModuleAdapter = {
  name: "shell",
  functions: ShellFunctions,
  functionMetadata: ShellFunctionMetadata,
  moduleMetadata: ShellModuleMetadata,
  global: false,
};

export default ShellModule;
export { ShellModule };
export { ShellFunctions, ShellFunctionMetadata, ShellModuleMetadata } from "./shell.js";
