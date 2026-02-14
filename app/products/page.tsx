import ProductGrid from "@/components/ui/ProductGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | TapGro Store",
  description: "Browse our complete product catalog at TapGro Store.",
};

export default function ProductsPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <ProductGrid />
    </div>
  );
}
