# Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run `migrations/20250514120000_admin_catalog.sql` in **SQL Editor** (or use the Supabase CLI).
3. **Authentication → Providers**: enable Email. Disable public sign-up if you only want invited admins (recommended); create the first user in **Authentication → Users → Add user**.
4. Copy the new user’s UUID and run (replace `USER_UUID`):

```sql
insert into public.admin_profiles (user_id, role)
values ('USER_UUID', 'super_admin')
on conflict (user_id) do update set role = excluded.role;
```

5. In the app `.env`, set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only; never expose to the browser)
- Optional: `NEXT_PUBLIC_CATALOG_SOURCE=supabase` to serve the storefront from Postgres instead of static `src/data/products.json`.

6. **Sub-users**: sign in as super admin, open **Admin → Users**, and create accounts (the API uses the service role). New users get role `admin`.

7. **Contact form**: uses `POST /api/contact` with the service role to insert rows and optional files into the `contact-files` bucket.

## Email links (`#access_token=…`)

Password reset links often open `http://localhost:3000/#access_token=…&type=recovery`. Tokens in the **hash** never reach the server, so the app uses a client handler to call `setSession`, strip the hash, then:

- **`type=recovery`** → redirect to **`/auth/update-password`** to choose a new password, then sign in at **`/admin/login`**.
- In **Authentication → URL configuration**, allow your app origin under **Redirect URLs** (e.g. `http://localhost:3000/**` and your production URL).

If a link with tokens is exposed, treat it as compromised: request a new reset and avoid reusing the old URL.

## Authentication email flows (dashboard templates)

1. **URL configuration** (Authentication → URL configuration): set **Site URL** to your app origin (e.g. `http://localhost:3000` or production). Under **Redirect URLs**, add `http://localhost:3000/**` and your production `https://…/**`.

2. **App routes**
   - Links that open with `#access_token=…` are handled globally (root layout) and routed by `type`: `recovery` → set password; `invite` → set password; `signup` / email change → login with notice; `magiclink` → `/admin` (or `next` param).
   - Links with **`?token_hash=…&type=…`** (if you configure templates that way) should point to **`{{ .SiteURL }}/auth/confirm?token_hash=…`** per Supabase variables — the **`/auth/confirm`** page runs `verifyOtp` and redirects the same way.

3. **Branded HTML** (paste into each Supabase template’s HTML / body field):

| Supabase template        | File in this repo |
|--------------------------|-------------------|
| Confirm sign up          | `supabase/email-templates/confirm-signup.html` |
| Invite user              | `supabase/email-templates/invite-user.html` |
| Magic link               | `supabase/email-templates/magic-link.html` |
| Change email address     | `supabase/email-templates/change-email.html` |
| Reset password           | `supabase/email-templates/reset-password.html` |
| Password changed         | `supabase/email-templates/password-changed.html` |
| Reauthentication         | `supabase/email-templates/reauthentication.html` |

4. **Admin access**: after **confirm signup** or **invite**, the user still needs a row in **`admin_profiles`** (except the flows where you add it via SQL or **Admin → Users**). Otherwise login works in Supabase but **/admin** will redirect until staff access is granted.

5. **Restart `next dev`** after changing `.env` (`NEXT_PUBLIC_*`).
