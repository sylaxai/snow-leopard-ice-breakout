// snow-leopard-ice-breakout — ai-excited-01 entry.
//
// Writes one dramatic image to the output directory: a snow leopard
// mid-pounce bursting through a glacier-ice wall, locked eye contact with
// the viewer, fur strands, rosettes and whisker droplets in detail as ice
// fractures and snow explode around it. The image ships with this entry as
// entry.png; this program validates it and copies it to
// $MAKEFUN_OUTPUT_DIR/entry.png.
//
// Usage:   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Node 22, standard library only (node:fs, node:path, node:url).

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576; // 1 MiB cap for the entry image
const ENTRY_FILE = "entry.png";

// The bundled image sits next to this script, wherever it is run from.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(scriptDir, ENTRY_FILE);

// The destination directory, defaulting to /output per the kit.
const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
const destPath = join(outputDir, ENTRY_FILE);

function fail(message) {
  console.error(`snow-leopard-ice-breakout: ${message}`);
  process.exit(1);
}

// JPEG starts FF D8; PNG starts 89 50 4E 47. Returns "JPEG", "PNG", or null.
function detectFormat(header) {
  if (header[0] === 0xff && header[1] === 0xd8) {
    return "JPEG";
  }
  if (
    header[0] === 0x89 &&
    header[1] === 0x50 &&
    header[2] === 0x4e &&
    header[3] === 0x47
  ) {
    return "PNG";
  }
  return null;
}

function magicSeen(header) {
  return [...header.subarray(0, 4)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join(" ");
}

// 1. The bundled image must exist and be non-empty.
if (!existsSync(sourcePath)) {
  fail(`bundled image not found: ${sourcePath}`);
}
const sourceSize = statSync(sourcePath).size;
if (sourceSize === 0) {
  fail(`bundled image is empty: ${sourcePath}`);
}

// 2. It must fit the 1 MiB size limit.
if (sourceSize > MAX_BYTES) {
  fail(`bundled image is ${sourceSize} bytes, over the ${MAX_BYTES} byte limit`);
}

// 3. Its first bytes must be JPEG (FF D8) or PNG (89 50 4E 47) magic.
const sourceFormat = detectFormat(readFileSync(sourcePath).subarray(0, 8));
if (sourceFormat === null) {
  const seen = magicSeen(readFileSync(sourcePath).subarray(0, 8));
  fail(
    `bundled image has unknown magic bytes (${seen}), expected JPEG (ff d8) or PNG (89 50 4e 47): ${sourcePath}`,
  );
}

// 4. Copy it to the output directory, creating the directory if needed.
mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePath, destPath);

// 5. Confirm the copy landed intact: same size and same format.
const writtenSize = statSync(destPath).size;
if (writtenSize !== sourceSize) {
  fail(`copy mismatch: wrote ${writtenSize} bytes, expected ${sourceSize}`);
}
const writtenFormat = detectFormat(readFileSync(destPath).subarray(0, 8));
if (writtenFormat !== sourceFormat) {
  fail(`copy mismatch: written file at ${destPath} is not the same format as the source`);
}

console.log(
  `snow-leopard-ice-breakout: wrote ${writtenSize} bytes (${writtenFormat}) to ${destPath}`,
);
