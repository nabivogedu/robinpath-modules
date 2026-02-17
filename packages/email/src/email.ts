import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// ── Internal State ──────────────────────────────────────────────────

const transporters = new Map<string, Transporter>();

// ── Function Handlers ───────────────────────────────────────────────

const createTransport: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const config: Record<string, unknown> = {};

  if (opts.host) config.host = String(opts.host);
  if (opts.port) config.port = Number(opts.port);
  if (opts.secure !== undefined) config.secure = Boolean(opts.secure);
  if (opts.service) config.service = String(opts.service); // e.g., "gmail", "outlook"

  if (opts.user || opts.pass) {
    config.auth = {
      user: String(opts.user ?? ""),
      pass: String(opts.pass ?? ""),
    };
  }

  // TLS options
  if (opts.tls === false || opts.rejectUnauthorized === false) {
    config.tls = { rejectUnauthorized: false };
  }

  const transporter = nodemailer.createTransport(config as nodemailer.TransportOptions);
  transporters.set(name, transporter);

  return { name, host: opts.host, port: opts.port, service: opts.service };
};

const send: BuiltinHandler = async (args) => {
  const transportName = String(args[0] ?? "default");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  const transporter = transporters.get(transportName);
  if (!transporter) throw new Error(`Transport "${transportName}" not found. Create it first with email.createTransport.`);

  const mailOptions: Record<string, unknown> = {
    from: opts.from ? String(opts.from) : undefined,
    to: opts.to ? String(opts.to) : undefined,
    subject: opts.subject ? String(opts.subject) : undefined,
  };

  // Body: text or HTML
  if (opts.html) mailOptions.html = String(opts.html);
  if (opts.text) mailOptions.text = String(opts.text);
  if (!opts.html && !opts.text && opts.body) {
    mailOptions.text = String(opts.body);
  }

  // CC, BCC
  if (opts.cc) mailOptions.cc = String(opts.cc);
  if (opts.bcc) mailOptions.bcc = String(opts.bcc);

  // Reply-To
  if (opts.replyTo) mailOptions.replyTo = String(opts.replyTo);

  // Attachments
  if (Array.isArray(opts.attachments)) {
    mailOptions.attachments = (opts.attachments as Record<string, unknown>[]).map((att: any) => ({
      filename: att.filename ? String(att.filename) : undefined,
      path: att.path ? String(att.path) : undefined,
      content: att.content,
      contentType: att.contentType ? String(att.contentType) : undefined,
      encoding: att.encoding ? String(att.encoding) : undefined,
    }));
  }

  // Priority
  if (opts.priority) mailOptions.priority = String(opts.priority); // "high", "normal", "low"

  // Custom headers
  if (typeof opts.headers === "object" && opts.headers !== null) {
    mailOptions.headers = opts.headers;
  }

  const info = await transporter.sendMail(mailOptions as nodemailer.SendMailOptions);

  return {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    response: info.response,
  };
};

const sendQuick: BuiltinHandler = async (args) => {
  const transportName = String(args[0] ?? "default");
  const to = String(args[1] ?? "");
  const subject = String(args[2] ?? "");
  const body = String(args[3] ?? "");
  const from = args[4] != null ? String(args[4]) : undefined;

  const transporter = transporters.get(transportName);
  if (!transporter) throw new Error(`Transport "${transportName}" not found.`);

  const isHtml = body.includes("<") && body.includes(">");
  const mailOptions: Record<string, unknown> = {
    to,
    subject,
    ...(from ? { from } : {}),
    ...(isHtml ? { html: body } : { text: body }),
  };

  const info = await transporter.sendMail(mailOptions as nodemailer.SendMailOptions);
  return {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  };
};

const verify: BuiltinHandler = async (args) => {
  const transportName = String(args[0] ?? "default");
  const transporter = transporters.get(transportName);
  if (!transporter) throw new Error(`Transport "${transportName}" not found.`);

  try {
    await transporter.verify();
    return { connected: true };
  } catch (err: unknown) {
    return { connected: false, error: err instanceof Error ? err.message : String(err) };
  }
};

const isValid: BuiltinHandler = (args) => {
  const email = String(args[0] ?? "");
  // RFC 5322 simplified validation
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(email);
};

const parseAddress: BuiltinHandler = (args) => {
  const input = String(args[0] ?? "");

  // Handle "Name <email>" format
  const match = input.match(/^(.+?)\s*<([^>]+)>$/);
  if (match) {
    return {
      name: match[1]!.trim().replace(/^["']|["']$/g, ""),
      address: match[2]!.trim(),
      full: input,
    };
  }

  // Plain email
  return {
    name: "",
    address: input.trim(),
    full: input.trim(),
  };
};

const parseAddressList: BuiltinHandler = (args) => {
  const input = String(args[0] ?? "");
  // Split by comma but not within angle brackets
  const addresses = input.split(/,(?![^<]*>)/).map((s: any) => s.trim()).filter(Boolean);
  return addresses.map((addr: any) => {
    const result = parseAddress([addr]) as { name: string; address: string; full: string };
    return result;
  });
};

const extractDomain: BuiltinHandler = (args) => {
  const email = String(args[0] ?? "");
  const atIndex = email.lastIndexOf("@");
  if (atIndex === -1) return null;
  return email.substring(atIndex + 1).toLowerCase();
};

const buildAddress: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "");
  const email = String(args[1] ?? "");
  if (!name) return email;
  return `"${name}" <${email}>`;
};

const close: BuiltinHandler = (args) => {
  const transportName = String(args[0] ?? "default");
  const transporter = transporters.get(transportName);
  if (!transporter) return false;
  transporter.close();
  transporters.delete(transportName);
  return true;
};

const createTestAccount: BuiltinHandler = async () => {
  const account = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: { user: account.user, pass: account.pass },
  });
  transporters.set("test", transporter);
  return {
    name: "test",
    user: account.user,
    pass: account.pass,
    smtp: { host: account.smtp.host, port: account.smtp.port },
    web: account.web,
  };
};

const getTestUrl: BuiltinHandler = (args) => {
  const messageId = String(args[0] ?? "");
  return nodemailer.getTestMessageUrl({ messageId } as nodemailer.SentMessageInfo) || null;
};

// ── Exports ─────────────────────────────────────────────────────────

export const EmailFunctions: Record<string, BuiltinHandler> = {
  createTransport, send, sendQuick, verify, isValid, parseAddress, parseAddressList, extractDomain, buildAddress, close, createTestAccount, getTestUrl,
};

export const EmailFunctionMetadata = {
  createTransport: {
    description: "Create a named SMTP transport for sending emails",
    parameters: [
      { name: "name", dataType: "string", description: "Transport name (default: 'default')", formInputType: "text", required: false },
      { name: "options", dataType: "object", description: "{host, port, secure, service, user, pass, tls}", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Transport configuration", example: 'email.createTransport "gmail" {"service": "gmail", "user": "me@gmail.com", "pass": "app-password"}',
  },
  send: {
    description: "Send an email with full options (to, subject, body, attachments, etc.)",
    parameters: [
      { name: "transport", dataType: "string", description: "Transport name", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{from, to, subject, text, html, body, cc, bcc, replyTo, attachments, priority, headers}", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{messageId, accepted, rejected, response}", example: 'email.send "gmail" {"to": "bob@example.com", "subject": "Hello", "text": "Hi there"}',
  },
  sendQuick: {
    description: "Send a simple email with just to, subject, and body",
    parameters: [
      { name: "transport", dataType: "string", description: "Transport name", formInputType: "text", required: true },
      { name: "to", dataType: "string", description: "Recipient email", formInputType: "text", required: true },
      { name: "subject", dataType: "string", description: "Email subject", formInputType: "text", required: true },
      { name: "body", dataType: "string", description: "Email body (text or HTML)", formInputType: "text", required: true },
      { name: "from", dataType: "string", description: "Sender email (optional)", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "{messageId, accepted, rejected}", example: 'email.sendQuick "gmail" "bob@example.com" "Hello" "Hi Bob!"',
  },
  verify: {
    description: "Verify SMTP connection to the mail server",
    parameters: [
      { name: "transport", dataType: "string", description: "Transport name", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{connected: boolean, error?: string}", example: 'email.verify "gmail"',
  },
  isValid: {
    description: "Validate an email address format",
    parameters: [
      { name: "email", dataType: "string", description: "Email address to validate", formInputType: "text", required: true },
    ],
    returnType: "boolean", returnDescription: "True if email format is valid", example: 'email.isValid "user@example.com"',
  },
  parseAddress: {
    description: "Parse an email address string into name and address parts",
    parameters: [
      { name: "address", dataType: "string", description: "Email address (e.g. 'John Doe <john@example.com>')", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{name, address, full}", example: 'email.parseAddress "John Doe <john@example.com>"',
  },
  parseAddressList: {
    description: "Parse a comma-separated list of email addresses",
    parameters: [
      { name: "addresses", dataType: "string", description: "Comma-separated email addresses", formInputType: "text", required: true },
    ],
    returnType: "array", returnDescription: "Array of {name, address, full} objects", example: 'email.parseAddressList "Alice <a@b.com>, Bob <b@b.com>"',
  },
  extractDomain: {
    description: "Extract the domain part from an email address",
    parameters: [
      { name: "email", dataType: "string", description: "Email address", formInputType: "text", required: true },
    ],
    returnType: "string", returnDescription: "Domain part (e.g. 'example.com')", example: 'email.extractDomain "user@example.com"',
  },
  buildAddress: {
    description: "Build a formatted email address from name and email",
    parameters: [
      { name: "name", dataType: "string", description: "Display name", formInputType: "text", required: true },
      { name: "email", dataType: "string", description: "Email address", formInputType: "text", required: true },
    ],
    returnType: "string", returnDescription: "Formatted address like '\"Name\" <email>'", example: 'email.buildAddress "John Doe" "john@example.com"',
  },
  close: {
    description: "Close a transport connection",
    parameters: [
      { name: "transport", dataType: "string", description: "Transport name", formInputType: "text", required: true },
    ],
    returnType: "boolean", returnDescription: "True if transport was closed", example: 'email.close "gmail"',
  },
  createTestAccount: {
    description: "Create an Ethereal test account for development (no real emails sent)",
    parameters: [],
    returnType: "object", returnDescription: "{name, user, pass, smtp, web}", example: "email.createTestAccount",
  },
  getTestUrl: {
    description: "Get the Ethereal preview URL for a test email",
    parameters: [
      { name: "messageId", dataType: "string", description: "Message ID from send result", formInputType: "text", required: true },
    ],
    returnType: "string", returnDescription: "URL to preview the email or null", example: 'email.getTestUrl $messageId',
  },
};

export const EmailModuleMetadata = {
  description: "SMTP email sending with transports, attachments, address parsing, and Ethereal test accounts",
  methods: ["createTransport", "send", "sendQuick", "verify", "isValid", "parseAddress", "parseAddressList", "extractDomain", "buildAddress", "close", "createTestAccount", "getTestUrl"],
};
