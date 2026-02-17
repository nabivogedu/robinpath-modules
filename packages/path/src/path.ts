import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import nodePath from "node:path";

// ── Function Handlers ──────────────────────────────────────────────

const join: BuiltinHandler = (args) => {
  const segments = args.map((a: any) => String(a ?? ""));
  return nodePath.join(...segments);
};

const resolve: BuiltinHandler = (args) => {
  const segments = args.map((a: any) => String(a ?? ""));
  return nodePath.resolve(...segments);
};

const dirname: BuiltinHandler = (args) => {
  const p = String(args[0] ?? "");
  return nodePath.dirname(p);
};

const basename: BuiltinHandler = (args) => {
  const p = String(args[0] ?? "");
  const ext = args[1] != null ? String(args[1]) : undefined;
  return nodePath.basename(p, ext);
};

const extname: BuiltinHandler = (args) => {
  const p = String(args[0] ?? "");
  return nodePath.extname(p);
};

const normalize: BuiltinHandler = (args) => {
  const p = String(args[0] ?? "");
  return nodePath.normalize(p);
};

const isAbsolute: BuiltinHandler = (args) => {
  const p = String(args[0] ?? "");
  return nodePath.isAbsolute(p);
};

const relative: BuiltinHandler = (args) => {
  const from = String(args[0] ?? "");
  const to = String(args[1] ?? "");
  return nodePath.relative(from, to);
};

const parse: BuiltinHandler = (args) => {
  const p = String(args[0] ?? "");
  const parsed = nodePath.parse(p);
  return {
    root: parsed.root,
    dir: parsed.dir,
    base: parsed.base,
    ext: parsed.ext,
    name: parsed.name,
  };
};

const separator: BuiltinHandler = () => {
  return nodePath.sep;
};

// ── Exports ────────────────────────────────────────────────────────

export const PathFunctions: Record<string, BuiltinHandler> = {
  join,
  resolve,
  dirname,
  basename,
  extname,
  normalize,
  isAbsolute,
  relative,
  parse,
  separator,
};

export const PathFunctionMetadata = {
  join: {
    description: "Join path segments into a single path",
    parameters: [
      {
        name: "segments",
        dataType: "string",
        description: "Path segments to join",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The joined path string",
    example: 'path.join "/usr" "local" "bin"',
  },
  resolve: {
    description: "Resolve a sequence of paths into an absolute path",
    parameters: [
      {
        name: "segments",
        dataType: "string",
        description: "Path segments to resolve",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The resolved absolute path",
    example: 'path.resolve "src" "index.ts"',
  },
  dirname: {
    description: "Get the directory name of a path",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "The file path",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The directory portion of the path",
    example: 'path.dirname "/usr/local/bin/node"',
  },
  basename: {
    description: "Get the last portion of a path (filename)",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "The file path",
        formInputType: "text",
        required: true,
      },
      {
        name: "ext",
        dataType: "string",
        description: "Optional extension to remove from the result",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "string",
    returnDescription: "The last portion of the path",
    example: 'path.basename "/usr/local/bin/node"',
  },
  extname: {
    description: "Get the file extension of a path",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "The file path",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The extension of the file including the dot",
    example: 'path.extname "index.html"',
  },
  normalize: {
    description: "Normalize a path, resolving '..' and '.' segments",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "The path to normalize",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The normalized path",
    example: 'path.normalize "/usr/local/../bin"',
  },
  isAbsolute: {
    description: "Check whether a path is absolute",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "The path to check",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the path is absolute, false otherwise",
    example: 'path.isAbsolute "/usr/local"',
  },
  relative: {
    description: "Compute the relative path from one path to another",
    parameters: [
      {
        name: "from",
        dataType: "string",
        description: "The base path",
        formInputType: "text",
        required: true,
      },
      {
        name: "to",
        dataType: "string",
        description: "The target path",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The relative path from 'from' to 'to'",
    example: 'path.relative "/usr/local" "/usr/local/bin/node"',
  },
  parse: {
    description: "Parse a path into an object with root, dir, base, ext, and name",
    parameters: [
      {
        name: "path",
        dataType: "string",
        description: "The path to parse",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "An object with root, dir, base, ext, and name properties",
    example: 'path.parse "/home/user/file.txt"',
  },
  separator: {
    description: "Get the platform-specific path segment separator",
    parameters: [],
    returnType: "string",
    returnDescription: "The OS path separator (/ on POSIX, \\ on Windows)",
    example: "path.separator",
  },
};

export const PathModuleMetadata = {
  description: "Path manipulation utilities for joining, resolving, and parsing file paths",
  methods: [
    "join",
    "resolve",
    "dirname",
    "basename",
    "extname",
    "normalize",
    "isAbsolute",
    "relative",
    "parse",
    "separator",
  ],
};
