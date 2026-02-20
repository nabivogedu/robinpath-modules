---
title: "LDAP"
module: "ldap"
package: "@robinpath/ldap"
description: "LDAP client module for interacting with LDAP directories. Supports connecting, binding, searching, adding, modifying, and deleting entries. Includes convenience functions for user authentication, user lookup, and group membership queries."
category: "utility"
tags: [ldap, utility]
type: "utility"
auth: "connection-string"
functionCount: 14
---

# LDAP

> LDAP client module for interacting with LDAP directories. Supports connecting, binding, searching, adding, modifying, and deleting entries. Includes convenience functions for user authentication, user lookup, and group membership queries.

**Package:** `@robinpath/ldap` | **Category:** Utility | **Type:** Utility


## Authentication

```robinpath
ldap.connect "your-credentials"
```

> Call this once at the start of your script before using any other function. Credentials persist for the duration of the script execution.


## Use Cases

Use the `ldap` module when you need to:

- **Search for entries in the LDAP directory** -- Use `ldap.search` to perform this operation
- **Authenticate (bind) to the LDAP server with a DN and password** -- Use `ldap.bind` to perform this operation
- **Unbind and disconnect from the LDAP server** -- Use `ldap.unbind` to perform this operation
- **Add a new entry to the LDAP directory** -- Use `ldap.add` to perform this operation
- **Modify an existing LDAP entry's attributes** -- Use `ldap.modify` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`connect`](#connect) | Create and connect an LDAP client to a server | `object` |
| [`search`](#search) | Search for entries in the LDAP directory | `object` |
| [`bind`](#bind) | Authenticate (bind) to the LDAP server with a DN and password | `object` |
| [`unbind`](#unbind) | Unbind and disconnect from the LDAP server | `object` |
| [`add`](#add) | Add a new entry to the LDAP directory | `object` |
| [`modify`](#modify) | Modify an existing LDAP entry's attributes | `object` |
| [`del`](#del) | Delete an entry from the LDAP directory | `object` |
| [`compare`](#compare) | Compare an attribute value against an LDAP entry | `object` |
| [`modifyDN`](#modifydn) | Rename an LDAP entry by changing its DN | `object` |
| [`findUser`](#finduser) | Convenience function to search for a user by username | `object` |
| [`authenticate`](#authenticate) | Authenticate a user by searching for their DN and then binding with their password | `object` |
| [`groups`](#groups) | Get all groups that a user belongs to | `object` |
| [`close`](#close) | Forcefully close the LDAP client connection and clean up resources | `object` |
| [`isConnected`](#isconnected) | Check if the LDAP client is currently connected | `object` |


## Functions

### connect

Create and connect an LDAP client to a server

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.connect
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `url` | `string` | No | LDAP server URL (e.g. ldap://localhost:389) |
| `options` | `object` | No | Additional ldapjs client options |

---

### search

Search for entries in the LDAP directory

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.search
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `baseDN` | `string` | No | Base DN to search from |
| `options` | `object` | No | Search options (filter, scope, attributes, etc.) |

---

### bind

Authenticate (bind) to the LDAP server with a DN and password

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.bind
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `dn` | `string` | No | Distinguished name to bind as |
| `password` | `string` | No | Password for authentication |

---

### unbind

Unbind and disconnect from the LDAP server

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.unbind
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |

---

### add

Add a new entry to the LDAP directory

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.add
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `dn` | `string` | No | Distinguished name for the new entry |
| `entry` | `object` | No | Entry attributes as key-value pairs |

---

### modify

Modify an existing LDAP entry's attributes

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.modify
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `dn` | `string` | No | DN of the entry to modify |
| `changes` | `array` | No | Array of changes with operation (add/delete/replace) and modification |

---

### del

Delete an entry from the LDAP directory

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.del
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `dn` | `string` | No | DN of the entry to delete |

---

### compare

Compare an attribute value against an LDAP entry

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.compare
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `dn` | `string` | No | DN of the entry to compare |
| `attribute` | `string` | No | Attribute name to compare |
| `value` | `string` | No | Value to compare against |

---

### modifyDN

Rename an LDAP entry by changing its DN

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.modifyDN
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `dn` | `string` | No | Current DN of the entry |
| `newDN` | `string` | No | New DN for the entry |

---

### findUser

Convenience function to search for a user by username

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.findUser
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `baseDN` | `string` | No | Base DN to search from |
| `username` | `string` | No | Username to search for |
| `usernameAttribute` | `string` | No | LDAP attribute for username (default: uid) |

---

### authenticate

Authenticate a user by searching for their DN and then binding with their password

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.authenticate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `baseDN` | `string` | No | Base DN to search from |
| `username` | `string` | No | Username to authenticate |
| `password` | `string` | No | User password |
| `usernameAttribute` | `string` | No | LDAP attribute for username (default: uid) |

---

### groups

Get all groups that a user belongs to

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.groups
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |
| `baseDN` | `string` | No | Base DN to search groups from |
| `userDN` | `string` | No | DN of the user to find groups for |
| `groupAttribute` | `string` | No | Group membership attribute (default: member) |

---

### close

Forcefully close the LDAP client connection and clean up resources

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.close
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |

---

### isConnected

Check if the LDAP client is currently connected

**Module:** `ldap` | **Returns:** `object` -- API response.

```robinpath
ldap.isConnected
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | No | Client identifier |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Base DN is required.` | Check the error message for details |
| `DN is required for bind.` | Check the error message for details |
| `Password is required for bind.` | Check the error message for details |
| `DN is required.` | Check the error message for details |
| `Entry object is required.` | Check the error message for details |
| `Changes array is required.` | Check the error message for details |
| `Attribute name is required.` | Check the error message for details |
| `Value is required.` | Check the error message for details |

```robinpath
set $result as ldap.search
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Create a new item with add

Create a new resource and capture the result.

```robinpath
set $result as ldap.add
print "Created: " + $result
```

### 2. Create and update workflow

Create an item and then update it.

```robinpath
set $created as ldap.add
# Update the created item
ldap.modify
```

### 3. Multi-step LDAP workflow

Chain multiple ldap operations together.

```robinpath
set $r_connect as ldap.connect
set $r_search as ldap.search
set $r_bind as ldap.bind
print "All operations complete"
```

### 4. Safe connect with validation

Check results before proceeding.

```robinpath
set $result as ldap.connect
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
