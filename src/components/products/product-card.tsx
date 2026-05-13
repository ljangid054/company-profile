import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEFAULT_PRODUCT_IMAGE } from "@/config/visual";

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.category}/${product.slug}`;
  const cover = product.images[0] ?? DEFAULT_PRODUCT_IMAGE;

  return (
    <Card className="group overflow-hidden border-border/70 bg-card/60 transition-colors hover:border-primary/45">
      <Link href={href} className="block focus-visible:outline-none">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-muted/45 to-muted/15">
          <Image
            src={cover}
            alt={product.name}
            fill
            className="object-contain object-center p-3 transition-transform duration-500 group-hover:scale-[1.02] sm:p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          {product.featured ? (
            <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
              Featured
            </Badge>
          ) : null}
        </div>
        <CardHeader className="space-y-2">
          <CardTitle className="font-heading text-xl leading-snug tracking-tight">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {product.shortDescription}
          </CardDescription>
        </CardHeader>
      </Link>
      <CardContent className="flex flex-wrap gap-2 pt-0">
        <Button asChild size="sm">
          <Link href={href}>View details</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href={`/contact?product=${encodeURIComponent(product.slug)}#quote`}>
            Request quote
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
