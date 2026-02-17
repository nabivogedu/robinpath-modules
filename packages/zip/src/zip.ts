// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { promisify } from "node:util";
import * as zlib from "node:zlib";
import { readFile, writeFile } from "node:fs/promises";

const gzipAsync = promisify(any);
const gunzipAsync = promisify(any);
const deflateAsync = promisify(any);
const inflateAsync = promisify(any);
const brotliCompressAsync = promisify(any);
const brotliDecompressAsync = promisify(any);

const gzip: BuiltinHandler = async (args) => {
  const buf = Buffer.from(String(args[0] ?? ""), "utf-8");
  const compressed = await gzipAsync(buf);
  return compressed.toString("base64");
};

const gunzip: BuiltinHandler = async (args) => {
  const buf = Buffer.from(String(args[0] ?? ""), "base64");
  const decompressed = await gunzipAsync(buf);
  return decompressed.toString("utf-8");
};

const deflate: BuiltinHandler = async (args) => {
  const buf = Buffer.from(String(args[0] ?? ""), "utf-8");
  const compressed = await deflateAsync(buf);
  return compressed.toString("base64");
};

const inflate: BuiltinHandler = async (args) => {
  const buf = Buffer.from(String(args[0] ?? ""), "base64");
  const decompressed = await inflateAsync(buf);
  return decompressed.toString("utf-8");
};

const gzipFile: BuiltinHandler = async (args) => {
  const inputPath = String(args[0] ?? "");
  const outputPath = args[1] != null ? String(args[1]) : inputPath + ".gz";
  const data = await readFile(inputPath);
  const compressed = await gzipAsync(data);
  await writeFile(outputPath, compressed);
  return outputPath;
};

const gunzipFile: BuiltinHandler = async (args) => {
  const inputPath = String(args[0] ?? "");
  const outputPath = args[1] != null ? String(args[1]) : inputPath.replace(/\.gz$/, "");
  const data = await readFile(inputPath);
  const decompressed = await gunzipAsync(data);
  await writeFile(outputPath, decompressed);
  return outputPath;
};

const brotliCompress: BuiltinHandler = async (args) => {
  const buf = Buffer.from(String(args[0] ?? ""), "utf-8");
  const compressed = await brotliCompressAsync(buf);
  return compressed.toString("base64");
};

const brotliDecompress: BuiltinHandler = async (args) => {
  const buf = Buffer.from(String(args[0] ?? ""), "base64");
  const decompressed = await brotliDecompressAsync(buf);
  return decompressed.toString("utf-8");
};

const isGzipped: BuiltinHandler = (args) => {
  const input = String(args[0] ?? "");
  const buf = Buffer.from(input, "base64");
  return buf.length >= 2 && buf[0] === 0x1f && buf[1] === 0x8b;
};

export const ZipFunctions: Record<string, BuiltinHandler> = {
  gzip, gunzip, deflate, inflate, gzipFile, gunzipFile, brotliCompress, brotliDecompress, isGzipped,
};

export const ZipFunctionMetadata = {
  gzip: { description: "Compress a string with gzip, return base64", parameters: [{ name: "str", dataType: "string", description: "String to compress", formInputType: "textarea", required: true }], returnType: "string", returnDescription: "Base64-encoded gzip data", example: 'zip.gzip "hello world"' },
  gunzip: { description: "Decompress a gzip base64 string to text", parameters: [{ name: "base64", dataType: "string", description: "Base64 gzip data", formInputType: "text", required: true }], returnType: "string", returnDescription: "Decompressed string", example: "zip.gunzip $compressed" },
  deflate: { description: "Compress a string with deflate, return base64", parameters: [{ name: "str", dataType: "string", description: "String to compress", formInputType: "textarea", required: true }], returnType: "string", returnDescription: "Base64-encoded deflate data", example: 'zip.deflate "hello"' },
  inflate: { description: "Decompress deflate base64 data to text", parameters: [{ name: "base64", dataType: "string", description: "Base64 deflate data", formInputType: "text", required: true }], returnType: "string", returnDescription: "Decompressed string", example: "zip.inflate $compressed" },
  gzipFile: { description: "Compress a file with gzip", parameters: [{ name: "inputPath", dataType: "string", description: "Path to input file", formInputType: "text", required: true }, { name: "outputPath", dataType: "string", description: "Path for output .gz file", formInputType: "text", required: false }], returnType: "string", returnDescription: "Output file path", example: 'zip.gzipFile "data.txt"' },
  gunzipFile: { description: "Decompress a .gz file", parameters: [{ name: "inputPath", dataType: "string", description: "Path to .gz file", formInputType: "text", required: true }, { name: "outputPath", dataType: "string", description: "Path for output file", formInputType: "text", required: false }], returnType: "string", returnDescription: "Output file path", example: 'zip.gunzipFile "data.txt.gz"' },
  brotliCompress: { description: "Compress a string with Brotli, return base64", parameters: [{ name: "str", dataType: "string", description: "String to compress", formInputType: "textarea", required: true }], returnType: "string", returnDescription: "Base64-encoded Brotli data", example: 'zip.brotliCompress "hello"' },
  brotliDecompress: { description: "Decompress Brotli base64 data to text", parameters: [{ name: "base64", dataType: "string", description: "Base64 Brotli data", formInputType: "text", required: true }], returnType: "string", returnDescription: "Decompressed string", example: "zip.brotliDecompress $compressed" },
  isGzipped: { description: "Check if a base64 string is gzip-compressed", parameters: [{ name: "base64", dataType: "string", description: "Base64 string to check", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if gzipped", example: "zip.isGzipped $data" },
};

export const ZipModuleMetadata = {
  description: "Compression utilities: gzip, deflate, Brotli for strings and files",
  methods: ["gzip", "gunzip", "deflate", "inflate", "gzipFile", "gunzipFile", "brotliCompress", "brotliDecompress", "isGzipped"],
};
