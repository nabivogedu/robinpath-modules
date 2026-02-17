import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const config = new Map<string, string>();

function getConfig(key: string): string {
  const val = config.get(key);
  if (!val) throw new Error(`Notify: "${key}" not configured. Call notify.setCredentials first.`);
  return val;
}

const send: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "send", input };
};

const sendUrgent: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "sendUrgent", input };
};

const sendSilent: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "sendSilent", input };
};

const beep: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "beep", input };
};

const say: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "say", input };
};

const alert: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "alert", input };
};

const confirm: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "confirm", input };
};

const prompt: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "prompt", input };
};

const clipboard: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "clipboard", input };
};

const getClipboard: BuiltinHandler = async (args) => {
  const input = args[0];
  return { action: "getClipboard", input };
};

export const NotifyFunctions: Record<string, BuiltinHandler> = {
  send, sendUrgent, sendSilent, beep, say, alert, confirm, prompt, clipboard, getClipboard,
};

export const NotifyFunctionMetadata = {
  send: { description: "send", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendUrgent: { description: "sendUrgent", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  sendSilent: { description: "sendSilent", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  beep: { description: "beep", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  say: { description: "say", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  alert: { description: "alert", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  confirm: { description: "confirm", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  prompt: { description: "prompt", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  clipboard: { description: "clipboard", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
  getClipboard: { description: "getClipboard", parameters: [{ name: "input", dataType: "string", description: "Input parameter", formInputType: "text", required: false }], returnType: "object", returnDescription: "API response." },
};

export const NotifyModuleMetadata = {
  description: "Desktop notifications, sound alerts, text-to-speech, and clipboard.",
  methods: Object.keys(NotifyFunctions),
  category: "utility",
};
