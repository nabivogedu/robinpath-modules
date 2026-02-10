import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { RobinPath } from "@wiredwp/robinpath";
import CsvModule from "../src/index.js";

const SAMPLE_CSV = `name,age,city
Alice,30,New York
Bob,25,London
Charlie,35,"San Francisco"`;

async function runFile(filePath: string) {
  const script = readFileSync(filePath, "utf-8");
  const rp = new RobinPath();

  // Load csv module
  rp.registerModule(CsvModule.name, CsvModule.functions);
  rp.registerModuleMeta(CsvModule.name, CsvModule.functionMetadata);

  // Inject sample CSV data as the "input" builtin
  rp.registerBuiltin("input", () => SAMPLE_CSV);

  // Capture log output
  rp.registerBuiltin("log", (args) => {
    const val = args[0];
    if (typeof val === "object") {
      console.log(JSON.stringify(val, null, 2));
    } else {
      console.log(String(val));
    }
    return null;
  });

  const result = await rp.executeScript(script);
  return result;
}

// Run a specific file or all .robin files in the examples directory
const args = process.argv.slice(2);
const examplesDir = resolve(import.meta.dirname!, ".");

if (args.length > 0) {
  // Run specific file
  const filePath = resolve(args[0]!);
  console.log(`\n▶ Running: ${filePath}\n`);
  await runFile(filePath);
} else {
  // Run all .robin files
  const files = readdirSync(examplesDir)
    .filter((f) => f.endsWith(".robin"))
    .sort();

  for (const file of files) {
    const filePath = join(examplesDir, file);
    console.log(`\n${"─".repeat(50)}`);
    console.log(`▶ Running: ${file}`);
    console.log(`${"─".repeat(50)}\n`);
    await runFile(filePath);
  }
}
