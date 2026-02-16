import type { ModuleAdapter } from "@wiredwp/robinpath";
import { XmlFunctions, XmlFunctionMetadata, XmlModuleMetadata } from "./xml.js";

const XmlModule: ModuleAdapter = {
  name: "xml",
  functions: XmlFunctions,
  functionMetadata: XmlFunctionMetadata,
  moduleMetadata: XmlModuleMetadata,
  global: false,
};

export default XmlModule;
export { XmlModule };
export { XmlFunctions, XmlFunctionMetadata, XmlModuleMetadata } from "./xml.js";
