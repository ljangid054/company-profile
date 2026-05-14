import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, isCategorySlug } from "@/lib/products";
import { getProductMerged } from "@/lib/products-merged";
import { getCategoryBySlug } from "@/lib/categories";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductSpecsTable } from "@/components/products/product-specs-table";
import { ProductInquiryBar } from "@/components/products/product-inquiry-bar";
import { FadeIn } from "@/components/motion/fade-in";
import type { CategorySlug } from "@/types/product";
import { toAbsoluteUrl } from "@/lib/absolute-url";

export const revalidate = 60;
export const dynamicParams = true;

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isCategorySlug(category)) return { title: "Product" };
  const product = await getProductMerged(category as CategorySlug, slug);
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
  if (!isCategorySlug(category)) {
    notFound();
  }

  const product = await getProductMerged(category as CategorySlug, slug);
  if (!product) {
    notFound();
  }

  const cat = getCategoryBySlug(category);

  return (
    <Section coverBackground coverScrim="section" className="pt-12 sm:pt-16">
      <Container>
        <nav className="text-xs text-muted-foreground">
          <Link className="hover:text-foreground" href="/products">
            Catalog
          </Link>
          <span className="mx-2 opacity-40">/</span>
          <Link className="hover:text-foreground" href={`/products/${category}`}>
            {cat?.title ?? category}
          </Link>
          <span className="mx-2 opacity-40">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start">
          <FadeIn variant="scale">
            <ProductGallery images={product.images} productName={product.name} />
          </FadeIn>
          <FadeIn variant="blur" delay={0.08}>
            <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{cat?.title}</Badge>
              {product.featured ? <Badge>Featured program</Badge> : null}
            </div>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {product.shortDescription}
            </p>
            {product.price ? (
              <p className="mt-3 text-lg font-semibold text-primary">{product.price}</p>
            ) : null}

            <Separator className="my-8 bg-border/70" />

            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl text-foreground">Specifications</h2>
                <div className="mt-4">
                  <ProductSpecsTable rows={product.specifications} />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Material
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {product.material}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
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
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Sizes / variants
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {product.sizes.map((s) => (
                      <li key={s}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
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
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Features
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn variant="up" delay={0.1} className="mt-16">
          <ProductInquiryBar product={product} />
        </FadeIn>
      </Container>
    </Section>
  );
}
