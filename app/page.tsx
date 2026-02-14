import ProductGrid from "@/components/ui/ProductGrid";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <ProductGrid />
    </div>
  );
}
