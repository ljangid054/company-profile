/**
 * Writes data/sample-products.xlsx for local testing / import.
 * Run: node scripts/generate-sample-products-xlsx.mjs
 */
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import xlsx from "xlsx";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "data", "sample-products.xlsx");

const headers = [
  "id",
  "category",
  "slug",
  "name",
  "short_description",
  "images",
  "material",
  "finishes",
  "sizes",
  "features",
  "applications",
  "specifications",
  "featured",
  "price",
];

const rows = [
  headers,
  [
    "sample-001",
    "heritage-desi",
    "sample-heritage-mini",
    "Sample Heritage Mini Hookah",
    "Compact brass silhouette for catalog demos—replace with real workshop copy.",
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800|https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800",
    "Solid brass stem and tray; handcrafted collar rings.",
    "Satin brass|Dark antique patina",
    "Compact height (~420 mm)",
    "Bench-balanced draw|Traditional purge ring",
    "Home rituals|Boutique lounges",
    '[{"label":"Approx. height","value":"420 mm"},{"label":"Body","value":"Solid brass"}]',
    "true",
    "₹8,500",
  ],
  [
    "sample-002",
    "lounge-series",
    "sample-lounge-twin",
    "Sample Lounge Twin Stem",
    "Dual-hose hospitality layout—placeholder imagery and specs for spreadsheet workflow tests.",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    "Brass and stainless accents; reinforced base ring.",
    "Mirror collar|Matte black stem wrap",
    "Standard lounge height",
    "Dual leather hose ports|Wide embossed tray",
    "Premium lounges|Hotel terraces",
    "[]",
    "false",
    "₹18,900",
  ],
];

const ws = xlsx.utils.aoa_to_sheet(rows);
const wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, ws, "Products");
xlsx.writeFile(wb, outPath);
console.log(`Wrote ${outPath}`);
