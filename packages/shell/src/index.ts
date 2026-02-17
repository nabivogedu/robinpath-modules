import type { ModuleAdapter } from "@wiredwp/robinpath";
import { ShellFunctions, ShellFunctionMetadata, ShellModuleMetadata } from "./shell.js";

const ShellModule: ModuleAdapter = {
  name: "shell",
  functions: ShellFunctions,
  functionMetadata: ShellFunctionMetadata as any,
  moduleMetadata: ShellModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default ShellModule;
export { ShellModule };
export { ShellFunctions, ShellFunctionMetadata, ShellModuleMetadata } from "./shell.js";
