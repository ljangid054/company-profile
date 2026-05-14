"use client";

import { useRef, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type Props = {
  onUploaded: (publicUrl: string) => void;
};

export function AdminImageUploader({ onUploaded }: Props) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMsg(null);
    try {
      const supabase = createBrowserSupabaseClient();
      const safe = file.name.replace(/[^\w.\-]+/g, "_").slice(0, 80);
      const path = `manual/${Date.now()}-${safe}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file, { upsert: false, contentType: file.type });
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      onUploaded(data.publicUrl);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="grid gap-1 text-xs text-zinc-500">
        <span>Upload image (stores in product-images bucket)</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={busy}
          onChange={(ev) => void handleChange(ev)}
          className="text-sm text-zinc-200 file:mr-3 file:rounded-md file:border-0 file:bg-zinc-800 file:px-3 file:py-1.5 file:text-xs file:text-white"
        />
      </label>
      {msg ? <p className="text-xs text-red-400">{msg}</p> : null}
    </div>
  );
}
