import type { ModuleAdapter } from "@wiredwp/robinpath";
import { RobotsFunctions, RobotsFunctionMetadata, RobotsModuleMetadata } from "./robots.js";
const RobotsModule: ModuleAdapter = { name: "robots", functions: RobotsFunctions, functionMetadata: RobotsFunctionMetadata, moduleMetadata: RobotsModuleMetadata, global: false };
export default RobotsModule;
export { RobotsModule };
export { RobotsFunctions, RobotsFunctionMetadata, RobotsModuleMetadata } from "./robots.js";
