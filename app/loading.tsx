import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="p-6 sm:p-10">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
