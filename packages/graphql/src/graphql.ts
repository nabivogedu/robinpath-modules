import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

// ── Internal State ──────────────────────────────────────────────────

interface GqlClient {
  name: string;
  endpoint: string;
  headers: Record<string, string>;
}

const clients = new Map<string, GqlClient>();

// ── Function Handlers ───────────────────────────────────────────────

const create: BuiltinHandler = (args) => {
  const name = String(args[0] ?? "default");
  const endpoint = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;

  if (!endpoint) throw new Error("GraphQL endpoint URL is required");

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  if (opts.apiKey) headers["X-API-Key"] = String(opts.apiKey);
  if (typeof opts.headers === "object" && opts.headers !== null) {
    for (const [k, v] of Object.entries(opts.headers as Record<string, unknown>)) {
      headers[k] = String(v);
    }
  }

  clients.set(name, { name, endpoint, headers });
  return { name, endpoint };
};

const query: BuiltinHandler = async (args) => {
  const clientName = String(args[0] ?? "default");
  const queryStr = String(args[1] ?? "");
  const variables = (typeof args[2] === "object" && args[2] !== null ? args[2] : undefined) as Record<string, unknown> | undefined;
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;

  const client = clients.get(clientName);
  if (!client) throw new Error(`GraphQL client "${clientName}" not found. Create it first.`);

  const body: Record<string, unknown> = { query: queryStr };
  if (variables) body.variables = variables;
  if (opts.operationName) body.operationName = String(opts.operationName);

  const headers = { ...client.headers };
  if (typeof opts.headers === "object" && opts.headers !== null) {
    for (const [k, v] of Object.entries(opts.headers as Record<string, unknown>)) {
      headers[k] = String(v);
    }
  }

  const response = await fetch(client.endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json() as { data?: unknown; errors?: unknown[] };

  if (data.errors && (data.errors as unknown[]).length > 0) {
    if (!opts.ignoreErrors) {
      const firstError = (data.errors as { message: string }[])[0]!;
      throw new Error(`GraphQL error: ${firstError.message}`);
    }
  }

  return opts.raw ? data : data.data;
};

const mutate: BuiltinHandler = async (args) => {
  // Same as query, mutations are just queries with side effects
  return await query(args);
};

const rawRequest: BuiltinHandler = async (args) => {
  const endpoint = String(args[0] ?? "");
  const queryStr = String(args[1] ?? "");
  const variables = (typeof args[2] === "object" && args[2] !== null ? args[2] : undefined) as Record<string, unknown> | undefined;
  const headers = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, string>;

  const body: Record<string, unknown> = { query: queryStr };
  if (variables) body.variables = variables;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });

  return await response.json();
};

const introspect: BuiltinHandler = async (args) => {
  const clientName = String(args[0] ?? "default");
  const introspectionQuery = `
    query IntrospectionQuery {
      __schema {
        queryType { name }
        mutationType { name }
        types {
          name
          kind
          description
          fields { name type { name kind ofType { name kind } } }
        }
      }
    }
  `;
  return await query([clientName, introspectionQuery]);
};

const listTypes: BuiltinHandler = async (args) => {
  const clientName = String(args[0] ?? "default");
  const result = await introspect([clientName]) as { __schema: { types: { name: string; kind: string; description?: string }[] } };
  return result.__schema.types
    .filter((t) => !t.name.startsWith("__"))
    .map((t) => ({ name: t.name, kind: t.kind, description: t.description }));
};

const buildQuery: BuiltinHandler = (args) => {
  const type = String(args[0] ?? "query");
  const name = String(args[1] ?? "");
  const fields = Array.isArray(args[2]) ? args[2] : String(args[2] ?? "").split(",").map((s) => s.trim());
  const variables = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, string>;

  const varDefs = Object.entries(variables).map(([k, v]) => `$${k}: ${v}`).join(", ");
  const varArgs = Object.keys(variables).map((k) => `${k}: $${k}`).join(", ");

  let q = type;
  if (name) {
    q += ` ${name}`;
    if (varDefs) q += `(${varDefs})`;
    q += ` {\n  ${name}`;
    if (varArgs) q += `(${varArgs})`;
  }

  q += ` {\n    ${fields.join("\n    ")}\n  }`;
  if (name) q += "\n}";

  return q;
};

const batchQuery: BuiltinHandler = async (args) => {
  const clientName = String(args[0] ?? "default");
  const queries = Array.isArray(args[1]) ? args[1] : [];

  const results: unknown[] = [];
  for (const q of queries) {
    const item = q as { query: string; variables?: Record<string, unknown> };
    try {
      const result = await query([clientName, item.query, item.variables]);
      results.push({ data: result, error: null });
    } catch (err: unknown) {
      results.push({ data: null, error: err instanceof Error ? err.message : String(err) });
    }
  }
  return results;
};

const destroy: BuiltinHandler = (args) => {
  const clientName = String(args[0] ?? "default");
  return clients.delete(clientName);
};

// ── Exports ─────────────────────────────────────────────────────────

export const GraphqlFunctions: Record<string, BuiltinHandler> = {
  create, query, mutate, rawRequest, introspect, listTypes, buildQuery, batchQuery, destroy,
};

export const GraphqlFunctionMetadata: Record<string, FunctionMetadata> = {
  create: { description: "Create a named GraphQL client", parameters: [{ name: "name", dataType: "string", description: "Client name", formInputType: "text", required: true }, { name: "endpoint", dataType: "string", description: "GraphQL endpoint URL", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{token, apiKey, headers}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{name, endpoint}", example: 'graphql.create "github" "https://api.github.com/graphql" {"token": $ghToken}' },
  query: { description: "Execute a GraphQL query", parameters: [{ name: "client", dataType: "string", description: "Client name", formInputType: "text", required: true }, { name: "query", dataType: "string", description: "GraphQL query string", formInputType: "text", required: true }, { name: "variables", dataType: "object", description: "Query variables", formInputType: "text", required: false }, { name: "options", dataType: "object", description: "{operationName, ignoreErrors, raw, headers}", formInputType: "text", required: false }], returnType: "object", returnDescription: "Query data", example: 'graphql.query "github" "{ viewer { login name } }"' },
  mutate: { description: "Execute a GraphQL mutation", parameters: [{ name: "client", dataType: "string", description: "Client name", formInputType: "text", required: true }, { name: "mutation", dataType: "string", description: "GraphQL mutation string", formInputType: "text", required: true }, { name: "variables", dataType: "object", description: "Mutation variables", formInputType: "text", required: false }], returnType: "object", returnDescription: "Mutation result", example: 'graphql.mutate "api" "mutation { createUser(name: $name) { id } }" {"name": "Alice"}' },
  rawRequest: { description: "Send a one-off GraphQL request without creating a client", parameters: [{ name: "endpoint", dataType: "string", description: "GraphQL URL", formInputType: "text", required: true }, { name: "query", dataType: "string", description: "Query string", formInputType: "text", required: true }, { name: "variables", dataType: "object", description: "Variables", formInputType: "text", required: false }, { name: "headers", dataType: "object", description: "Custom headers", formInputType: "text", required: false }], returnType: "object", returnDescription: "Full response {data, errors}", example: 'graphql.rawRequest "https://api.example.com/graphql" "{ users { id } }"' },
  introspect: { description: "Run an introspection query to discover the schema", parameters: [{ name: "client", dataType: "string", description: "Client name", formInputType: "text", required: true }], returnType: "object", returnDescription: "Schema introspection result", example: 'graphql.introspect "github"' },
  listTypes: { description: "List all types in the GraphQL schema", parameters: [{ name: "client", dataType: "string", description: "Client name", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of {name, kind, description}", example: 'graphql.listTypes "github"' },
  buildQuery: { description: "Build a simple GraphQL query string from parts", parameters: [{ name: "type", dataType: "string", description: "'query' or 'mutation'", formInputType: "text", required: true }, { name: "name", dataType: "string", description: "Operation name", formInputType: "text", required: true }, { name: "fields", dataType: "array", description: "Fields to select", formInputType: "text", required: true }, { name: "variables", dataType: "object", description: "{varName: 'Type'}", formInputType: "text", required: false }], returnType: "string", returnDescription: "GraphQL query string", example: 'graphql.buildQuery "query" "getUser" ["id", "name", "email"] {"id": "ID!"}' },
  batchQuery: { description: "Execute multiple queries sequentially", parameters: [{ name: "client", dataType: "string", description: "Client name", formInputType: "text", required: true }, { name: "queries", dataType: "array", description: "Array of {query, variables}", formInputType: "text", required: true }], returnType: "array", returnDescription: "Array of {data, error}", example: 'graphql.batchQuery "api" $queries' },
  destroy: { description: "Remove a GraphQL client", parameters: [{ name: "client", dataType: "string", description: "Client name", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "True if removed", example: 'graphql.destroy "github"' },
};

export const GraphqlModuleMetadata: ModuleMetadata = {
  description: "GraphQL client with queries, mutations, variables, introspection, batch requests, and query builder",
  methods: ["create", "query", "mutate", "rawRequest", "introspect", "listTypes", "buildQuery", "batchQuery", "destroy"],
};
