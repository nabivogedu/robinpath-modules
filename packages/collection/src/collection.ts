import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";

// ── Helpers ─────────────────────────────────────────────────────────

function toNumber(v: unknown): number {
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
}

function getProperty(obj: unknown, key: string): any {
  if (obj != null && typeof obj === "object") {
    return (obj as Record<string, unknown>)[key];
  }
  return undefined;
}

function extractNumbers(arr: unknown[], key?: string): number[] {
  if (key) {
    return arr.map((item: any) => toNumber(getProperty(item, key)));
  }
  return arr.map((item: any) => toNumber(item));
}

function looseEquals(a: unknown, b: unknown): boolean {
  // Handle number comparison: if either side is a number, compare numerically
  if (typeof a === "number" || typeof b === "number") {
    return toNumber(a) === toNumber(b);
  }
  // Fallback to strict string comparison
  return String(a) === String(b);
}

// ── RobinPath Function Handlers ─────────────────────────────────────

const pluck: BuiltinHandler = (args) => {
  const arr = args[0];
  const key = String(args[1] ?? "");
  if (!Array.isArray(arr)) return [];
  return arr.map((item: any) => getProperty(item, key) ?? null);
};

const where: BuiltinHandler = (args) => {
  const arr = args[0];
  const key = String(args[1] ?? "");
  const value = args[2];
  if (!Array.isArray(arr)) return [];
  return arr.filter((item: any) => looseEquals(getProperty(item, key), value));
};

const whereGt: BuiltinHandler = (args) => {
  const arr = args[0];
  const key = String(args[1] ?? "");
  const value = toNumber(args[2]);
  if (!Array.isArray(arr)) return [];
  return arr.filter((item: any) => toNumber(getProperty(item, key)) > value);
};

const whereLt: BuiltinHandler = (args) => {
  const arr = args[0];
  const key = String(args[1] ?? "");
  const value = toNumber(args[2]);
  if (!Array.isArray(arr)) return [];
  return arr.filter((item: any) => toNumber(getProperty(item, key)) < value);
};

const whereGte: BuiltinHandler = (args) => {
  const arr = args[0];
  const key = String(args[1] ?? "");
  const value = toNumber(args[2]);
  if (!Array.isArray(arr)) return [];
  return arr.filter((item: any) => toNumber(getProperty(item, key)) >= value);
};

const whereLte: BuiltinHandler = (args) => {
  const arr = args[0];
  const key = String(args[1] ?? "");
  const value = toNumber(args[2]);
  if (!Array.isArray(arr)) return [];
  return arr.filter((item: any) => toNumber(getProperty(item, key)) <= value);
};

const whereNot: BuiltinHandler = (args) => {
  const arr = args[0];
  const key = String(args[1] ?? "");
  const value = args[2];
  if (!Array.isArray(arr)) return [];
  return arr.filter((item: any) => !looseEquals(getProperty(item, key), value));
};

const sortBy: BuiltinHandler = (args) => {
  const arr = args[0];
  const key = String(args[1] ?? "");
  if (!Array.isArray(arr)) return [];
  return [...arr].sort((a: any, b: any) => {
    const va = getProperty(a, key);
    const vb = getProperty(b, key);
    if (typeof va === "number" && typeof vb === "number") return va - vb;
    return String(va ?? "").localeCompare(String(vb ?? ""));
  });
};

const sortByDesc: BuiltinHandler = (args) => {
  const arr = args[0];
  const key = String(args[1] ?? "");
  if (!Array.isArray(arr)) return [];
  return [...arr].sort((a: any, b: any) => {
    const va = getProperty(a, key);
    const vb = getProperty(b, key);
    if (typeof va === "number" && typeof vb === "number") return vb - va;
    return String(vb ?? "").localeCompare(String(va ?? ""));
  });
};

const unique: BuiltinHandler = (args) => {
  const arr = args[0];
  if (!Array.isArray(arr)) return [];
  const seen = new Set<string>();
  const result: unknown[] = [];
  for (const item of arr) {
    const serialized = JSON.stringify(item);
    if (!seen.has(serialized)) {
      seen.add(serialized);
      result.push(item);
    }
  }
  return result;
};

const flatten: BuiltinHandler = (args) => {
  const arr = args[0];
  if (!Array.isArray(arr)) return [];
  const result: unknown[] = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...item);
    } else {
      result.push(item);
    }
  }
  return result;
};

const reverse: BuiltinHandler = (args) => {
  const arr = args[0];
  if (!Array.isArray(arr)) return [];
  return [...arr].reverse();
};

const chunk: BuiltinHandler = (args) => {
  const arr = args[0];
  const size = Math.max(1, toNumber(args[1]));
  if (!Array.isArray(arr)) return [];
  const result: unknown[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const first: BuiltinHandler = (args) => {
  const arr = args[0];
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return arr[0] ?? null;
};

const last: BuiltinHandler = (args) => {
  const arr = args[0];
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return arr[arr.length - 1] ?? null;
};

const count: BuiltinHandler = (args) => {
  const arr = args[0];
  if (!Array.isArray(arr)) return 0;
  return arr.length;
};

const sum: BuiltinHandler = (args) => {
  const arr = args[0];
  if (!Array.isArray(arr)) return 0;
  const key = args[1] != null ? String(args[1]) : undefined;
  const nums = extractNumbers(arr, key);
  return nums.reduce((acc, n) => acc + n, 0);
};

const avg: BuiltinHandler = (args) => {
  const arr = args[0];
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  const key = args[1] != null ? String(args[1]) : undefined;
  const nums = extractNumbers(arr, key);
  return nums.reduce((acc, n) => acc + n, 0) / nums.length;
};

const min: BuiltinHandler = (args) => {
  const arr = args[0];
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  const key = args[1] != null ? String(args[1]) : undefined;
  const nums = extractNumbers(arr, key);
  return Math.min(...nums);
};

const max: BuiltinHandler = (args) => {
  const arr = args[0];
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  const key = args[1] != null ? String(args[1]) : undefined;
  const nums = extractNumbers(arr, key);
  return Math.max(...nums);
};

const groupBy: BuiltinHandler = (args) => {
  const arr = args[0];
  const key = String(args[1] ?? "");
  if (!Array.isArray(arr)) return {};
  const result: Record<string, unknown[]> = {};
  for (const item of arr) {
    const groupKey = String(getProperty(item, key) ?? "");
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey]!.push(item);
  }
  return result;
};

const compact: BuiltinHandler = (args) => {
  const arr = args[0];
  if (!Array.isArray(arr)) return [];
  return arr.filter((item: any) => item !== null && item !== undefined && item !== false && item !== 0 && item !== "");
};

const zip: BuiltinHandler = (args) => {
  const a = args[0];
  const b = args[1];
  if (!Array.isArray(a) || !Array.isArray(b)) return [];
  const len = Math.min(a.length, b.length);
  const result: unknown[][] = [];
  for (let i = 0; i < len; i++) {
    result.push([a[i], b[i]]);
  }
  return result;
};

const difference: BuiltinHandler = (args) => {
  const a = args[0];
  const b = args[1];
  if (!Array.isArray(a) || !Array.isArray(b)) return [];
  const bSet = new Set(b.map((item: any) => JSON.stringify(item)));
  return a.filter((item: any) => !bSet.has(JSON.stringify(item)));
};

const intersection: BuiltinHandler = (args) => {
  const a = args[0];
  const b = args[1];
  if (!Array.isArray(a) || !Array.isArray(b)) return [];
  const bSet = new Set(b.map((item: any) => JSON.stringify(item)));
  return a.filter((item: any) => bSet.has(JSON.stringify(item)));
};

const union: BuiltinHandler = (args) => {
  const a = args[0];
  const b = args[1];
  if (!Array.isArray(a) || !Array.isArray(b)) return [];
  const seen = new Set<string>();
  const result: unknown[] = [];
  for (const item of [...a, ...b]) {
    const serialized = JSON.stringify(item);
    if (!seen.has(serialized)) {
      seen.add(serialized);
      result.push(item);
    }
  }
  return result;
};

const take: BuiltinHandler = (args) => {
  const arr = args[0];
  const n = toNumber(args[1]);
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, n);
};

const skip: BuiltinHandler = (args) => {
  const arr = args[0];
  const n = toNumber(args[1]);
  if (!Array.isArray(arr)) return [];
  return arr.slice(n);
};

const contains: BuiltinHandler = (args) => {
  const arr = args[0];
  const value = args[1];
  if (!Array.isArray(arr)) return false;
  const serialized = JSON.stringify(value);
  return arr.some((item: any) => JSON.stringify(item) === serialized);
};

const indexOf: BuiltinHandler = (args) => {
  const arr = args[0];
  const value = args[1];
  if (!Array.isArray(arr)) return -1;
  const serialized = JSON.stringify(value);
  return arr.findIndex((item: any) => JSON.stringify(item) === serialized);
};

// ── Exports ─────────────────────────────────────────────────────────

export const CollectionFunctions: Record<string, BuiltinHandler> = {
  pluck,
  where,
  whereGt,
  whereLt,
  whereGte,
  whereLte,
  whereNot,
  sortBy,
  sortByDesc,
  unique,
  flatten,
  reverse,
  chunk,
  first,
  last,
  count,
  sum,
  avg,
  min,
  max,
  groupBy,
  compact,
  zip,
  difference,
  intersection,
  union,
  take,
  skip,
  contains,
  indexOf,
};

export const CollectionFunctionMetadata = {
  pluck: {
    description: "Extract a single property value from each object in an array",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of objects to pluck from",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to extract",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Array of extracted property values",
    example: 'collection.pluck $arr "name"',
  },
  where: {
    description: "Filter array to items where a property equals a given value",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of objects to filter",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to compare",
        formInputType: "text",
        required: true,
      },
      {
        name: "value",
        dataType: "any",
        description: "Value to match against",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Filtered array of matching objects",
    example: 'collection.where $arr "age" 25',
  },
  whereGt: {
    description: "Filter array to items where a numeric property is greater than a value",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of objects to filter",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to compare",
        formInputType: "text",
        required: true,
      },
      {
        name: "value",
        dataType: "number",
        description: "Threshold value (exclusive)",
        formInputType: "number",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Filtered array where property > value",
    example: 'collection.whereGt $arr "age" 25',
  },
  whereLt: {
    description: "Filter array to items where a numeric property is less than a value",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of objects to filter",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to compare",
        formInputType: "text",
        required: true,
      },
      {
        name: "value",
        dataType: "number",
        description: "Threshold value (exclusive)",
        formInputType: "number",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Filtered array where property < value",
    example: 'collection.whereLt $arr "age" 25',
  },
  whereGte: {
    description: "Filter array to items where a numeric property is greater than or equal to a value",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of objects to filter",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to compare",
        formInputType: "text",
        required: true,
      },
      {
        name: "value",
        dataType: "number",
        description: "Threshold value (inclusive)",
        formInputType: "number",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Filtered array where property >= value",
    example: 'collection.whereGte $arr "age" 25',
  },
  whereLte: {
    description: "Filter array to items where a numeric property is less than or equal to a value",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of objects to filter",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to compare",
        formInputType: "text",
        required: true,
      },
      {
        name: "value",
        dataType: "number",
        description: "Threshold value (inclusive)",
        formInputType: "number",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Filtered array where property <= value",
    example: 'collection.whereLte $arr "age" 25',
  },
  whereNot: {
    description: "Filter array to items where a property does not equal a given value",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of objects to filter",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to compare",
        formInputType: "text",
        required: true,
      },
      {
        name: "value",
        dataType: "any",
        description: "Value to exclude",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Filtered array of non-matching objects",
    example: 'collection.whereNot $arr "role" "admin"',
  },
  sortBy: {
    description: "Sort an array of objects by a property in ascending order",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of objects to sort",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to sort by",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "New array sorted in ascending order by the property",
    example: 'collection.sortBy $arr "name"',
  },
  sortByDesc: {
    description: "Sort an array of objects by a property in descending order",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of objects to sort",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to sort by",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "New array sorted in descending order by the property",
    example: 'collection.sortByDesc $arr "age"',
  },
  unique: {
    description: "Remove duplicate values from an array",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array to deduplicate",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "New array with duplicates removed",
    example: "collection.unique $arr",
  },
  flatten: {
    description: "Flatten nested arrays by one level",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array with nested arrays to flatten",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "New flattened array (one level deep)",
    example: "collection.flatten $arr",
  },
  reverse: {
    description: "Reverse the order of elements in an array",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array to reverse",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "New array with elements in reverse order",
    example: "collection.reverse $arr",
  },
  chunk: {
    description: "Split an array into chunks of a given size",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array to split into chunks",
        formInputType: "json",
        required: true,
      },
      {
        name: "size",
        dataType: "number",
        description: "Number of elements per chunk",
        formInputType: "number",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Array of arrays, each containing up to size elements",
    example: "collection.chunk $arr 3",
  },
  first: {
    description: "Get the first element of an array",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array to get first element from",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "any",
    returnDescription: "First element of the array, or null if empty",
    example: "collection.first $arr",
  },
  last: {
    description: "Get the last element of an array",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array to get last element from",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "any",
    returnDescription: "Last element of the array, or null if empty",
    example: "collection.last $arr",
  },
  count: {
    description: "Count the number of elements in an array",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array to count",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "Number of elements in the array",
    example: "collection.count $arr",
  },
  sum: {
    description: "Sum numeric values in an array, optionally by a property name",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of numbers or objects",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to sum (omit to sum array values directly)",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "number",
    returnDescription: "Sum of the numeric values",
    example: 'collection.sum $arr "price"',
  },
  avg: {
    description: "Calculate the average of numeric values in an array, optionally by a property name",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of numbers or objects",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to average (omit to average array values directly)",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "number",
    returnDescription: "Average of the numeric values",
    example: 'collection.avg $arr "price"',
  },
  min: {
    description: "Find the minimum numeric value in an array, optionally by a property name",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of numbers or objects",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to find minimum of (omit for array values directly)",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "number",
    returnDescription: "Minimum numeric value",
    example: 'collection.min $arr "price"',
  },
  max: {
    description: "Find the maximum numeric value in an array, optionally by a property name",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of numbers or objects",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to find maximum of (omit for array values directly)",
        formInputType: "text",
        required: false,
      },
    ],
    returnType: "number",
    returnDescription: "Maximum numeric value",
    example: 'collection.max $arr "price"',
  },
  groupBy: {
    description: "Group array items by a property value",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array of objects to group",
        formInputType: "json",
        required: true,
      },
      {
        name: "key",
        dataType: "string",
        description: "Property name to group by",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "object",
    returnDescription: "Object with group values as keys and arrays of items as values",
    example: 'collection.groupBy $arr "category"',
  },
  compact: {
    description: "Remove all falsy values (null, undefined, false, 0, empty string) from an array",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array to compact",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "New array with falsy values removed",
    example: "collection.compact $arr",
  },
  zip: {
    description: "Zip two arrays together into an array of pairs",
    parameters: [
      {
        name: "array1",
        dataType: "array",
        description: "First array",
        formInputType: "json",
        required: true,
      },
      {
        name: "array2",
        dataType: "array",
        description: "Second array",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Array of [a, b] pairs from the two arrays",
    example: "collection.zip $a $b",
  },
  difference: {
    description: "Get elements that are in the first array but not in the second",
    parameters: [
      {
        name: "array1",
        dataType: "array",
        description: "Source array",
        formInputType: "json",
        required: true,
      },
      {
        name: "array2",
        dataType: "array",
        description: "Array of elements to exclude",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Elements present in array1 but not in array2",
    example: "collection.difference $a $b",
  },
  intersection: {
    description: "Get elements that exist in both arrays",
    parameters: [
      {
        name: "array1",
        dataType: "array",
        description: "First array",
        formInputType: "json",
        required: true,
      },
      {
        name: "array2",
        dataType: "array",
        description: "Second array",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Elements present in both arrays",
    example: "collection.intersection $a $b",
  },
  union: {
    description: "Combine two arrays into one with unique elements",
    parameters: [
      {
        name: "array1",
        dataType: "array",
        description: "First array",
        formInputType: "json",
        required: true,
      },
      {
        name: "array2",
        dataType: "array",
        description: "Second array",
        formInputType: "json",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "Combined array with duplicates removed",
    example: "collection.union $a $b",
  },
  take: {
    description: "Take the first N elements from an array",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Source array",
        formInputType: "json",
        required: true,
      },
      {
        name: "n",
        dataType: "number",
        description: "Number of elements to take",
        formInputType: "number",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "New array with the first N elements",
    example: "collection.take $arr 5",
  },
  skip: {
    description: "Skip the first N elements of an array",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Source array",
        formInputType: "json",
        required: true,
      },
      {
        name: "n",
        dataType: "number",
        description: "Number of elements to skip",
        formInputType: "number",
        required: true,
      },
    ],
    returnType: "array",
    returnDescription: "New array with the first N elements removed",
    example: "collection.skip $arr 5",
  },
  contains: {
    description: "Check if an array contains a specific value",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array to search in",
        formInputType: "json",
        required: true,
      },
      {
        name: "value",
        dataType: "any",
        description: "Value to search for",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "boolean",
    returnDescription: "True if the value exists in the array",
    example: 'collection.contains $arr "value"',
  },
  indexOf: {
    description: "Find the index of a value in an array",
    parameters: [
      {
        name: "array",
        dataType: "array",
        description: "Array to search in",
        formInputType: "json",
        required: true,
      },
      {
        name: "value",
        dataType: "any",
        description: "Value to find",
        formInputType: "text",
        required: true,
      },
    ],
    returnType: "number",
    returnDescription: "Index of the value, or -1 if not found",
    example: 'collection.indexOf $arr "value"',
  },
};

export const CollectionModuleMetadata = {
  description: "Array and collection manipulation utilities: filtering, sorting, grouping, aggregation, and set operations",
  methods: [
    "pluck",
    "where",
    "whereGt",
    "whereLt",
    "whereGte",
    "whereLte",
    "whereNot",
    "sortBy",
    "sortByDesc",
    "unique",
    "flatten",
    "reverse",
    "chunk",
    "first",
    "last",
    "count",
    "sum",
    "avg",
    "min",
    "max",
    "groupBy",
    "compact",
    "zip",
    "difference",
    "intersection",
    "union",
    "take",
    "skip",
    "contains",
    "indexOf",
  ],
};
