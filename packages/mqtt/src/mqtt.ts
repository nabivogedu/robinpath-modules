// @ts-nocheck
import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import mqtt from "mqtt";

const clients: Map<string, mqtt.MqttClient> = new Map();
const messageHandlers: Map<string, Map<string, (topic: string, message: Buffer) => void>> = new Map();
const lastMessages: Map<string, Map<string, string>> = new Map();
const subscribedTopics: Map<string, Set<string>> = new Map();
const defaultQos: Map<string, number> = new Map();

function getClient(id: string): mqtt.MqttClient {
  const client = clients.get(id);
  if (!client) {
    throw new Error(`MQTT client "${id}" not found. Call connect() first.`);
  }
  return client;
}

const connect: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const brokerUrl = String(args[1] ?? "mqtt://localhost:1883");
  const options = (args[2] ?? {}) as mqtt.IClientOptions;

  if (clients.has(id)) {
    throw new Error(`MQTT client "${id}" already exists. Disconnect first or use a different id.`);
  }

  const client = mqtt.connect(brokerUrl, options);

  clients.set(id, client);
  messageHandlers.set(id, new Map());
  lastMessages.set(id, new Map());
  subscribedTopics.set(id, new Set());
  defaultQos.set(id, 0);

  client.on("message", (topic: string, message: Buffer) => {
    const msgs = lastMessages.get(id);
    if (msgs) {
      msgs.set(topic, message.toString());
    }

    const handlers = messageHandlers.get(id);
    if (handlers) {
      for (const handler of handlers.values()) {
        handler(topic, message);
      }
    }
  });

  return { id, brokerUrl, status: "connecting" };
};

const publish: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const topic = String(args[1]);
  const message = String(args[2]);
  const opts = (args[3] ?? {}) as mqtt.IClientPublishOptions;

  if (!topic) throw new Error("Topic is required.");
  const client = getClient(id);

  const qos = opts.qos ?? (defaultQos.get(id) as 0 | 1 | 2 | undefined) ?? 0;

  return new Promise<any>((resolve: any, reject: any) => {
    client.publish(topic, message, { ...opts, qos }, (err: any) => {
      if (err) reject(err);
      else resolve({ id, topic, message, qos });
    });
  });
};

const subscribe: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const topic = String(args[1]);
  const opts = (args[2] ?? {}) as mqtt.IClientSubscribeOptions;

  if (!topic) throw new Error("Topic is required.");
  const client = getClient(id);

  const qos = opts.qos ?? (defaultQos.get(id) as 0 | 1 | 2 | undefined) ?? 0;

  return new Promise<any>((resolve: any, reject: any) => {
    client.subscribe(topic, { ...opts, qos }, (err: any, granted: any) => {
      if (err) reject(err);
      else {
        const topics = subscribedTopics.get(id);
        if (topics) topics.add(topic);
        resolve({ id, topic, granted });
      }
    });
  });
};

const unsubscribe: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const topic = String(args[1]);

  if (!topic) throw new Error("Topic is required.");
  const client = getClient(id);

  return new Promise<any>((resolve: any, reject: any) => {
    client.unsubscribe(topic, (err: any) => {
      if (err) reject(err);
      else {
        const topics = subscribedTopics.get(id);
        if (topics) topics.delete(topic);
        resolve({ id, topic, status: "unsubscribed" });
      }
    });
  });
};

const on: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const handlerId = String(args[1] ?? `handler_${Date.now()}`);
  const callback = args[2] as ((topic: string, message: Buffer) => void) | undefined;

  if (!callback || typeof callback !== "function") {
    throw new Error("A callback function is required.");
  }

  getClient(id);

  const handlers = messageHandlers.get(id);
  if (handlers) {
    handlers.set(handlerId, callback);
  }

  return { id, handlerId, status: "registered" };
};

const disconnect: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const client = getClient(id);

  return new Promise<any>((resolve: any, reject: any) => {
    client.end(false, {}, (err: any) => {
      clients.delete(id);
      messageHandlers.delete(id);
      lastMessages.delete(id);
      subscribedTopics.delete(id);
      defaultQos.delete(id);

      if (err) reject(err);
      else resolve({ id, status: "disconnected" });
    });
  });
};

const isConnected: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const client = clients.get(id);
  return { id, connected: client ? client.connected : false };
};

const reconnect: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const client = getClient(id);
  client.reconnect();
  return { id, status: "reconnecting" };
};

const topics: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  getClient(id);
  const t = subscribedTopics.get(id);
  return { id, topics: t ? Array.from(t) : [] };
};

const lastMessage: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const topic = String(args[1]);

  if (!topic) throw new Error("Topic is required.");
  getClient(id);

  const msgs = lastMessages.get(id);
  const msg = msgs ? msgs.get(topic) ?? null : null;

  return { id, topic, message: msg };
};

const qos: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const level = Number(args[1] ?? 0);

  if (level < 0 || level > 2) {
    throw new Error("QoS level must be 0, 1, or 2.");
  }

  getClient(id);
  defaultQos.set(id, level);

  return { id, qos: level };
};

const will: BuiltinHandler = (args: Value[]): unknown => {
  const id = String(args[0] ?? "default");
  const topic = String(args[1]);
  const payload = String(args[2] ?? "");
  const willQos = Number(args[3] ?? 0) as 0 | 1 | 2;
  const retain = Boolean(args[4] ?? false);

  if (!topic) throw new Error("Topic is required for last will.");

  const client = getClient(id);
  const options = client.options;

  options.will = { topic, payload: Buffer.from(payload), qos: willQos, retain };

  return { id, will: { topic, payload, qos: willQos, retain } };
};

export const MqttFunctions = {
  connect,
  publish,
  subscribe,
  unsubscribe,
  on,
  disconnect,
  isConnected,
  reconnect,
  topics,
  lastMessage,
  qos,
  will,
};

export const MqttFunctionMetadata = {
  connect: {
    description: "Connect to an MQTT broker",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "brokerUrl", dataType: "string", description: "Broker URL (e.g. mqtt://localhost:1883)", optional: true },
      { name: "options", dataType: "object", description: "MQTT connection options", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  publish: {
    description: "Publish a message to an MQTT topic",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "topic", dataType: "string", description: "Topic to publish to", optional: false },
      { name: "message", dataType: "string", description: "Message payload", optional: false },
      { name: "options", dataType: "object", description: "Publish options (qos, retain, etc.)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  subscribe: {
    description: "Subscribe to an MQTT topic",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "topic", dataType: "string", description: "Topic to subscribe to", optional: false },
      { name: "options", dataType: "object", description: "Subscribe options (qos, etc.)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  unsubscribe: {
    description: "Unsubscribe from an MQTT topic",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "topic", dataType: "string", description: "Topic to unsubscribe from", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  on: {
    description: "Register a message handler for incoming MQTT messages",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "handlerId", dataType: "string", description: "Unique handler identifier", optional: true },
      { name: "callback", dataType: "string", description: "Handler function receiving (topic, message)", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  disconnect: {
    description: "Disconnect from an MQTT broker and clean up resources",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  isConnected: {
    description: "Check if an MQTT client is currently connected",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  reconnect: {
    description: "Reconnect an existing MQTT client to its broker",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  topics: {
    description: "List all topics the client is currently subscribed to",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  lastMessage: {
    description: "Get the last received message on a specific topic",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "topic", dataType: "string", description: "Topic to get last message for", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  qos: {
    description: "Set the default Quality of Service level for the client",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "level", dataType: "number", description: "QoS level: 0 (at most once), 1 (at least once), 2 (exactly once)", optional: false },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  will: {
    description: "Set the last will and testament message for the client",
    parameters: [
      { name: "id", dataType: "string", description: "Client identifier", optional: true },
      { name: "topic", dataType: "string", description: "Will topic", optional: false },
      { name: "payload", dataType: "string", description: "Will message payload", optional: true },
      { name: "qos", dataType: "number", description: "Will QoS level (0, 1, or 2)", optional: true },
      { name: "retain", dataType: "boolean", description: "Whether to retain the will message", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
};

export const MqttModuleMetadata = {
  description: "MQTT client module for connecting to MQTT brokers, publishing messages, subscribing to topics, and handling incoming messages. Supports multiple concurrent client connections, QoS levels, last will messages, and message history tracking.",
  version: "1.0.0",
};
