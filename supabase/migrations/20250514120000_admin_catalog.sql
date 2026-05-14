-- Somada: catalog, admin roles, contact submissions, storage.
-- Run in Supabase SQL Editor or via supabase db push.

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Categories & products
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_slug text not null references public.categories (slug) on update cascade on delete restrict,
  slug text not null,
  name text not null,
  short_description text not null default '',
  images text[] not null default '{}',
  specifications jsonb not null default '[]',
  material text not null default '',
  finishes text[] not null default '{}',
  sizes text[] not null default '{}',
  features text[] not null default '{}',
  applications text[] not null default '{}',
  featured boolean not null default false,
  price text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_slug, slug)
);

create index if not exists products_category_slug_idx on public.products (category_slug);

-- ---------------------------------------------------------------------------
-- Admin profiles (linked to auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('super_admin', 'admin')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Contact submissions
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  company text,
  message text not null,
  product_sku text,
  locale text default 'en',
  attachment_path text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS helpers
-- ---------------------------------------------------------------------------
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles p
    where p.user_id = (select auth.uid())
      and p.role in ('super_admin', 'admin')
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles p
    where p.user_id = (select auth.uid())
      and p.role = 'super_admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Enable RLS
-- ---------------------------------------------------------------------------
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.admin_profiles enable row level security;
alter table public.contact_submissions enable row level security;

-- Categories: public read, staff write
drop policy if exists "categories_select_public" on public.categories;
create policy "categories_select_public" on public.categories
  for select using (true);

drop policy if exists "categories_write_staff" on public.categories;
create policy "categories_write_staff" on public.categories
  for all using (public.is_staff()) with check (public.is_staff());

-- Products: public read, staff write
drop policy if exists "products_select_public" on public.products;
create policy "products_select_public" on public.products
  for select using (true);

drop policy if exists "products_write_staff" on public.products;
create policy "products_write_staff" on public.products
  for all using (public.is_staff()) with check (public.is_staff());

-- Admin profiles: each user reads own row; super_admin manages (via API/service role)
drop policy if exists "admin_profiles_select_own" on public.admin_profiles;
create policy "admin_profiles_select_own" on public.admin_profiles
  for select using (user_id = (select auth.uid()));

drop policy if exists "admin_profiles_select_staff" on public.admin_profiles;
create policy "admin_profiles_select_staff" on public.admin_profiles
  for select using (public.is_staff());

-- Contacts: staff read only (inserts via service role from /api/contact)
drop policy if exists "contact_submissions_select_staff" on public.contact_submissions;
create policy "contact_submissions_select_staff" on public.contact_submissions
  for select using (public.is_staff());

-- ---------------------------------------------------------------------------
-- Seed categories (matches src/data/categories.ts)
-- ---------------------------------------------------------------------------
insert into public.categories (slug, title, description, sort_order)
values
  ('heritage-desi', 'Heritage Desi Hookahs',
   'Traditional desi silhouettes—tall stems, generous bowls, and brasswork that honors Old Delhi & Lucknow lounge culture, finished entirely by hand.', 10),
  ('premium-handcrafted', 'Premium Handcrafted Collection',
   'Signature Somada lines where patina, collar polish, and proportional balance are tuned like furniture—each hookah assembled and signed off at the bench.', 20),
  ('custom-bespoke', 'Custom & Bespoke',
   'Monograms, wedding pairs, venue crests, and family heirloom commissions—paper sketches to wax-fit assemblies with Somada craft leads.', 30),
  ('lounge-series', 'Lounge & Hospitality Series',
   'Built for heavy rotation in lounges and export crates—consistent draw character, stable trays, and packing that survives freight without drama.', 40),
  ('compact-artisan', 'Compact Artisan Hookahs',
   'Smaller footprints without toy-hookah shortcuts—full brass construction and Somada finishing for premium gifting and intimate gatherings.', 50),
  ('limited-editions', 'Limited Collector Editions',
   'Numbered drops and collaborations—small-batch brass hookahs with artisan storytelling and certificate-style provenance cards.', 60)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Storage buckets
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('contact-files', 'contact-files', false)
on conflict (id) do nothing;

-- Public read product images
drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read" on storage.objects
  for select using (bucket_id = 'product-images');

-- Staff manage product images
drop policy if exists "product_images_staff_insert" on storage.objects;
create policy "product_images_staff_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'product-images' and public.is_staff());

drop policy if exists "product_images_staff_update" on storage.objects;
create policy "product_images_staff_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'product-images' and public.is_staff())
  with check (bucket_id = 'product-images' and public.is_staff());

drop policy if exists "product_images_staff_delete" on storage.objects;
create policy "product_images_staff_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'product-images' and public.is_staff());

-- Contact files: staff read (uploads use service role and bypass RLS)
drop policy if exists "contact_files_staff_select" on storage.objects;
create policy "contact_files_staff_select" on storage.objects
  for select to authenticated
  using (bucket_id = 'contact-files' and public.is_staff());

-- ---------------------------------------------------------------------------
-- After first Auth user exists: grant super_admin (replace USER_UUID):
-- insert into public.admin_profiles (user_id, role) values ('USER_UUID', 'super_admin')
--   on conflict (user_id) do update set role = excluded.role;
-- Additional admins: use Dashboard or POST /api/admin/users (super_admin only).
-- ---------------------------------------------------------------------------
