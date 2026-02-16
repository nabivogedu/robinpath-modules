import type { ModuleAdapter } from "@wiredwp/robinpath";
import { TeamsFunctions, TeamsFunctionMetadata, TeamsModuleMetadata } from "./teams.js";

const TeamsModule: ModuleAdapter = {
  name: "teams",
  functions: TeamsFunctions,
  functionMetadata: TeamsFunctionMetadata,
  moduleMetadata: TeamsModuleMetadata,
  global: false,
};

export default TeamsModule;
export { TeamsModule };
export { TeamsFunctions, TeamsFunctionMetadata, TeamsModuleMetadata } from "./teams.js";
