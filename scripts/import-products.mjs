/**
 * Merge rows from an Excel or CSV file into src/data/products.json
 * Usage: node scripts/import-products.mjs <path-to.xlsx-or.csv> [--dry-run]
 */
import { readFile, writeFile } from "fs/promises";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import xlsx from "xlsx";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outJson = join(root, "src", "data", "products.json");

function normalizeHeader(cell) {
  return String(cell ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

function rowToRecord(headers, row) {
  const rec = {};
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i];
    if (!h) continue;
    rec[h] = row[i] != null ? String(row[i]).trim() : "";
  }
  return rec;
}

function splitList(raw) {
  if (!String(raw).trim()) return [];
  return String(raw)
    .split(/[|\n;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseSpecifications(raw) {
  const t = String(raw).trim();
  if (!t) return [];
  try {
    const parsed = JSON.parse(t);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (x) =>
          x &&
          typeof x.label === "string" &&
          typeof x.value === "string",
      )
      .map((x) => ({ label: x.label, value: x.value }));
  } catch {
    return [];
  }
}

function cell(row, ...aliases) {
  for (const a of aliases) {
    const v = row[a];
    if (v !== undefined && String(v).trim() !== "") return String(v).trim();
  }
  return "";
}

function parseFeatured(raw) {
  const t = String(raw).trim().toLowerCase();
  if (!t) return undefined;
  if (["1", "true", "yes", "y", "featured"].includes(t)) return true;
  if (["0", "false", "no", "n"].includes(t)) return false;
  return undefined;
}

const CATEGORIES = new Set([
  "heritage-desi",
  "premium-handcrafted",
  "custom-bespoke",
  "lounge-series",
  "compact-artisan",
  "limited-editions",
]);

function rowToProduct(rec, rowIndex) {
  const category = cell(rec, "category", "cat");
  if (!CATEGORIES.has(category)) {
    throw new Error(`Row ${rowIndex}: invalid category "${category}"`);
  }
  const id = cell(rec, "id", "sku");
  const slug = cell(rec, "slug", "url_slug");
  const name = cell(rec, "name", "title", "product_name");
  if (!id || !slug || !name) {
    throw new Error(`Row ${rowIndex}: id, slug, and name are required`);
  }
  const shortDescription = cell(
    rec,
    "short_description",
    "shortdescription",
    "description",
    "desc",
  );
  const images = splitList(cell(rec, "images", "image_urls", "photos"));
  return {
    id,
    category,
    slug,
    name,
    shortDescription,
    images,
    specifications: parseSpecifications(
      cell(rec, "specifications", "specs", "specification_json"),
    ),
    material: cell(rec, "material"),
    finishes: splitList(cell(rec, "finishes", "finish")),
    sizes: splitList(cell(rec, "sizes", "size", "variants")),
    features: splitList(cell(rec, "features", "feature")),
    applications: splitList(
      cell(rec, "applications", "application", "uses"),
    ),
    featured: parseFeatured(cell(rec, "featured", "is_featured", "highlight")),
    ...(cell(rec, "price", "list_price", "msrp")
      ? { price: cell(rec, "price", "list_price", "msrp") }
      : {}),
  };
}

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry-run");
  const files = args.filter((a) => a !== "--dry-run");
  const input = files[0];
  if (!input) {
    console.error(
      "Usage: node scripts/import-products.mjs <file.xlsx|file.csv> [--dry-run]",
    );
    process.exit(1);
  }

  const buf = await readFile(resolve(process.cwd(), input));
  const wb = xlsx.read(buf, { type: "buffer" });
  const sheetName = wb.SheetNames[0];
  if (!sheetName) {
    console.error("No sheets found");
    process.exit(1);
  }
  const ws = wb.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(ws, { header: 1, raw: false });
  if (!rows.length || rows.length < 2) {
    console.error("Need a header row and at least one data row");
    process.exit(1);
  }

  const headers = rows[0].map((h) => normalizeHeader(h));
  const imported = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row?.length) continue;
    const rec = rowToRecord(headers, row);
    if (!cell(rec, "id", "sku") && !cell(rec, "name", "title")) continue;
    imported.push(rowToProduct(rec, i + 1));
  }

  const existingRaw = await readFile(outJson, "utf8");
  const existing = JSON.parse(existingRaw);
  const byId = new Map();
  for (const p of existing) byId.set(p.id, p);
  for (const p of imported) byId.set(p.id, p);
  const merged = Array.from(byId.values());

  const json = `${JSON.stringify(merged, null, 2)}\n`;
  if (dry) {
    console.log(json);
    return;
  }
  await writeFile(outJson, json, "utf8");
  console.log(`Wrote ${merged.length} products to ${outJson}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
