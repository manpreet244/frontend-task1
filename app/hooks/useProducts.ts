'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/app/types/product';
import { apiClient } from '@/app/lib/apiClient';

// hook for fetching products
export function useProducts(category?: string, limit?: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        let url = '/products';
        
        if (category) {
          url = `/products/category/${category}`;
        }
        
        if (limit) {
          url += `?limit=${limit}`;
        }

        const data = await apiClient.get<Product[]>(url, { cache: 'no-store' });
        setProducts(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load products';
        setError(message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [category, limit]);

  return { products, loading, error };
}

// hook for single product
export function useProduct(id: number | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const data = await apiClient.get<Product>(`/products/${id}`, { 
          cache: 'no-store' 
        });
        setProduct(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load product';
        setError(message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { product, loading, error };
}

// hook for categories
export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get<string[]>('/products/categories', { cache: 'no-store' })
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}
