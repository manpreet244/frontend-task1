import { apiClient } from "@/app/lib/apiClient";
import { Product } from "@/app/types/product";

// cache for 1 min by default
const CACHE_TIME = 60;

// get all products
export async function getProducts() {
  return apiClient.get<Product[]>("/products", { revalidate: CACHE_TIME });
}


// get products by category
export async function getProductsByCategory(category: string) {
  return apiClient.get<Product[]>(`/products/category/${category}`, {
    revalidate: CACHE_TIME,
  });
}




