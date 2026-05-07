import { products } from "../../../data/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

// Generate static routes for all products to ensure fast loading
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}
