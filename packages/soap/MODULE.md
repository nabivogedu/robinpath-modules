---
title: "SOAP"
module: "soap"
package: "@robinpath/soap"
description: "SOAP web service client, XML-RPC support, WSDL parsing, and envelope building"
category: "web"
tags: [soap, web]
type: "utility"
auth: "none"
functionCount: 9
---

# SOAP

> SOAP web service client, XML-RPC support, WSDL parsing, and envelope building

**Package:** `@robinpath/soap` | **Category:** Web | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `soap` module when you need to:

- **Call a SOAP web service** -- Use `soap.call` to perform this operation
- **Build SOAP XML envelope** -- Use `soap.buildEnvelope` to perform this operation
- **Parse SOAP XML response** -- Use `soap.parseEnvelope` to perform this operation
- **Call XML-RPC service** -- Use `soap.xmlRpc` to perform this operation
- **Build XML-RPC request** -- Use `soap.buildXmlRpc` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`call`](#call) | Call a SOAP web service | `{status, ok, fault, result, raw}` |
| [`buildEnvelope`](#buildenvelope) | Build SOAP XML envelope | `SOAP XML` |
| [`parseEnvelope`](#parseenvelope) | Parse SOAP XML response | `{fault, result}` |
| [`xmlRpc`](#xmlrpc) | Call XML-RPC service | `{status, ok, fault, params, raw}` |
| [`buildXmlRpc`](#buildxmlrpc) | Build XML-RPC request | `XML-RPC XML` |
| [`parseXmlRpc`](#parsexmlrpc) | Parse XML-RPC response | `{fault, params}` |
| [`wsdl`](#wsdl) | Fetch and parse WSDL | `{services, operations, bindings, raw}` |
| [`fault`](#fault) | Create SOAP fault XML | `Fault XML` |
| [`getFault`](#getfault) | Extract fault from SOAP XML | `{code, message, detail} or null` |


## Functions

### call

Call a SOAP web service

**Module:** `soap` | **Returns:** `object` -- {status, ok, fault, result, raw}

```robinpath
soap.call "http://example.com/ws" "GetUser" {"id": 1} {"namespace": "http://example.com"}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Service URL |
| `method` | `string` | Yes | Method name |
| `params` | `object` | No | Parameters |
| `options` | `object` | No | {namespace, soapAction, headers, timeout} |

---

### buildEnvelope

Build SOAP XML envelope

**Module:** `soap` | **Returns:** `string` -- SOAP XML

```robinpath
soap.buildEnvelope "GetUser" {"id": 1}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `method` | `string` | Yes | Method name |
| `params` | `object` | No | Parameters |
| `namespace` | `string` | No | XML namespace |

---

### parseEnvelope

Parse SOAP XML response

**Module:** `soap` | **Returns:** `object` -- {fault, result}

```robinpath
soap.parseEnvelope $xml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xml` | `string` | Yes | SOAP XML |

---

### xmlRpc

Call XML-RPC service

**Module:** `soap` | **Returns:** `object` -- {status, ok, fault, params, raw}

```robinpath
soap.xmlRpc "http://example.com/rpc" "system.listMethods" []
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | Service URL |
| `method` | `string` | Yes | Method name |
| `params` | `array` | No | Parameters array |
| `options` | `object` | No | {headers, timeout} |

---

### buildXmlRpc

Build XML-RPC request

**Module:** `soap` | **Returns:** `string` -- XML-RPC XML

```robinpath
soap.buildXmlRpc "getUser" [1, "admin"]
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `method` | `string` | Yes | Method name |
| `params` | `array` | No | Parameters |

---

### parseXmlRpc

Parse XML-RPC response

**Module:** `soap` | **Returns:** `object` -- {fault, params}

```robinpath
soap.parseXmlRpc $xml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xml` | `string` | Yes | XML-RPC XML |

---

### wsdl

Fetch and parse WSDL

**Module:** `soap` | **Returns:** `object` -- {services, operations, bindings, raw}

```robinpath
soap.wsdl "http://example.com/ws?wsdl"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | WSDL URL |
| `options` | `object` | No | {timeout} |

---

### fault

Create SOAP fault XML

**Module:** `soap` | **Returns:** `string` -- Fault XML

```robinpath
soap.fault "Client" "Invalid request"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `string` | Yes | Fault code |
| `message` | `string` | Yes | Fault message |
| `detail` | `string` | No | Detail |

---

### getFault

Extract fault from SOAP XML

**Module:** `soap` | **Returns:** `object` -- {code, message, detail} or null

```robinpath
soap.getFault $xml
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xml` | `string` | Yes | SOAP XML |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as soap.call "http://example.com/ws" "GetUser" {"id": 1} {"namespace": "http://example.com"}
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Fault

Retrieve all items and loop through them.

```robinpath
set $result as soap.getFault $xml
each $item in $result
  print $item
end
```

### 2. Multi-step SOAP workflow

Chain multiple soap operations together.

```robinpath
set $r_call as soap.call "http://example.com/ws" "GetUser" {"id": 1} {"namespace": "http://example.com"}
set $r_buildEnvelope as soap.buildEnvelope "GetUser" {"id": 1}
set $r_parseEnvelope as soap.parseEnvelope $xml
print "All operations complete"
```

### 3. Safe call with validation

Check results before proceeding.

```robinpath
set $result as soap.call "http://example.com/ws" "GetUser" {"id": 1} {"namespace": "http://example.com"}
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
