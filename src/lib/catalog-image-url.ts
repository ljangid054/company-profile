/**
 * Turn common Google Drive *page* links into a direct image URL browsers can load in <img>.
 * Paste-style /view links often work in a raw HTML editor only after the browser resolves redirects;
 * explicit uc?export=view is more reliable for <img src>.
 */
export function normalizeCatalogImageUrl(src: string): string {
  const t = src.trim();
  if (!t.startsWith("http")) return t;

  try {
    const u = new URL(t);
    if (u.hostname !== "drive.google.com") return t;

    // /file/d/{id}/...
    const fileMatch = u.pathname.match(/\/file\/d\/([^/]+)/);
    if (fileMatch?.[1]) {
      const id = fileMatch[1];
      return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(id)}`;
    }

    const openId = u.searchParams.get("id");
    if (u.pathname.includes("/open") && openId) {
      return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(openId)}`;
    }
  } catch {
    return t;
  }

  return t;
}

export function isRemoteHttpUrl(src: string): boolean {
  const t = src.trim();
  return t.startsWith("http://") || t.startsWith("https://");
}
