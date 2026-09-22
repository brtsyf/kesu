import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/sanity/fetch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const products = await searchProducts(q);
  return NextResponse.json({ products: products.slice(0, 8) });
}
