# @robinpath/form

> Multipart form data builder, file uploads, URL encoding/decoding, and form submission

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-8-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `form` module lets you:

- Create a FormData object from key-value pairs
- Add a text field to a FormData
- Add a file to a FormData
- Submit a FormData to a URL
- URL-encode an object as application/x-www-form-urlencoded

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/form
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
form.addField $form "name" "Alice"
```

## Available Functions

| Function | Description |
|----------|-------------|
| `form.create` | Create a FormData object from key-value pairs |
| `form.addField` | Add a text field to a FormData |
| `form.addFile` | Add a file to a FormData |
| `form.submit` | Submit a FormData to a URL |
| `form.encode` | URL-encode an object as application/x-www-form-urlencoded |
| `form.decode` | Decode a URL-encoded form body |
| `form.uploadFile` | Upload a file to a URL as multipart form |
| `form.parseMultipart` | Parse a multipart form body |

## Examples

### Add a text field to a FormData

```robinpath
form.addField $form "name" "Alice"
```

### Add a file to a FormData

```robinpath
form.addFile $form "avatar" "./photo.jpg"
```

### Submit a FormData to a URL

```robinpath
form.submit "https://api.example.com/upload" $form
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/form";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  form.addField $form "name" "Alice"
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
