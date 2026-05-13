/**
 * Enhances Somada workshop photos and exports WebP for the static site.
 * Run: npm run photos:enhance
 */
import sharp from "sharp";
import { mkdir, readdir, stat } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sourceDir = join(root, "assets", "photos-source");
const outDir = join(root, "public", "images", "photos");

async function enhancePng(inputPath, outputBaseName) {
  const meta = await sharp(inputPath).metadata();
  const maxW = 2400;

  let pipeline = sharp(inputPath).rotate();

  if (meta.width && meta.width > maxW) {
    pipeline = pipeline.resize({ width: maxW, withoutEnlargement: true });
  }

  pipeline = pipeline
    .modulate({ brightness: 1.06, saturation: 1.18, hue: 3 })
    .linear(1.12, -(128 * 0.06))
    .gamma(1.05)
    .sharpen({ sigma: 1, m1: 1, m2: 2, x1: 2, y2: 10, n: false });

  const outPath = join(outDir, `${outputBaseName}.webp`);
  await pipeline.webp({ quality: 90, effort: 5, smartSubsample: true }).toFile(outPath);

  const st = await stat(outPath);
  console.log(`Wrote ${outPath} (${Math.round(st.size / 1024)} KB)`);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const files = (await readdir(sourceDir)).filter((f) => f.endsWith(".png")).sort();

  if (files.length === 0) {
    console.error("No PNG files in", sourceDir);
    process.exit(1);
  }

  const names = ["somada-lineup-01", "somada-lineup-02", "somada-lineup-03"];
  let i = 0;
  for (const file of files) {
    const base = names[i] ?? `somada-lineup-${String(i + 1).padStart(2, "0")}`;
    await enhancePng(join(sourceDir, file), base);
    i += 1;
  }

  const first = join(sourceDir, files[0]);
  const ogPath = join(root, "public", "og.webp");
  await sharp(first)
    .rotate()
    .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
    .modulate({ brightness: 1.05, saturation: 1.12 })
    .linear(1.08, -(128 * 0.05))
    .sharpen({ sigma: 0.8, m1: 0.5, m2: 2, x1: 2, y2: 8 })
    .webp({ quality: 88, effort: 5 })
    .toFile(ogPath);

  console.log("Wrote", ogPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
