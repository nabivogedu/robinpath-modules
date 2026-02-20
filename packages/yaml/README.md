# @robinpath/yaml

> Parse, stringify, and manipulate YAML data

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-9-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `yaml` module lets you:

- Parse a YAML string into a JavaScript object, array, or value
- Convert a JavaScript value into a YAML string
- Read and parse a YAML file from disk
- Write a value as YAML to a file on disk
- Parse a multi-document YAML string into an array of documents

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/yaml
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
yaml.stringify $data
```

## Available Functions

| Function | Description |
|----------|-------------|
| `yaml.parse` | Parse a YAML string into a JavaScript object, array, or value |
| `yaml.stringify` | Convert a JavaScript value into a YAML string |
| `yaml.parseFile` | Read and parse a YAML file from disk |
| `yaml.writeFile` | Write a value as YAML to a file on disk |
| `yaml.parseAll` | Parse a multi-document YAML string into an array of documents |
| `yaml.isValid` | Check whether a string is valid YAML |
| `yaml.get` | Parse YAML and retrieve a nested value by dot-path |
| `yaml.toJSON` | Convert a YAML string to a JSON string |
| `yaml.fromJSON` | Convert a JSON string to a YAML string |

## Examples

### Convert a JavaScript value into a YAML string

```robinpath
yaml.stringify $data
```

### Read and parse a YAML file from disk

```robinpath
yaml.parseFile "config.yaml"
```

### Write a value as YAML to a file on disk

```robinpath
yaml.writeFile "output.yaml" $data
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/yaml";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  yaml.stringify $data
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
