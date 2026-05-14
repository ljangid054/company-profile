import { NextResponse } from "next/server";
import { getAllProductsMerged } from "@/lib/products-merged";

export async function GET() {
  const products = await getAllProductsMerged();
  return NextResponse.json(
    { products },
    {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
      },
    },
  );
}
