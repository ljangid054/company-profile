import { google } from "googleapis";
import { productSchema } from "@/lib/product-schema";
import type { Product } from "@/types/product";

function normalizeHeader(cell: string): string {
  return cell
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

function rowToRecord(headers: string[], row: string[]): Record<string, string> {
  const rec: Record<string, string> = {};
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i];
    if (!h) continue;
    rec[h] = row[i] != null ? String(row[i]).trim() : "";
  }
  return rec;
}

function splitList(raw: string): string[] {
  if (!raw.trim()) return [];
  return raw
    .split(/[|\n;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseSpecifications(raw: string): { label: string; value: string }[] {
  const t = raw.trim();
  if (!t) return [];
  try {
    const parsed: unknown = JSON.parse(t);
    if (!Array.isArray(parsed)) return [];
    const out: { label: string; value: string }[] = [];
    for (const item of parsed) {
      if (
        item &&
        typeof item === "object" &&
        "label" in item &&
        "value" in item &&
        typeof (item as { label: unknown }).label === "string" &&
        typeof (item as { value: unknown }).value === "string"
      ) {
        out.push({
          label: (item as { label: string }).label,
          value: (item as { value: string }).value,
        });
      }
    }
    return out;
  } catch {
    return [];
  }
}

function cell(
  row: Record<string, string>,
  ...aliases: string[]
): string {
  for (const a of aliases) {
    const v = row[a];
    if (v !== undefined && v.trim() !== "") return v.trim();
  }
  return "";
}

function parseFeatured(raw: string): boolean | undefined {
  const t = raw.trim().toLowerCase();
  if (!t) return undefined;
  if (["1", "true", "yes", "y", "featured"].includes(t)) return true;
  if (["0", "false", "no", "n"].includes(t)) return false;
  return undefined;
}

export function isGoogleSheetConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim() &&
      process.env.GOOGLE_SHEET_ID?.trim(),
  );
}

/** PEM in JSON uses `\n`; some hosts / copy-paste leave `\\n` (two chars) or `\\`+`n` from double escaping. */
function normalizePrivateKey(key: string): string {
  return key.replace(/\\\\n/g, "\n").replace(/\\n/g, "\n");
}

function sheetRowToProductPayload(row: Record<string, string>): unknown {
  const imagesCell = cell(row, "images", "image_urls", "photos");
  const images = splitList(imagesCell);

  return {
    id: cell(row, "id", "sku"),
    category: cell(row, "category", "cat"),
    slug: cell(row, "slug", "url_slug"),
    name: cell(row, "name", "title", "product_name"),
    shortDescription: cell(
      row,
      "short_description",
      "shortdescription",
      "description",
      "desc",
    ),
    images,
    specifications: parseSpecifications(
      cell(row, "specifications", "specs", "specification_json"),
    ),
    material: cell(row, "material"),
    finishes: splitList(cell(row, "finishes", "finish")),
    sizes: splitList(cell(row, "sizes", "size", "variants")),
    features: splitList(cell(row, "features", "feature")),
    applications: splitList(cell(row, "applications", "application", "uses")),
    featured: parseFeatured(cell(row, "featured", "is_featured", "highlight")),
    price: cell(row, "price", "list_price", "msrp") || undefined,
  };
}

export async function fetchProductsFromGoogleSheet(): Promise<Product[]> {
  if (!isGoogleSheetConfigured()) return [];

  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON!;
  const sheetId = process.env.GOOGLE_SHEET_ID!;
  const range =
    process.env.GOOGLE_SHEET_RANGE?.trim() || "Products!A:ZZ";

  let credentials: { client_email: string; private_key: string };
  try {
    credentials = JSON.parse(raw) as { client_email: string; private_key: string };
  } catch {
    console.error("[google-sheet-products] Invalid GOOGLE_SERVICE_ACCOUNT_JSON");
    return [];
  }
  if (!credentials.client_email || !credentials.private_key) {
    console.error("[google-sheet-products] Missing client_email or private_key");
    return [];
  }

  try {
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: normalizePrivateKey(credentials.private_key),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });

    const values = res.data.values;
    if (!values?.length || values.length < 2) return [];

    const headers = values[0]!.map((h) => normalizeHeader(String(h)));
    const products: Product[] = [];

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (!row?.length) continue;
      const rec = rowToRecord(headers, row.map((c) => String(c)));
      if (!cell(rec, "id", "sku") || !cell(rec, "name", "title", "product_name")) {
        continue;
      }
      const payload = sheetRowToProductPayload(rec);
      const parsed = productSchema.safeParse(payload);
      if (!parsed.success) {
        console.warn(
          `[google-sheet-products] Row ${i + 1} skipped:`,
          parsed.error.flatten().fieldErrors,
        );
        continue;
      }
      products.push(parsed.data);
    }

    return products;
  } catch (e) {
    console.error("[google-sheet-products] Fetch failed:", e);
    return [];
  }
}
