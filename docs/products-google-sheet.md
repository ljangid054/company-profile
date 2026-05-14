# Product catalog: Google Sheet & env

**Step-by-step GCP + Sheet setup:** [google-sheet-gcp-setup.md](./google-sheet-gcp-setup.md)

## Path 2 — Minimal backend (recommended)

Server-only variables (never prefix with `NEXT_PUBLIC_`):

| Variable | Description |
|----------|-------------|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Full JSON key for a Google Cloud **service account** (single line or store as secret in your host). |
| `GOOGLE_SHEET_ID` | Spreadsheet ID from the Sheet URL (`/d/{THIS_ID}/edit`). |
| `GOOGLE_SHEET_RANGE` | Optional A1 range, default `Products!A:ZZ`. First row = headers. |

**Setup**

1. In [Google Cloud Console](https://console.cloud.google.com/), enable **Google Sheets API** for a project.
2. Create a **service account**, create a **JSON key**, download it.
3. Open your Google Sheet → **Share** → add the service account email (from the JSON `client_email`) with **Viewer** access so the API can read rows.
4. In the sheet, add a tab named `Products` (or change `GOOGLE_SHEET_RANGE` to match). Row 1 = headers — see [data/products-import-template.csv](../data/products-import-template.csv) for column names.
5. Set env vars on your host (Vercel **Environment Variables**, etc.). Do **not** commit the JSON key to git.

**Security**

- Use a key dedicated to this project; restrict nothing else on that GCP project if possible.
- The app only requests **read-only** Sheets scope. Do not grant write scopes for catalog reads.
- With this path, the spreadsheet can stay **private** to the public (only the service account + your editors need access).

## Path 1 — Browser API key (optional, static-friendly)

If you call Google directly from the client instead of `/api/products`, you would use:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY` | Restrict in GCP to HTTP referrers + Sheets API only. Treat as **public**. |
| `NEXT_PUBLIC_SPREADSHEET_ID` | Same as sheet ID. |

The sheet must typically be readable without a logged-in user (e.g. link sharing) for API-key-only access. Prefer Path 2 for private data.

## Catalog loading mode

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FETCH_PRODUCTS_FROM_API` | Set to `1` to load the main `/products` grid via **client** `fetch("/api/products")` (useful for debugging). Default: server ISR from sheet-only (when configured) or static JSON. |

## Catalog source

If **`GOOGLE_SERVICE_ACCOUNT_JSON`** and **`GOOGLE_SHEET_ID`** are set, the live catalog (pages, `/api/products`, sitemap) uses **only** rows from that Google Sheet — **`src/data/products.json` is not shown**.

If those variables are **not** set, the site uses **`src/data/products.json`** only (local / build-time catalog).

## Site URL (Open Graph)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin, e.g. `https://somadahookah.com` (used for absolute OG image URLs). |
