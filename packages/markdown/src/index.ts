import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MarkdownFunctions, MarkdownFunctionMetadata, MarkdownModuleMetadata } from "./markdown.js";

const MarkdownModule: ModuleAdapter = {
  name: "markdown",
  functions: MarkdownFunctions,
  functionMetadata: MarkdownFunctionMetadata,
  moduleMetadata: MarkdownModuleMetadata,
  global: false,
};

export default MarkdownModule;
export { MarkdownModule };
export { MarkdownFunctions, MarkdownFunctionMetadata, MarkdownModuleMetadata } from "./markdown.js";
