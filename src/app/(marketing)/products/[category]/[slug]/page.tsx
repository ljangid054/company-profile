import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProductsMerged,
  getProductMerged,
} from "@/lib/products-merged";
import { getCategoryBySlug, isCategorySlug } from "@/lib/categories";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductSpecsTable } from "@/components/products/product-specs-table";
import { ProductInquiryBar } from "@/components/products/product-inquiry-bar";
import { toAbsoluteUrl } from "@/lib/absolute-url";

export const revalidate = 60;
export const dynamicParams = true;

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  const products = await getAllProductsMerged();
  return products.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  if (!(await isCategorySlug(category))) return { title: "Product" };
  const product = await getProductMerged(category, slug);
  if (!product) return { title: "Product" };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.shortDescription,
      url: `/products/${category}/${slug}`,
      images: product.images[0]
        ? [{ url: toAbsoluteUrl(product.images[0]), alt: product.name }]
        : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { category, slug } = await params;
  if (!(await isCategorySlug(category))) {
    notFound();
  }

  const product = await getProductMerged(category, slug);
  if (!product) {
    notFound();
  }

  const cat = await getCategoryBySlug(category);

  return (
    <section className="py-10 lg:py-14">
      <Container className="max-w-7xl">
        <nav className="text-sm text-muted-foreground">
          <Link className="hover:text-primary" href="/">
            Home
          </Link>
          <span className="mx-2">|</span>
          <Link className="hover:text-primary" href="/products">
            Shop
          </Link>
          <span className="mx-2">|</span>
          <Link className="hover:text-primary" href={`/products/${category}`}>
            {cat?.title ?? category}
          </Link>
          <span className="mx-2">|</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start">
          <ProductGallery images={product.images} productName={product.name} />

          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{cat?.title}</Badge>
              {product.featured ? <Badge>Featured</Badge> : null}
            </div>
            <h1 className="font-heading mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              {product.name}
            </h1>
            {product.price ? (
              <p className="mt-4 text-2xl font-medium text-primary">{product.price}</p>
            ) : null}
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>

            <ProductInquiryBar product={product} className="mt-8" />

            <Separator className="my-10" />

            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-semibold">Specifications</h2>
                <div className="mt-4">
                  <ProductSpecsTable rows={product.specifications} />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Material
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {product.material}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Finishes
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {product.finishes.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Sizes / variants
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {product.sizes.map((s) => (
                      <li key={s}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Applications
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {product.applications.map((a) => (
                      <li key={a}>• {a}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Features
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
