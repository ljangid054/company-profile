"use client";

import type { Product } from "@/types/product";
import { Container } from "@/components/ui/container";
import { ShopProductCard } from "@/components/shop/shop-product-card";

export function BestSellersSection({ products }: { products: Product[] }) {
  const featured = products.filter((p) => p.featured);
  const items = (featured.length >= 4 ? featured : products).slice(0, 4);

  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <Container>
        <div className="text-center">
          <h2 className="font-heading text-3xl font-normal text-foreground sm:text-4xl">
            Best Seller
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Handcrafted brass collections</p>
        </div>
        <div className="mt-14 -mx-4 flex gap-6 overflow-x-auto px-4 pb-4 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {items.map((product) => (
            <div key={product.id} className="w-[min(72vw,240px)] shrink-0 snap-start sm:w-auto">
              <ShopProductCard product={product} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
