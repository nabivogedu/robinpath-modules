import type { ModuleAdapter } from "@wiredwp/robinpath";
import { LemlistFunctions, LemlistFunctionMetadata, LemlistModuleMetadata } from "./lemlist.js";

const LemlistModule: ModuleAdapter = {
  name: "lemlist",
  functions: LemlistFunctions,
  functionMetadata: LemlistFunctionMetadata as any,
  moduleMetadata: LemlistModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default LemlistModule;
export { LemlistModule };
export { LemlistFunctions, LemlistFunctionMetadata, LemlistModuleMetadata } from "./lemlist.js";
