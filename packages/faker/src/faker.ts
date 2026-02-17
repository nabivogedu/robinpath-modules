import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

// ---------------------------------------------------------------------------
// Internal PRNG (Mulberry32 - seedable)
// ---------------------------------------------------------------------------

let currentSeed = Date.now();

function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let rng = mulberry32(currentSeed);

function random(): number {
  return rng();
}

function randomInt(min: number, max: number): number {
  return Math.floor(random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

// ---------------------------------------------------------------------------
// Data arrays
// ---------------------------------------------------------------------------

const FIRST_NAMES = [
  "James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda",
  "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
  "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Lisa", "Daniel", "Nancy",
  "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley",
  "Steven", "Dorothy", "Paul", "Kimberly", "Andrew", "Emily", "Joshua", "Donna",
  "Kenneth", "Michelle", "Kevin", "Carol", "Brian", "Amanda", "George", "Melissa",
  "Timothy", "Deborah", "Ronald", "Stephanie", "Edward", "Rebecca", "Jason", "Sharon",
  "Jeffrey", "Laura", "Ryan", "Cynthia", "Jacob", "Kathleen", "Gary", "Amy",
  "Nicholas", "Angela", "Eric", "Shirley", "Jonathan", "Anna", "Stephen", "Brenda",
  "Larry", "Pamela", "Justin", "Emma", "Scott", "Nicole", "Brandon", "Helen",
  "Benjamin", "Samantha", "Samuel", "Katherine", "Raymond", "Christine", "Gregory", "Debra",
  "Frank", "Rachel", "Alexander", "Carolyn", "Patrick", "Janet", "Jack", "Catherine",
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
  "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
  "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill",
  "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell",
  "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz",
  "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales",
  "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson",
  "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward",
  "Richardson", "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray",
  "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez", "Castillo", "Sanders", "Patel",
];

const CITIES = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
  "Fort Worth", "Columbus", "Charlotte", "Indianapolis", "San Francisco", "Seattle",
  "Denver", "Washington", "Nashville", "Oklahoma City", "El Paso", "Boston",
  "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee",
  "Albuquerque", "Tucson", "Fresno", "Mesa", "Sacramento", "Atlanta", "Kansas City",
  "Colorado Springs", "Omaha", "Raleigh", "Long Beach", "Virginia Beach", "Miami",
  "Oakland", "Minneapolis", "Tulsa", "Tampa", "Arlington", "New Orleans", "Cleveland",
];

const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", "France",
  "Japan", "South Korea", "Brazil", "India", "Mexico", "Italy", "Spain", "China",
  "Russia", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Switzerland",
  "Austria", "Belgium", "Ireland", "New Zealand", "South Africa", "Argentina",
  "Colombia", "Chile", "Portugal", "Poland", "Czech Republic", "Turkey", "Thailand",
  "Indonesia", "Malaysia", "Singapore", "Philippines", "Vietnam", "Egypt",
];

const COMPANIES = [
  "Acme Corp", "Globex Corporation", "Soylent Corp", "Initech", "Umbrella Corporation",
  "Hooli", "Vehement Capital Partners", "Massive Dynamic", "Wayne Enterprises",
  "Stark Industries", "Wonka Industries", "Cyberdyne Systems", "Tyrell Corporation",
  "Weyland-Yutani", "Aperture Science", "Black Mesa", "Oscorp Industries",
  "LexCorp", "Pied Piper", "Dunder Mifflin", "Sterling Cooper", "Prestige Worldwide",
  "Vandelay Industries", "Kramerica Industries", "Bluth Company", "TechCrunch Labs",
  "InnoSoft Solutions", "DataDyne", "Nexus Technologies", "Pinnacle Systems",
  "Horizon Dynamics", "Vertex Solutions", "Quantum Analytics", "Nova Digital",
  "Apex Innovations", "Summit Partners", "Meridian Labs", "Atlas Technologies",
  "Cobalt Systems", "Zenith Networks",
];

const STREET_SUFFIXES = [
  "Street", "Avenue", "Boulevard", "Drive", "Court", "Place", "Lane", "Road",
  "Way", "Circle", "Trail", "Parkway", "Terrace", "Loop", "Alley",
];

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
  "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
  "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos", "dolores",
  "quas", "molestias", "excepturi", "obcaecati", "cupiditate", "provident",
  "similique", "architecto", "beatae", "vitae", "dicta", "explicabo", "nemo",
  "ipsam", "voluptatem", "quia", "voluptas", "aspernatur", "aut", "odit", "fugit",
];

const DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "protonmail.com",
  "mail.com", "example.com", "test.com", "company.com", "work.org",
];

const TLDS = [
  "com", "org", "net", "io", "dev", "co", "app", "tech", "info", "biz",
];

const COLORS = [
  "red", "green", "blue", "yellow", "purple", "orange", "pink", "cyan",
  "magenta", "lime", "teal", "indigo", "violet", "coral", "salmon",
];

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

const seedFn: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const s = opts.seed as number ?? opts as unknown as number;
  const seedVal = typeof s === "number" ? s : Number(s);
  if (isNaN(seedVal)) throw new Error("seed must be a number");
  currentSeed = seedVal;
  rng = mulberry32(currentSeed);
  return { seed: currentSeed };
};

const nameFn: BuiltinHandler = (_args: Value[]): unknown => {
  return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
};

const firstNameFn: BuiltinHandler = (_args: Value[]): unknown => {
  return pick(FIRST_NAMES);
};

const lastNameFn: BuiltinHandler = (_args: Value[]): unknown => {
  return pick(LAST_NAMES);
};

const emailFn: BuiltinHandler = (_args: Value[]): unknown => {
  const first = pick(FIRST_NAMES).toLowerCase();
  const last = pick(LAST_NAMES).toLowerCase();
  const domain = pick(DOMAINS);
  const sep = pick([".", "_", ""]);
  const num = randomInt(0, 1) === 1 ? String(randomInt(1, 999)) : "";
  return `${first}${sep}${last}${num}@${domain}`;
};

const phoneFn: BuiltinHandler = (_args: Value[]): unknown => {
  const area = randomInt(200, 999);
  const exchange = randomInt(200, 999);
  const subscriber = randomInt(1000, 9999);
  return `(${area}) ${exchange}-${subscriber}`;
};

const addressFn: BuiltinHandler = (_args: Value[]): unknown => {
  const num = randomInt(100, 9999);
  const street = pick(LAST_NAMES);
  const suffix = pick(STREET_SUFFIXES);
  const city = pick(CITIES);
  const zip = String(randomInt(10000, 99999));
  return `${num} ${street} ${suffix}, ${city} ${zip}`;
};

const cityFn: BuiltinHandler = (_args: Value[]): unknown => {
  return pick(CITIES);
};

const countryFn: BuiltinHandler = (_args: Value[]): unknown => {
  return pick(COUNTRIES);
};

const zipCodeFn: BuiltinHandler = (_args: Value[]): unknown => {
  const opts = ((_args[0] ?? {}) as Record<string, unknown>);
  const format = (opts.format ?? "#####") as string;
  return format.replace(/#/g, () => String(randomInt(0, 9)));
};

const companyFn: BuiltinHandler = (_args: Value[]): unknown => {
  return pick(COMPANIES);
};

const loremFn: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const type = (opts.type ?? "words") as string;
  const count = (opts.count ?? 5) as number;

  if (type === "words") {
    return generateWords(count);
  } else if (type === "sentences") {
    return generateSentences(count);
  } else if (type === "paragraphs") {
    return generateParagraphs(count);
  }
  return generateWords(count);
};

function generateWords(count: number): string {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(pick(LOREM_WORDS));
  }
  return words.join(" ");
}

function generateSentence(): string {
  const wordCount = randomInt(5, 15);
  const words = generateWords(wordCount);
  return words.charAt(0).toUpperCase() + words.slice(1) + ".";
}

function generateSentences(count: number): string {
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(" ");
}

function generateParagraph(): string {
  const sentenceCount = randomInt(3, 7);
  return generateSentences(sentenceCount);
}

function generateParagraphs(count: number): string {
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateParagraph());
  }
  return paragraphs.join("\n\n");
}

const numberFn: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const min = (opts.min ?? 0) as number;
  const max = (opts.max ?? 1000) as number;
  return randomInt(min, max);
};

const floatFn: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const min = (opts.min ?? 0) as number;
  const max = (opts.max ?? 1) as number;
  const precision = (opts.precision ?? 2) as number;
  const val = min + random() * (max - min);
  return Number(val.toFixed(precision));
};

const booleanFn: BuiltinHandler = (_args: Value[]): unknown => {
  return random() >= 0.5;
};

const dateFn: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const fromTs = opts.from ? new Date(opts.from as string).getTime() : new Date("2000-01-01").getTime();
  const toTs = opts.to ? new Date(opts.to as string).getTime() : Date.now();
  const ts = fromTs + random() * (toTs - fromTs);
  return new Date(ts).toISOString();
};

const uuidFn: BuiltinHandler = (_args: Value[]): unknown => {
  // Generate UUID v4 format
  const hex = "0123456789abcdef";
  const segments = [8, 4, 4, 4, 12];
  const parts: string[] = [];

  for (const len of segments) {
    let part = "";
    for (let i = 0; i < len; i++) {
      part += hex[randomInt(0, 15)];
    }
    parts.push(part);
  }

  // Set version (4) and variant bits
  const chars = parts[2].split("");
  chars[0] = "4";
  parts[2] = chars.join("");

  const variantChars = parts[3].split("");
  variantChars[0] = hex[8 + randomInt(0, 3)]; // 8, 9, a, b
  parts[3] = variantChars.join("");

  return parts.join("-");
};

const pickFn: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const arr = opts.array as unknown[];
  if (!Array.isArray(arr) || arr.length === 0) throw new Error("array must be a non-empty array");
  return arr[randomInt(0, arr.length - 1)];
};

const shuffleFn: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const arr = opts.array as unknown[];
  if (!Array.isArray(arr)) throw new Error("array must be an array");
  const result = [...arr];
  // Fisher-Yates shuffle
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const paragraphFn: BuiltinHandler = (_args: Value[]): unknown => {
  return generateParagraph();
};

const sentenceFn: BuiltinHandler = (_args: Value[]): unknown => {
  return generateSentence();
};

const wordFn: BuiltinHandler = (_args: Value[]): unknown => {
  return pick(LOREM_WORDS);
};

const colorFn: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const format = (opts.format ?? "hex") as string;

  if (format === "name") return pick(COLORS);

  if (format === "rgb") {
    return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
  }

  // hex
  const r = randomInt(0, 255).toString(16).padStart(2, "0");
  const g = randomInt(0, 255).toString(16).padStart(2, "0");
  const b = randomInt(0, 255).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
};

const ipFn: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const version = (opts.version ?? "v4") as string;

  if (version === "v6") {
    const segments: string[] = [];
    for (let i = 0; i < 8; i++) {
      segments.push(randomInt(0, 65535).toString(16).padStart(4, "0"));
    }
    return segments.join(":");
  }

  // v4
  return `${randomInt(1, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`;
};

const urlFn: BuiltinHandler = (_args: Value[]): unknown => {
  const protocol = pick(["https", "http"]);
  const domain = pick(LAST_NAMES).toLowerCase();
  const tld = pick(TLDS);
  const pathSegments = randomInt(0, 3);
  let urlPath = "";
  for (let i = 0; i < pathSegments; i++) {
    urlPath += "/" + pick(LOREM_WORDS);
  }
  return `${protocol}://${domain}.${tld}${urlPath}`;
};

const avatarFn: BuiltinHandler = (args: Value[]): unknown => {
  const opts = (args[0] ?? {}) as Record<string, unknown>;
  const size = (opts.size ?? 200) as number;
  const name = (opts.name ?? `${pick(FIRST_NAMES)}+${pick(LAST_NAMES)}`) as string;
  // Use UI Avatars service pattern (a common free avatar URL pattern)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=${randomInt(0, 255).toString(16).padStart(2, "0")}${randomInt(0, 255).toString(16).padStart(2, "0")}${randomInt(0, 255).toString(16).padStart(2, "0")}&color=fff`;
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const FakerFunctions = {
  seed: seedFn,
  name: nameFn,
  firstName: firstNameFn,
  lastName: lastNameFn,
  email: emailFn,
  phone: phoneFn,
  address: addressFn,
  city: cityFn,
  country: countryFn,
  zipCode: zipCodeFn,
  company: companyFn,
  lorem: loremFn,
  number: numberFn,
  float: floatFn,
  boolean: booleanFn,
  date: dateFn,
  uuid: uuidFn,
  pick: pickFn,
  shuffle: shuffleFn,
  paragraph: paragraphFn,
  sentence: sentenceFn,
  word: wordFn,
  color: colorFn,
  ip: ipFn,
  url: urlFn,
  avatar: avatarFn,
};

export const FakerFunctionMetadata = {
  seed: {
    description: "Set the random seed for reproducible fake data generation",
    parameters: [
      { name: "seed", dataType: "number", description: "Seed value for the PRNG" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  name: {
    description: "Generate a random full name",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  firstName: {
    description: "Generate a random first name",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  lastName: {
    description: "Generate a random last name",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  email: {
    description: "Generate a random email address",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  phone: {
    description: "Generate a random phone number",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  address: {
    description: "Generate a random street address",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  city: {
    description: "Generate a random city name",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  country: {
    description: "Generate a random country name",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  zipCode: {
    description: "Generate a random zip code",
    parameters: [
      { name: "format", dataType: "string", description: "Zip code format where # is a digit (default #####)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  company: {
    description: "Generate a random company name",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  lorem: {
    description: "Generate lorem ipsum text as words, sentences, or paragraphs",
    parameters: [
      { name: "type", dataType: "string", description: "Type of lorem text: words, sentences, or paragraphs (default words)", optional: true },
      { name: "count", dataType: "number", description: "Number of items to generate (default 5)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  number: {
    description: "Generate a random integer within a range",
    parameters: [
      { name: "min", dataType: "number", description: "Minimum value (default 0)", optional: true },
      { name: "max", dataType: "number", description: "Maximum value (default 1000)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  float: {
    description: "Generate a random floating-point number within a range",
    parameters: [
      { name: "min", dataType: "number", description: "Minimum value (default 0)", optional: true },
      { name: "max", dataType: "number", description: "Maximum value (default 1)", optional: true },
      { name: "precision", dataType: "number", description: "Decimal places (default 2)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  boolean: {
    description: "Generate a random boolean value",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  date: {
    description: "Generate a random date within a range",
    parameters: [
      { name: "from", dataType: "string", description: "Start date ISO string (default 2000-01-01)", optional: true },
      { name: "to", dataType: "string", description: "End date ISO string (default now)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  uuid: {
    description: "Generate a random UUID v4",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  pick: {
    description: "Pick a random element from an array",
    parameters: [
      { name: "array", dataType: "array", description: "Array to pick from" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  shuffle: {
    description: "Randomly shuffle an array using Fisher-Yates algorithm",
    parameters: [
      { name: "array", dataType: "array", description: "Array to shuffle" },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  paragraph: {
    description: "Generate a single random paragraph of lorem ipsum",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  sentence: {
    description: "Generate a single random sentence of lorem ipsum",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  word: {
    description: "Generate a single random lorem ipsum word",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  color: {
    description: "Generate a random color in hex, rgb, or name format",
    parameters: [
      { name: "format", dataType: "string", description: "Color format: hex, rgb, or name (default hex)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  ip: {
    description: "Generate a random IP address",
    parameters: [
      { name: "version", dataType: "string", description: "IP version: v4 or v6 (default v4)", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
  url: {
    description: "Generate a random URL",
    parameters: [],

    returnType: "object",
    returnDescription: "API response.",
  },
  avatar: {
    description: "Generate a random avatar image URL",
    parameters: [
      { name: "size", dataType: "number", description: "Avatar size in pixels (default 200)", optional: true },
      { name: "name", dataType: "string", description: "Name for the avatar initials", optional: true },
    ],

    returnType: "object",
    returnDescription: "API response.",
  },
};

export const FakerModuleMetadata = {
  description: "Fake data generation with seedable PRNG. Generates names, emails, addresses, lorem ipsum, numbers, dates, UUIDs, colors, IPs, and more. No external dependencies.",
  version: "1.0.0",
};
