import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

const wrap = (code: string, reset: string) => (args: unknown[]) => `\x1b[${code}m${String(args[0] ?? "")}\x1b[${reset}m`;

const red: BuiltinHandler = (args) => wrap("31", "39")(args);
const green: BuiltinHandler = (args) => wrap("32", "39")(args);
const blue: BuiltinHandler = (args) => wrap("34", "39")(args);
const yellow: BuiltinHandler = (args) => wrap("33", "39")(args);
const cyan: BuiltinHandler = (args) => wrap("36", "39")(args);
const magenta: BuiltinHandler = (args) => wrap("35", "39")(args);
const white: BuiltinHandler = (args) => wrap("37", "39")(args);
const gray: BuiltinHandler = (args) => wrap("90", "39")(args);
const bold: BuiltinHandler = (args) => wrap("1", "22")(args);
const dim: BuiltinHandler = (args) => wrap("2", "22")(args);
const italic: BuiltinHandler = (args) => wrap("3", "23")(args);
const underline: BuiltinHandler = (args) => wrap("4", "24")(args);
const strikethrough: BuiltinHandler = (args) => wrap("9", "29")(args);
const bgRed: BuiltinHandler = (args) => wrap("41", "49")(args);
const bgGreen: BuiltinHandler = (args) => wrap("42", "49")(args);
const bgBlue: BuiltinHandler = (args) => wrap("44", "49")(args);

const strip: BuiltinHandler = (args) => String(args[0] ?? "").replace(/\x1b\[[0-9;]*m/g, "");

const rgb: BuiltinHandler = (args) => {
  const text = String(args[0] ?? "");
  const r = Number(args[1] ?? 0);
  const g = Number(args[2] ?? 0);
  const b = Number(args[3] ?? 0);
  return `\x1b[38;2;${r};${g};${b}m${text}\x1b[39m`;
};

export const ColorFunctions: Record<string, BuiltinHandler> = {
  red, green, blue, yellow, cyan, magenta, white, gray, bold, dim, italic, underline, strikethrough, bgRed, bgGreen, bgBlue, strip, rgb,
};

const colorParam = (desc: string): FunctionMetadata => ({
  description: desc,
  parameters: [{ name: "text", dataType: "string", description: "Text to colorize", formInputType: "text", required: true }],
  returnType: "string",
  returnDescription: "ANSI-colored string",
  example: `color.${desc.split(" ")[0]!.toLowerCase()} "hello"`,
});

export const ColorFunctionMetadata: Record<string, FunctionMetadata> = {
  red: { ...colorParam("Wrap text in red"), example: 'color.red "error"' },
  green: { ...colorParam("Wrap text in green"), example: 'color.green "success"' },
  blue: { ...colorParam("Wrap text in blue"), example: 'color.blue "info"' },
  yellow: { ...colorParam("Wrap text in yellow"), example: 'color.yellow "warning"' },
  cyan: { ...colorParam("Wrap text in cyan"), example: 'color.cyan "info"' },
  magenta: { ...colorParam("Wrap text in magenta"), example: 'color.magenta "special"' },
  white: { ...colorParam("Wrap text in white"), example: 'color.white "text"' },
  gray: { ...colorParam("Wrap text in gray"), example: 'color.gray "muted"' },
  bold: { ...colorParam("Wrap text in bold"), example: 'color.bold "important"' },
  dim: { ...colorParam("Wrap text in dim"), example: 'color.dim "subtle"' },
  italic: { ...colorParam("Wrap text in italic"), example: 'color.italic "emphasis"' },
  underline: { ...colorParam("Wrap text with underline"), example: 'color.underline "link"' },
  strikethrough: { ...colorParam("Wrap text with strikethrough"), example: 'color.strikethrough "deleted"' },
  bgRed: { ...colorParam("Wrap text with red background"), example: 'color.bgRed "alert"' },
  bgGreen: { ...colorParam("Wrap text with green background"), example: 'color.bgGreen "pass"' },
  bgBlue: { ...colorParam("Wrap text with blue background"), example: 'color.bgBlue "info"' },
  strip: { description: "Strip all ANSI escape codes from text", parameters: [{ name: "text", dataType: "string", description: "Text with ANSI codes", formInputType: "text", required: true }], returnType: "string", returnDescription: "Plain text", example: 'color.strip $coloredText' },
  rgb: { description: "Wrap text with custom RGB foreground color", parameters: [{ name: "text", dataType: "string", description: "Text to color", formInputType: "text", required: true }, { name: "r", dataType: "number", description: "Red (0-255)", formInputType: "number", required: true }, { name: "g", dataType: "number", description: "Green (0-255)", formInputType: "number", required: true }, { name: "b", dataType: "number", description: "Blue (0-255)", formInputType: "number", required: true }], returnType: "string", returnDescription: "RGB-colored string", example: 'color.rgb "text" 255 128 0' },
};

export const ColorModuleMetadata: ModuleMetadata = {
  description: "Terminal ANSI color utilities: red, green, blue, bold, underline, RGB, and more",
  methods: ["red", "green", "blue", "yellow", "cyan", "magenta", "white", "gray", "bold", "dim", "italic", "underline", "strikethrough", "bgRed", "bgGreen", "bgBlue", "strip", "rgb"],
};
