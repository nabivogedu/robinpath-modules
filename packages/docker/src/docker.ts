import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";
import { execSync } from "child_process";

function exec(cmd: string): string {
  return (execSync(cmd, { encoding: "utf-8", maxBuffer: 50 * 1024 * 1024 }) as string).trim();
}

function execJson(cmd: string): any {
  const raw = exec(cmd);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

export const DockerFunctions: Record<string, BuiltinHandler> = {
  ps: (args: Value[]) => {
    const all = (args[0] as boolean) ?? true;
    const format = (args[1] as string) ?? "json";
    let cmd = "docker ps";
    if (all) cmd += " -a";
    if (format === "json") cmd += ' --format "{{json .}}"';
    const raw = exec(cmd);
    if (format === "json" && raw) {
      const lines = raw.split("\n").filter(Boolean);
      return lines.map((l: any) => JSON.parse(l));
    }
    return raw;
  },

  images: (args: Value[]) => {
    const format = (args[0] as string) ?? "json";
    let cmd = "docker images";
    if (format === "json") cmd += ' --format "{{json .}}"';
    const raw = exec(cmd);
    if (format === "json" && raw) {
      const lines = raw.split("\n").filter(Boolean);
      return lines.map((l: any) => JSON.parse(l));
    }
    return raw;
  },

  run: (args: Value[]) => {
    const image = args[0] as string;
    const options = (args[1] as Record<string, unknown>) ?? {};
    let cmd = "docker run";
    if (options.detach) cmd += " -d";
    if (options.rm) cmd += " --rm";
    if (options.name) cmd += ` --name ${options.name}`;
    if (options.ports) {
      const ports = options.ports as string[];
      for (const p of ports) cmd += ` -p ${p}`;
    }
    if (options.env) {
      const envVars = options.env as Record<string, string>;
      for (const [k, v] of Object.entries(envVars)) cmd += ` -e ${k}=${v}`;
    }
    if (options.volumes) {
      const vols = options.volumes as string[];
      for (const v of vols) cmd += ` -v ${v}`;
    }
    if (options.network) cmd += ` --network ${options.network}`;
    cmd += ` ${image}`;
    if (options.command) cmd += ` ${options.command}`;
    return exec(cmd);
  },

  stop: (args: Value[]) => {
    const container = args[0] as string;
    const timeout = (args[1] as number) ?? undefined;
    let cmd = `docker stop ${container}`;
    if (timeout !== undefined) cmd = `docker stop -t ${timeout} ${container}`;
    return exec(cmd);
  },

  start: (args: Value[]) => {
    const container = args[0] as string;
    return exec(`docker start ${container}`);
  },

  rm: (args: Value[]) => {
    const container = args[0] as string;
    const force = (args[1] as boolean) ?? false;
    const volumes = (args[2] as boolean) ?? false;
    let cmd = "docker rm";
    if (force) cmd += " -f";
    if (volumes) cmd += " -v";
    cmd += ` ${container}`;
    return exec(cmd);
  },

  rmi: (args: Value[]) => {
    const image = args[0] as string;
    const force = (args[1] as boolean) ?? false;
    let cmd = "docker rmi";
    if (force) cmd += " -f";
    cmd += ` ${image}`;
    return exec(cmd);
  },

  logs: (args: Value[]) => {
    const container = args[0] as string;
    const tail = (args[1] as number) ?? undefined;
    const follow = (args[2] as boolean) ?? false;
    let cmd = `docker logs ${container}`;
    if (tail !== undefined) cmd += ` --tail ${tail}`;
    if (follow) cmd += " -f";
    return exec(cmd);
  },

  exec: (args: Value[]) => {
    const container = args[0] as string;
    const command = args[1] as string;
    const interactive = (args[2] as boolean) ?? false;
    const workdir = (args[3] as string) ?? undefined;
    let cmd = "docker exec";
    if (interactive) cmd += " -it";
    if (workdir) cmd += ` -w ${workdir}`;
    cmd += ` ${container} ${command}`;
    return exec(cmd);
  },

  build: (args: Value[]) => {
    const context = args[0] as string;
    const options = (args[1] as Record<string, unknown>) ?? {};
    let cmd = "docker build";
    if (options.tag) cmd += ` -t ${options.tag}`;
    if (options.file) cmd += ` -f ${options.file}`;
    if (options.noCache) cmd += " --no-cache";
    if (options.buildArgs) {
      const buildArgs = options.buildArgs as Record<string, string>;
      for (const [k, v] of Object.entries(buildArgs)) cmd += ` --build-arg ${k}=${v}`;
    }
    cmd += ` ${context}`;
    return exec(cmd);
  },

  pull: (args: Value[]) => {
    const image = args[0] as string;
    return exec(`docker pull ${image}`);
  },

  push: (args: Value[]) => {
    const image = args[0] as string;
    return exec(`docker push ${image}`);
  },

  inspect: (args: Value[]) => {
    const target = args[0] as string;
    const format = (args[1] as string) ?? undefined;
    let cmd = `docker inspect ${target}`;
    if (format) cmd += ` --format '${format}'`;
    return execJson(cmd);
  },

  stats: (args: Value[]) => {
    const container = (args[0] as string) ?? undefined;
    let cmd = "docker stats --no-stream";
    if (container) cmd += ` ${container}`;
    cmd += ' --format "{{json .}}"';
    const raw = exec(cmd);
    if (raw) {
      const lines = raw.split("\n").filter(Boolean);
      return lines.map((l: any) => JSON.parse(l));
    }
    return [];
  },

  network: (args: Value[]) => {
    const action = (args[0] as string) ?? "ls";
    const name = (args[1] as string) ?? undefined;
    const driver = (args[2] as string) ?? undefined;
    if (action === "create" && name) {
      let cmd = `docker network create ${name}`;
      if (driver) cmd += ` --driver ${driver}`;
      return exec(cmd);
    }
    if (action === "rm" && name) return exec(`docker network rm ${name}`);
    if (action === "inspect" && name) return execJson(`docker network inspect ${name}`);
    return exec('docker network ls --format "{{json .}}"').split("\n").filter(Boolean).map((l: any) => JSON.parse(l));
  },

  volume: (args: Value[]) => {
    const action = (args[0] as string) ?? "ls";
    const name = (args[1] as string) ?? undefined;
    const driver = (args[2] as string) ?? undefined;
    if (action === "create" && name) {
      let cmd = `docker volume create ${name}`;
      if (driver) cmd += ` --driver ${driver}`;
      return exec(cmd);
    }
    if (action === "rm" && name) return exec(`docker volume rm ${name}`);
    if (action === "inspect" && name) return execJson(`docker volume inspect ${name}`);
    return exec('docker volume ls --format "{{json .}}"').split("\n").filter(Boolean).map((l: any) => JSON.parse(l));
  },
};

export const DockerFunctionMetadata = {
  ps: {
    description: "List Docker containers",
    parameters: [
      { name: "all", dataType: "boolean", formInputType: "checkbox", required: false, description: "Show all containers including stopped (default: true)" },
      { name: "format", dataType: "string", formInputType: "text", required: false, description: "Output format: json or table (default: json)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  images: {
    description: "List Docker images",
    parameters: [
      { name: "format", dataType: "string", formInputType: "text", required: false, description: "Output format: json or table (default: json)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  run: {
    description: "Run a new container from an image",
    parameters: [
      { name: "image", dataType: "string", formInputType: "text", required: true, description: "Image name to run" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Run options: detach, rm, name, ports[], env{}, volumes[], network, command" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  stop: {
    description: "Stop a running container",
    parameters: [
      { name: "container", dataType: "string", formInputType: "text", required: true, description: "Container ID or name" },
      { name: "timeout", dataType: "number", formInputType: "number", required: false, description: "Seconds to wait before killing" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  start: {
    description: "Start a stopped container",
    parameters: [
      { name: "container", dataType: "string", formInputType: "text", required: true, description: "Container ID or name" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  rm: {
    description: "Remove a container",
    parameters: [
      { name: "container", dataType: "string", formInputType: "text", required: true, description: "Container ID or name" },
      { name: "force", dataType: "boolean", formInputType: "checkbox", required: false, description: "Force remove running container" },
      { name: "volumes", dataType: "boolean", formInputType: "checkbox", required: false, description: "Remove associated volumes" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  rmi: {
    description: "Remove a Docker image",
    parameters: [
      { name: "image", dataType: "string", formInputType: "text", required: true, description: "Image ID or name" },
      { name: "force", dataType: "boolean", formInputType: "checkbox", required: false, description: "Force remove" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  logs: {
    description: "Fetch logs from a container",
    parameters: [
      { name: "container", dataType: "string", formInputType: "text", required: true, description: "Container ID or name" },
      { name: "tail", dataType: "number", formInputType: "number", required: false, description: "Number of lines from the end" },
      { name: "follow", dataType: "boolean", formInputType: "checkbox", required: false, description: "Follow log output" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  exec: {
    description: "Execute a command inside a running container",
    parameters: [
      { name: "container", dataType: "string", formInputType: "text", required: true, description: "Container ID or name" },
      { name: "command", dataType: "string", formInputType: "text", required: true, description: "Command to execute" },
      { name: "interactive", dataType: "boolean", formInputType: "checkbox", required: false, description: "Interactive mode with TTY" },
      { name: "workdir", dataType: "string", formInputType: "text", required: false, description: "Working directory inside container" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  build: {
    description: "Build a Docker image from a Dockerfile",
    parameters: [
      { name: "context", dataType: "string", formInputType: "text", required: true, description: "Build context path" },
      { name: "options", dataType: "object", formInputType: "json", required: false, description: "Build options: tag, file, noCache, buildArgs{}" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  pull: {
    description: "Pull a Docker image from a registry",
    parameters: [
      { name: "image", dataType: "string", formInputType: "text", required: true, description: "Image name with optional tag" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  push: {
    description: "Push a Docker image to a registry",
    parameters: [
      { name: "image", dataType: "string", formInputType: "text", required: true, description: "Image name with optional tag" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  inspect: {
    description: "Return low-level information on a container or image",
    parameters: [
      { name: "target", dataType: "string", formInputType: "text", required: true, description: "Container or image ID/name" },
      { name: "format", dataType: "string", formInputType: "text", required: false, description: "Go template format string" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  stats: {
    description: "Display container resource usage statistics",
    parameters: [
      { name: "container", dataType: "string", formInputType: "text", required: false, description: "Container ID or name (omit for all)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  network: {
    description: "Manage Docker networks",
    parameters: [
      { name: "action", dataType: "string", formInputType: "text", required: false, description: "Action: ls, create, rm, inspect (default: ls)" },
      { name: "name", dataType: "string", formInputType: "text", required: false, description: "Network name" },
      { name: "driver", dataType: "string", formInputType: "text", required: false, description: "Network driver (for create)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  volume: {
    description: "Manage Docker volumes",
    parameters: [
      { name: "action", dataType: "string", formInputType: "text", required: false, description: "Action: ls, create, rm, inspect (default: ls)" },
      { name: "name", dataType: "string", formInputType: "text", required: false, description: "Volume name" },
      { name: "driver", dataType: "string", formInputType: "text", required: false, description: "Volume driver (for create)" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
};

export const DockerModuleMetadata = {
  description: "Docker container and image management using the system docker binary",
  version: "1.0.0",
  dependencies: [],
};
