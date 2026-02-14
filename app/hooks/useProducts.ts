'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/app/types/product';
import { apiClient } from '@/app/lib/apiClient';

/**
 * Hook for fetching products, optionally filtered by category.
 */
export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        const url = category
          ? `/products/category/${encodeURIComponent(category)}`
          : '/products';

        const data = await apiClient.get<Product[]>(url);
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to load products';
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    return () => { cancelled = true; };
  }, [category]);

  return { products, loading, error };
}
