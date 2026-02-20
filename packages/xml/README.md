# @robinpath/xml

> Parse, build, query, and validate XML data

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-10-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `xml` module lets you:

- Parse an XML string into a JavaScript object
- Convert a JavaScript object into an XML string
- Read an XML file from disk and parse it into a JavaScript object
- Convert a JavaScript object to XML and write it to a file
- Check whether an XML string is well-formed and valid

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/xml
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
xml.stringify $data
```

## Available Functions

| Function | Description |
|----------|-------------|
| `xml.parse` | Parse an XML string into a JavaScript object |
| `xml.stringify` | Convert a JavaScript object into an XML string |
| `xml.parseFile` | Read an XML file from disk and parse it into a JavaScript object |
| `xml.writeFile` | Convert a JavaScript object to XML and write it to a file |
| `xml.isValid` | Check whether an XML string is well-formed and valid |
| `xml.query` | Parse XML and retrieve a value at a dot-separated path |
| `xml.toJSON` | Parse an XML string and return its JSON string representation |
| `xml.fromJSON` | Parse a JSON string and build an XML string from it |
| `xml.getAttribute` | Retrieve an attribute value from an element at a given path |
| `xml.count` | Count the number of elements at a given path in an XML string |

## Examples

### Convert a JavaScript object into an XML string

```robinpath
xml.stringify $data
```

### Read an XML file from disk and parse it into a JavaScript object

```robinpath
xml.parseFile "/tmp/data.xml"
```

### Convert a JavaScript object to XML and write it to a file

```robinpath
xml.writeFile "/tmp/output.xml" $data
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/xml";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  xml.stringify $data
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
