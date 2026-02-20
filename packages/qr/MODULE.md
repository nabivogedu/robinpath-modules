---
title: "QR Code"
module: "qr"
package: "@robinpath/qr"
description: "QR Code module for RobinPath."
category: "utility"
tags: [qr, utility]
type: "utility"
auth: "none"
functionCount: 8
baseUrl: "https://api.qrserver.com"
---

# QR Code

> QR Code module for RobinPath.

**Package:** `@robinpath/qr` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `qr` module when you need to:

- **generateQrUrl** -- Use `qr.generateQrUrl` to perform this operation
- **generateQrDataUrl** -- Use `qr.generateQrDataUrl` to perform this operation
- **generateWifiQr** -- Use `qr.generateWifiQr` to perform this operation
- **generateVCardQr** -- Use `qr.generateVCardQr` to perform this operation
- **generateEmailQr** -- Use `qr.generateEmailQr` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`generateQrUrl`](#generateqrurl) | generateQrUrl | `object` |
| [`generateQrDataUrl`](#generateqrdataurl) | generateQrDataUrl | `object` |
| [`generateWifiQr`](#generatewifiqr) | generateWifiQr | `object` |
| [`generateVCardQr`](#generatevcardqr) | generateVCardQr | `object` |
| [`generateEmailQr`](#generateemailqr) | generateEmailQr | `object` |
| [`generateSmsQr`](#generatesmsqr) | generateSmsQr | `object` |
| [`generateUrlQr`](#generateurlqr) | generateUrlQr | `object` |
| [`generateTextQr`](#generatetextqr) | generateTextQr | `object` |


## Functions

### generateQrUrl

generateQrUrl

**Module:** `qr` | **Returns:** `object` -- API response.

```robinpath
qr.generateQrUrl
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### generateQrDataUrl

generateQrDataUrl

**Module:** `qr` | **Returns:** `object` -- API response.

```robinpath
qr.generateQrDataUrl
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### generateWifiQr

generateWifiQr

**Module:** `qr` | **Returns:** `object` -- API response.

```robinpath
qr.generateWifiQr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### generateVCardQr

generateVCardQr

**Module:** `qr` | **Returns:** `object` -- API response.

```robinpath
qr.generateVCardQr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### generateEmailQr

generateEmailQr

**Module:** `qr` | **Returns:** `object` -- API response.

```robinpath
qr.generateEmailQr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### generateSmsQr

generateSmsQr

**Module:** `qr` | **Returns:** `object` -- API response.

```robinpath
qr.generateSmsQr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### generateUrlQr

generateUrlQr

**Module:** `qr` | **Returns:** `object` -- API response.

```robinpath
qr.generateUrlQr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

### generateTextQr

generateTextQr

**Module:** `qr` | **Returns:** `object` -- API response.

```robinpath
qr.generateTextQr
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `input` | `string` | No | Input parameter |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `Qr API error (${res.status}): ${t}` | Check the error message for details |
| `Qr: "..." not configured. Call qr.setCredentials first.` | Check the error message for details |

```robinpath
set $result as qr.generateQrUrl
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step QR Code workflow

Chain multiple qr operations together.

```robinpath
set $r_generateQrUrl as qr.generateQrUrl
set $r_generateQrDataUrl as qr.generateQrDataUrl
set $r_generateWifiQr as qr.generateWifiQr
print "All operations complete"
```

### 2. Safe generateQrUrl with validation

Check results before proceeding.

```robinpath
set $result as qr.generateQrUrl
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
