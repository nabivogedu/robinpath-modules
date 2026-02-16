import type { ModuleAdapter } from "@wiredwp/robinpath";
import { LdapFunctions, LdapFunctionMetadata, LdapModuleMetadata } from "./ldap.js";

const LdapModule: ModuleAdapter = { name: "ldap", functions: LdapFunctions, functionMetadata: LdapFunctionMetadata, moduleMetadata: LdapModuleMetadata, global: false };

export default LdapModule;
export { LdapModule };
export { LdapFunctions, LdapFunctionMetadata, LdapModuleMetadata } from "./ldap.js";
