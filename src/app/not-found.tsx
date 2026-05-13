import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CoverBackdrop } from "@/components/ui/cover-backdrop";

export default function NotFound() {
  return (
    <section className="relative isolate flex flex-1 flex-col overflow-hidden py-24">
      <div className="absolute inset-0">
        <CoverBackdrop scrim="section" />
      </div>
      <Container className="relative z-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          404
        </p>
        <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
          This brass thread doesn’t exist.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          The page may have moved—or the SKU slug changed. Head back to the catalog or talk with our workshop desk.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/products">Catalog</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
