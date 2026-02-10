# RobinPath Modules

Reusable modules for [RobinPath](https://www.npmjs.com/package/@wiredwp/robinpath) — the scripting language for automation workflows.

## Packages

| Package | Description |
|---------|-------------|
| [@robinpath/csv](./packages/csv) | Parse and stringify CSV data |

## Usage

```ts
import { RobinPath } from "@wiredwp/robinpath";
import CsvModule from "@robinpath/csv";

const rp = new RobinPath();
rp.registerModule(CsvModule.name, CsvModule.functions);
rp.registerModuleMeta(CsvModule.name, CsvModule.functionMetadata);

await rp.executeScript('set $data = csv.parse "name,age\nAlice,30\nBob,25"');
```

## Development

```bash
npm install
cd packages/csv
npm run build
npm test
```
