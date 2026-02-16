import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TemplateFunctions, TemplateFunctionMetadata, TemplateModuleMetadata } from "./template.js";

const TemplateModule: ModuleAdapter = {
  name: "template",
  functions: TemplateFunctions,
  functionMetadata: TemplateFunctionMetadata,
  moduleMetadata: TemplateModuleMetadata,
  global: false,
};

export default TemplateModule;
export { TemplateModule };
export { TemplateFunctions, TemplateFunctionMetadata, TemplateModuleMetadata } from "./template.js";
