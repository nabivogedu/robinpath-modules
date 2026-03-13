---
title: "StringDecoder"
module: "string-decoder"
package: "@robinpath/string-decoder"
description: "Decode binary buffers to strings with proper multi-byte character handling"
category: "core"
tags: [string-decoder, encoding, buffer, utf8, core]
type: "builtin"
auth: "none"
functionCount: 6
---

# StringDecoder

> Decode binary buffers to strings with proper multi-byte character handling

**Package:** `@robinpath/stringDecoder` | **Category:** Core | **Type:** Built-in

## Authentication

No authentication required. All functions are available immediately.

## Use Cases

Use the `stringDecoder` module when you need to:

- **Decode binary buffers to strings** -- Use `stringDecoder.decode` for one-shot decoding
- **Create a streaming decoder** -- Use `stringDecoder.create` for incremental decoding
- **Handle multi-byte characters** -- Use `stringDecoder.write` to safely decode partial buffers
- **Flush remaining bytes** -- Use `stringDecoder.end` to get any trailing characters

## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`create`](#create) | Create a new string decoder instance | `Object` |
| [`write`](#write) | Write a buffer chunk to the decoder | `string` |
| [`end`](#end) | Flush any remaining bytes as a string | `string` |
| [`decode`](#decode) | Decode a buffer to string in one shot | `string` |
| [`destroy`](#destroy) | Destroy a decoder instance | `boolean` |
| [`active`](#active) | Get count of active decoders | `number` |

## Functions

### create

Create a new string decoder instance for a given encoding

**Module:** `stringDecoder` | **Returns:** `Object` -- Decoder handle

```robinpath
stringDecoder.create "utf8"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `encoding` | `string` | No | Character encoding (default: "utf8") |

---

### write

Write a buffer chunk to the decoder, returning decoded string

**Module:** `stringDecoder` | **Returns:** `string` -- Decoded string from this chunk

```robinpath
stringDecoder.write $decoder $bufferChunk
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `decoder` | `Object` | Yes | Decoder handle from create |
| `buffer` | `Buffer` | Yes | Buffer chunk to decode |

---

### end

Flush any remaining incomplete multi-byte characters

**Module:** `stringDecoder` | **Returns:** `string` -- Any remaining decoded characters

```robinpath
stringDecoder.end $decoder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `decoder` | `Object` | Yes | Decoder handle from create |

---

### decode

Decode a complete buffer to a string in one shot

**Module:** `stringDecoder` | **Returns:** `string` -- Decoded string

```robinpath
stringDecoder.decode $buffer "utf8"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `buffer` | `Buffer` | Yes | Buffer to decode |
| `encoding` | `string` | No | Character encoding (default: "utf8") |

---

### destroy

Destroy a decoder instance and free resources

**Module:** `stringDecoder` | **Returns:** `boolean` -- True if decoder was destroyed

```robinpath
stringDecoder.destroy $decoder
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `decoder` | `Object` | Yes | Decoder handle to destroy |

---

### active

Get the count of currently active decoder instances

**Module:** `stringDecoder` | **Returns:** `number` -- Number of active decoders

```robinpath
stringDecoder.active
```

No parameters required.

---

## Error Handling

| Error | Cause |
|-------|-------|
| Invalid encoding | Unsupported encoding specified |
| Invalid buffer | Input is not a valid buffer |

```robinpath
@desc "Decode buffer safely"
do
  set $decoder as stringDecoder.create "utf8"
  set $text as stringDecoder.write $decoder $data
  set $remaining as stringDecoder.end $decoder
  print $text + $remaining
  stringDecoder.destroy $decoder
enddo
```

## Recipes

### 1. Decode a binary file

Read binary data and decode to string.

```robinpath
@desc "Read and decode binary file"
do
  set $binary as file.readBinary "/data/message.bin"
  set $text as stringDecoder.decode $binary "utf8"
  print "Decoded: " + $text
enddo
```

### 2. Streaming decode with chunks

Process multiple buffer chunks incrementally.

```robinpath
@desc "Decode streaming data"
do
  set $decoder as stringDecoder.create "utf8"
  set $chunks as [$chunk1, $chunk2, $chunk3]
  set $result as ""
  each $chunk in $chunks
    set $part as stringDecoder.write $decoder $chunk
    set $result as $result + $part
  endeach
  set $final as stringDecoder.end $decoder
  set $result as $result + $final
  print "Full text: " + $result
  stringDecoder.destroy $decoder
enddo
```

## Related Modules

- **buffer** -- Buffer creation and manipulation
- **stream** -- Stream-based processing
- **util** -- Text encoding utilities
