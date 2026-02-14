import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden border rounded-lg bg-white">
    <Skeleton className="h-52 w-full" />
    <div className="p-3 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
);

export default ProductCardSkeleton;
