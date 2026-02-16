import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import ldap from "ldapjs";

const clients: Map<string, ldap.Client> = new Map();

function getClient(id: string): ldap.Client {
  const client = clients.get(id);
  if (!client) {
    throw new Error(`LDAP client "${id}" not found. Call connect() first.`);
  }
  return client;
}

const connect: BuiltinHandler = (args: unknown[]): unknown => {
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

const search: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const baseDN = String(args[1]);
  const options = (args[2] ?? {}) as ldap.SearchOptions;

  if (!baseDN) throw new Error("Base DN is required.");
  const client = getClient(id);

  return new Promise<unknown>((resolve, reject) => {
    client.search(baseDN, options, (err, res) => {
      if (err) return reject(err);

      const entries: Record<string, unknown>[] = [];

      res.on("searchEntry", (entry) => {
        entries.push({
          dn: entry.dn.toString(),
          attributes: entry.pojo.attributes.map((attr) => ({
            type: attr.type,
            values: attr.values,
          })),
        });
      });

      res.on("error", (searchErr) => {
        reject(searchErr);
      });

      res.on("end", (result) => {
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

const bind: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const dn = String(args[1]);
  const password = String(args[2]);

  if (!dn) throw new Error("DN is required for bind.");
  if (!password) throw new Error("Password is required for bind.");

  const client = getClient(id);

  return new Promise<unknown>((resolve, reject) => {
    client.bind(dn, password, (err) => {
      if (err) reject(err);
      else resolve({ id, dn, status: "bound" });
    });
  });
};

const unbind: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const client = getClient(id);

  return new Promise<unknown>((resolve, reject) => {
    client.unbind((err) => {
      if (err) reject(err);
      else {
        clients.delete(id);
        resolve({ id, status: "unbound" });
      }
    });
  });
};

const add: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const dn = String(args[1]);
  const entry = args[2] as Record<string, unknown>;

  if (!dn) throw new Error("DN is required.");
  if (!entry || typeof entry !== "object") throw new Error("Entry object is required.");

  const client = getClient(id);

  return new Promise<unknown>((resolve, reject) => {
    client.add(dn, entry as unknown as ldap.Attribute[], (err) => {
      if (err) reject(err);
      else resolve({ id, dn, status: "added" });
    });
  });
};

const modify: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const dn = String(args[1]);
  const changes = args[2] as Array<{ operation: string; modification: Record<string, unknown> }>;

  if (!dn) throw new Error("DN is required.");
  if (!changes || !Array.isArray(changes)) throw new Error("Changes array is required.");

  const client = getClient(id);

  const ldapChanges = changes.map(
    (c) =>
      new ldap.Change({
        operation: c.operation as "add" | "delete" | "replace",
        modification: new ldap.Attribute({
          type: Object.keys(c.modification)[0],
          values: Object.values(c.modification)[0] as string[],
        }),
      })
  );

  return new Promise<unknown>((resolve, reject) => {
    client.modify(dn, ldapChanges, (err) => {
      if (err) reject(err);
      else resolve({ id, dn, status: "modified", changeCount: changes.length });
    });
  });
};

const del: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const dn = String(args[1]);

  if (!dn) throw new Error("DN is required.");
  const client = getClient(id);

  return new Promise<unknown>((resolve, reject) => {
    client.del(dn, (err) => {
      if (err) reject(err);
      else resolve({ id, dn, status: "deleted" });
    });
  });
};

const compare: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const dn = String(args[1]);
  const attribute = String(args[2]);
  const value = String(args[3]);

  if (!dn) throw new Error("DN is required.");
  if (!attribute) throw new Error("Attribute name is required.");
  if (!value) throw new Error("Value is required.");

  const client = getClient(id);

  return new Promise<unknown>((resolve, reject) => {
    client.compare(dn, attribute, value, (err, matched) => {
      if (err) reject(err);
      else resolve({ id, dn, attribute, matched });
    });
  });
};

const modifyDN: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const dn = String(args[1]);
  const newDN = String(args[2]);

  if (!dn) throw new Error("Current DN is required.");
  if (!newDN) throw new Error("New DN is required.");

  const client = getClient(id);

  return new Promise<unknown>((resolve, reject) => {
    client.modifyDN(dn, newDN, (err) => {
      if (err) reject(err);
      else resolve({ id, oldDN: dn, newDN, status: "renamed" });
    });
  });
};

const findUser: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const baseDN = String(args[1]);
  const username = String(args[2]);
  const usernameAttribute = String(args[3] ?? "uid");

  if (!baseDN) throw new Error("Base DN is required.");
  if (!username) throw new Error("Username is required.");

  const client = getClient(id);

  const searchOptions: ldap.SearchOptions = {
    filter: `(${usernameAttribute}=${username})`,
    scope: "sub",
  };

  return new Promise<unknown>((resolve, reject) => {
    client.search(baseDN, searchOptions, (err, res) => {
      if (err) return reject(err);

      const entries: Record<string, unknown>[] = [];

      res.on("searchEntry", (entry) => {
        entries.push({
          dn: entry.dn.toString(),
          attributes: entry.pojo.attributes.map((attr) => ({
            type: attr.type,
            values: attr.values,
          })),
        });
      });

      res.on("error", (searchErr) => {
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

const authenticate: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const baseDN = String(args[1]);
  const username = String(args[2]);
  const password = String(args[3]);
  const usernameAttribute = String(args[4] ?? "uid");

  if (!baseDN) throw new Error("Base DN is required.");
  if (!username) throw new Error("Username is required.");
  if (!password) throw new Error("Password is required.");

  const client = getClient(id);

  const searchOptions: ldap.SearchOptions = {
    filter: `(${usernameAttribute}=${username})`,
    scope: "sub",
  };

  return new Promise<unknown>((resolve, reject) => {
    client.search(baseDN, searchOptions, (err, res) => {
      if (err) return reject(err);

      let userDN: string | null = null;

      res.on("searchEntry", (entry) => {
        userDN = entry.dn.toString();
      });

      res.on("error", (searchErr) => {
        reject(searchErr);
      });

      res.on("end", () => {
        if (!userDN) {
          return resolve({ id, username, authenticated: false, reason: "User not found" });
        }

        const authClient = ldap.createClient({ url: client.url.href });

        authClient.bind(userDN, password, (bindErr) => {
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

const groups: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const baseDN = String(args[1]);
  const userDN = String(args[2]);
  const groupAttribute = String(args[3] ?? "member");

  if (!baseDN) throw new Error("Base DN is required.");
  if (!userDN) throw new Error("User DN is required.");

  const client = getClient(id);

  const searchOptions: ldap.SearchOptions = {
    filter: `(&(objectClass=groupOfNames)(${groupAttribute}=${userDN}))`,
    scope: "sub",
    attributes: ["cn", "dn"],
  };

  return new Promise<unknown>((resolve, reject) => {
    client.search(baseDN, searchOptions, (err, res) => {
      if (err) return reject(err);

      const groupList: Record<string, unknown>[] = [];

      res.on("searchEntry", (entry) => {
        groupList.push({
          dn: entry.dn.toString(),
          cn: entry.pojo.attributes.find((a) => a.type === "cn")?.values[0] ?? null,
        });
      });

      res.on("error", (searchErr) => {
        reject(searchErr);
      });

      res.on("end", () => {
        resolve({ id, userDN, groups: groupList, count: groupList.length });
      });
    });
  });
};

const close: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const client = getClient(id);

  client.destroy();
  clients.delete(id);

  return { id, status: "closed" };
};

const isConnected: BuiltinHandler = (args: unknown[]): unknown => {
  const id = String(args[0] ?? "default");
  const client = clients.get(id);
  return { id, connected: client ? client.connected : false };
};

export const LdapFunctions: Record<string, BuiltinHandler> = {
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

export const LdapFunctionMetadata: Record<string, FunctionMetadata> = {
  connect: {
    description: "Create and connect an LDAP client to a server",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "url", type: "string", description: "LDAP server URL (e.g. ldap://localhost:389)", optional: true },
      { name: "options", type: "object", description: "Additional ldapjs client options", optional: true },
    ],
    returns: { type: "object", description: "Connection status with id and url" },
  },
  search: {
    description: "Search for entries in the LDAP directory",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "baseDN", type: "string", description: "Base DN to search from", optional: false },
      { name: "options", type: "object", description: "Search options (filter, scope, attributes, etc.)", optional: true },
    ],
    returns: { type: "object", description: "Search results with entries array and count" },
  },
  bind: {
    description: "Authenticate (bind) to the LDAP server with a DN and password",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "dn", type: "string", description: "Distinguished name to bind as", optional: false },
      { name: "password", type: "string", description: "Password for authentication", optional: false },
    ],
    returns: { type: "object", description: "Bind status confirmation" },
  },
  unbind: {
    description: "Unbind and disconnect from the LDAP server",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
    ],
    returns: { type: "object", description: "Unbind confirmation" },
  },
  add: {
    description: "Add a new entry to the LDAP directory",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "dn", type: "string", description: "Distinguished name for the new entry", optional: false },
      { name: "entry", type: "object", description: "Entry attributes as key-value pairs", optional: false },
    ],
    returns: { type: "object", description: "Add operation confirmation" },
  },
  modify: {
    description: "Modify an existing LDAP entry's attributes",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "dn", type: "string", description: "DN of the entry to modify", optional: false },
      { name: "changes", type: "array", description: "Array of changes with operation (add/delete/replace) and modification", optional: false },
    ],
    returns: { type: "object", description: "Modify operation confirmation" },
  },
  del: {
    description: "Delete an entry from the LDAP directory",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "dn", type: "string", description: "DN of the entry to delete", optional: false },
    ],
    returns: { type: "object", description: "Delete operation confirmation" },
  },
  compare: {
    description: "Compare an attribute value against an LDAP entry",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "dn", type: "string", description: "DN of the entry to compare", optional: false },
      { name: "attribute", type: "string", description: "Attribute name to compare", optional: false },
      { name: "value", type: "string", description: "Value to compare against", optional: false },
    ],
    returns: { type: "object", description: "Comparison result with matched boolean" },
  },
  modifyDN: {
    description: "Rename an LDAP entry by changing its DN",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "dn", type: "string", description: "Current DN of the entry", optional: false },
      { name: "newDN", type: "string", description: "New DN for the entry", optional: false },
    ],
    returns: { type: "object", description: "Rename operation confirmation" },
  },
  findUser: {
    description: "Convenience function to search for a user by username",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "baseDN", type: "string", description: "Base DN to search from", optional: false },
      { name: "username", type: "string", description: "Username to search for", optional: false },
      { name: "usernameAttribute", type: "string", description: "LDAP attribute for username (default: uid)", optional: true },
    ],
    returns: { type: "object", description: "User search result with found boolean and user object" },
  },
  authenticate: {
    description: "Authenticate a user by searching for their DN and then binding with their password",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "baseDN", type: "string", description: "Base DN to search from", optional: false },
      { name: "username", type: "string", description: "Username to authenticate", optional: false },
      { name: "password", type: "string", description: "User password", optional: false },
      { name: "usernameAttribute", type: "string", description: "LDAP attribute for username (default: uid)", optional: true },
    ],
    returns: { type: "object", description: "Authentication result with authenticated boolean" },
  },
  groups: {
    description: "Get all groups that a user belongs to",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
      { name: "baseDN", type: "string", description: "Base DN to search groups from", optional: false },
      { name: "userDN", type: "string", description: "DN of the user to find groups for", optional: false },
      { name: "groupAttribute", type: "string", description: "Group membership attribute (default: member)", optional: true },
    ],
    returns: { type: "object", description: "List of groups with DN and CN" },
  },
  close: {
    description: "Forcefully close the LDAP client connection and clean up resources",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
    ],
    returns: { type: "object", description: "Close confirmation" },
  },
  isConnected: {
    description: "Check if the LDAP client is currently connected",
    parameters: [
      { name: "id", type: "string", description: "Client identifier", optional: true },
    ],
    returns: { type: "object", description: "Connection status with boolean connected field" },
  },
};

export const LdapModuleMetadata: ModuleMetadata = {
  name: "ldap",
  description: "LDAP client module for interacting with LDAP directories. Supports connecting, binding, searching, adding, modifying, and deleting entries. Includes convenience functions for user authentication, user lookup, and group membership queries.",
  version: "1.0.0",
};
