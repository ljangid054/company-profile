"use client";

import { useState } from "react";
import { upsertProduct } from "@/app/admin/actions";
import { AdminImageUploader } from "@/components/admin/admin-image-uploader";

export type AdminProductFormCategory = { slug: string; title: string };

export type AdminProductInitial = {
  id: string;
  category_slug: string;
  slug: string;
  name: string;
  short_description: string;
  material: string;
  price: string;
  featured: boolean;
  images: string[];
  specifications: { label: string; value: string }[];
  finishes: string[];
  sizes: string[];
  features: string[];
  applications: string[];
};

type Props = {
  categories: AdminProductFormCategory[];
  initial?: AdminProductInitial | null;
};

const defaultSpecs = `[
  { "label": "Example", "value": "Value" }
]`;

export function AdminProductForm({ categories, initial }: Props) {
  const [images, setImages] = useState(() => (initial?.images ?? []).join("\n"));
  const [specs, setSpecs] = useState(() =>
    initial?.specifications?.length
      ? JSON.stringify(initial.specifications, null, 2)
      : defaultSpecs,
  );

  return (
    <form action={upsertProduct} className="grid max-w-2xl gap-4">
      {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}

      <label className="grid gap-1 text-sm">
        <span className="text-zinc-400">Category</span>
        <select
          name="category_slug"
          required
          defaultValue={initial?.category_slug ?? ""}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        >
          <option value="" disabled>
            Select…
          </option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title} ({c.slug})
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1 text-sm">
        <span className="text-zinc-400">Product slug (URL)</span>
        <input
          name="slug"
          required
          defaultValue={initial?.slug ?? ""}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-white"
        />
      </label>

      <label className="grid gap-1 text-sm">
        <span className="text-zinc-400">Name</span>
        <input
          name="name"
          required
          defaultValue={initial?.name ?? ""}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        />
      </label>

      <label className="grid gap-1 text-sm">
        <span className="text-zinc-400">Short description</span>
        <textarea
          name="short_description"
          rows={3}
          defaultValue={initial?.short_description ?? ""}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        />
      </label>

      <label className="grid gap-1 text-sm">
        <span className="text-zinc-400">Material</span>
        <textarea
          name="material"
          rows={2}
          defaultValue={initial?.material ?? ""}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        />
      </label>

      <label className="grid gap-1 text-sm">
        <span className="text-zinc-400">Price (optional)</span>
        <input
          name="price"
          defaultValue={initial?.price ?? ""}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-zinc-300">
        <input type="checkbox" name="featured" defaultChecked={initial?.featured ?? false} />
        Featured
      </label>

      <div className="grid gap-2">
        <span className="text-sm text-zinc-400">Image URLs (one per line)</span>
        <textarea
          name="images"
          required={false}
          rows={4}
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-xs text-white"
          placeholder="https://…"
        />
        <AdminImageUploader
          onUploaded={(url) => setImages((prev) => (prev.trim() ? `${prev.trim()}\n${url}` : url))}
        />
      </div>

      <label className="grid gap-1 text-sm">
        <span className="text-zinc-400">Specifications (JSON array)</span>
        <textarea
          name="specifications_json"
          rows={8}
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-xs text-white"
        />
      </label>

      <label className="grid gap-1 text-sm">
        <span className="text-zinc-400">Finishes (comma or newline separated)</span>
        <textarea
          name="finishes"
          rows={2}
          defaultValue={(initial?.finishes ?? []).join("\n")}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="text-zinc-400">Sizes</span>
        <textarea
          name="sizes"
          rows={2}
          defaultValue={(initial?.sizes ?? []).join("\n")}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="text-zinc-400">Features</span>
        <textarea
          name="features"
          rows={3}
          defaultValue={(initial?.features ?? []).join("\n")}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="text-zinc-400">Applications</span>
        <textarea
          name="applications"
          rows={2}
          defaultValue={(initial?.applications ?? []).join("\n")}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        />
      </label>

      <button
        type="submit"
        className="w-fit rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-black hover:bg-amber-500"
      >
        {initial ? "Save product" : "Create product"}
      </button>
    </form>
  );
}
