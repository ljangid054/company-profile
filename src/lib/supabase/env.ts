export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}

export function isSupabaseCatalogEnabled(): boolean {
  return (
    isSupabaseConfigured() &&
    process.env.NEXT_PUBLIC_CATALOG_SOURCE?.trim().toLowerCase() === "supabase"
  );
}

export function isServiceRoleConfigured(): boolean {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}
