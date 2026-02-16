import type { ModuleAdapter } from "@wiredwp/robinpath";
import { NotionFunctions, NotionFunctionMetadata, NotionModuleMetadata } from "./notion.js";

const NotionModule: ModuleAdapter = {
  name: "notion",
  functions: NotionFunctions,
  functionMetadata: NotionFunctionMetadata,
  moduleMetadata: NotionModuleMetadata,
  global: false,
};

export default NotionModule;
export { NotionModule };
export { NotionFunctions, NotionFunctionMetadata, NotionModuleMetadata } from "./notion.js";
