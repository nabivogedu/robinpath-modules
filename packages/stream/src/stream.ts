import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { createReadStream, createWriteStream, readFileSync, writeFileSync, statSync } from "node:fs";
import { pipeline as pipelineAsync } from "node:stream/promises";
import { Transform, Readable } from "node:stream";
import { createHash } from "node:crypto";
import { createInterface } from "node:readline";
import { join, dirname } from "node:path";
import { mkdirSync } from "node:fs";

const readFile: BuiltinHandler = (args) => {
  const filePath = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const encoding = String(opts.encoding ?? "utf-8") as BufferEncoding;
  return readFileSync(filePath, { encoding });
};

const writeFile: BuiltinHandler = (args) => {
  const filePath = String(args[0] ?? "");
  const data = String(args[1] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;
  const encoding = String(opts.encoding ?? "utf-8") as BufferEncoding;
  writeFileSync(filePath, typeof args[1] === "string" ? args[1] : data, { encoding });
  return { path: filePath, size: statSync(filePath).size };
};

const copyFile: BuiltinHandler = async (args) => {
  const src = String(args[0] ?? "");
  const dest = String(args[1] ?? "");
  await pipelineAsync(createReadStream(src), createWriteStream(dest));
  return { src, dest, size: statSync(dest).size };
};

const lines: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const result: string[] = [];
  const rl = createInterface({ input: createReadStream(filePath, { encoding: "utf-8" }), crlfDelay: Infinity });
  for await (const line of rl) result.push(line);
  return result;
};

const transform: BuiltinHandler = async (args) => {
  const inputPath = String(args[0] ?? "");
  const outputPath = String(args[1] ?? "");
  const transformType = String(args[2] ?? "trim");
  const transformArgs = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  let lineCount = 0;
  const transformer = new Transform({
    transform(chunk, _encoding, callback) {
      const text = chunk.toString();
      const outputLines = text.split("\n").map((line: string) => {
        lineCount++;
        switch (transformType) {
          case "uppercase": return line.toUpperCase();
          case "lowercase": return line.toLowerCase();
          case "trim": return line.trim();
          case "prefix": return `${transformArgs.prefix ?? ""}${line}`;
          case "suffix": return `${line}${transformArgs.suffix ?? ""}`;
          case "replace": return line.replaceAll(String(transformArgs.search ?? ""), String(transformArgs.replace ?? ""));
          default: return line;
        }
      });
      callback(null, outputLines.join("\n"));
    },
  });

  await pipelineAsync(createReadStream(inputPath, { encoding: "utf-8" }), transformer, createWriteStream(outputPath));
  return { inputPath, outputPath, linesProcessed: lineCount };
};

const filter: BuiltinHandler = async (args) => {
  const inputPath = String(args[0] ?? "");
  const outputPath = String(args[1] ?? "");
  const pattern = new RegExp(String(args[2] ?? ""));

  let matched = 0;
  let total = 0;
  const filterer = new Transform({
    transform(chunk, _encoding, callback) {
      const lines = chunk.toString().split("\n");
      const kept: string[] = [];
      for (const line of lines) {
        total++;
        if (pattern.test(line)) { kept.push(line); matched++; }
      }
      callback(null, kept.join("\n"));
    },
  });

  await pipelineAsync(createReadStream(inputPath, { encoding: "utf-8" }), filterer, createWriteStream(outputPath));
  return { inputPath, outputPath, totalLines: total, matchedLines: matched };
};

const concat: BuiltinHandler = async (args) => {
  const inputPaths = (args[0] ?? []) as string[];
  const outputPath = String(args[1] ?? "");
  const out = createWriteStream(outputPath);

  for (const p of inputPaths) {
    await pipelineAsync(createReadStream(String(p)), out, { end: false });
  }
  out.end();

  return { outputPath, filesConcatenated: inputPaths.length, size: statSync(outputPath).size };
};

const split: BuiltinHandler = async (args) => {
  const inputPath = String(args[0] ?? "");
  const outputDir = String(args[1] ?? ".");
  const linesPerChunk = Number(args[2] ?? 1000);

  const outputFiles: string[] = [];
  let chunkIndex = 0;
  let lineCount = 0;
  let currentOut: ReturnType<typeof createWriteStream> | null = null;

  const rl = createInterface({ input: createReadStream(inputPath, { encoding: "utf-8" }), crlfDelay: Infinity });

  for await (const line of rl) {
    if (lineCount % linesPerChunk === 0) {
      if (currentOut) currentOut.end();
      const chunkPath = join(outputDir, `chunk_${String(chunkIndex).padStart(4, "0")}.txt`);
      try { mkdirSync(dirname(chunkPath), { recursive: true }); } catch {}
      currentOut = createWriteStream(chunkPath);
      outputFiles.push(chunkPath);
      chunkIndex++;
    }
    currentOut!.write(line + "\n");
    lineCount++;
  }
  if (currentOut) currentOut.end();

  return { outputFiles, totalLines: lineCount, chunks: chunkIndex };
};

const count: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  let lineCount = 0;
  const rl = createInterface({ input: createReadStream(filePath, { encoding: "utf-8" }), crlfDelay: Infinity });
  for await (const _ of rl) lineCount++;
  return lineCount;
};

const head: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const n = Number(args[1] ?? 10);
  const result: string[] = [];
  const rl = createInterface({ input: createReadStream(filePath, { encoding: "utf-8" }), crlfDelay: Infinity });
  for await (const line of rl) {
    result.push(line);
    if (result.length >= n) break;
  }
  rl.close();
  return result.join("\n");
};

const tail: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const n = Number(args[1] ?? 10);
  const buffer: string[] = [];
  const rl = createInterface({ input: createReadStream(filePath, { encoding: "utf-8" }), crlfDelay: Infinity });
  for await (const line of rl) {
    buffer.push(line);
    if (buffer.length > n) buffer.shift();
  }
  return buffer.join("\n");
};

const pipe: BuiltinHandler = async (args) => {
  const url = String(args[0] ?? "");
  const outputPath = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const headers: Record<string, string> = {};
  if (typeof opts.headers === "object" && opts.headers !== null) {
    for (const [k, v] of Object.entries(opts.headers as Record<string, unknown>)) headers[k] = String(v);
  }

  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  const arrayBuffer = await response.arrayBuffer();
  writeFileSync(outputPath, Buffer.from(arrayBuffer));
  const size = statSync(outputPath).size;
  return { path: outputPath, size };
};

const hash: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const algorithm = String(args[1] ?? "sha256");

  return new Promise<string>((resolve: any, reject: any) => {
    const h = createHash(algorithm);
    const stream = createReadStream(filePath);
    stream.on("data", (chunk: any) => h.update(chunk));
    stream.on("end", () => resolve(h.digest("hex")));
    stream.on("error", reject);
  });
};

export const StreamFunctions: Record<string, BuiltinHandler> = {
  readFile, writeFile, copyFile, lines, transform, filter, concat, split, count, head, tail, pipe, hash,
};

export const StreamFunctionMetadata = {
  readFile: { description: "Read entire file content", parameters: [{ name: "filePath", dataType: "string", description: "File path", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{encoding}", formInputType: "text", required: false }], returnType: "string", returnDescription: "File content", example: 'stream.readFile "./data.txt"' },
  writeFile: { description: "Write data to file", parameters: [{ name: "filePath", dataType: "string", description: "File path", formInputType: "text", required: true }, { name: "data", dataType: "string", description: "Content to write", formInputType: "text", required: true }], returnType: "object", returnDescription: "{path, size}", example: 'stream.writeFile "./out.txt" "hello"' },
  copyFile: { description: "Stream-copy a file", parameters: [{ name: "src", dataType: "string", description: "Source path", formInputType: "text", required: true }, { name: "dest", dataType: "string", description: "Destination path", formInputType: "text", required: true }], returnType: "object", returnDescription: "{src, dest, size}", example: 'stream.copyFile "./a.txt" "./b.txt"' },
  lines: { description: "Read file line by line into array", parameters: [{ name: "filePath", dataType: "string", description: "File path", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of lines", example: 'stream.lines "./data.csv"' },
  transform: { description: "Transform file line by line", parameters: [{ name: "inputPath", dataType: "string", description: "Input file", formInputType: "text", required: true }, { name: "outputPath", dataType: "string", description: "Output file", formInputType: "text", required: true }, { name: "type", dataType: "string", description: "uppercase|lowercase|trim|prefix|suffix|replace", formInputType: "text", required: true }, { name: "args", dataType: "object", description: "{prefix, suffix, search, replace}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{inputPath, outputPath, linesProcessed}", example: 'stream.transform "./in.txt" "./out.txt" "uppercase"' },
  filter: { description: "Filter file lines by regex pattern", parameters: [{ name: "inputPath", dataType: "string", description: "Input file", formInputType: "text", required: true }, { name: "outputPath", dataType: "string", description: "Output file", formInputType: "text", required: true }, { name: "pattern", dataType: "string", description: "Regex pattern", formInputType: "text", required: true }], returnType: "object", returnDescription: "{totalLines, matchedLines}", example: 'stream.filter "./log.txt" "./errors.txt" "ERROR"' },
  concat: { description: "Concatenate multiple files", parameters: [{ name: "inputPaths", dataType: "array", description: "Array of file paths", formInputType: "text", required: true }, { name: "outputPath", dataType: "string", description: "Output file", formInputType: "text", required: true }], returnType: "object", returnDescription: "{outputPath, filesConcatenated, size}", example: 'stream.concat ["a.txt", "b.txt"] "merged.txt"' },
  split: { description: "Split file into chunks", parameters: [{ name: "inputPath", dataType: "string", description: "Input file", formInputType: "text", required: true }, { name: "outputDir", dataType: "string", description: "Output directory", formInputType: "text", required: true }, { name: "linesPerChunk", dataType: "number", description: "Lines per chunk", formInputType: "text", required: false }], returnType: "object", returnDescription: "{outputFiles, totalLines, chunks}", example: 'stream.split "./big.csv" "./chunks" 1000' },
  count: { description: "Count lines in file", parameters: [{ name: "filePath", dataType: "string", description: "File path", formInputType: "text", required: true }], returnType: "number", returnDescription: "Line count", example: 'stream.count "./data.txt"' },
  head: { description: "Read first N lines", parameters: [{ name: "filePath", dataType: "string", description: "File path", formInputType: "text", required: true }, { name: "n", dataType: "number", description: "Number of lines (default 10)", formInputType: "text", required: false }], returnType: "string", returnDescription: "First N lines", example: 'stream.head "./data.txt" 20' },
  tail: { description: "Read last N lines", parameters: [{ name: "filePath", dataType: "string", description: "File path", formInputType: "text", required: true }, { name: "n", dataType: "number", description: "Number of lines (default 10)", formInputType: "text", required: false }], returnType: "string", returnDescription: "Last N lines", example: 'stream.tail "./log.txt" 50' },
  pipe: { description: "Download URL to file via stream", parameters: [{ name: "url", dataType: "string", description: "URL to download", formInputType: "text", required: true }, { name: "outputPath", dataType: "string", description: "Output file path", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{headers}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path, size}", example: 'stream.pipe "https://example.com/file.zip" "./file.zip"' },
  hash: { description: "Stream-hash a file", parameters: [{ name: "filePath", dataType: "string", description: "File path", formInputType: "text", required: true }, { name: "algorithm", dataType: "string", description: "Hash algorithm (default sha256)", formInputType: "text", required: false }], returnType: "string", returnDescription: "Hex hash string", example: 'stream.hash "./data.bin" "sha256"' },
};

export const StreamModuleMetadata = {
  description: "Stream processing for large files: read, write, transform, filter, split, concat, hash without loading into memory",
  methods: ["readFile", "writeFile", "copyFile", "lines", "transform", "filter", "concat", "split", "count", "head", "tail", "pipe", "hash"],
};
