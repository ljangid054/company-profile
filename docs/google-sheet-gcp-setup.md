# Google Sheet + GCP setup (service account)

This app reads catalog rows from a **Google Sheet** using a **Google Cloud service account** (server-only). Follow the steps in order.

## 1. Google Cloud project

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Top bar: **Select a project** → **New project** → name it (e.g. `somada-catalog`) → **Create**.
3. Wait until the project is active.

## 2. Enable Google Sheets API

1. Left menu: **APIs & services** → **Library** (or search “APIs & Services”).
2. Search for **Google Sheets API** → open it → **Enable**.

## 3. Create a service account

1. **APIs & services** → **Credentials**.
2. **+ Create credentials** → **Service account**.
3. **Service account name**: e.g. `catalog-reader` → **Create and continue**.
4. **Grant this service account access to the project** (optional for read-only Sheets): you can skip roles or pick minimal; Sheets access is granted by **sharing the Sheet** in step 7.
5. **Done**. Click the new service account email to open its details.

## 4. Create a JSON key

1. On the service account page, tab **Keys** → **Add key** → **Create new key** → **JSON** → **Create**.
2. A `.json` file downloads. **Keep it secret** — anyone with it can act as that service account within its permissions.

You will paste this file’s contents into `GOOGLE_SERVICE_ACCOUNT_JSON` in `.env` (see below).

## 5. Prepare the Google Sheet

1. Open [Google Sheets](https://sheets.google.com/) → **Blank** spreadsheet.
2. Rename the first tab to **`Products`** (or keep another name and set `GOOGLE_SHEET_RANGE` to that name, e.g. `Catalog!A:ZZ`).
3. **Row 1** = header row. Use the same column names as [data/products-import-template.csv](../data/products-import-template.csv), for example:

   `id`, `category`, `slug`, `name`, `short_description`, `images`, `material`, `finishes`, `sizes`, `features`, `applications`, `specifications`, `featured`, `price`

4. **Row 2+** = one product per row.  
   - **`category`** must be one of: `heritage-desi`, `premium-handcrafted`, `custom-bespoke`, `lounge-series`, `compact-artisan`, `limited-editions`.  
   - **`images`**: multiple URLs separated by `|`.  
   - **`specifications`**: JSON array like `[{"label":"Height","value":"720 mm"}]` or leave empty.  
   - **`featured`**: `true` / `false` / `yes` / `no`.

5. Copy the **Spreadsheet ID** from the URL:

   `https://docs.google.com/spreadsheets/d/`**`PASTE_THIS_LONG_ID`**`/edit`

   Put it in `.env` as `GOOGLE_SHEET_ID=...`.

## 6. Share the Sheet with the service account

1. Open the downloaded JSON key and find **`client_email`** (ends with `@...iam.gserviceaccount.com`).
2. In the Sheet: **Share** → paste that email → role **Viewer** → **Send** (uncheck “Notify people” if you prefer).

Without this step, the API returns permission errors.

## 7. Configure `.env` locally

1. Copy [.env.example](../.env.example) to `.env` if you do not have `.env` yet, or edit the generated [.env](../.env).
2. Set:

   ```bash
   GOOGLE_SHEET_ID=paste_spreadsheet_id_here
   GOOGLE_SHEET_RANGE=Products!A:ZZ
   ```

3. Set **`GOOGLE_SERVICE_ACCOUNT_JSON`** to the **full JSON** of the key file:

   - **Option A (one line):** Open the `.json` file, minify to one line (many editors can do this), paste after `GOOGLE_SERVICE_ACCOUNT_JSON=`.
   - **Option B:** Keep the file on disk only in dev and use a small loader — the current code expects the **env var string** to be valid JSON, so one-line paste is the usual approach.

   The downloaded key has `"private_key": "...\\n..."` in the file; after `JSON.parse` that becomes real newlines. If your host stores the value with **extra** escaping so you still see the two characters `\` and `n` inside the PEM, the app normalizes that before calling Google.

4. Set `NEXT_PUBLIC_SITE_URL` (e.g. `http://localhost:3000` for dev).

5. Run `npm run dev` and open `/api/products` — you should see `{ "products": [ ... ] }` from the Sheet only (when env is set). Without Sheet env, products come from [src/data/products.json](../src/data/products.json).

## 8. Production (e.g. Vercel)

1. Add the same variables in the host’s **Environment variables** UI.
2. For `GOOGLE_SERVICE_ACCOUNT_JSON`, paste the **entire JSON** as one secret value (Vercel supports multiline secrets; if not, use one-line JSON).
3. Deploy a **Node** Next.js app (not static export only) so `/api/products` and server-side Sheet reads run.

## Optional: restrict the key further

In **Google Cloud Console** → **APIs & services** → **Credentials** → your **API keys** (if you add any for other features): restrict by HTTP referrer or IP. **Service account keys** are restricted by IAM and by what you share (the Sheet); rotate keys if leaked.

## Troubleshooting

| Symptom | What to check |
|--------|-----------------|
| Key pasted in chat, email, or ticket | **Rotate immediately:** GCP → service account → Keys → delete old key → add new key → update `.env` only on secure machines. |
| `Invalid GOOGLE_SERVICE_ACCOUNT_JSON` | JSON typo; paste full downloaded file. Prefer pasting the **raw** `.json` contents (valid JSON with `"private_key":"-----BEGIN…\\n…"`). |
| `invalid_grant` / bad signature | Usually bad PEM: wrong escaping in `.env`. Code normalizes `\\n` → newline; if it persists, re-download the key and paste again. |
| `403` / Permission denied on Sheets | Sheet **Shared** with `client_email` as **Viewer**; correct `GOOGLE_SHEET_ID`. |
| Empty `products` from sheet | Tab name / range matches `GOOGLE_SHEET_RANGE`; row 1 headers; rows pass Zod (check server logs for “Row N skipped”). |
| Works on Vercel, not locally | `.env` loaded; restart `npm run dev`. |

More context: [products-google-sheet.md](./products-google-sheet.md).
