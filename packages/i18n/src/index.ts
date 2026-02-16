import type { ModuleAdapter } from "@wiredwp/robinpath";
import { I18nFunctions, I18nFunctionMetadata, I18nModuleMetadata } from "./i18n.js";
const I18nModule: ModuleAdapter = { name: "i18n", functions: I18nFunctions, functionMetadata: I18nFunctionMetadata, moduleMetadata: I18nModuleMetadata, global: false };
export default I18nModule;
export { I18nModule };
export { I18nFunctions, I18nFunctionMetadata, I18nModuleMetadata } from "./i18n.js";
