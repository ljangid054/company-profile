import Link from "next/link";
import type { Product } from "@/types/product";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";

export function FeaturedProductsSection({ products }: { products: Product[] }) {
  return (
    <Section coverBackground coverScrim="section">
      <Container>
        <Heading
          eyebrow="Catalog preview"
          as="h2"
          title="Featured brass programs"
          description="A curated snapshot from our benches—heritage desi silhouettes, bespoke pairs, and lounge-grade handcrafted brass hookahs."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-10 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm text-muted-foreground">
            Need finishes, bespoke engraving, or export packing for your region? Our craft desk replies with clear timelines and bench notes.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Browse full catalog</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
