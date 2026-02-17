import type { BuiltinHandler, FunctionMetadata, ModuleMetadata, Value } from "@wiredwp/robinpath";

const EARTH_RADIUS_KM = 6371;
const EARTH_RADIUS_MI = 3958.8;
const EARTH_RADIUS_M = 6371000;
const EARTH_RADIUS_NM = 3440.065;

function getRadius(unit: string): number {
  switch (unit) { case "mi": return EARTH_RADIUS_MI; case "m": return EARTH_RADIUS_M; case "nm": return EARTH_RADIUS_NM; default: return EARTH_RADIUS_KM; }
}

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

const distance: BuiltinHandler = (args) => {
  const lat1 = toRad(Number(args[0])), lon1 = toRad(Number(args[1]));
  const lat2 = toRad(Number(args[2])), lon2 = toRad(Number(args[3]));
  const unit = String(args[4] ?? "km");
  const dLat = lat2 - lat1, dLon = lon2 - lon1;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return Math.round(getRadius(unit) * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1000) / 1000;
};

const bearing: BuiltinHandler = (args) => {
  const lat1 = toRad(Number(args[0])), lon1 = toRad(Number(args[1]));
  const lat2 = toRad(Number(args[2])), lon2 = toRad(Number(args[3]));
  const dLon = lon2 - lon1;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return Math.round(((toDeg(Math.atan2(y, x)) + 360) % 360) * 1000) / 1000;
};

const midpoint: BuiltinHandler = (args) => {
  const lat1 = toRad(Number(args[0])), lon1 = toRad(Number(args[1]));
  const lat2 = toRad(Number(args[2])), lon2 = toRad(Number(args[3]));
  const dLon = lon2 - lon1;
  const bx = Math.cos(lat2) * Math.cos(dLon);
  const by = Math.cos(lat2) * Math.sin(dLon);
  const lat = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bx) ** 2 + by ** 2));
  const lon = lon1 + Math.atan2(by, Math.cos(lat1) + bx);
  return { lat: Math.round(toDeg(lat) * 1000000) / 1000000, lon: Math.round(toDeg(lon) * 1000000) / 1000000 };
};

const destination: BuiltinHandler = (args) => {
  const lat1 = toRad(Number(args[0])), lon1 = toRad(Number(args[1]));
  const brng = toRad(Number(args[2]));
  const dist = Number(args[3]);
  const unit = String(args[4] ?? "km");
  const R = getRadius(unit);
  const d = dist / R;
  const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(brng));
  const lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2));
  return { lat: Math.round(toDeg(lat2) * 1000000) / 1000000, lon: Math.round(toDeg(lon2) * 1000000) / 1000000 };
};

const boundingBox: BuiltinHandler = (args) => {
  const lat = Number(args[0]), lon = Number(args[1]);
  const radius = Number(args[2]);
  const unit = String(args[3] ?? "km");
  const R = getRadius(unit);
  const dLat = toDeg(radius / R);
  const dLon = toDeg(radius / (R * Math.cos(toRad(lat))));
  return { north: Math.round((lat + dLat) * 1000000) / 1000000, south: Math.round((lat - dLat) * 1000000) / 1000000, east: Math.round((lon + dLon) * 1000000) / 1000000, west: Math.round((lon - dLon) * 1000000) / 1000000 };
};

const isInBoundingBox: BuiltinHandler = (args) => {
  const lat = Number(args[0]), lon = Number(args[1]);
  const bbox = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  return lat >= Number(bbox.south) && lat <= Number(bbox.north) && lon >= Number(bbox.west) && lon <= Number(bbox.east);
};

const toRadians: BuiltinHandler = (args) => toRad(Number(args[0] ?? 0));
const toDegrees: BuiltinHandler = (args) => toDeg(Number(args[0] ?? 0));

const toDMS: BuiltinHandler = (args) => {
  const decimal = Math.abs(Number(args[0] ?? 0));
  const type = String(args[1] ?? "lat");
  const d = Math.floor(decimal);
  const minFloat = (decimal - d) * 60;
  const m = Math.floor(minFloat);
  const s = Math.round((minFloat - m) * 60 * 100) / 100;
  const dir = type === "lon" ? (Number(args[0]) >= 0 ? "E" : "W") : (Number(args[0]) >= 0 ? "N" : "S");
  return `${d}° ${m}' ${s}" ${dir}`;
};

const fromDMS: BuiltinHandler = (args) => {
  const dms = String(args[0] ?? "");
  const match = dms.match(/(\d+)[°]\s*(\d+)['']\s*([\d.]+)[""]?\s*([NSEW])?/i);
  if (!match) return 0;
  const d = Number(match[1]), m = Number(match[2]), s = Number(match[3]);
  const dir = (match[4] ?? "N").toUpperCase();
  const decimal = d + m / 60 + s / 3600;
  return (dir === "S" || dir === "W") ? -decimal : decimal;
};

const geocode: BuiltinHandler = async (args) => {
  const address = String(args[0] ?? "");
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`, { headers: { "User-Agent": "RobinPath/1.0" } });
  const data = await response.json() as Record<string, unknown>[];
  if (!data.length) return null;
  return { lat: Number(data[0]!.lat), lon: Number(data[0]!.lon), displayName: data[0]!.display_name };
};

const reverseGeocode: BuiltinHandler = async (args) => {
  const lat = Number(args[0]), lon = Number(args[1]);
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, { headers: { "User-Agent": "RobinPath/1.0" } });
  const data = await response.json() as Record<string, unknown>;
  return { address: data.address, displayName: data.display_name };
};

const polygon: BuiltinHandler = (args) => {
  const lat = Number(args[0]), lon = Number(args[1]);
  const poly = (args[2] ?? []) as number[][];
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const yi = poly[i]![0]!, xi = poly[i]![1]!;
    const yj = poly[j]![0]!, xj = poly[j]![1]!;
    if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

const area: BuiltinHandler = (args) => {
  const poly = (args[0] ?? []) as number[][];
  if (poly.length < 3) return 0;
  let total = 0;
  for (let i = 0; i < poly.length; i++) {
    const j = (i + 1) % poly.length;
    const lat1 = toRad(poly[i]![0]!), lon1 = toRad(poly[i]![1]!);
    const lat2 = toRad(poly[j]![0]!), lon2 = toRad(poly[j]![1]!);
    total += (lon2 - lon1) * (2 + Math.sin(lat1) + Math.sin(lat2));
  }
  return Math.round(Math.abs(total * EARTH_RADIUS_KM * EARTH_RADIUS_KM / 2) * 1000) / 1000;
};

export const GeoFunctions: Record<string, BuiltinHandler> = { distance, bearing, midpoint, destination, boundingBox, isInBoundingBox, toRadians, toDegrees, toDMS, fromDMS, geocode, reverseGeocode, polygon, area };

export const GeoFunctionMetadata = {
  distance: { description: "Haversine distance between two points", parameters: [{ name: "lat1", dataType: "number", description: "Latitude 1", formInputType: "text", required: true }, { name: "lon1", dataType: "number", description: "Longitude 1", formInputType: "text", required: true }, { name: "lat2", dataType: "number", description: "Latitude 2", formInputType: "text", required: true }, { name: "lon2", dataType: "number", description: "Longitude 2", formInputType: "text", required: true }, { name: "unit", dataType: "string", description: "km|mi|m|nm", formInputType: "text", required: false }], returnType: "number", returnDescription: "Distance", example: 'geo.distance 40.7128 -74.0060 51.5074 -0.1278' },
  bearing: { description: "Bearing between two points", parameters: [{ name: "lat1", dataType: "number", description: "Latitude 1", formInputType: "text", required: true }, { name: "lon1", dataType: "number", description: "Longitude 1", formInputType: "text", required: true }, { name: "lat2", dataType: "number", description: "Latitude 2", formInputType: "text", required: true }, { name: "lon2", dataType: "number", description: "Longitude 2", formInputType: "text", required: true }], returnType: "number", returnDescription: "Bearing in degrees (0-360)", example: 'geo.bearing 40.7128 -74.0060 51.5074 -0.1278' },
  midpoint: { description: "Midpoint between two coordinates", parameters: [{ name: "lat1", dataType: "number", description: "Latitude 1", formInputType: "text", required: true }, { name: "lon1", dataType: "number", description: "Longitude 1", formInputType: "text", required: true }, { name: "lat2", dataType: "number", description: "Latitude 2", formInputType: "text", required: true }, { name: "lon2", dataType: "number", description: "Longitude 2", formInputType: "text", required: true }], returnType: "object", returnDescription: "{lat, lon}", example: 'geo.midpoint 40.7128 -74.0060 51.5074 -0.1278' },
  destination: { description: "Destination point given start, bearing, and distance", parameters: [{ name: "lat", dataType: "number", description: "Start latitude", formInputType: "text", required: true }, { name: "lon", dataType: "number", description: "Start longitude", formInputType: "text", required: true }, { name: "bearing", dataType: "number", description: "Bearing in degrees", formInputType: "text", required: true }, { name: "distance", dataType: "number", description: "Distance", formInputType: "text", required: true }, { name: "unit", dataType: "string", description: "km|mi|m|nm", formInputType: "text", required: false }], returnType: "object", returnDescription: "{lat, lon}", example: 'geo.destination 40.7128 -74.0060 45 100' },
  boundingBox: { description: "Bounding box around a point", parameters: [{ name: "lat", dataType: "number", description: "Center latitude", formInputType: "text", required: true }, { name: "lon", dataType: "number", description: "Center longitude", formInputType: "text", required: true }, { name: "radius", dataType: "number", description: "Radius", formInputType: "text", required: true }, { name: "unit", dataType: "string", description: "km|mi|m|nm", formInputType: "text", required: false }], returnType: "object", returnDescription: "{north, south, east, west}", example: 'geo.boundingBox 40.7128 -74.0060 10' },
  isInBoundingBox: { description: "Check if point is inside bounding box", parameters: [{ name: "lat", dataType: "number", description: "Latitude", formInputType: "text", required: true }, { name: "lon", dataType: "number", description: "Longitude", formInputType: "text", required: true }, { name: "bbox", dataType: "object", description: "{north, south, east, west}", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if inside", example: 'geo.isInBoundingBox 40.7128 -74.0060 $bbox' },
  toRadians: { description: "Convert degrees to radians", parameters: [{ name: "degrees", dataType: "number", description: "Degrees", formInputType: "text", required: true }], returnType: "number", returnDescription: "Radians", example: "geo.toRadians 180" },
  toDegrees: { description: "Convert radians to degrees", parameters: [{ name: "radians", dataType: "number", description: "Radians", formInputType: "text", required: true }], returnType: "number", returnDescription: "Degrees", example: "geo.toDegrees 3.14159" },
  toDMS: { description: "Convert decimal degrees to DMS string", parameters: [{ name: "decimal", dataType: "number", description: "Decimal degrees", formInputType: "text", required: true }, { name: "type", dataType: "string", description: "lat or lon", formInputType: "text", required: false }], returnType: "string", returnDescription: "DMS string", example: 'geo.toDMS 40.7128 "lat"' },
  fromDMS: { description: "Parse DMS string to decimal degrees", parameters: [{ name: "dms", dataType: "string", description: "DMS string", formInputType: "text", required: true }], returnType: "number", returnDescription: "Decimal degrees", example: "geo.fromDMS \"40° 42' 46\\\" N\"" },
  geocode: { description: "Forward geocode address to coordinates", parameters: [{ name: "address", dataType: "string", description: "Address string", formInputType: "text", required: true }], returnType: "object", returnDescription: "{lat, lon, displayName}", example: 'geo.geocode "New York, NY"' },
  reverseGeocode: { description: "Reverse geocode coordinates to address", parameters: [{ name: "lat", dataType: "number", description: "Latitude", formInputType: "text", required: true }, { name: "lon", dataType: "number", description: "Longitude", formInputType: "text", required: true }], returnType: "object", returnDescription: "{address, displayName}", example: "geo.reverseGeocode 40.7128 -74.0060" },
  polygon: { description: "Check if point is inside polygon", parameters: [{ name: "lat", dataType: "number", description: "Latitude", formInputType: "text", required: true }, { name: "lon", dataType: "number", description: "Longitude", formInputType: "text", required: true }, { name: "polygon", dataType: "array", description: "Array of [lat, lon] vertices", formInputType: "text", required: true }], returnType: "boolean", returnDescription: "true if inside", example: 'geo.polygon 40.7 -74.0 [[40.6,-74.1],[40.8,-74.1],[40.8,-73.9],[40.6,-73.9]]' },
  area: { description: "Calculate polygon area in sq km", parameters: [{ name: "polygon", dataType: "array", description: "Array of [lat, lon] vertices", formInputType: "text", required: true }], returnType: "number", returnDescription: "Area in square km", example: 'geo.area [[40.6,-74.1],[40.8,-74.1],[40.8,-73.9],[40.6,-73.9]]' },
};

export const GeoModuleMetadata = {
  description: "Geolocation utilities: distance, bearing, geocoding, bounding box, polygon containment, DMS conversion",
  methods: ["distance", "bearing", "midpoint", "destination", "boundingBox", "isInBoundingBox", "toRadians", "toDegrees", "toDMS", "fromDMS", "geocode", "reverseGeocode", "polygon", "area"],
};
