# @robinpath/ldap

> LDAP client module for interacting with LDAP directories. Supports connecting, binding, searching, adding, modifying, and deleting entries. Includes convenience functions for user authentication, user lookup, and group membership queries.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-14-green) ![Auth](https://img.shields.io/badge/auth-connection-string-orange) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `ldap` module lets you:

- Search for entries in the LDAP directory
- Authenticate (bind) to the LDAP server with a DN and password
- Unbind and disconnect from the LDAP server
- Add a new entry to the LDAP directory
- Modify an existing LDAP entry's attributes

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/ldap
```

## Quick Start

**1. Set up credentials**

```robinpath
ldap.connect "your-credentials"
```

**2. Search for entries in the LDAP directory**

```robinpath
ldap.search
```

## Available Functions

| Function | Description |
|----------|-------------|
| `ldap.connect` | Create and connect an LDAP client to a server |
| `ldap.search` | Search for entries in the LDAP directory |
| `ldap.bind` | Authenticate (bind) to the LDAP server with a DN and password |
| `ldap.unbind` | Unbind and disconnect from the LDAP server |
| `ldap.add` | Add a new entry to the LDAP directory |
| `ldap.modify` | Modify an existing LDAP entry's attributes |
| `ldap.del` | Delete an entry from the LDAP directory |
| `ldap.compare` | Compare an attribute value against an LDAP entry |
| `ldap.modifyDN` | Rename an LDAP entry by changing its DN |
| `ldap.findUser` | Convenience function to search for a user by username |
| `ldap.authenticate` | Authenticate a user by searching for their DN and then binding with their password |
| `ldap.groups` | Get all groups that a user belongs to |
| `ldap.close` | Forcefully close the LDAP client connection and clean up resources |
| `ldap.isConnected` | Check if the LDAP client is currently connected |

## Examples

### Search for entries in the LDAP directory

```robinpath
ldap.search
```

### Authenticate (bind) to the LDAP server with a DN and password

```robinpath
ldap.bind
```

### Unbind and disconnect from the LDAP server

```robinpath
ldap.unbind
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/ldap";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  ldap.connect "your-credentials"
  ldap.search
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
