import ProductGrid from "@/components/ui/ProductGrid";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return {
    title: `${decoded.charAt(0).toUpperCase() + decoded.slice(1)} | TapGro Store`,
    description: `Browse ${decoded} products at TapGro Store.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6 capitalize">{decodedCategory}</h1>
      <ProductGrid category={decodedCategory} />
    </div>
  );
}
