// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import ldap from "ldapjs";

const clients: Map<string, ldap.Client> = new Map();

function getClient(id: string): any {
  const client = clients.get(id);
  if (!client) {
    throw new Error(`LDAP client "${id}" not found. Call connect() first.`);
  }
  return client;
}

const connect: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const url = String(args[1] ?? "ldap://localhost:389");
  const options = (args[2] ?? {}) as ldap.ClientOptions;

  if (clients.has(id)) {
    throw new Error(`LDAP client "${id}" already exists. Close it first or use a different id.`);
  }

  const client = ldap.createClient({ url, ...options });
  clients.set(id, client);

  return { id, url, status: "created" };
};

const search: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const baseDN = String(args[1]);
  const options = (args[2] ?? {}) as ldap.SearchOptions;

  if (!baseDN) throw new Error("Base DN is required.");
  const client = getClient(id);

  return new Promise<any>((resolve: any, reject: any) => {
    client.search(baseDN, options, (err: any, res: any) => {
      if (err) return reject(err);

      const entries: Record<string, unknown>[] = [];

      res.on("searchEntry", (entry: any) => {
        entries.push({
          dn: entry.dn.toString(),
          attributes: entry.pojo.attributes.map((attr: any) => ({
            type: attr.type,
            values: attr.values,
          })),
        });
      });

      res.on("error", (searchErr: any) => {
        reject(searchErr);
      });

      res.on("end", (result: any) => {
        resolve({
          id,
          baseDN,
          status: result?.status ?? 0,
          entries,
          count: entries.length,
        });
      });
    });
  });
};

const bind: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const dn = String(args[1]);
  const password = String(args[2]);

  if (!dn) throw new Error("DN is required for bind.");
  if (!password) throw new Error("Password is required for bind.");

  const client = getClient(id);

  return new Promise<any>((resolve: any, reject: any) => {
    client.bind(dn, password, (err: any) => {
      if (err) reject(err);
      else resolve({ id, dn, status: "bound" });
    });
  });
};

const unbind: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const client = getClient(id);

  return new Promise<any>((resolve: any, reject: any) => {
    client.unbind((err: any) => {
      if (err) reject(err);
      else {
        clients.delete(id);
        resolve({ id, status: "unbound" });
      }
    });
  });
};

const add: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const dn = String(args[1]);
  const entry = args[2] as Record<string, unknown>;

  if (!dn) throw new Error("DN is required.");
  if (!entry || typeof entry !== "object") throw new Error("Entry object is required.");

  const client = getClient(id);

  return new Promise<any>((resolve: any, reject: any) => {
    client.add(dn, entry as unknown as ldap.Attribute[], (err: any) => {
      if (err) reject(err);
      else resolve({ id, dn, status: "added" });
    });
  });
};

const modify: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const dn = String(args[1]);
  const changes = args[2] as Array<{ operation: string; modification: Record<string, unknown> }>;

  if (!dn) throw new Error("DN is required.");
  if (!changes || !Array.isArray(changes)) throw new Error("Changes array is required.");

  const client = getClient(id);

  const ldapChanges = changes.map(
    (c: any) =>
      new ldap.Change({
        operation: c.operation as "add" | "delete" | "replace",
        modification: new ldap.Attribute({
          type: Object.keys(c.modification)[0],
          values: Object.values(c.modification)[0] as string[],
        }),
      })
  );

  return new Promise<any>((resolve: any, reject: any) => {
    client.modify(dn, ldapChanges, (err: any) => {
      if (err) reject(err);
      else resolve({ id, dn, status: "modified", changeCount: changes.length });
    });
  });
};

const del: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const dn = String(args[1]);

  if (!dn) throw new Error("DN is required.");
  const client = getClient(id);

  return new Promise<any>((resolve: any, reject: any) => {
    client.del(dn, (err: any) => {
      if (err) reject(err);
      else resolve({ id, dn, status: "deleted" });
    });
  });
};

const compare: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const dn = String(args[1]);
  const attribute = String(args[2]);
  const value = String(args[3]);

  if (!dn) throw new Error("DN is required.");
  if (!attribute) throw new Error("Attribute name is required.");
  if (!value) throw new Error("Value is required.");

  const client = getClient(id);

  return new Promise<any>((resolve: any, reject: any) => {
    client.compare(dn, attribute, value, (err: any, matched: any) => {
      if (err) reject(err);
      else resolve({ id, dn, attribute, matched });
    });
  });
};

const modifyDN: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const dn = String(args[1]);
  const newDN = String(args[2]);

  if (!dn) throw new Error("Current DN is required.");
  if (!newDN) throw new Error("New DN is required.");

  const client = getClient(id);

  return new Promise<any>((resolve: any, reject: any) => {
    client.modifyDN(dn, newDN, (err: any) => {
      if (err) reject(err);
      else resolve({ id, oldDN: dn, newDN, status: "renamed" });
    });
  });
};

const findUser: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const baseDN = String(args[1]);
  const username = String(args[2]);
  const usernameAttribute = String(args[3] ?? "uid");

  if (!baseDN) throw new Error("Base DN is required.");
  if (!username) throw new Error("Username is required.");

  const client = getClient(id);

  const searchOptions: any = {
    filter: `(${usernameAttribute}=${username})`,
    scope: "sub",
  };

  return new Promise<any>((resolve: any, reject: any) => {
    client.search(baseDN, searchOptions, (err: any, res: any) => {
      if (err) return reject(err);

      const entries: Record<string, unknown>[] = [];

      res.on("searchEntry", (entry: any) => {
        entries.push({
          dn: entry.dn.toString(),
          attributes: entry.pojo.attributes.map((attr: any) => ({
            type: attr.type,
            values: attr.values,
          })),
        });
      });

      res.on("error", (searchErr: any) => {
        reject(searchErr);
      });

      res.on("end", () => {
        resolve({
          id,
          username,
          found: entries.length > 0,
          user: entries[0] ?? null,
        });
      });
    });
  });
};

const authenticate: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const baseDN = String(args[1]);
  const username = String(args[2]);
  const password = String(args[3]);
  const usernameAttribute = String(args[4] ?? "uid");

  if (!baseDN) throw new Error("Base DN is required.");
  if (!username) throw new Error("Username is required.");
  if (!password) throw new Error("Password is required.");

  const client = getClient(id);

  const searchOptions: any = {
    filter: `(${usernameAttribute}=${username})`,
    scope: "sub",
  };

  return new Promise<any>((resolve: any, reject: any) => {
    client.search(baseDN, searchOptions, (err: any, res: any) => {
      if (err) return reject(err);

      let userDN: string | null = null;

      res.on("searchEntry", (entry: any) => {
        userDN = entry.dn.toString();
      });

      res.on("error", (searchErr: any) => {
        reject(searchErr);
      });

      res.on("end", () => {
        if (!userDN) {
          return resolve({ id, username, authenticated: false, reason: "User not found" });
        }

        const authClient = ldap.createClient({ url: client.url.href });

        authClient.bind(userDN, password, (bindErr: any) => {
          authClient.unbind(() => {});

          if (bindErr) {
            resolve({ id, username, authenticated: false, reason: "Invalid credentials" });
          } else {
            resolve({ id, username, authenticated: true, dn: userDN });
          }
        });
      });
    });
  });
};

const groups: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const baseDN = String(args[1]);
  const userDN = String(args[2]);
  const groupAttribute = String(args[3] ?? "member");

  if (!baseDN) throw new Error("Base DN is required.");
  if (!userDN) throw new Error("User DN is required.");

  const client = getClient(id);

  const searchOptions: any = {
    filter: `(&(objectClass=groupOfNames)(${groupAttribute}=${userDN}))`,
    scope: "sub",
    attributes: ["cn", "dn"],
  };

  return new Promise<any>((resolve: any, reject: any) => {
    client.search(baseDN, searchOptions, (err: any, res: any) => {
      if (err) return reject(err);

      const groupList: Record<string, unknown>[] = [];

      res.on("searchEntry", (entry: any) => {
        groupList.push({
          dn: entry.dn.toString(),
          cn: entry.pojo.attributes.find((a: any) => a.type === "cn")?.values[0] ?? null,
        });
      });

      res.on("error", (searchErr: any) => {
        reject(searchErr);
      });

      res.on("end", () => {
        resolve({ id, userDN, groups: groupList, count: groupList.length });
      });
    });
  });
};

const close: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const client = getClient(id);

  client.destroy();
  clients.delete(id);

  return { id, status: "closed" };
};

const isConnected: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const client = clients.get(id);
  return { id, connected: client ? client.connected : false };
};

export const LdapFunctions = {
  connect,
  search,
  bind,
  unbind,
  add,
  modify,
  del,
  compare,
  modifyDN,
  findUser,
  authenticate,
  groups,
  close,
  isConnected,
};

export const LdapFunctionMetadata = {
  connect: {
    description: "Create and connect an LDAP client to a server",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "url", dataType: "string", description: "LDAP server URL (e.g. ldap://localhost:389)", optional: true },
      { name: "options", dataType: "object", description: "Additional ldapjs client options", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  search: {
    description: "Search for entries in the LDAP directory",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "baseDN", dataType: "string", description: "Base DN to search from", optional: false },
      { name: "options", dataType: "object", description: "Search options (filter, scope, attributes, etc.)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  bind: {
    description: "Authenticate (bind) to the LDAP server with a DN and password",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "dn", dataType: "string", description: "Distinguished name to bind as", optional: false },
      { name: "password", dataType: "string", description: "Password for authentication", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  unbind: {
    description: "Unbind and disconnect from the LDAP server",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  add: {
    description: "Add a new entry to the LDAP directory",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "dn", dataType: "string", description: "Distinguished name for the new entry", optional: false },
      { name: "entry", dataType: "object", description: "Entry attributes as key-value pairs", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  modify: {
    description: "Modify an existing LDAP entry's attributes",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "dn", dataType: "string", description: "DN of the entry to modify", optional: false },
      { name: "changes", dataType: "array", description: "Array of changes with operation (add/delete/replace) and modification", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  del: {
    description: "Delete an entry from the LDAP directory",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "dn", dataType: "string", description: "DN of the entry to delete", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  compare: {
    description: "Compare an attribute value against an LDAP entry",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "dn", dataType: "string", description: "DN of the entry to compare", optional: false },
      { name: "attribute", dataType: "string", description: "Attribute name to compare", optional: false },
      { name: "value", dataType: "string", description: "Value to compare against", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  modifyDN: {
    description: "Rename an LDAP entry by changing its DN",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "dn", dataType: "string", description: "Current DN of the entry", optional: false },
      { name: "newDN", dataType: "string", description: "New DN for the entry", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  findUser: {
    description: "Convenience function to search for a user by username",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "baseDN", dataType: "string", description: "Base DN to search from", optional: false },
      { name: "username", dataType: "string", description: "Username to search for", optional: false },
      { name: "usernameAttribute", dataType: "string", description: "LDAP attribute for username (default: uid)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  authenticate: {
    description: "Authenticate a user by searching for their DN and then binding with their password",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "baseDN", dataType: "string", description: "Base DN to search from", optional: false },
      { name: "username", dataType: "string", description: "Username to authenticate", optional: false },
      { name: "password", dataType: "string", description: "User password", optional: false },
      { name: "usernameAttribute", dataType: "string", description: "LDAP attribute for username (default: uid)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  groups: {
    description: "Get all groups that a user belongs to",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "baseDN", dataType: "string", description: "Base DN to search groups from", optional: false },
      { name: "userDN", dataType: "string", description: "DN of the user to find groups for", optional: false },
      { name: "groupAttribute", dataType: "string", description: "Group membership attribute (default: member)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  close: {
    description: "Forcefully close the LDAP client connection and clean up resources",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  isConnected: {
    description: "Check if the LDAP client is currently connected",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
};

export const LdapModuleMetadata = {
  description: "LDAP client module for interacting with LDAP directories. Supports connecting, binding, searching, adding, modifying, and deleting entries. Includes convenience functions for user authentication, user lookup, and group membership queries.",
  version: "1.0.0",
};
