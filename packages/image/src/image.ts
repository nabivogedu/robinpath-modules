import type { BuiltinHandler, FunctionMetadata, ModuleMetadata } from "@wiredwp/robinpath";
import sharp from "sharp";

const resize: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  const output = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  const width = opts.width ? Number(opts.width) : undefined;
  const height = opts.height ? Number(opts.height) : undefined;
  const fit = String(opts.fit ?? "cover") as keyof sharp.FitEnum;
  await sharp(input).resize(width, height, { fit }).toFile(output);
  return { path: output, width, height };
};

const crop: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  const output = String(args[1] ?? "");
  const opts = (typeof args[2] === "object" && args[2] !== null ? args[2] : {}) as Record<string, unknown>;
  await sharp(input).extract({ left: Number(opts.left ?? 0), top: Number(opts.top ?? 0), width: Number(opts.width ?? 100), height: Number(opts.height ?? 100) }).toFile(output);
  return { path: output };
};

const convert: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  const output = String(args[1] ?? "");
  const format = String(args[2] ?? "png") as keyof sharp.FormatEnum;
  const quality = args[3] != null ? Number(args[3]) : undefined;
  let pipeline = sharp(input);
  if (format === "jpeg" || format === "jpg") pipeline = pipeline.jpeg({ quality: quality ?? 80 });
  else if (format === "png") pipeline = pipeline.png();
  else if (format === "webp") pipeline = pipeline.webp({ quality: quality ?? 80 });
  else if (format === "avif") pipeline = pipeline.avif({ quality: quality ?? 50 });
  await pipeline.toFile(output);
  return { path: output, format };
};

const metadata: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  const meta = await sharp(input).metadata();
  return { width: meta.width, height: meta.height, format: meta.format, channels: meta.channels, space: meta.space, size: meta.size, hasAlpha: meta.hasAlpha, density: meta.density };
};

const rotate: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  const output = String(args[1] ?? "");
  const angle = Number(args[2] ?? 90);
  await sharp(input).rotate(angle).toFile(output);
  return { path: output, angle };
};

const flip: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  const output = String(args[1] ?? "");
  const direction = String(args[2] ?? "vertical");
  let pipeline = sharp(input);
  if (direction === "horizontal") pipeline = pipeline.flop();
  else pipeline = pipeline.flip();
  await pipeline.toFile(output);
  return { path: output };
};

const grayscale: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  const output = String(args[1] ?? "");
  await sharp(input).grayscale().toFile(output);
  return { path: output };
};

const blur: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  const output = String(args[1] ?? "");
  const sigma = Number(args[2] ?? 3);
  await sharp(input).blur(sigma).toFile(output);
  return { path: output };
};

const composite: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  const overlay = String(args[1] ?? "");
  const output = String(args[2] ?? "");
  const opts = (typeof args[3] === "object" && args[3] !== null ? args[3] : {}) as Record<string, unknown>;
  await sharp(input).composite([{ input: overlay, top: Number(opts.top ?? 0), left: Number(opts.left ?? 0), gravity: String(opts.gravity ?? "northwest") as any }]).toFile(output);
  return { path: output };
};

const thumbnail: BuiltinHandler = async (args) => {
  const input = String(args[0] ?? "");
  const output = String(args[1] ?? "");
  const size = Number(args[2] ?? 200);
  await sharp(input).resize(size, size, { fit: "cover" }).toFile(output);
  return { path: output, size };
};

export const ImageFunctions: Record<string, BuiltinHandler> = { resize, crop, convert, metadata, rotate, flip, grayscale, blur, composite, thumbnail };

export const ImageFunctionMetadata: Record<string, FunctionMetadata> = {
  resize: { description: "Resize an image", parameters: [{ name: "input", dataType: "string", description: "Input path", formInputType: "text", required: true }, { name: "output", dataType: "string", description: "Output path", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{width, height, fit}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{path, width, height}", example: 'image.resize "./photo.jpg" "./thumb.jpg" {"width": 300, "height": 200}' },
  crop: { description: "Crop a region from an image", parameters: [{ name: "input", dataType: "string", description: "Input path", formInputType: "text", required: true }, { name: "output", dataType: "string", description: "Output path", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{left, top, width, height}", formInputType: "text", required: true }], returnType: "object", returnDescription: "{path}", example: 'image.crop "./photo.jpg" "./cropped.jpg" {"left": 10, "top": 10, "width": 200, "height": 200}' },
  convert: { description: "Convert image format (png, jpeg, webp, avif)", parameters: [{ name: "input", dataType: "string", description: "Input path", formInputType: "text", required: true }, { name: "output", dataType: "string", description: "Output path", formInputType: "text", required: true }, { name: "format", dataType: "string", description: "Target format", formInputType: "text", required: true }, { name: "quality", dataType: "number", description: "Quality 1-100 (optional)", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path, format}", example: 'image.convert "./photo.png" "./photo.webp" "webp" 85' },
  metadata: { description: "Get image metadata", parameters: [{ name: "input", dataType: "string", description: "Input path", formInputType: "text", required: true }], returnType: "object", returnDescription: "{width, height, format, channels, size, hasAlpha}", example: 'image.metadata "./photo.jpg"' },
  rotate: { description: "Rotate an image", parameters: [{ name: "input", dataType: "string", description: "Input path", formInputType: "text", required: true }, { name: "output", dataType: "string", description: "Output path", formInputType: "text", required: true }, { name: "angle", dataType: "number", description: "Rotation angle in degrees", formInputType: "text", required: true }], returnType: "object", returnDescription: "{path, angle}", example: 'image.rotate "./photo.jpg" "./rotated.jpg" 90' },
  flip: { description: "Flip an image vertically or horizontally", parameters: [{ name: "input", dataType: "string", description: "Input path", formInputType: "text", required: true }, { name: "output", dataType: "string", description: "Output path", formInputType: "text", required: true }, { name: "direction", dataType: "string", description: "'vertical' or 'horizontal'", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path}", example: 'image.flip "./photo.jpg" "./flipped.jpg" "horizontal"' },
  grayscale: { description: "Convert to grayscale", parameters: [{ name: "input", dataType: "string", description: "Input path", formInputType: "text", required: true }, { name: "output", dataType: "string", description: "Output path", formInputType: "text", required: true }], returnType: "object", returnDescription: "{path}", example: 'image.grayscale "./photo.jpg" "./bw.jpg"' },
  blur: { description: "Apply Gaussian blur", parameters: [{ name: "input", dataType: "string", description: "Input path", formInputType: "text", required: true }, { name: "output", dataType: "string", description: "Output path", formInputType: "text", required: true }, { name: "sigma", dataType: "number", description: "Blur sigma (default 3)", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path}", example: 'image.blur "./photo.jpg" "./blurred.jpg" 5' },
  composite: { description: "Overlay one image on top of another (watermark)", parameters: [{ name: "base", dataType: "string", description: "Base image path", formInputType: "text", required: true }, { name: "overlay", dataType: "string", description: "Overlay image path", formInputType: "text", required: true }, { name: "output", dataType: "string", description: "Output path", formInputType: "text", required: true }, { name: "options", dataType: "object", description: "{top, left, gravity}", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path}", example: 'image.composite "./photo.jpg" "./watermark.png" "./result.jpg" {"gravity": "southeast"}' },
  thumbnail: { description: "Generate a square thumbnail", parameters: [{ name: "input", dataType: "string", description: "Input path", formInputType: "text", required: true }, { name: "output", dataType: "string", description: "Output path", formInputType: "text", required: true }, { name: "size", dataType: "number", description: "Size in pixels (default 200)", formInputType: "text", required: false }], returnType: "object", returnDescription: "{path, size}", example: 'image.thumbnail "./photo.jpg" "./thumb.jpg" 150' },
};

export const ImageModuleMetadata: ModuleMetadata = {
  description: "Image processing with Sharp: resize, crop, convert, rotate, flip, grayscale, blur, composite/watermark, and thumbnails",
  methods: ["resize", "crop", "convert", "metadata", "rotate", "flip", "grayscale", "blur", "composite", "thumbnail"],
};
