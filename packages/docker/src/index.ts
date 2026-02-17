import type { ModuleAdapter } from "@wiredwp/robinpath";
import { DockerFunctions, DockerFunctionMetadata, DockerModuleMetadata } from "./docker.js";

const DockerModule: ModuleAdapter = { name: "docker", functions: DockerFunctions, functionMetadata: DockerFunctionMetadata as any, moduleMetadata: DockerModuleMetadata as any, global: false };

export default DockerModule;
export { DockerModule };
export { DockerFunctions, DockerFunctionMetadata, DockerModuleMetadata } from "./docker.js";
