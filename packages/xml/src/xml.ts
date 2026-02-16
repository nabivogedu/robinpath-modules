import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import * as fs from "node:fs/promises";

// ── Parser / Builder Defaults ─────────────────────────────────────────

const defaultParserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
};

const defaultBuilderOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  format: true,
};

// ── Helper ────────────────────────────────────────────────────────────

function navigatePath(obj: unknown, dotPath: string): unknown {
  const parts = dotPath.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

// ── RobinPath Function Handlers ───────────────────────────────────────

const parse: BuiltinHandler = (args) => {
  const xmlString = String(args[0] ?? "");
  const parser = new XMLParser(defaultParserOptions);
  return parser.parse(xmlString);
};

const stringify: BuiltinHandler = (args) => {
  const jsObject = args[0];
  if (jsObject == null || typeof jsObject !== "object") return "";
  const builder = new XMLBuilder(defaultBuilderOptions);
  return builder.build(jsObject);
};

const parseFile: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const content = await fs.readFile(filePath, { encoding: "utf-8" });
  const parser = new XMLParser(defaultParserOptions);
  return parser.parse(content);
};

const writeFile: BuiltinHandler = async (args) => {
  const filePath = String(args[0] ?? "");
  const jsObject = args[1];
  if (jsObject == null || typeof jsObject !== "object") {
    throw new Error("writeFile requires a JS object as the second argument");
  }
  const builder = new XMLBuilder(defaultBuilderOptions);
  const xmlString = builder.build(jsObject);
  await fs.writeFile(filePath, xmlString, "utf-8");
  return true;
};

const isValid: BuiltinHandler = (args) => {
  const xmlString = String(args[0] ?? "");
  const result = XMLValidator.validate(xmlString);
  return result === true;
};

const query: BuiltinHandler = (args) => {
  const xmlString = String(args[0] ?? "");
  const dotPath = String(args[1] ?? "");
  const parser = new XMLParser(defaultParserOptions);
  const parsed = parser.parse(xmlString);
  return navigatePath(parsed, dotPath);
};

const toJSON: BuiltinHandler = (args) => {
  const xmlString = String(args[0] ?? "");
  const parser = new XMLParser(defaultParserOptions);
  const parsed = parser.parse(xmlString);
  return JSON.stringify(parsed);
};

const fromJSON: BuiltinHandler = (args) => {
  const jsonString = String(args[0] ?? "");
  const obj = JSON.parse(jsonString);
  const builder = new XMLBuilder(defaultBuilderOptions);
  return builder.build(obj);
};

const getAttribute: BuiltinHandler = (args) => {
  const xmlString = String(args[0] ?? "");
  const elementPath = String(args[1] ?? "");
  const attributeName = String(args[2] ?? "");
  const parser = new XMLParser(defaultParserOptions);
  const parsed = parser.parse(xmlString);
  const element = navigatePath(parsed, elementPath);
  if (element == null || typeof element !== "object") return undefined;
  return (element as Record<string, unknown>)[`@_${attributeName}`];
};

const count: BuiltinHandler = (args) => {
  const xmlString = String(args[0] ?? "");
  const elementPath = String(args[1] ?? "");
  const parser = new XMLParser(defaultParserOptions);
  const parsed = parser.parse(xmlString);
  const value = navigatePath(parsed, elementPath);
  if (value == null) return 0;
  if (Array.isArray(value)) return value.length;
  return 1;
};

// ── Exports ───────────────────────────────────────────────────────────

export const XmlFunctions: Record<string, BuiltinHandler> = {
  parse,
  stringify,
  parseFile,
  writeFile,
  isValid,
  query,
  toJSON,
  fromJSON,
  getAttribute,
  count,
};

export const XmlFunctionMetadata: Record<string, FunctionMetadata> = {
  parse: {
    description: "Parse an XML string into a JavaScript object",
    parameters: [
      {
        name: "xmlString",
        dataType: "string",
        description: "The XML string to parse",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "JavaScript object representation of the XML",
    example: 'xml.parse "<root><item>hello</item></root>"',
  },
  stringify: {
    description: "Convert a JavaScript object into an XML string",
    parameters: [
      {
        name: "jsObject",
        dataType: "object",
        description: "The JavaScript object to convert to XML",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "XML formatted string",
    example: "xml.stringify $data",
  },
  parseFile: {
    description: "Read an XML file from disk and parse it into a JavaScript object",
    parameters: [
      {
        name: "filePath",
        dataType: "string",
        description: "Absolute or relative path to the XML file",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "JavaScript object representation of the XML file contents",
    example: 'xml.parseFile "/tmp/data.xml"',
  },
  writeFile: {
    description: "Convert a JavaScript object to XML and write it to a file",
    parameters: [
      {
        name: "filePath",
        dataType: "string",
        description: "Absolute or relative path to the output file",
        formInputType: "text",
        required: true,
      },
      {
        name: "jsObject",
        dataType: "object",
        description: "The JavaScript object to convert and write as XML",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the file was written successfully",
    example: 'xml.writeFile "/tmp/output.xml" $data',
  },
  isValid: {
    description: "Check whether an XML string is well-formed and valid",
    parameters: [
      {
        name: "xmlString",
        dataType: "string",
        description: "The XML string to validate",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the XML is valid, false otherwise",
    example: 'xml.isValid "<root><item/></root>"',
  },
  query: {
    description: "Parse XML and retrieve a value at a dot-separated path",
    parameters: [
      {
        name: "xmlString",
        dataType: "string",
        description: "The XML string to parse",
        formInputType: "textarea",
        required: true,
      },
      {
        name: "dotPath",
        dataType: "string",
        description: "Dot-separated path to the desired element (e.g. \"root.items.item\")",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "any",
    returnDescription: "The value found at the specified path, or undefined",
    example: 'xml.query "<root><items><item>A</item></items></root>" "root.items.item"',
  },
  toJSON: {
    description: "Parse an XML string and return its JSON string representation",
    parameters: [
      {
        name: "xmlString",
        dataType: "string",
        description: "The XML string to convert",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "JSON string of the parsed XML",
    example: 'xml.toJSON "<root><item>hello</item></root>"',
  },
  fromJSON: {
    description: "Parse a JSON string and build an XML string from it",
    parameters: [
      {
        name: "jsonString",
        dataType: "string",
        description: "The JSON string to convert to XML",
        formInputType: "textarea",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "XML formatted string built from the JSON data",
    example: 'xml.fromJSON \'{"root":{"item":"hello"}}\'',
  },
  getAttribute: {
    description: "Retrieve an attribute value from an element at a given path",
    parameters: [
      {
        name: "xmlString",
        dataType: "string",
        description: "The XML string to parse",
        formInputType: "textarea",
        required: true,
      },
      {
        name: "elementPath",
        dataType: "string",
        description: "Dot-separated path to the element (e.g. \"root.item\")",
        formInputType: "text",
        required: true,
      },
      {
        name: "attributeName",
        dataType: "string",
        description: "Name of the attribute to retrieve",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "string",
    returnDescription: "The attribute value, or undefined if not found",
    example: 'xml.getAttribute "<root><item id=\\"1\\"/></root>" "root.item" "id"',
  },
  count: {
    description: "Count the number of elements at a given path in an XML string",
    parameters: [
      {
        name: "xmlString",
        dataType: "string",
        description: "The XML string to parse",
        formInputType: "textarea",
        required: true,
      },
      {
        name: "elementPath",
        dataType: "string",
        description: "Dot-separated path to the elements to count (e.g. \"root.items.item\")",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "Number of elements at the specified path (0 if path not found)",
    example: 'xml.count "<root><items><item>A</item><item>B</item></items></root>" "root.items.item"',
  },
};

export const XmlModuleMetadata: ModuleMetadata = {
  description: "Parse, build, query, and validate XML data",
  methods: [
    "parse",
    "stringify",
    "parseFile",
    "writeFile",
    "isValid",
    "query",
    "toJSON",
    "fromJSON",
    "getAttribute",
    "count",
  ],
};
