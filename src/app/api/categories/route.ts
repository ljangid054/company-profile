import { NextResponse } from "next/server";
import { getAllCategories } from "@/lib/categories";

export async function GET() {
  const categories = await getAllCategories();
  return NextResponse.json(
    { categories },
    {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
      },
    },
  );
}
