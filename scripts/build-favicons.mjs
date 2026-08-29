import sharp from "sharp";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "public", "favicons", "src");
const OUT = join(__dirname, "..", "public", "favicons");

const APPS = ["portfolio", "admin", "recipe"];

// Builds a Windows .ico container holding PNG-compressed entries.
// PNG-in-ICO is supported on Windows Vista+ and all major browsers.
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const dirEntrySize = 16;
  const dir = Buffer.alloc(count * dirEntrySize);
  const images = [];
  const offsets = [];
  let offset = 6 + count * dirEntrySize;

  pngBuffers.forEach(({ size, data }, i) => {
    const e = i * dirEntrySize;
    // width/height: 0 means 256
    dir.writeUInt8(size === 256 ? 0 : size, e);
    dir.writeUInt8(size === 256 ? 0 : size, e + 1);
    dir.writeUInt8(0, e + 2); // palette
    dir.writeUInt8(0, e + 3); // reserved
    dir.writeUInt16LE(1, e + 4); // planes
    dir.writeUInt16LE(32, e + 6); // bpp
    dir.writeUInt32LE(data.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offsets.push(offset);
    offset += data.length;
    images.push(data);
  });

  return Buffer.concat([header, dir, ...images]);
}

async function buildApp(app) {
  const svgPath = join(SRC, `${app}.svg`);
  const svg = readFileSync(svgPath);

  const outDir = join(OUT, app);
  mkdirSync(outDir, { recursive: true });

  const sizes = [16, 32, 48, 180, 192, 512];
  const pngBuffers = [];
  for (const size of sizes) {
    const buf = await sharp(svg, { density: 300 })
      .resize(size, size)
      .png()
      .toBuffer();
    pngBuffers.push({ size, data: buf });
    if (size === 180) writeFileSync(join(outDir, "apple-touch-icon.png"), buf);
    if (size === 192) writeFileSync(join(outDir, "icon-192.png"), buf);
    if (size === 512) writeFileSync(join(outDir, "icon-512.png"), buf);
  }

  const ico = buildIco(pngBuffers.filter((p) => p.size <= 48));
  writeFileSync(join(outDir, "favicon.ico"), ico);

  writeFileSync(join(outDir, "favicon.svg"), svg);

  console.log(`[ok] ${app}: png(${sizes.join(",")}) + favicon.ico + favicon.svg`);
}

for (const app of APPS) {
  await buildApp(app);
}
console.log("done");
