import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TelegramFunctions, TelegramFunctionMetadata, TelegramModuleMetadata } from "./telegram.js";

const TelegramModule: ModuleAdapter = {
  name: "telegram",
  functions: TelegramFunctions,
  functionMetadata: TelegramFunctionMetadata,
  moduleMetadata: TelegramModuleMetadata,
  global: false,
};

export default TelegramModule;
export { TelegramModule };
export { TelegramFunctions, TelegramFunctionMetadata, TelegramModuleMetadata } from "./telegram.js";
