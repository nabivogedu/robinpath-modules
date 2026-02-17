import type { ModuleAdapter } from "@wiredwp/robinpath";
import { YoutubeFunctions, YoutubeFunctionMetadata, YoutubeModuleMetadata } from "./youtube.js";

const YoutubeModule: ModuleAdapter = {
  name: "youtube",
  functions: YoutubeFunctions,
  functionMetadata: YoutubeFunctionMetadata as any,
  moduleMetadata: YoutubeModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default YoutubeModule;
export { YoutubeModule };
export { YoutubeFunctions, YoutubeFunctionMetadata, YoutubeModuleMetadata } from "./youtube.js";
