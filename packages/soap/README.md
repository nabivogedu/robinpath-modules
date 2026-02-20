# @robinpath/soap

> SOAP web service client, XML-RPC support, WSDL parsing, and envelope building

![Category](https://img.shields.io/badge/category-Web-blue) ![Functions](https://img.shields.io/badge/functions-9-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `soap` module lets you:

- Call a SOAP web service
- Build SOAP XML envelope
- Parse SOAP XML response
- Call XML-RPC service
- Build XML-RPC request

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/soap
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
soap.buildEnvelope "GetUser" {"id": 1}
```

## Available Functions

| Function | Description |
|----------|-------------|
| `soap.call` | Call a SOAP web service |
| `soap.buildEnvelope` | Build SOAP XML envelope |
| `soap.parseEnvelope` | Parse SOAP XML response |
| `soap.xmlRpc` | Call XML-RPC service |
| `soap.buildXmlRpc` | Build XML-RPC request |
| `soap.parseXmlRpc` | Parse XML-RPC response |
| `soap.wsdl` | Fetch and parse WSDL |
| `soap.fault` | Create SOAP fault XML |
| `soap.getFault` | Extract fault from SOAP XML |

## Examples

### Build SOAP XML envelope

```robinpath
soap.buildEnvelope "GetUser" {"id": 1}
```

### Parse SOAP XML response

```robinpath
soap.parseEnvelope $xml
```

### Call XML-RPC service

```robinpath
soap.xmlRpc "http://example.com/rpc" "system.listMethods" []
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/soap";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  soap.buildEnvelope "GetUser" {"id": 1}
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
