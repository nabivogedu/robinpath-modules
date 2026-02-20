---
title: "XML"
module: "xml"
package: "@robinpath/xml"
description: "Parse, build, query, and validate XML data"
category: "utility"
tags: [xml, utility]
type: "utility"
auth: "none"
functionCount: 10
---

# XML

> Parse, build, query, and validate XML data

**Package:** `@robinpath/xml` | **Category:** Utility | **Type:** Utility


## Authentication

No authentication required. All functions are available immediately.


## Use Cases

Use the `xml` module when you need to:

- **Parse an XML string into a JavaScript object** -- Use `xml.parse` to perform this operation
- **Convert a JavaScript object into an XML string** -- Use `xml.stringify` to perform this operation
- **Read an XML file from disk and parse it into a JavaScript object** -- Use `xml.parseFile` to perform this operation
- **Convert a JavaScript object to XML and write it to a file** -- Use `xml.writeFile` to perform this operation
- **Check whether an XML string is well-formed and valid** -- Use `xml.isValid` to perform this operation


## Quick Reference

| Function | Description | Returns |
|----------|-------------|--------|
| [`parse`](#parse) | Parse an XML string into a JavaScript object | `JavaScript object representation of the XML` |
| [`stringify`](#stringify) | Convert a JavaScript object into an XML string | `XML formatted string` |
| [`parseFile`](#parsefile) | Read an XML file from disk and parse it into a JavaScript object | `JavaScript object representation of the XML file contents` |
| [`writeFile`](#writefile) | Convert a JavaScript object to XML and write it to a file | `True if the file was written successfully` |
| [`isValid`](#isvalid) | Check whether an XML string is well-formed and valid | `True if the XML is valid, false otherwise` |
| [`query`](#query) | Parse XML and retrieve a value at a dot-separated path | `The value found at the specified path, or undefined` |
| [`toJSON`](#tojson) | Parse an XML string and return its JSON string representation | `JSON string of the parsed XML` |
| [`fromJSON`](#fromjson) | Parse a JSON string and build an XML string from it | `XML formatted string built from the JSON data` |
| [`getAttribute`](#getattribute) | Retrieve an attribute value from an element at a given path | `The attribute value, or undefined if not found` |
| [`count`](#count) | Count the number of elements at a given path in an XML string | `Number of elements at the specified path (0 if path not found)` |


## Functions

### parse

Parse an XML string into a JavaScript object

**Module:** `xml` | **Returns:** `object` -- JavaScript object representation of the XML

```robinpath
xml.parse "<root><item>hello</item></root>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xmlString` | `string` | Yes | The XML string to parse |

---

### stringify

Convert a JavaScript object into an XML string

**Module:** `xml` | **Returns:** `string` -- XML formatted string

```robinpath
xml.stringify $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `jsObject` | `object` | Yes | The JavaScript object to convert to XML |

---

### parseFile

Read an XML file from disk and parse it into a JavaScript object

**Module:** `xml` | **Returns:** `object` -- JavaScript object representation of the XML file contents

```robinpath
xml.parseFile "/tmp/data.xml"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Absolute or relative path to the XML file |

---

### writeFile

Convert a JavaScript object to XML and write it to a file

**Module:** `xml` | **Returns:** `boolean` -- True if the file was written successfully

```robinpath
xml.writeFile "/tmp/output.xml" $data
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `filePath` | `string` | Yes | Absolute or relative path to the output file |
| `jsObject` | `object` | Yes | The JavaScript object to convert and write as XML |

---

### isValid

Check whether an XML string is well-formed and valid

**Module:** `xml` | **Returns:** `boolean` -- True if the XML is valid, false otherwise

```robinpath
xml.isValid "<root><item/></root>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xmlString` | `string` | Yes | The XML string to validate |

---

### query

Parse XML and retrieve a value at a dot-separated path

**Module:** `xml` | **Returns:** `any` -- The value found at the specified path, or undefined

```robinpath
xml.query "<root><items><item>A</item></items></root>" "root.items.item"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xmlString` | `string` | Yes | The XML string to parse |
| `dotPath` | `string` | Yes | Dot-separated path to the desired element (e.g. "root.items.item") |

---

### toJSON

Parse an XML string and return its JSON string representation

**Module:** `xml` | **Returns:** `string` -- JSON string of the parsed XML

```robinpath
xml.toJSON "<root><item>hello</item></root>"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xmlString` | `string` | Yes | The XML string to convert |

---

### fromJSON

Parse a JSON string and build an XML string from it

**Module:** `xml` | **Returns:** `string` -- XML formatted string built from the JSON data

```robinpath
xml.fromJSON '{"root":{"item":"hello"}}'
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `jsonString` | `string` | Yes | The JSON string to convert to XML |

---

### getAttribute

Retrieve an attribute value from an element at a given path

**Module:** `xml` | **Returns:** `string` -- The attribute value, or undefined if not found

```robinpath
xml.getAttribute "<root><item id=\"1\"/></root>" "root.item" "id"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xmlString` | `string` | Yes | The XML string to parse |
| `elementPath` | `string` | Yes | Dot-separated path to the element (e.g. "root.item") |
| `attributeName` | `string` | Yes | Name of the attribute to retrieve |

---

### count

Count the number of elements at a given path in an XML string

**Module:** `xml` | **Returns:** `number` -- Number of elements at the specified path (0 if path not found)

```robinpath
xml.count "<root><items><item>A</item><item>B</item></items></root>" "root.items.item"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `xmlString` | `string` | Yes | The XML string to parse |
| `elementPath` | `string` | Yes | Dot-separated path to the elements to count (e.g. "root.items.item") |

---

## Error Handling

All functions throw on failure. Common errors:

| Error | Cause |
|-------|-------|
| `writeFile requires a JS object as the second argument` | Check the error message for details |

```robinpath
set $result as xml.parse "<root><item>hello</item></root>"
if $result != null
  print "Success"
else
  print "No result"
end
```


## Recipes

### 1. List and iterate Attribute

Retrieve all items and loop through them.

```robinpath
set $result as xml.getAttribute "<root><item id=\"1\"/></root>" "root.item" "id"
each $item in $result
  print $item
end
```

### 2. Multi-step XML workflow

Chain multiple xml operations together.

```robinpath
set $r_parse as xml.parse "<root><item>hello</item></root>"
set $r_stringify as xml.stringify $data
set $r_parseFile as xml.parseFile "/tmp/data.xml"
print "All operations complete"
```

### 3. Safe parse with validation

Check results before proceeding.

```robinpath
set $result as xml.parse "<root><item>hello</item></root>"
if $result != null
  print "Success: " + $result
else
  print "Operation returned no data"
end
```


## Related Modules

- **json** -- JSON module for complementary functionality
