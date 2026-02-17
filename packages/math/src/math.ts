import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

const clamp: BuiltinHandler = (args) => {
  const value = Number(args[0]);
  const min = Number(args[1]);
  const max = Number(args[2]);
  return Math.min(Math.max(value, min), max);
};

const round: BuiltinHandler = (args) => {
  const value = Number(args[0]);
  const decimals = args[1] != null ? Number(args[1]) : 0;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

const randomInt: BuiltinHandler = (args) => {
  const min = Math.ceil(Number(args[0]));
  const max = Math.floor(Number(args[1]));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomFloat: BuiltinHandler = (args) => {
  const min = Number(args[0]);
  const max = Number(args[1]);
  return Math.random() * (max - min) + min;
};

const sum: BuiltinHandler = (args) => {
  const arr = args[0] as number[];
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((acc, val) => acc + Number(val), 0);
};

const avg: BuiltinHandler = (args) => {
  const arr = args[0] as number[];
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  return arr.reduce((acc, val) => acc + Number(val), 0) / arr.length;
};

const median: BuiltinHandler = (args) => {
  const arr = args[0] as number[];
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  const sorted = [...arr].map(Number).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid]! : (sorted[mid - 1]! + sorted[mid]!) / 2;
};

const min: BuiltinHandler = (args) => {
  const arr = args[0] as number[];
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return Math.min(...arr.map(Number));
};

const max: BuiltinHandler = (args) => {
  const arr = args[0] as number[];
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return Math.max(...arr.map(Number));
};

const percentage: BuiltinHandler = (args) => {
  const value = Number(args[0]);
  const total = Number(args[1]);
  if (total === 0) return 0;
  return (value / total) * 100;
};

const factorial: BuiltinHandler = (args) => {
  let n = Number(args[0]);
  if (n < 0) throw new Error("Factorial is not defined for negative numbers");
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

const gcd: BuiltinHandler = (args) => {
  let a = Math.abs(Number(args[0]));
  let b = Math.abs(Number(args[1]));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
};

const lcm: BuiltinHandler = (args) => {
  const a = Math.abs(Number(args[0]));
  const b = Math.abs(Number(args[1]));
  if (a === 0 && b === 0) return 0;
  let ga = a, gb = b;
  while (gb) {
    [ga, gb] = [gb, ga % gb];
  }
  return (a / ga) * b;
};

const isPrime: BuiltinHandler = (args) => {
  const n = Number(args[0]);
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
};

const lerp: BuiltinHandler = (args) => {
  const start = Number(args[0]);
  const end = Number(args[1]);
  const t = Number(args[2]);
  return start + (end - start) * t;
};

// ── Exports ─────────────────────────────────────────────────────────

export const MathFunctions: Record<string, BuiltinHandler> = {
  clamp, round, randomInt, randomFloat, sum, avg, median, min, max,
  percentage, factorial, gcd, lcm, isPrime, lerp,
};

export const MathFunctionMetadata = {
  clamp: {
    description: "Clamp a number between a minimum and maximum value",
    parameters: [
      { name: "value", dataType: "number", description: "The number to clamp", formInputType: "number", required: true },
      { name: "min", dataType: "number", description: "Minimum value", formInputType: "number", required: true },
      { name: "max", dataType: "number", description: "Maximum value", formInputType: "number", required: true },
    ],
    returnType: "number",
    returnDescription: "Clamped number",
    example: "math.clamp 15 0 10",
  },
  round: {
    description: "Round a number to N decimal places",
    parameters: [
      { name: "value", dataType: "number", description: "The number to round", formInputType: "number", required: true },
      { name: "decimals", dataType: "number", description: "Number of decimal places (default: 0)", formInputType: "number", required: false, defaultValue: "0" },
    ],
    returnType: "number",
    returnDescription: "Rounded number",
    example: "math.round 3.14159 2",
  },
  randomInt: {
    description: "Generate a random integer between min and max (inclusive)",
    parameters: [
      { name: "min", dataType: "number", description: "Minimum value (inclusive)", formInputType: "number", required: true },
      { name: "max", dataType: "number", description: "Maximum value (inclusive)", formInputType: "number", required: true },
    ],
    returnType: "number",
    returnDescription: "Random integer",
    example: "math.randomInt 1 100",
  },
  randomFloat: {
    description: "Generate a random float between min and max",
    parameters: [
      { name: "min", dataType: "number", description: "Minimum value", formInputType: "number", required: true },
      { name: "max", dataType: "number", description: "Maximum value", formInputType: "number", required: true },
    ],
    returnType: "number",
    returnDescription: "Random float",
    example: "math.randomFloat 0 1",
  },
  sum: {
    description: "Calculate the sum of an array of numbers",
    parameters: [
      { name: "numbers", dataType: "array", description: "Array of numbers", formInputType: "json", required: true },
    ],
    returnType: "number",
    returnDescription: "Sum of all numbers",
    example: "math.sum [1, 2, 3, 4, 5]",
  },
  avg: {
    description: "Calculate the average of an array of numbers",
    parameters: [
      { name: "numbers", dataType: "array", description: "Array of numbers", formInputType: "json", required: true },
    ],
    returnType: "number",
    returnDescription: "Average value",
    example: "math.avg [10, 20, 30]",
  },
  median: {
    description: "Calculate the median of an array of numbers",
    parameters: [
      { name: "numbers", dataType: "array", description: "Array of numbers", formInputType: "json", required: true },
    ],
    returnType: "number",
    returnDescription: "Median value",
    example: "math.median [1, 3, 5, 7, 9]",
  },
  min: {
    description: "Find the minimum value in an array",
    parameters: [
      { name: "numbers", dataType: "array", description: "Array of numbers", formInputType: "json", required: true },
    ],
    returnType: "number",
    returnDescription: "Minimum value",
    example: "math.min [5, 2, 8, 1]",
  },
  max: {
    description: "Find the maximum value in an array",
    parameters: [
      { name: "numbers", dataType: "array", description: "Array of numbers", formInputType: "json", required: true },
    ],
    returnType: "number",
    returnDescription: "Maximum value",
    example: "math.max [5, 2, 8, 1]",
  },
  percentage: {
    description: "Calculate what percentage a value is of a total",
    parameters: [
      { name: "value", dataType: "number", description: "The value", formInputType: "number", required: true },
      { name: "total", dataType: "number", description: "The total", formInputType: "number", required: true },
    ],
    returnType: "number",
    returnDescription: "Percentage value",
    example: "math.percentage 25 200",
  },
  factorial: {
    description: "Calculate the factorial of a number",
    parameters: [
      { name: "n", dataType: "number", description: "Non-negative integer", formInputType: "number", required: true },
    ],
    returnType: "number",
    returnDescription: "Factorial result",
    example: "math.factorial 5",
  },
  gcd: {
    description: "Calculate the greatest common divisor of two numbers",
    parameters: [
      { name: "a", dataType: "number", description: "First number", formInputType: "number", required: true },
      { name: "b", dataType: "number", description: "Second number", formInputType: "number", required: true },
    ],
    returnType: "number",
    returnDescription: "Greatest common divisor",
    example: "math.gcd 12 8",
  },
  lcm: {
    description: "Calculate the least common multiple of two numbers",
    parameters: [
      { name: "a", dataType: "number", description: "First number", formInputType: "number", required: true },
      { name: "b", dataType: "number", description: "Second number", formInputType: "number", required: true },
    ],
    returnType: "number",
    returnDescription: "Least common multiple",
    example: "math.lcm 4 6",
  },
  isPrime: {
    description: "Check if a number is prime",
    parameters: [
      { name: "n", dataType: "number", description: "The number to check", formInputType: "number", required: true },
    ],
    returnType: "boolean",
    returnDescription: "True if the number is prime",
    example: "math.isPrime 17",
  },
  lerp: {
    description: "Linear interpolation between two values",
    parameters: [
      { name: "start", dataType: "number", description: "Start value", formInputType: "number", required: true },
      { name: "end", dataType: "number", description: "End value", formInputType: "number", required: true },
      { name: "t", dataType: "number", description: "Interpolation factor (0-1)", formInputType: "number", required: true },
    ],
    returnType: "number",
    returnDescription: "Interpolated value",
    example: "math.lerp 0 100 0.5",
  },
};

export const MathModuleMetadata = {
  description: "Math utilities: clamp, round, random, statistics, factorial, GCD, LCM, prime check, and linear interpolation",
  methods: ["clamp", "round", "randomInt", "randomFloat", "sum", "avg", "median", "min", "max", "percentage", "factorial", "gcd", "lcm", "isPrime", "lerp"],
};
