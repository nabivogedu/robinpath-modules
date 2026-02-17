import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { randomBytes, createHash } from "node:crypto";

// ── Internal State ──────────────────────────────────────────────────

interface TokenStore {
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
  expiresAt?: number;
  scope?: string;
}

const tokens = new Map<string, TokenStore>();

// ── Function Handlers ───────────────────────────────────────────────

const authUrl: BuiltinHandler = (args) => {
  const baseUrl = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!baseUrl) throw new Error("Authorization URL is required");

  const params = new URLSearchParams();
  params.set("response_type", String(opts.responseType ?? "code"));
  params.set("client_id", String(opts.clientId ?? ""));
  if (opts.redirectUri) params.set("redirect_uri", String(opts.redirectUri));
  if (opts.scope) params.set("scope", String(opts.scope));
  if (opts.state) params.set("state", String(opts.state));
  if (opts.codeChallenge) params.set("code_challenge", String(opts.codeChallenge));
  if (opts.codeChallengeMethod) params.set("code_challenge_method", String(opts.codeChallengeMethod));
  if (opts.accessType) params.set("access_type", String(opts.accessType));
  if (opts.prompt) params.set("prompt", String(opts.prompt));

  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}${params.toString()}`;
};

const exchangeCode: BuiltinHandler = async (args) => {
  const tokenUrl = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!tokenUrl) throw new Error("Token URL is required");

  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("code", String(opts.code ?? ""));
  body.set("client_id", String(opts.clientId ?? ""));
  if (opts.clientSecret) body.set("client_secret", String(opts.clientSecret));
  if (opts.redirectUri) body.set("redirect_uri", String(opts.redirectUri));
  if (opts.codeVerifier) body.set("code_verifier", String(opts.codeVerifier));

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(`OAuth token exchange failed: ${data.error ?? response.statusText} - ${data.error_description ?? ""}`);
  }

  // Store token if a name is provided
  if (opts.name) {
    const store: TokenStore = {
      accessToken: String(data.access_token ?? ""),
      refreshToken: data.refresh_token ? String(data.refresh_token) : undefined,
      tokenType: String(data.token_type ?? "Bearer"),
      expiresAt: data.expires_in ? Date.now() + Number(data.expires_in) * 1000 : undefined,
      scope: data.scope ? String(data.scope) : undefined,
    };
    tokens.set(String(opts.name), store);
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    tokenType: data.token_type ?? "Bearer",
    expiresIn: data.expires_in,
    scope: data.scope,
  };
};

const refreshToken: BuiltinHandler = async (args) => {
  const tokenUrl = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!tokenUrl) throw new Error("Token URL is required");

  const refresh = opts.refreshToken ?? (opts.name ? tokens.get(String(opts.name))?.refreshToken : undefined);
  if (!refresh) throw new Error("Refresh token is required");

  const body = new URLSearchParams();
  body.set("grant_type", "refresh_token");
  body.set("refresh_token", String(refresh));
  body.set("client_id", String(opts.clientId ?? ""));
  if (opts.clientSecret) body.set("client_secret", String(opts.clientSecret));
  if (opts.scope) body.set("scope", String(opts.scope));

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(`OAuth refresh failed: ${data.error ?? response.statusText}`);
  }

  // Update stored token
  if (opts.name) {
    const store: TokenStore = {
      accessToken: String(data.access_token ?? ""),
      refreshToken: data.refresh_token ? String(data.refresh_token) : String(refresh),
      tokenType: String(data.token_type ?? "Bearer"),
      expiresAt: data.expires_in ? Date.now() + Number(data.expires_in) * 1000 : undefined,
      scope: data.scope ? String(data.scope) : undefined,
    };
    tokens.set(String(opts.name), store);
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? refresh,
    tokenType: data.token_type ?? "Bearer",
    expiresIn: data.expires_in,
    scope: data.scope,
  };
};

const clientCredentials: BuiltinHandler = async (args) => {
  const tokenUrl = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!tokenUrl) throw new Error("Token URL is required");

  const body = new URLSearchParams();
  body.set("grant_type", "client_credentials");
  body.set("client_id", String(opts.clientId ?? ""));
  body.set("client_secret", String(opts.clientSecret ?? ""));
  if (opts.scope) body.set("scope", String(opts.scope));

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(`OAuth client credentials failed: ${data.error ?? response.statusText}`);
  }

  if (opts.name) {
    tokens.set(String(opts.name), {
      accessToken: String(data.access_token ?? ""),
      tokenType: String(data.token_type ?? "Bearer"),
      expiresAt: data.expires_in ? Date.now() + Number(data.expires_in) * 1000 : undefined,
      scope: data.scope ? String(data.scope) : undefined,
    });
  }

  return {
    accessToken: data.access_token,
    tokenType: data.token_type ?? "Bearer",
    expiresIn: data.expires_in,
    scope: data.scope,
  };
};

const pkceVerifier: BuiltinHandler = (args) => {
  const length = parseInt(String(args[0] ?? "64"), 10);
  const clampedLength = Math.max(43, Math.min(128, length));
  const verifier = randomBytes(clampedLength)
    .toString("base64url")
    .substring(0, clampedLength);
  return verifier;
};

const pkceChallenge: BuiltinHandler = (args) => {
  const verifier = String(args[0] ?? "");
  const method = String(args[1] ?? "S256");

  if (method === "S256") {
    const hash = createHash("sha256").update(verifier).digest("base64url");
    return { challenge: hash, method: "S256" };
  }

  if (method === "plain") {
    return { challenge: verifier, method: "plain" };
  }

  throw new Error(`Unsupported PKCE method: ${method}. Use "S256" or "plain".`);
};

const getToken: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "");
  const store = tokens.get(name);
  if (!store) return null;

  return {
    accessToken: store.accessToken,
    refreshToken: store.refreshToken,
    tokenType: store.tokenType,
    expired: store.expiresAt ? Date.now() > store.expiresAt : false,
    expiresAt: store.expiresAt ? new Date(store.expiresAt).toISOString() : null,
    scope: store.scope,
  };
};

const isExpired: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "");
  const bufferMs = parseInt(String(args[1] ?? "60000"), 10); // 1 min buffer default
  const store = tokens.get(name);
  if (!store) return true;
  if (!store.expiresAt) return false;
  return Date.now() + bufferMs > store.expiresAt;
};

const generateState: BuiltinHandler = (args) => {
  const length = parseInt(String(args[0] ?? "32"), 10);
  return randomBytes(length).toString("hex");
};

const revokeToken: BuiltinHandler = async (args) => {
  const revokeUrl = String(args[0] ?? "");
  const opts = (typeof args[1] === "object" && args[1] !== null ? args[1] : {}) as Record<string, unknown>;

  if (!revokeUrl) throw new Error("Revoke URL is required");

  const token = opts.token ?? (opts.name ? tokens.get(String(opts.name))?.accessToken : undefined);
  if (!token) throw new Error("Token is required");

  const body = new URLSearchParams();
  body.set("token", String(token));
  if (opts.tokenTypeHint) body.set("token_type_hint", String(opts.tokenTypeHint));
  if (opts.clientId) body.set("client_id", String(opts.clientId));
  if (opts.clientSecret) body.set("client_secret", String(opts.clientSecret));

  const response = await fetch(revokeUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (opts.name) tokens.delete(String(opts.name));

  return { revoked: response.ok, status: response.status };
};

const clearTokens: BuiltinHandler = (args) => {
  const name = args[0] != null ? String(args[0]) : undefined;
  if (name) {
    return tokens.delete(name);
  }
  tokens.clear();
  return true;
};

// ── Exports ─────────────────────────────────────────────────────────

export const OauthFunctions: Record<string, BuiltinHandler> = {
  authUrl, exchangeCode, refreshToken, clientCredentials, pkceVerifier, pkceChallenge, getToken, isExpired, generateState, revokeToken, clearTokens,
};

export const OauthFunctionMetadata = {
  authUrl: {
    description: "Build an OAuth 2.0 authorization URL with required parameters",
    parameters: [
      { name: "baseUrl", dataType: "string", description: "Authorization endpoint URL", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{clientId, redirectUri, scope, state, responseType, codeChallenge, codeChallengeMethod, accessType, prompt}", formInputType: "text", required: true },
    ],
    returnType: "string", returnDescription: "Complete authorization URL", example: 'oauth.authUrl "https://accounts.google.com/o/oauth2/v2/auth" {"clientId": "...", "scope": "email profile"}',
  },
  exchangeCode: {
    description: "Exchange an authorization code for access and refresh tokens",
    parameters: [
      { name: "tokenUrl", dataType: "string", description: "Token endpoint URL", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{code, clientId, clientSecret, redirectUri, codeVerifier, name}", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{accessToken, refreshToken, tokenType, expiresIn, scope}", example: 'oauth.exchangeCode "https://oauth2.googleapis.com/token" {"code": "...", "clientId": "..."}',
  },
  refreshToken: {
    description: "Refresh an expired access token using a refresh token",
    parameters: [
      { name: "tokenUrl", dataType: "string", description: "Token endpoint URL", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{refreshToken, clientId, clientSecret, scope, name}", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{accessToken, refreshToken, tokenType, expiresIn}", example: 'oauth.refreshToken "https://oauth2.googleapis.com/token" {"name": "google", "clientId": "..."}',
  },
  clientCredentials: {
    description: "Get an access token using the client credentials grant (machine-to-machine)",
    parameters: [
      { name: "tokenUrl", dataType: "string", description: "Token endpoint URL", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{clientId, clientSecret, scope, name}", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{accessToken, tokenType, expiresIn, scope}", example: 'oauth.clientCredentials "https://api.example.com/oauth/token" {"clientId": "...", "clientSecret": "..."}',
  },
  pkceVerifier: {
    description: "Generate a cryptographically random PKCE code verifier",
    parameters: [
      { name: "length", dataType: "number", description: "Verifier length 43-128 (default 64)", formInputType: "text", required: false },
    ],
    returnType: "string", returnDescription: "URL-safe base64 encoded verifier string", example: "oauth.pkceVerifier 64",
  },
  pkceChallenge: {
    description: "Generate a PKCE code challenge from a verifier",
    parameters: [
      { name: "verifier", dataType: "string", description: "The code verifier", formInputType: "text", required: true },
      { name: "method", dataType: "string", description: "'S256' or 'plain' (default S256)", formInputType: "text", required: false },
    ],
    returnType: "object", returnDescription: "{challenge, method}", example: 'oauth.pkceChallenge $verifier "S256"',
  },
  getToken: {
    description: "Retrieve a stored OAuth token by name",
    parameters: [
      { name: "name", dataType: "string", description: "Token store name", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{accessToken, refreshToken, tokenType, expired, expiresAt, scope} or null", example: 'oauth.getToken "google"',
  },
  isExpired: {
    description: "Check if a stored token is expired (with buffer time)",
    parameters: [
      { name: "name", dataType: "string", description: "Token store name", formInputType: "text", required: true },
      { name: "bufferMs", dataType: "number", description: "Buffer time in ms before expiry (default 60000)", formInputType: "text", required: false },
    ],
    returnType: "boolean", returnDescription: "True if token is expired or will expire within buffer", example: 'oauth.isExpired "google" 120000',
  },
  generateState: {
    description: "Generate a cryptographically random state parameter for CSRF protection",
    parameters: [
      { name: "length", dataType: "number", description: "State length in bytes (default 32)", formInputType: "text", required: false },
    ],
    returnType: "string", returnDescription: "Random hex string", example: "oauth.generateState",
  },
  revokeToken: {
    description: "Revoke an OAuth token at the provider's revocation endpoint",
    parameters: [
      { name: "revokeUrl", dataType: "string", description: "Revocation endpoint URL", formInputType: "text", required: true },
      { name: "options", dataType: "object", description: "{token, name, tokenTypeHint, clientId, clientSecret}", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "{revoked: boolean, status: number}", example: 'oauth.revokeToken "https://oauth2.googleapis.com/revoke" {"name": "google"}',
  },
  clearTokens: {
    description: "Clear stored tokens by name or all tokens",
    parameters: [
      { name: "name", dataType: "string", description: "Token name to clear (omit to clear all)", formInputType: "text", required: false },
    ],
    returnType: "boolean", returnDescription: "True if cleared", example: 'oauth.clearTokens "google"',
  },
};

export const OauthModuleMetadata = {
  description: "OAuth 2.0 authorization flows: auth URL, code exchange, refresh, client credentials, PKCE, token management",
  methods: ["authUrl", "exchangeCode", "refreshToken", "clientCredentials", "pkceVerifier", "pkceChallenge", "getToken", "isExpired", "generateState", "revokeToken", "clearTokens"],
};
