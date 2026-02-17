import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TrelloFunctions, TrelloFunctionMetadata, TrelloModuleMetadata } from "./trello.js";

const TrelloModule: ModuleAdapter = {
  name: "trello",
  functions: TrelloFunctions,
  functionMetadata: TrelloFunctionMetadata as any,
  moduleMetadata: TrelloModuleMetadata as any,
  global: false,
}; // as ModuleAdapter

export default TrelloModule;
export { TrelloModule };
export { TrelloFunctions, TrelloFunctionMetadata, TrelloModuleMetadata } from "./trello.js";
