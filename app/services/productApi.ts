import { apiClient } from "@/app/lib/apiClient";
import { Product } from "@/app/types/product";

/** Fetch all products */
export async function getProducts(): Promise<Product[]> {
  return apiClient.get<Product[]>("/products");
}

/** Fetch products filtered by category */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  return apiClient.get<Product[]>(
    `/products/category/${encodeURIComponent(category)}`
  );
}
