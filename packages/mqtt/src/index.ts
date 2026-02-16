import type { ModuleAdapter } from "@wiredwp/robinpath";
import { MqttFunctions, MqttFunctionMetadata, MqttModuleMetadata } from "./mqtt.js";

const MqttModule: ModuleAdapter = { name: "mqtt", functions: MqttFunctions, functionMetadata: MqttFunctionMetadata, moduleMetadata: MqttModuleMetadata, global: false };

export default MqttModule;
export { MqttModule };
export { MqttFunctions, MqttFunctionMetadata, MqttModuleMetadata } from "./mqtt.js";
