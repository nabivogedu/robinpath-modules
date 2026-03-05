import type { ModuleAdapter } from "@wiredwp/robinpath";
import { FormdataFunctions, FormdataFunctionMetadata, FormdataModuleMetadata } from "./formdata.js";
const FormdataModule: ModuleAdapter = { name: "formdata", functions: FormdataFunctions, functionMetadata: FormdataFunctionMetadata as any, moduleMetadata: FormdataModuleMetadata as any, global: false };
export default FormdataModule;
export { FormdataModule };
export { FormdataFunctions, FormdataFunctionMetadata, FormdataModuleMetadata } from "./formdata.js";
