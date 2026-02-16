import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import { createCanvas } from "@napi-rs/canvas";
import { Chart, registerables } from "chart.js";
import type { ChartConfiguration } from "chart.js";
import { writeFileSync } from "node:fs";

// Register all Chart.js chart types and elements
Chart.register(...registerables);

// ── Types ──────────────────────────────────────────────────────────

interface DatasetInput {
  label?: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
  pointRadius?: number;
  [key: string]: unknown;
}

interface ChartDataInput {
  labels?: string[];
  datasets: DatasetInput[];
}

interface StoredConfig {
  type: string;
  data: ChartDataInput;
  width: number;
  height: number;
  title: string;
  backgroundColor: string;
  indexAxis: string | undefined;
  legendPosition: string;
  showLegend: boolean;
  extraOptions: Record<string, unknown>;
}

// ── State ──────────────────────────────────────────────────────────

const charts = new Map<string, StoredConfig>();

const DEFAULT_COLORS = [
  "#4dc9f6", "#f67019", "#f53794", "#537bc4", "#acc236",
  "#166a8f", "#00a950", "#58595b", "#8549ba", "#e6194b",
  "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4",
];

// ── Helpers ────────────────────────────────────────────────────────

function getChart(id: string): StoredConfig {
  const c = charts.get(id);
  if (!c) throw new Error(`Chart "${id}" not found`);
  return c;
}

function applyColors(config: StoredConfig): void {
  const isPieType = ["pie", "doughnut", "polarArea"].includes(config.type);
  for (let i = 0; i < config.data.datasets.length; i++) {
    const ds = config.data.datasets[i]!;
    if (!ds.backgroundColor) {
      if (isPieType) {
        ds.backgroundColor = config.data.datasets[i]!.data.map(
          (_, j) => DEFAULT_COLORS[j % DEFAULT_COLORS.length]!
        );
      } else {
        ds.backgroundColor = DEFAULT_COLORS[i % DEFAULT_COLORS.length]!;
      }
    }
    if (!ds.borderColor && !isPieType) {
      ds.borderColor = ds.backgroundColor;
    }
  }
}

function buildChartConfig(config: StoredConfig): ChartConfiguration {
  applyColors(config);
  return {
    type: config.type as ChartConfiguration["type"],
    data: config.data as ChartConfiguration["data"],
    options: {
      responsive: false,
      animation: false as unknown as undefined,
      devicePixelRatio: 1,
      plugins: {
        title: {
          display: !!config.title,
          text: config.title,
          font: { size: 16, weight: "bold" as const },
        },
        legend: {
          display: config.showLegend,
          position: config.legendPosition as "top" | "bottom" | "left" | "right",
        },
      },
      ...(config.indexAxis ? { indexAxis: config.indexAxis as "x" | "y" } : {}),
      ...config.extraOptions,
    },
  } as ChartConfiguration;
}

function renderChart(config: StoredConfig, mimeType = "image/png"): Buffer {
  const canvas = createCanvas(config.width, config.height);
  const ctx = canvas.getContext("2d");

  // Fill background
  ctx.fillStyle = config.backgroundColor || "white";
  ctx.fillRect(0, 0, config.width, config.height);

  const chartConfig = buildChartConfig(config);

  // Chart.js renders synchronously when animation is disabled
  const chart = new Chart(ctx as any, chartConfig);

  const buffer = mimeType === "image/jpeg"
    ? canvas.toBuffer("image/jpeg")
    : canvas.toBuffer("image/png");

  chart.destroy();
  return buffer;
}

// ── Functions ──────────────────────────────────────────────────────

const create: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "chart1");
  const type = String(args[1] ?? "bar");
  const data = (args[2] && typeof args[2] === "object" ? args[2] : { labels: [], datasets: [] }) as ChartDataInput;
  const opts = (args[3] && typeof args[3] === "object" ? args[3] : {}) as Record<string, unknown>;

  if (charts.has(id)) throw new Error(`Chart "${id}" already exists`);

  const config: StoredConfig = {
    type,
    data: {
      labels: Array.isArray(data.labels) ? data.labels.map(String) : [],
      datasets: Array.isArray(data.datasets) ? data.datasets : [],
    },
    width: typeof opts.width === "number" ? opts.width : 800,
    height: typeof opts.height === "number" ? opts.height : 400,
    title: typeof opts.title === "string" ? opts.title : "",
    backgroundColor: typeof opts.backgroundColor === "string" ? opts.backgroundColor : "white",
    indexAxis: typeof opts.indexAxis === "string" ? opts.indexAxis : undefined,
    legendPosition: typeof opts.legendPosition === "string" ? opts.legendPosition : "top",
    showLegend: opts.showLegend !== false,
    extraOptions: {},
  };

  charts.set(id, config);
  return { id, type, datasets: config.data.datasets.length, width: config.width, height: config.height };
};

const addDataset: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "chart1");
  const dataset = (args[1] && typeof args[1] === "object" ? args[1] : {}) as DatasetInput;
  const config = getChart(id);
  config.data.datasets.push(dataset);
  return { id, datasets: config.data.datasets.length };
};

const update: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "chart1");
  const opts = (args[1] && typeof args[1] === "object" ? args[1] : {}) as Record<string, unknown>;
  const config = getChart(id);

  if (typeof opts.title === "string") config.title = opts.title;
  if (typeof opts.width === "number") config.width = opts.width;
  if (typeof opts.height === "number") config.height = opts.height;
  if (typeof opts.backgroundColor === "string") config.backgroundColor = opts.backgroundColor;
  if (typeof opts.indexAxis === "string") config.indexAxis = opts.indexAxis;
  if (typeof opts.legendPosition === "string") config.legendPosition = opts.legendPosition;
  if (typeof opts.showLegend === "boolean") config.showLegend = opts.showLegend;
  if (typeof opts.type === "string") config.type = opts.type;

  if (opts.labels && Array.isArray(opts.labels)) {
    config.data.labels = opts.labels.map(String);
  }

  return { id, updated: true };
};

const save: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "chart1");
  const filePath = String(args[1] ?? "./chart.png");
  const opts = (args[2] && typeof args[2] === "object" ? args[2] : {}) as Record<string, unknown>;
  const config = getChart(id);

  const format = typeof opts.format === "string" ? opts.format.toLowerCase() : "png";
  const mimeType = format === "jpeg" || format === "jpg" ? "image/jpeg" : "image/png";

  const buffer = renderChart(config, mimeType);
  writeFileSync(filePath, buffer);

  return { id, path: filePath, format, size: buffer.length };
};

const toBase64: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "chart1");
  const opts = (args[1] && typeof args[1] === "object" ? args[1] : {}) as Record<string, unknown>;
  const config = getChart(id);

  const format = typeof opts.format === "string" ? opts.format.toLowerCase() : "png";
  const mimeType = format === "jpeg" || format === "jpg" ? "image/jpeg" : "image/png";

  const buffer = renderChart(config, mimeType);
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
};

const toBuffer: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "chart1");
  const config = getChart(id);
  const buffer = renderChart(config);
  return buffer as unknown as object;
};

const destroy: BuiltinHandler = (args) => {
  const id = String(args[0] ?? "chart1");
  const existed = charts.delete(id);
  return { id, destroyed: existed };
};

// ── Exports ────────────────────────────────────────────────────────

export const ChartFunctions: Record<string, BuiltinHandler> = {
  create, addDataset, update, save, toBase64, toBuffer, destroy,
};

export const ChartFunctionMetadata: Record<string, FunctionMetadata> = {
  create: {
    description: "Create a new chart (bar, line, pie, doughnut, scatter, radar, polarArea, bubble)",
    parameters: [
      { name: "id", dataType: "string", description: "Unique chart identifier", formInputType: "text", required: true },
      { name: "type", dataType: "string", description: "Chart type: bar, line, pie, doughnut, scatter, radar, polarArea, bubble", formInputType: "text", required: true },
      { name: "data", dataType: "object", description: "{labels: string[], datasets: [{label, data, backgroundColor?, borderColor?}]}", formInputType: "json", required: true },
      { name: "opts", dataType: "object", description: "{width?, height?, title?, backgroundColor?, indexAxis?, legendPosition?, showLegend?}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Chart creation info",
    example: 'chart.create "c1" "bar" {"labels": ["Q1","Q2"], "datasets": [{"label": "Sales", "data": [100,200]}]} {"title": "Revenue"}',
  },
  addDataset: {
    description: "Add a dataset to an existing chart",
    parameters: [
      { name: "id", dataType: "string", description: "Chart ID", formInputType: "text", required: true },
      { name: "dataset", dataType: "object", description: "{label, data, backgroundColor?, borderColor?, borderWidth?}", formInputType: "json", required: true },
    ],
    returnType: "object", returnDescription: "Updated dataset count",
    example: 'chart.addDataset "c1" {"label": "Costs", "data": [50, 80]}',
  },
  update: {
    description: "Update chart options (title, size, legend, type, labels)",
    parameters: [
      { name: "id", dataType: "string", description: "Chart ID", formInputType: "text", required: true },
      { name: "opts", dataType: "object", description: "{title?, width?, height?, backgroundColor?, type?, legendPosition?, showLegend?, labels?}", formInputType: "json", required: true },
    ],
    returnType: "object", returnDescription: "Update confirmation",
    example: 'chart.update "c1" {"title": "Updated Title", "width": 1200}',
  },
  save: {
    description: "Render chart and save to PNG or JPEG file",
    parameters: [
      { name: "id", dataType: "string", description: "Chart ID", formInputType: "text", required: true },
      { name: "filePath", dataType: "string", description: "Output file path", formInputType: "text", required: true },
      { name: "opts", dataType: "object", description: "{format?: 'png'|'jpeg'}", formInputType: "json", required: false },
    ],
    returnType: "object", returnDescription: "Save result with file size",
    example: 'chart.save "c1" "./output/chart.png"',
  },
  toBase64: {
    description: "Render chart and return as base64 data URL string",
    parameters: [
      { name: "id", dataType: "string", description: "Chart ID", formInputType: "text", required: true },
      { name: "opts", dataType: "object", description: "{format?: 'png'|'jpeg'}", formInputType: "json", required: false },
    ],
    returnType: "string", returnDescription: "Base64 data URL (data:image/png;base64,...)",
    example: 'chart.toBase64 "c1"',
  },
  toBuffer: {
    description: "Render chart and return as raw Buffer",
    parameters: [
      { name: "id", dataType: "string", description: "Chart ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "PNG buffer",
    example: 'chart.toBuffer "c1"',
  },
  destroy: {
    description: "Remove chart from memory",
    parameters: [
      { name: "id", dataType: "string", description: "Chart ID", formInputType: "text", required: true },
    ],
    returnType: "object", returnDescription: "Destroy confirmation",
    example: 'chart.destroy "c1"',
  },
};

export const ChartModuleMetadata: ModuleMetadata = {
  description: "Generate chart images (PNG/JPEG) using Chart.js. Supports bar, line, pie, doughnut, scatter, radar, polarArea, and bubble charts with auto-coloring and customizable titles, legends, and dimensions.",
  methods: ["create", "addDataset", "update", "save", "toBase64", "toBuffer", "destroy"],
};
