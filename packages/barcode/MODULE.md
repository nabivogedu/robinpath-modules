---
title: "Barcode"
module: "barcode"
package: "@robinpath/barcode"
description: "QR code generation, EAN/UPC barcode validation, ISBN conversion, and Luhn checksum"
category: "utility"
tags: [barcode, utility]
type: "utility"
auth: "none"
functionCount: 14
---

# Barcode

> QR code generation, EAN/UPC barcode validation, ISBN conversion, and Luhn checksum

**Package:** `@robinpath/barcode` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `barcode` module when you need to:

- **Generate QR code as data URL** -- Use `barcode.qrGenerate` to perform this operation
- **Generate QR code to file** -- Use `barcode.qrToFile` to perform this operation
- **Generate QR code as SVG** -- Use `barcode.qrToSvg` to perform this operation
- **Generate QR for terminal** -- Use `barcode.qrToTerminal` to perform this operation
- **Validate EAN-13 barcode** -- Use `barcode.ean13Validate` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`qrGenerate`](#qrgenerate) | Generate QR code as data URL | `Data URL (base64 PNG)` |
| [`qrToFile`](#qrtofile) | Generate QR code to file | `File path` |
| [`qrToSvg`](#qrtosvg) | Generate QR code as SVG | `SVG string` |
| [`qrToTerminal`](#qrtoterminal) | Generate QR for terminal | `Terminal string` |
| [`ean13Validate`](#ean13validate) | Validate EAN-13 barcode | `true if valid` |
| [`ean13Checksum`](#ean13checksum) | Calculate EAN-13 check digit | `Check digit` |
| [`upcValidate`](#upcvalidate) | Validate UPC-A barcode | `true if valid` |
| [`upcChecksum`](#upcchecksum) | Calculate UPC-A check digit | `Check digit` |
| [`isbn10Validate`](#isbn10validate) | Validate ISBN-10 | `true if valid` |
| [`isbn13Validate`](#isbn13validate) | Validate ISBN-13 | `true if valid` |
| [`isbn10to13`](#isbn10to13) | Convert ISBN-10 to ISBN-13 | `ISBN-13` |
| [`isbn13to10`](#isbn13to10) | Convert ISBN-13 to ISBN-10 | `ISBN-10 or null` |
| [`luhn`](#luhn) | Validate Luhn checksum | `true if valid` |
| [`luhnGenerate`](#luhngenerate) | Generate Luhn check digit | `Number with check digit` |


## Functions

### qrGenerate

Generate QR code as data URL

**Module:** `barcode` | **Returns:** `string` -- Data URL (base64 PNG)

```robinpath
barcode.qrGenerate "https://example.com"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text to encode |
| `options` | `object` | No | {width, margin, color, errorCorrectionLevel} |

---

### qrToFile

Generate QR code to file

**Module:** `barcode` | **Returns:** `string` -- File path

```robinpath
barcode.qrToFile "https://example.com" "./qr.png"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text |
| `filePath` | `string` | Yes | Output path |
| `options` | `object` | No | QR options |

---

### qrToSvg

Generate QR code as SVG

**Module:** `barcode` | **Returns:** `string` -- SVG string

```robinpath
barcode.qrToSvg "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text |

---

### qrToTerminal

Generate QR for terminal

**Module:** `barcode` | **Returns:** `string` -- Terminal string

```robinpath
barcode.qrToTerminal "hello"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | `string` | Yes | Text |

---

### ean13Validate

Validate EAN-13 barcode

**Module:** `barcode` | **Returns:** `boolean` -- true if valid

```robinpath
barcode.ean13Validate "4006381333931"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `string` | Yes | 13-digit code |

---

### ean13Checksum

Calculate EAN-13 check digit

**Module:** `barcode` | **Returns:** `string` -- Check digit

```robinpath
barcode.ean13Checksum "400638133393"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `string` | Yes | 12-digit code |

---

### upcValidate

Validate UPC-A barcode

**Module:** `barcode` | **Returns:** `boolean` -- true if valid

```robinpath
barcode.upcValidate "012345678905"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `string` | Yes | 12-digit code |

---

### upcChecksum

Calculate UPC-A check digit

**Module:** `barcode` | **Returns:** `string` -- Check digit

```robinpath
barcode.upcChecksum "01234567890"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `string` | Yes | 11-digit code |

---

### isbn10Validate

Validate ISBN-10

**Module:** `barcode` | **Returns:** `boolean` -- true if valid

```robinpath
barcode.isbn10Validate "0-306-40615-2"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isbn` | `string` | Yes | ISBN-10 |

---

### isbn13Validate

Validate ISBN-13

**Module:** `barcode` | **Returns:** `boolean` -- true if valid

```robinpath
barcode.isbn13Validate "978-0-306-40615-7"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isbn` | `string` | Yes | ISBN-13 |

---

### isbn10to13

Convert ISBN-10 to ISBN-13

**Module:** `barcode` | **Returns:** `string` -- ISBN-13

```robinpath
barcode.isbn10to13 "0306406152"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isbn10` | `string` | Yes | ISBN-10 |

---

### isbn13to10

Convert ISBN-13 to ISBN-10

**Module:** `barcode` | **Returns:** `string` -- ISBN-10 or null

```robinpath
barcode.isbn13to10 "9780306406157"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `isbn13` | `string` | Yes | ISBN-13 |

---

### luhn

Validate Luhn checksum

**Module:** `barcode` | **Returns:** `boolean` -- true if valid

```robinpath
barcode.luhn "4539578763621486"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `number` | `string` | Yes | Number string |

---

### luhnGenerate

Generate Luhn check digit

**Module:** `barcode` | **Returns:** `string` -- Number with check digit

```robinpath
barcode.luhnGenerate "453957876362148"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `number` | `string` | Yes | Number without check digit |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| _(standard errors)_ | Check function parameters and authentication |

```robinpath
set $result as barcode.qrGenerate "https://example.com"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. Multi-step Barcode workflow

Chain multiple barcode operations together.

```robinpath
set $r_qrGenerate as barcode.qrGenerate "https://example.com"
set $r_qrToFile as barcode.qrToFile "https://example.com" "./qr.png"
set $r_qrToSvg as barcode.qrToSvg "hello"
print "All operations complete"
```

### 2. Safe qrGenerate with validation

Check results before proceeding.

```robinpath
set $result as barcode.qrGenerate "https://example.com"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
