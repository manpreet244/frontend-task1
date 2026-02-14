import ProductGrid from "@/components/ui/ProductGrid";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6 capitalize">{decodedCategory}</h1>
      <ProductGrid category={category} />
    </div>
  );
}
