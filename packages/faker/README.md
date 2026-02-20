# @robinpath/faker

> Fake data generation with seedable PRNG. Generates names, emails, addresses, lorem ipsum, numbers, dates, UUIDs, colors, IPs, and more. No external dependencies.

![Category](https://img.shields.io/badge/category-Utility-blue) ![Functions](https://img.shields.io/badge/functions-26-green) ![Auth](https://img.shields.io/badge/auth-none-lightgrey) ![License](https://img.shields.io/badge/license-MIT-brightgreen)

## Why use this module?

The `faker` module lets you:

- Set the random seed for reproducible fake data generation
- Generate a random full name
- Generate a random first name
- Generate a random last name
- Generate a random email address

All functions are callable directly from RobinPath scripts with a simple, consistent API.

## Installation

```bash
npm install @robinpath/faker
```

## Quick Start

No credentials needed — start using it right away:

```robinpath
faker.name
```

## Available Functions

| Function | Description |
|----------|-------------|
| `faker.seed` | Set the random seed for reproducible fake data generation |
| `faker.name` | Generate a random full name |
| `faker.firstName` | Generate a random first name |
| `faker.lastName` | Generate a random last name |
| `faker.email` | Generate a random email address |
| `faker.phone` | Generate a random phone number |
| `faker.address` | Generate a random street address |
| `faker.city` | Generate a random city name |
| `faker.country` | Generate a random country name |
| `faker.zipCode` | Generate a random zip code |
| `faker.company` | Generate a random company name |
| `faker.lorem` | Generate lorem ipsum text as words, sentences, or paragraphs |
| `faker.number` | Generate a random integer within a range |
| `faker.float` | Generate a random floating-point number within a range |
| `faker.boolean` | Generate a random boolean value |
| `faker.date` | Generate a random date within a range |
| `faker.uuid` | Generate a random UUID v4 |
| `faker.pick` | Pick a random element from an array |
| `faker.shuffle` | Randomly shuffle an array using Fisher-Yates algorithm |
| `faker.paragraph` | Generate a single random paragraph of lorem ipsum |
| `faker.sentence` | Generate a single random sentence of lorem ipsum |
| `faker.word` | Generate a single random lorem ipsum word |
| `faker.color` | Generate a random color in hex, rgb, or name format |
| `faker.ip` | Generate a random IP address |
| `faker.url` | Generate a random URL |
| `faker.avatar` | Generate a random avatar image URL |

## Examples

### Generate a random full name

```robinpath
faker.name
```

### Generate a random first name

```robinpath
faker.firstName
```

### Generate a random last name

```robinpath
faker.lastName
```

## Integration with RobinPath

```typescript
import { RobinPath } from "@wiredwp/robinpath";
import Module from "@robinpath/faker";

const rp = new RobinPath();
rp.registerModule(Module.name, Module.functions);
rp.registerModuleMeta(Module.name, Module.functionMetadata);

const result = await rp.executeScript(`
  faker.name
`);
```

## Full API Reference

See [MODULE.md](./MODULE.md) for complete documentation including all parameters, return types, error handling, and advanced examples.

## Related Modules

- [`@robinpath/json`](../json) — JSON module for complementary functionality

## License

MIT
