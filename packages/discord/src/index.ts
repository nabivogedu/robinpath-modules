import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DiscordFunctions, DiscordFunctionMetadata, DiscordModuleMetadata } from "./discord.js";

const DiscordModule: ModuleAdapter = {
  name: "discord",
  functions: DiscordFunctions,
  functionMetadata: DiscordFunctionMetadata as any,
  moduleMetadata: DiscordModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default DiscordModule;
export { DiscordModule };
export { DiscordFunctions, DiscordFunctionMetadata, DiscordModuleMetadata } from "./discord.js";
