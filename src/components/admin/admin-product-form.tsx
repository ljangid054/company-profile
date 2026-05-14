"use client";

import { useState } from "react";
import { upsertProduct } from "@/app/admin/actions";
import { AdminImageUploader } from "@/components/admin/admin-image-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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

const selectClass = cn(
  "h-10 w-full min-w-0 rounded-xl border border-white/10 bg-background/50 px-3 py-2 text-sm text-foreground shadow-inner shadow-black/20 outline-none transition-[border-color,box-shadow,background-color] duration-300",
  "focus-visible:border-primary/45 focus-visible:bg-background/70 focus-visible:ring-3 focus-visible:ring-primary/25",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/25",
);

export function AdminProductForm({ categories, initial }: Props) {
  const [images, setImages] = useState(() => (initial?.images ?? []).join("\n"));
  const [specs, setSpecs] = useState(() =>
    initial?.specifications?.length
      ? JSON.stringify(initial.specifications, null, 2)
      : defaultSpecs,
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={upsertProduct} className="grid max-w-2xl gap-5">
          {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}

          <div className="grid gap-2">
            <Label htmlFor="product-category">Category</Label>
            <select
              id="product-category"
              name="category_slug"
              required
              defaultValue={initial?.category_slug ?? ""}
              className={selectClass}
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
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-slug">Product slug (URL)</Label>
            <Input
              id="product-slug"
              name="slug"
              required
              defaultValue={initial?.slug ?? ""}
              className="font-mono text-sm"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-name">Name</Label>
            <Input id="product-name" name="name" required defaultValue={initial?.name ?? ""} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-short">Short description</Label>
            <Textarea
              id="product-short"
              name="short_description"
              rows={3}
              defaultValue={initial?.short_description ?? ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-material">Material</Label>
            <Textarea
              id="product-material"
              name="material"
              rows={2}
              defaultValue={initial?.material ?? ""}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-price">Price (optional)</Label>
            <Input id="product-price" name="price" defaultValue={initial?.price ?? ""} />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initial?.featured ?? false}
              className="size-4 rounded border-border accent-primary"
            />
            Featured
          </label>

          <div className="grid gap-2">
            <Label htmlFor="product-images">Image URLs (one per line)</Label>
            <Textarea
              id="product-images"
              name="images"
              required={false}
              rows={4}
              value={images}
              onChange={(e) => setImages(e.target.value)}
              className="font-mono text-xs"
              placeholder="https://…"
            />
            <AdminImageUploader
              onUploaded={(url) => setImages((prev) => (prev.trim() ? `${prev.trim()}\n${url}` : url))}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-specs">Specifications (JSON array)</Label>
            <Textarea
              id="product-specs"
              name="specifications_json"
              rows={8}
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              className="font-mono text-xs"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-finishes">Finishes (comma or newline separated)</Label>
            <Textarea
              id="product-finishes"
              name="finishes"
              rows={2}
              defaultValue={(initial?.finishes ?? []).join("\n")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="product-sizes">Sizes</Label>
            <Textarea
              id="product-sizes"
              name="sizes"
              rows={2}
              defaultValue={(initial?.sizes ?? []).join("\n")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="product-features">Features</Label>
            <Textarea
              id="product-features"
              name="features"
              rows={3}
              defaultValue={(initial?.features ?? []).join("\n")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="product-applications">Applications</Label>
            <Textarea
              id="product-applications"
              name="applications"
              rows={2}
              defaultValue={(initial?.applications ?? []).join("\n")}
            />
          </div>

          <Button type="submit" className="w-fit">
            {initial ? "Save product" : "Create product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
