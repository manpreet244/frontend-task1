import ProductGrid from "@/components/ui/ProductGrid";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6 capitalize">{category}</h1>
      <ProductGrid category={category} />
    </div>
  );
}
