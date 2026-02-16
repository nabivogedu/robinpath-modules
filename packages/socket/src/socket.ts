import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import WebSocket from "ws";

const connections = new Map<string, { ws: WebSocket; messages: unknown[]; maxHistory: number }>();

const connect: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const url = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  if (!url) throw new Error("WebSocket URL is required");

  return new Promise<{ name: string; url: string; connected: boolean }>((resolve, reject) => {
    const headers = (typeof opts.headers === "object" && opts.headers !== null ? opts.headers : {}) as Record<string, string>;
    const ws = new WebSocket(url, { headers });
    const state = { ws, messages: [] as unknown[], maxHistory: Number(opts.maxHistory ?? 100) };

    ws.on("message", (data) => {
      const msg = data.toString();
      try { state.messages.push(JSON.parse(msg)); } catch { state.messages.push(msg); }
      if (state.messages.length > state.maxHistory) state.messages.shift();
    });

    ws.on("open", () => { connections.set(name, state); resolve({ name, url, connected: true }); });
    ws.on("error", (err) => reject(new Error(`WebSocket error: ${err.message}`)));

    const timeout = Number(opts.timeout ?? 10000);
    setTimeout(() => reject(new Error("WebSocket connection timeout")), timeout);
  });
};

const send: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const data = args[1];
  const conn = connections.get(name);
  if (!conn) throw new Error(`Connection "${name}" not found`);
  if (conn.ws.readyState !== WebSocket.OPEN) throw new Error(`Connection "${name}" is not open`);
  const msg = typeof data === "string" ? data : JSON.stringify(data);
  conn.ws.send(msg);
  return true;
};

const receive: BuiltinHandler = async (args) => {
  const name = String(args[0] ?? "default");
  const timeoutMs = parseInt(String(args[1] ?? "10000"), 10);
  const conn = connections.get(name);
  if (!conn) throw new Error(`Connection "${name}" not found`);

  return new Promise<unknown>((resolve, reject) => {
    const handler = (data: WebSocket.RawData) => { clearTimeout(timer); try { resolve(JSON.parse(data.toString())); } catch { resolve(data.toString()); } };
    const timer = setTimeout(() => { conn.ws.removeListener("message", handler); reject(new Error("Receive timeout")); }, timeoutMs);
    conn.ws.once("message", handler);
  });
};

const messages: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const limit = parseInt(String(args[1] ?? "50"), 10);
  const conn = connections.get(name);
  if (!conn) throw new Error(`Connection "${name}" not found`);
  return conn.messages.slice(-limit);
};

const isConnected: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const conn = connections.get(name);
  return conn ? conn.ws.readyState === WebSocket.OPEN : false;
};

const close: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const conn = connections.get(name);
  if (!conn) return false;
  conn.ws.close();
  connections.delete(name);
  return true;
};

const onMessage: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const handler = args[1];
  if (typeof handler !== "function") throw new Error("Handler must be a function");
  const conn = connections.get(name);
  if (!conn) throw new Error(`Connection "${name}" not found`);
  conn.ws.on("message", (data) => {
    try { (handler as Function)(JSON.parse(data.toString())); } catch { (handler as Function)(data.toString()); }
  });
  return true;
};

const ping: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const conn = connections.get(name);
  if (!conn || conn.ws.readyState !== WebSocket.OPEN) return false;
  conn.ws.ping();
  return true;
};

export const SocketFunctions: Record<string, BuiltinHandler> = { connect, send, receive, messages, isConnected, close, onMessage, ping };

export const SocketFunctionMetadata: Record<string, FunctionMetadata> = {
  connect: { description: "Connect to a WebSocket server", parameters: [{ name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true }, { name: "url", dataType: "string", description: "WebSocket URL (ws:// or wss://)", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{headers, timeout, maxHistory}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{name, url, connected}", example: 'socket.connect "slack" "wss://wss.slack.com/link"' },
  send: { description: "Send a message through a WebSocket connection", parameters: [{ name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true }, { name: "data", dataType: "any", description: "Message (string or JSON)", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if sent", example: 'socket.send "slack" {"type": "message", "text": "Hello"}' },
  receive: { description: "Wait for and receive the next message", parameters: [{ name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true }, { name: "timeout", dataType: "number", description: "Timeout in ms (default 10000)", formInputType: "text", required: false }], returnType: "any", returnDescription: "Received message", example: 'socket.receive "slack" 5000' },
  messages: { description: "Get recent message history", parameters: [{ name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true }, { name: "limit", dataType: "number", description: "Max messages (default 50)", formInputType: "text", required: false }], returnType: "array", returnDescription: "Array of recent messages", example: 'socket.messages "slack" 10' },
  isConnected: { description: "Check if a WebSocket is connected", parameters: [{ name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if open", example: 'socket.isConnected "slack"' },
  close: { description: "Close a WebSocket connection", parameters: [{ name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if closed", example: 'socket.close "slack"' },
  onMessage: { description: "Register a handler for incoming messages", parameters: [{ name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true }, { name: "handler", dataType: "function", description: "Callback function", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True", example: 'socket.onMessage "slack" $handler' },
  ping: { description: "Send a ping to keep the connection alive", parameters: [{ name: "name", dataType: "string", description: "Connection name", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if sent", example: 'socket.ping "slack"' },
};

export const SocketModuleMetadata: ModuleMetadata = {
  description: "WebSocket client for real-time communication with message history, handlers, and connection management",
  methods: ["connect", "send", "receive", "messages", "isConnected", "close", "onMessage", "ping"],
};
